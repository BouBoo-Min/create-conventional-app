#! /usr/bin/env node
import * as esbuild from 'esbuild'
import 'zx/globals'

let entryPoints = ['index.ts']
let outfile = 'outfile.cjs'

await esbuild.build({
  bundle: true,
  entryPoints,
  outfile,
  format: 'cjs',
  platform: 'node',
  target: 'node16'
})
