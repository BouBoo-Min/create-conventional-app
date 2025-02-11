#!/usr/bin/env node
import chalk from 'chalk'
import { inquiry } from './inquiry'
import { createTemplate, handleCharkRgb } from './utils'
import { buddhaCodeBlock } from './utils/const'

async function init() {
  // 项目配置
  let config = await inquiry(true)

  if (!config) return process.exit()

  createTemplate(config, ({ targetPath }) => {
    console.log(chalk.yellow(buddhaCodeBlock))
    console.log(handleCharkRgb(`恭喜你,项目创建完成！路径为：\n  ${chalk.bold(chalk.cyan(targetPath))}`))
  })
}

init().catch((err) => {
  process.exit()
})
