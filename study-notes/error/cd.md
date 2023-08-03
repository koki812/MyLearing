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
