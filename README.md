# 介绍

参照 axios 封装 ajax 的一个插件

# 使用

- 文件引入

```js
<script src="./core/http.js"></script> // http 核心文件
<script src="./core/interceptor.js"></script> // http 拦截器文件
<script src="./router/test.js"></script> // http 路由文件
<script src="./network/test.js"></script> // http 接口存放文件
```

- 路由  router

```js
let test = http.create({
  baseURL: "http://localhost:9999",
  timeout: 10 * 1000,
  "content-type": "application/json",
});
// 不同的ip或者不同的前缀分为不同的路由
```


- 接口 network

```js
// 自定义

```
