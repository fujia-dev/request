import axios, { AxiosResponse } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { RequestConfig, RequestInterceptors, CancelRequestSource } from './interface';

export class Request {
  instance: AxiosInstance;
  interceptorsConfig?: RequestInterceptors;
  /**
   * A set for storing cancel requests.
   */
  cancelRequestSourceList?: CancelRequestSource[];
  /**
   * A set for storing all request url.
   */
  requestUrlList?: string[];

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptorsConfig = config.interceptors;
    this.requestUrlList = [];
    this.cancelRequestSourceList = [];

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

      const url = config.url;

      if (url) {
        this.requestUrlList?.push(url);
        config.cancelToken = new axios.CancelToken((c) => {
          this.cancelRequestSourceList?.push({
            [url]: c,
          });
        });
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
        })
        .finally(() => {
          url && this.delUrl(url);
        });
    });
  }

  cancelAllRequest() {
    this.cancelRequestSourceList?.forEach((source) => {
      const key = Object.keys(source)[0];

      source[key]();
    });
  }

  cancelRequest(url: string | string[]) {
    if (typeof url === 'string') {
      const sourceIndex = this.getSourceIndex(url);

      if (this.isInArray(sourceIndex)) {
        this.cancelRequestSourceList?.[sourceIndex][url]();
      }
      return;
    }

    url.forEach((u) => {
      const sourceIndex = this.getSourceIndex(u);

      if (this.isInArray(sourceIndex)) {
        this.cancelRequestSourceList?.[sourceIndex][u]();
      }
    });
  }

  private getSourceIndex(url: string) {
    return this.cancelRequestSourceList?.findIndex((item: CancelRequestSource) => {
      return Object.keys(item)[0] === url;
    });
  }

  private delUrl(url: string) {
    const urlIndex = this.requestUrlList?.findIndex((u) => u === url);
    const sourceIndex = this.getSourceIndex(url);

    if (this.isInArray(urlIndex)) {
      this.requestUrlList?.splice(urlIndex, 1);
    }

    if (this.isInArray(sourceIndex)) {
      this.cancelRequestSourceList?.splice(sourceIndex, 1);
    }
  }

  isInArray(index: number | undefined): index is number {
    return typeof index === 'number' && index >= 0;
  }
}
