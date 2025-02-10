type PROXY = {
  [key: string]: {
    target: string
    changeOrigin: boolean
    pathRewrite?: { [key: string]: string }
  }
}
