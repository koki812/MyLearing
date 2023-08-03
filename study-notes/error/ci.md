# CI 的卡位

## error 1

报错位于 step3，找不到 package.json
在 package.json 中加入

```json
 "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "deploy": "npm run build" //加上这行代码
  }

```

## error 2

报错在 step4 ，dockerfile 不生效

1. 在文件 find 目录下找到 dockerfile 文件，查看是否存在
2. 查看 dockerfile 文件名的拼写是否正确
3. 查看 dockerfile 文件内编写是否正确，可查看 dockerfile 文件字节数，对比一下
4. 找已生效的 dockerfile 文件，放在 finder 文件中，再打包查看是否生效
