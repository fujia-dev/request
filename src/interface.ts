import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestInterceptors {
  /**
   * request interceptor
   */
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => void;

  /**
   * response interceptor
   */
  responseInterceptors?: <T = AxiosResponse>(config: T) => T;
  responseInterceptorsCatch?: (err: any) => void;
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;
}

export interface CancelRequestSource {
  [index: string]: () => void;
}
