<div align="center">
  <a href="https://www.npmjs.com/package/@fujia/request" target="_blank">
    <img src="https://github.com/fujia-blogs/articles/blob/main/assets/fetch.png" alt="@fujia/request" width=200 />
  </a>
</div>

<div align="center">
  <h1>@fujia/request</h1>
</div>

<div align="center">

一个基于 axios 构建的、简单的 Ajax 库.

</div>

<div align="center">

[English](./README.md) | 简体中文

</div>

## 安装

使用 npm:

```sh
npm i @fujia/request
```

使用 yarn:

```sh
yarn add axios
```

使用 unpkg CDN:

```html
<script src="https://unpkg.com/@fujia/request@0.3.0/lib/request.min.js"></script>
```

## 示例

配置 request:

```ts
// ax.ts
import { Request } from '@fujia/request';
import type { RequestConfig } from '@fujia/request';

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

export const fjRequest = (config: RequestConfig) => {
  return request.request<DogRes>(config);
};
```

使用配置好的实例:

```ts
// dogs.ts
import { fjRequest } from './ax';

function main() {
  fjRequest({
    url: 'https://dog.ceo/api/breeds/image/random',
  }).then((res) => {
    if (res.status === 'success') {
      console.log(res.message);
    }
  });
}

main();
```

## 参考资料

1. [axios](https://www.axios-http.cn/docs/intro)
