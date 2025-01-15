module.exports = {
  descripts: 'selfConfig本人配置',
  metasConfig: `
    {
      name: "viewport",
      content:
        "width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover",
    }
  `,
  linksConfig: `
    {
      rel: "stylesheet",
      type: "text/css",
      href: "https://static.leke.cn/styles/common/iconfont/iconfont.css",
    }
  `,
  scriptsConfig: `
   {
      src: "https://static.leke.cn/styles/common/iconfont/iconfont.js",
      defer: true,
    }
  `,
  faviconsConfig: `"https://static.leke.cn/images/common/favicon.ico"`,
  arr: ['selfConfig个人配置'],
  callback({ targetPath, config, ejsData }) {}
}
