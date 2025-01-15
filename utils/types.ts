export type DeepRequired<T> = {
  [K in keyof T]: Required<DeepRequired<T[K]>>
}

export type configTypeDeepRequired = Required<DeepRequired<configType>>

export type configType = {
  // 项目名
  projectName: string

  // 模板地址
  templatesRoot: string

  // 项目模板名
  templateName: string

  // 项目模板详细文件夹别名
  dirAlias?: {
    // 基础文件夹
    base?: string
    // 选项文件夹
    options?: string
    // ejs模板文件夹
    ejs?: string
  }

  // ejs数据的js文件别名
  ejsDataJsAlias?: string

  // 选项文件夹名列表
  options?: Array<string>
}

export type allConfigType = {
  targetPath: string
  basePath: string
  optionsPath: string
  ejsPath: string
  ejsData: any
  ejsDataJsAlias: string
  options: string[]
  config: configType
}
