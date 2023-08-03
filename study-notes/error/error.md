# sourcetree 卡位

## error 1

卡位：.json 文件被忽略，无法自动显示 json 文件的变动状态
解决：由于在全局配置文件中忽略了 json 和没有推送所有标签

解决方法：

1. 查看 高级 - 本地仓库指定忽略列表 - 编辑文件 是否配置忽略文件命令
2. 查看 偏好设置 - git - 全局忽略列表 - 编辑文件 是否配置忽略文件命令
3. 在 git 偏好设置中勾选推送所有标签到远程仓库

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

# CD 的卡位

## error 1

报错位于 step 2，提示部署第二步部署失败

1. 检查 Proceess 里面的步骤二配置
2. 查看步骤二内配置的顺序和检查是否填写正确，例如 Ingress Annotations

## error 2

报错位于 step 2，提示 tlsSecret 配置错误

报错内容

```
The Ingress "ingress-practise4koki" is invalid: spec.tls[0].secretName: Invalid value: "#{tlsSecret}": a lowercase RFC 1123 subdomain must consist of lower case alphanumeric characters, '-' or '.', and must start and end with an alphanumeric character (e.g. 'example.com', regex used for validation is '[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)\*')
```

1. 检查 Proceess 里面的步骤二配置的 Ingress TLS 是否填写正确
2. 检查 Variables 里面 Project 添加的 tlsSecret 是否填写正确
