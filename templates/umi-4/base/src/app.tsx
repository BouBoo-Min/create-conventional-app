/**
 * @see https://umijs.org/docs/api/runtime-config#getinitialstate
 * */
export async function getInitialState(): Promise<{
  userInfo: any
  themeColor: any
}> {
  return { userInfo: {}, themeColor: {} }
}

/**
 * @see https://umijs.org/docs/max/request
 */
export const request: any = {
  timeout: 2000,
  baseURL: process.env.NODE_ENV === 'development' ? '/dev' : '',
  errorConfig: {
    errorHandler(error: any) {
      const { response }: any = error
      if (response && response?.status) {
        throw error
      }
    },
    errorThrower() {
      throw new Error('An error occurred')
    }
  },
  requestInterceptors: [
    (url: any, options: any) => {
      options.headers = {
        ...options.headers
      }
      return { url, options }
    }
  ],
  responseInterceptors: [
    (response: any) => {
      return response
    }
  ]
}
