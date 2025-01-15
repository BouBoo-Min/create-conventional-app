#!/usr/bin/env node
import { inquiry } from './inquiry'
import { createTemplate } from './utils'

async function init() {
  let config = await inquiry(true)

  if (config) {
    createTemplate(config, ({ targetPath }) => {
      console.log(`完成创建,新项目路径为${targetPath}`)
    })
  }
}

init().catch((err) => {
  process.exit()
})
