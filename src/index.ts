import axios, { AxiosResponse } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { RequestConfig, RequestInterceptors } from './interface';

export class Request {
  instance: AxiosInstance;
  interceptorsConfig?: RequestInterceptors;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);

    /**
     * SYNOPSIS:
     *
     * 1. The exec order of interceptor: instance request -> class request -> instance response -> class response
     */

    // global request interceptor
    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        return res;
      },
      (err: any) => err
    );

    // instance interceptor
    this.instance.interceptors.request.use(
      this.interceptorsConfig?.requestInterceptors,
      this.interceptorsConfig?.requestInterceptorsCatch
    );

    this.instance.interceptors.response.use(
      this.interceptorsConfig?.responseInterceptors,
      this.interceptorsConfig?.responseInterceptorsCatch
    );

    // global response interceptor
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data;
      },
      (err: any) => err
    );
  }

  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // single request interceptor
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // single response interceptor
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors<T>(res);
          }

          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}
