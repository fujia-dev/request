import { Request } from '../src/index';
import type { RequestConfig } from '../src/interface';

interface DogRes {
  message: string;
  status: string;
}

const request = new Request({
  timeout: 1000 * 60 * 5,
  interceptors: {
    requestInterceptors: (config) => {
      console.log('interceptor of instance request');
      return config;
    },
    responseInterceptors: (res) => {
      console.log('interceptor of instance request');
      return res;
    },
  },
});

/**
 * @description: 函数的描述
 * @interface D 响应结构的intercept
 * @param {YWZRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
export const fjRequest = (config: RequestConfig) => {
  return request.request<DogRes>(config);
};
