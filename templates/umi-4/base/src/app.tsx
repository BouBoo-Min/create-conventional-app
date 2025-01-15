import { Toast } from "antd-mobile";

/**
 * @see https://umijs.org/docs/api/runtime-config#getinitialstate
 * */
export async function getInitialState(): Promise<{ userInfo: any, themeColor: any }> {
  return { userInfo: {}, themeColor: {} };
}

/**
 * @see https://umijs.org/docs/max/request
 */
export const request: any = {
  timeout: 1000,
  baseURL: process.env.NODE_ENV === 'development' ? '/dev' : '',
  errorConfig: {
    errorHandler(error: any) {
      const { response }: any = error;
      if (response && response?.status) {
        Toast.show({
          content: response?.data?.message,
          icon: "fail",
        });
        if (!response) {
          Toast.show({
            content: "网络异常，请稍后重试",
            icon: "fail",
          });
        }
        throw error;
      }
    },
    errorThrower() { }
  },
  requestInterceptors: [
    (url: any, options: any) => {
      options.headers = {
        ...options.headers,
      };
      return { url, options };
    },
  ],
  responseInterceptors: [
    (response: any) => {
      return response;
    },
  ]
}
