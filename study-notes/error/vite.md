# vite 配置不生效

## error：修改端口为 3000，但是启动的时候仍旧是 默认端口

解决方法：

```ts
// vite.config.ts
  server: { port: 3000 },
```
