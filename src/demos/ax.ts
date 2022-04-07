import { Request } from '../index';
import type { RequestConfig } from '../interface';

interface FJRequestConfig<T> extends RequestConfig {
  data?: T;
}

interface FJResponse<T> {
  code?: number;
  message?: string;
  data?: T;
}

const request = new Request({
  baseURL: process.env?.BASE_URL || 'https://api.fujia.site/api/v1',
  timeout: 1000 * 60 * 5,
  interceptors: {
    requestInterceptors: (config) => {
      console.log('instance request interceptor');
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
 * @interface D 请求参数的interface
 * @interface T 响应结构的intercept
 * @param {YWZRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
export const fjRequest = <D, T = any>(config: FJRequestConfig<D>) => {
  const { method = 'GET' } = config;

  if (method === 'get' || method === 'GET') {
    config.params = config.data;
  }

  return request.request<FJResponse<T>>(config);
};
