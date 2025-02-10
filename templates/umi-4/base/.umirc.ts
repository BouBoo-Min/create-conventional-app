// 参考文挡：https://umijs.org/docs/api/config
import { defineConfig } from 'umi'
import { proxy, routes } from './config'

export default defineConfig({
  // 插件配置参考: https://umijs.org/docs/guides/use-plugins
  plugins: [
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model',
    '@umijs/plugins/dist/request',
    '@umijs/plugins/dist/mf'
  ],
  hash: true,
  history: {
    type: 'hash'
  },
  favicons: [],
  metas: [],
  links: [],
  scripts: [],
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputPath: 'dist',
  title: '项目名',
  targets: {
    chrome: 80
  },
  routes,
  npmClient: 'pnpm',
  clientLoader: {}, //加快路由数据加载
  alias: {},
  initialState: {},
  model: {},
  request: {},
  historyWithQuery: {},
  proxy
})
