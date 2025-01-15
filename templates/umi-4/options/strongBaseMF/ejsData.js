module.exports = {
  descripts: 'strongBaseMFConfig',
  strongBaseMFConfig: `mf: {
    remotes: [
      {
        aliasName: "strongBaseMF",
        name: "strongBaseMF",
        entry: "https://letao.cnstrong.cn/base-components/strongBaseMF.js",
      },
    ],
    shared: {
      react: {
        singleton: true,
        requiredVersion: "^18.0.0",
      },
      "react-dom": {
        singleton: true,
        requiredVersion: "^18.0.0",
      },
      antd: {
        singleton: true,
        requiredVersion: "^5.0.0",
      },
    },
  },
`,
  arr: ['strongBaseMFConfig'],
  callback({ targetPath, config, ejsData }) {}
}
