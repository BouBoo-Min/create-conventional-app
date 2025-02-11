import ejs from 'ejs'
import fs from 'fs'
import fse from 'fs-extra'
import path from 'path'
import { execSync } from 'child_process'
import { deepAssign, joinPath, mergePackage, myTypeof, readJsonFile, recursionDir } from './common'
import { defaultConfig } from './defaultConfig'
import { allConfigType, configType, configTypeDeepRequired } from './types'

/**
 * 用于创建渲染项目
 * @param config 配置参数
 * @param templatesRoot 模板位置
 * @param fn 执行完成的回调函数
 */
export const createTemplate = (config: configType, fn?: (data: allConfigType) => void) => {
  config = deepAssign(defaultConfig, config)

  const { projectName, templatesRoot, dirAlias, templateName, ejsDataJsAlias, options } =
    config as configTypeDeepRequired

  const targetPath = path.join(process.cwd(), projectName)
  const templateBasePath = joinPath(path.join(templatesRoot, templateName))

  const basePath = templateBasePath(dirAlias.base)
  const optionsPath = templateBasePath(dirAlias.options)
  const ejsPath = templateBasePath(dirAlias.ejs)

  const allConfig = {
    targetPath,
    basePath,
    optionsPath,
    ejsPath,
    ejsDataJsAlias,
    options,
    config,
    ejsData: {}
  }

  renderBase(allConfig)

  initOptionsEjsData(allConfig)

  renderOptions(allConfig)

  renderEjs(allConfig)

  endFolw(allConfig)

  if (typeof fn === 'function') {
    fn(allConfig)
  }
}

const renderBase = (allConfig: allConfigType) => {
  const { basePath, targetPath } = allConfig

  fse.copySync(basePath, targetPath, {
    filter(src) {
      const basename = path.basename(src)
      console.log({ basename }, '1')
      return basename !== 'node_modules'
    }
  })

  // 检查目标路径中是否存在 .npmignore 文件，并重命名为 .gitignore
  const npmignorePath = path.join(targetPath, '.npmignore')
  const gitignorePath = path.join(targetPath, '.gitignore')

  if (fse.existsSync(npmignorePath)) {
    fse.renameSync(npmignorePath, gitignorePath)
  }
}

// 递归初始化ejs的值,防止ejs模板undefind报错
const initOptionsEjsData = (allConfig: allConfigType) => {
  const { optionsPath, ejsDataJsAlias, ejsData } = allConfig

  if (!fs.existsSync(optionsPath)) {
    return false
  }

  recursionDir(optionsPath, (data) => {
    const filename = path.basename(data.path)

    if (filename === ejsDataJsAlias) {
      const optionEjsData = require(data.path)

      Object.keys(optionEjsData).map((k) => {
        const curData = optionEjsData[k]

        switch (myTypeof(curData)) {
          case 'function':
            ejsData[k] = new Function()
            break
          case 'array':
            ejsData[k] = []
            break
          default:
            ejsData[k] = ''
            break
        }
      })
    }
  })
}

const renderOptions = (allConfig: allConfigType) => {
  const { options, optionsPath, targetPath, ejsDataJsAlias, ejsData } = allConfig

  options?.map((item: any) => {
    const curItemPath = path.join(optionsPath, item)
    let fn: Function | any

    fse.copySync(curItemPath, targetPath, {
      filter(src, dest) {
        const basename = path.basename(src)

        switch (basename) {
          case 'node_modules':
            return false
          case 'package.json':
            mergePackage(src, dest)
            return false
          case ejsDataJsAlias:
            const optionEjsData = require(src)

            Object.keys(optionEjsData).map((key) => {
              let curData = optionEjsData[key]

              switch (myTypeof(curData)) {
                case 'function':
                  fn = curData
                  break
                case 'array':
                  ejsData[key] = [...ejsData[key], ...curData]
                  break
                default:
                  ejsData[key] += curData
                  break
              }
            })
            return false
          default:
            return true
        }
      }
    })

    if (typeof fn === 'function') {
      fn(allConfig)
    }
  })
}

// 递归渲染ejs
const renderEjs = (allConfig: allConfigType) => {
  const { targetPath, ejsPath, ejsData } = allConfig

  if (!fs.existsSync(ejsPath)) {
    return false
  }

  recursionDir(ejsPath, (data) => {
    const basename = path.basename(data.path)

    if (basename === 'node_modules') {
      return false
    }

    try {
      ejs.renderFile(data.path, ejsData, (err: Error | null, str: string) => {
        if (err) {
          return
        }

        const renderEjsPath = path.join(targetPath, path.relative(ejsPath, data.path))

        let deleteEjsSuffix = renderEjsPath.split('.')
        deleteEjsSuffix.pop()

        fs.writeFileSync(deleteEjsSuffix.join('.'), str)
      })
    } catch (error) {
      console.log({ error }, '--renderEjs')
    }
  })
}

// 最后结束要做的事
const endFolw = (allConfig: allConfigType) => {
  const { targetPath } = allConfig

  const RootPackageJsonPath = path.join(targetPath, 'package.json')

  if (fs.existsSync(RootPackageJsonPath)) {
    let _data: any = readJsonFile(RootPackageJsonPath)
    _data.name = path.basename(targetPath)
    _data.version = '1.0.0'
    _data.private = _data.private ? _data.private : true

    // 获取 Git 用户信息
    try {
      const userName = execSync('git config user.name').toString().trim()
      const userEmail = execSync('git config user.email').toString().trim()
      _data.author = `${userName} <${userEmail}>`
    } catch (error) {
      // console.error('Failed to get Git user information:', error)
      // _data.author = '' // 默认值
    }

    // 重新排列对象的键顺序
    const orderedData = {
      private: _data.private,
      name: _data.name,
      version: _data.version,
      author: _data.author,
      ..._data
    }

    let str = JSON.stringify(orderedData, null, 2)
    fs.writeFileSync(RootPackageJsonPath, str)
  }
}
