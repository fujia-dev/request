<div align="center">
  <a href="" target="_blank">
    <img src="https://github.com/fujia-blogs/articles/blob/main/assets/fetch.png" alt="@fujia/request" width=200 />
  </a>
</div>

<div align="center">
  <h1>@fujia/request</h1>
</div>

<div align="center">

A simple Ajax library build on axios.

</div>

<div align="center">

English | [简体中文](./README.zh-CN.md)

</div>

## Installing

Using npm:

```sh
npm i @fujia/request
```

Using yarn:

```sh
yarn add axios
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/@fujia/request@0.2.0/lib/request.min.js"></script>
```

## Example

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

```ts
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

## References

1. [axios](https://www.axios-http.cn/docs/intro)
