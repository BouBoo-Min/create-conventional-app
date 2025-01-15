import fs from 'fs'
import minimist from 'minimist'
import path from 'path'
import prompts from 'prompts'
import { configType, configTypeDeepRequired, deepAssign, readJsonFile } from './utils'
import { defaultConfig } from './utils/defaultConfig'

const argv = minimist(process.argv.slice(2), { string: ['_'] })
let projectName = argv._[0]
let defaultProjectName = projectName ?? 'test-project'

const autoImport = (defaultConfig: configTypeDeepRequired) => {
  const { templatesRoot, dirAlias } = defaultConfig

  const templatesData = {} as any
  // In macOS,.ds_store is a hidden file that stores custom properties of folders, such as icon positions, view Settings, and so on. When you move a folder, the.ds_store file may be recreated, causing you to see it when you read the folder's contents.
  let projectNames = fs.readdirSync(templatesRoot).filter((name) => name !== '.DS_Store')

  projectNames.forEach((value) => {
    templatesData[value] = { title: value }
    templatesData[value]['options'] = []

    const optionsPath = path.join(templatesRoot, value, dirAlias.options)

    if (fs.existsSync(optionsPath)) {
      fs.readdirSync(optionsPath)
        .filter((name) => name !== '.DS_Store')
        .forEach((v2) => {
          templatesData[value]['options'].push({
            title: v2,
            value: v2
          })
        })
    }
  })

  return templatesData
}

const handleOptions = (autoLoad: boolean, defaultConfig: configTypeDeepRequired) => {
  let data: any = autoLoad ? autoImport(defaultConfig) : readJsonFile(path.join(__dirname, './templatesData.json'))

  const options = []

  let obj = {
    type: 'select',
    name: 'templateName',
    message: 'Pick template',
    choices: [] as Array<any>
  }
  Object.keys(data).map((k) => {
    const title = data[k]['title']
    const value = k
    obj.choices.push({ title, value })
  })
  options.push(obj)

  options.push({
    type: (prev: any) => (data[prev]['options']?.length ? 'multiselect' : null),
    name: 'options',
    message: 'Pick options',
    choices: (prev: any) => data[prev]['options']
  })

  return options
}

export const inquiry = async (autoLoad: boolean = false): Promise<configType | null> => {
  const templatesRoot = path.resolve(__dirname, './templates')
  const initConfig = deepAssign(defaultConfig, {
    templatesRoot
  } as Partial<typeof defaultConfig>)

  const promptsOptions: Array<any> = handleOptions(autoLoad, initConfig)

  const promptsArray: Array<any> = [
    {
      name: 'projectName',
      type: projectName ? null : 'text',
      message: 'Project name:',
      initial: defaultProjectName,
      onState: (state: any) => (projectName = String(state.value).trim() || defaultProjectName)
    },
    ...promptsOptions
  ]

  let promptsResult
  try {
    promptsResult = (await prompts(promptsArray, {
      onCancel: () => {
        // User canceled the program
        throw new Error('User canceled the program')
      }
    })) as {
      projectName: string
      templateName: string
      options: Array<string>
    }
  } catch (error) {
    console.log('Termination procedure')
    return null // 返回特定的终止值
  }

  promptsResult.projectName = promptsResult.projectName ?? defaultProjectName

  const config: configType = deepAssign(initConfig, {
    projectName: promptsResult['projectName'],
    templateName: promptsResult['templateName'],
    options: promptsResult['options']
  })

  return config
}
