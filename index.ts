#!/usr/bin/env node
import chalk from 'chalk'
import { inquiry } from './inquiry'
import { createTemplate, handleCharkRgb } from './utils'

async function init() {
  // 项目配置
  let config = await inquiry(true)

  if (!config) return process.exit()

  const buddhaCodeBlock = `
                      _o0o_
                    __ooOoo__
                    o8888888o
                    88" . "88
                    (| -_- |)
                     O\\ = /O
                 ____/'---'\\____
                  .' \\\\| |// '.
                / \\\\||| : |||// \\
              / _||||| -:- |||||- \\
                | | \\\\\\ - /// | |
              | \\_| ''\\---/'' |_/ |
               \\ .-\\__ '-' ___/-. /
            ___'. .' /--.--\\ '. .'__
         ."" '< '.___\\_<|>_/___.' >'"".
        | | : ' - \\'.'\\ _ /'.'/ - ' : | |
          \\ \\ '-. \\_ __\\ /__ _/ .-' / /
  ======'-.____'-.___\\_____/___.-'____.-'======
                     '=---='

  =============================================
                   唵嘛呢叭咪吽
                     镇压邪祟
`

  createTemplate(config, ({ targetPath }) => {
    console.log(chalk.yellow(buddhaCodeBlock))
    console.log(handleCharkRgb(`恭喜你项目成功创建！项目路径为：\n  ${chalk.bold(chalk.cyan(targetPath))}`))
  })
}

init().catch((err) => {
  process.exit()
})
