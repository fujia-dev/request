import { Request } from './Request';
import type { RequestConfig } from './interface';

export const jwtRequest = (
  token?: string,
  options: RequestConfig = {},
  tokenKey = 'authorization'
) => {
  return new Request({
    ...options,
    interceptors: {
      requestInterceptors: (config) => {
        if (config.headers && token) {
          config.headers[tokenKey] = token;
        }

        return config;
      },
    },
  });
};
