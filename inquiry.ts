import fs from 'fs'
import minimist from 'minimist'
import path from 'path'
import prompts from 'prompts'
import chalk from 'chalk'
import boxen from 'boxen'
import {
  configType,
  configTypeDeepRequired,
  deepAssign,
  deleteDirectory,
  handleCharkRgb,
  isProjectExists,
  readJsonFile
} from './utils'
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

  // 检查命令行参数传递的项目名称是否存在
  if (projectName) {
    const projectExists = isProjectExists(projectName)

    if (projectExists) {
      projectName = await handleProjectExists(projectName, 'SHELL')
    }
  }

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
      onSubmit: async (e) => {
        if (e.name === 'projectName') {
          const projectExists = isProjectExists(projectName as string)

          if (projectExists) {
            projectName = await handleProjectExists(projectName as string)
          }
        }
      },
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
    console.log(handleCharkRgb('Termination procedure', 255, 0, 0))
    return null // 返回特定的终止值
  }

  promptsResult.projectName = projectName

  const config: configType = deepAssign(initConfig, {
    projectName: promptsResult['projectName'],
    templateName: promptsResult['templateName'],
    options: promptsResult['options']
  })

  return config
}

const handleProjectExists = async (projectName: string, type?: string | undefined) => {
  const projectNameBoldCyan = chalk.bold(chalk.cyan(projectName))
  const deleteRed = handleCharkRgb('delete', 255, 0, 0)
  const renameBlue = handleCharkRgb('rename', 0, 0, 255)
  const existsTip = `A project with the name "${projectNameBoldCyan}" already exists. Please select your operation??`
  const delTip = `The deletion operation cannot be replied, please exercise caution!`

  const actionPrompt = await prompts({
    type: 'select',
    name: 'action',
    message: boxen(chalk.bold(existsTip), {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'red'
    }),
    choices: [
      { title: deleteRed, value: 'delete' },
      { title: renameBlue, value: 'rename' }
    ],
    initial: 1 // 默认选择重命名
  })

  if (actionPrompt.action === 'delete') {
    const deletePrompt = await prompts({
      type: 'confirm',
      name: 'delete',
      message: boxen(handleCharkRgb(delTip, 255, 0, 0), {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'red'
      }),
      initial: false
    })

    if (deletePrompt.delete) {
      await deleteDirectory(path.join(process.cwd(), projectName))
    } else {
      if (type === 'SHELL') {
        console.log(chalk.red('Termination procedure'))
      }
      throw new Error('User canceled the program')
    }
  } else if (actionPrompt.action === 'rename') {
    let newProjectName = projectName
    let projectExists = true

    while (projectExists) {
      // 重新输入项目名称
      const renamePrompt = await prompts({
        name: 'newProjectName',
        type: 'text',
        message: 'Enter a new project name:',
        initial: `${newProjectName}`,
        onState: (state: any) => (newProjectName = String(state.value).trim() || `${newProjectName}`)
      })

      if (renamePrompt.newProjectName) {
        newProjectName = renamePrompt.newProjectName
      } else {
        throw new Error('User canceled the program')
      }

      projectExists = isProjectExists(newProjectName)

      if (projectExists) {
        console.log(
          handleCharkRgb(
            `A project with the name "${chalk.bold(
              chalk.cyan(newProjectName)
            )}" already exists. Please enter a different name.`,
            255,
            0,
            0
          )
        )
      }
    }

    return newProjectName // 返回新的项目名称
  }

  return projectName // 默认返回原项目名称
}
