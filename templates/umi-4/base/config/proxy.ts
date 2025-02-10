/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * @doc 参考文档：https://umijs.org/docs/guides/proxy
 */
const proxy: PROXY = {
  '/dev': {
    target: 'https://letao.cnstrong.cn',
    changeOrigin: true,
    pathRewrite: { '^/dev': '' }
  }
}

export default proxy
