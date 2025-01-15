module.exports = {
  descripts: 'vconsole',
  vconsoleImport: `
import VConsole from 'vconsole'
`,
  vconsoleConfig: `new VConsole()`,
  arr: ['vconsole'],
  callback({ targetPath, config, ejsData }) {}
}
