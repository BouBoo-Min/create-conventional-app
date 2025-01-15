import { configTypeDeepRequired } from './types'

// 可选参数默认变量
export const defaultConfig: configTypeDeepRequired = {
  projectName: 'default-project',
  templatesRoot: './templates',
  templateName: 'default-template',
  dirAlias: {
    base: 'base',
    options: 'options',
    ejs: 'ejs'
  },
  ejsDataJsAlias: 'ejsData.js',
  options: []
}
