import fs from 'fs'
import path from 'path'
import ora from 'ora'
import chalk from 'chalk'

const isObject = (val: any) => val && typeof val === 'object'

// 数组去重
const mergeArrayWithDedupe = (a: Array<any>, b: Array<any>) => Array.from(new Set([...a, ...b]))

// 递归 将新对象的内容合并到现有对象
export function deepMerge(target: any, obj: any) {
  for (const key of Object.keys(obj)) {
    const oldVal = target[key]
    const newVal = obj[key]

    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      target[key] = mergeArrayWithDedupe(oldVal, newVal)
    } else if (isObject(oldVal) && isObject(newVal)) {
      target[key] = deepMerge(oldVal, newVal)
    } else {
      target[key] = newVal
    }
  }

  return target
}

// 将json数据的属性排一下序
export default function sortDependencies(packageJson: any) {
  const sorted: any = {}

  const depTypes = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']

  for (const depType of depTypes) {
    if (packageJson[depType]) {
      sorted[depType] = {}

      Object.keys(packageJson[depType])
        .sort()
        .forEach((name) => {
          sorted[depType][name] = packageJson[depType][name]
        })
    }
  }

  return {
    ...packageJson,
    ...sorted
  }
}

/**
 * 读取指定路径下 json 文件
 * @param filename json 文件的路径
 */
export function readJsonFile<T>(filename: string): T {
  return JSON.parse(fs.readFileSync(filename, { encoding: 'utf-8' }))
}

/**
 * 递归目录,以回调函数的形式传递参数
 * @param targetPath 目标文件路径
 * @param newTargetPath 需要复制的目标路径
 * @param fn 回调函数
 * @returns
 */
export function recursionDir(targetPath: string, fn: (data: { path: string; isDir: boolean }) => void) {
  if (!fs.existsSync(targetPath)) {
    return false
  }
  const stats = fs.statSync(targetPath)

  fn({ path: targetPath, isDir: stats.isDirectory() })

  if (stats.isDirectory()) {
    for (const file of fs.readdirSync(targetPath).filter((name) => name !== '.DS_Store')) {
      recursionDir(path.resolve(targetPath, file), fn)
    }
  }
}

/**
 * 合并两个package.json内容至newTargetPath
 * @param targetPath 目标package.json路径
 * @param newTargetPath 合并至package.json路径
 */
export const mergePackage = (targetPath: string, newTargetPath: string) => {
  const filename = path.basename(targetPath)

  if (filename === 'package.json' && fs.existsSync(newTargetPath)) {
    const existing = JSON.parse(fs.readFileSync(newTargetPath, 'utf8'))
    const newPackage = JSON.parse(fs.readFileSync(targetPath, 'utf8'))
    const pkg = sortDependencies(deepMerge(existing, newPackage))
    fs.writeFileSync(newTargetPath, JSON.stringify(pkg, null, 2) + '\n')
  }
}

/**
 * 判断一个值的类型
 * @param data 需要判断的类型
 * @returns 属性的类型
 */
export const myTypeof = (data: any) => {
  var toString = Object.prototype.toString
  var dataType = toString
    .call(data)
    .replace(/\[object\s(.+)\]/, '$1')
    .toLowerCase()
  return dataType
}

/**
 * 科里化解决继承父类路径的多个子路径
 * @param basePath 基础路径
 * @returns fn
 */
export const joinPath = (...basePath: string[]) => {
  return function (...paths: string[]) {
    return path.join(...basePath, ...paths)
  }
}

/**
 * 解决Object.assign深度对象覆盖问题
 * @param defaultObject 被覆盖的值
 * @param targetObject 目标值
 * @returns 合并后的值
 */
export const deepAssign = (defaultObject: any, targetObject: any) => {
  defaultObject = Object.assign({}, defaultObject)

  Object.keys(targetObject).forEach((v) => {
    switch (myTypeof(targetObject[v])) {
      case 'object':
        defaultObject[v] = deepAssign(defaultObject[v], targetObject[v])
        break
      case 'array':
        defaultObject[v] = [...defaultObject[v], ...targetObject[v]]
        break
      default:
        defaultObject[v] = targetObject[v]
        break
    }
  })

  return defaultObject
}

/**
 * 判断当前工作目录是否存在重命项目
 * @param projectName 项目名
 */
export const isProjectExists = (projectName: string): boolean => {
  const cwd = process.cwd()
  const targetDirectory = path.join(cwd, projectName)
  return fs.existsSync(targetDirectory)
}

/**
 * 删除文件夹
 * @param dirPath 删除目录路径
 */
export const deleteDirectory = async (dirPath: string) => {
  // 使用蓝色表示删除中
  const spinner = ora(chalk.blue(`Deleting existing project: ${path.basename(dirPath)}`)).start()

  try {
    if (fs.existsSync(dirPath)) {
      await fs.promises.rm(dirPath, { recursive: true })
    }
    // 使用绿色表示删除成功
    spinner.succeed(handleCharkRgb(`Project: ${path.basename(dirPath)} deleted successfully`))
  } catch (error) {
    // 使用红色表示删除失败
    spinner.fail(handleCharkRgb(`Project: ${path.basename(dirPath)} deleted failed`, 255, 0, 0))
    throw error
  }
}

/**
 * 设置chalk命令行颜色
 * @param title
 * @param r
 * @param g
 * @param b
 * @returns
 */
export const handleCharkRgb = (title: string, r = 0, g = 255, b = 0) => {
  return chalk.rgb(r, g, b)(title)
}
