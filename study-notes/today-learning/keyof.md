# Type Operator

## 断言 as any

as any 是类型断言。它将一个值强制转换为 any 类型，将取消 TypeScript 对该值的类型检查
使用 as any 可以绕过类型检查，可能会导致类型安全问题。

-   as any 主要用于解决特殊情况下的类型不匹配问题或临时性的类型转换

## keyof

keyof 是索引类型查询操作符。获取一个对象类型的所有属性名组成的联合类型。
当想要使用对象的属性名作为类型时，可以使用 keyof，其可以在泛型和条件类型中引用对象的属性名类型。

-   主要用于在类型声明中引用对象的属性名类型。

## typeof

在 TypeScript 中，typeof 可以用作类型查询和类型守卫。
类型查询：用于获取类型的字符串表示
类型守卫：用于在运行时检查表达式的类型

## valueOf

valueOf() 是 JavaScript 中对象的一个方法，返回对象的原始值（primitive value）。当对一个对象进行类型转换时，JavaScript 会自动调用对象的 valueOf() 方法来获取其原始值。

object.valueOf();
object: 需要获取原始值的对象。
valueOf() 方法的默认行为在不同类型的对象上可能会有所不同。通常情况下，JavaScript 原生对象会有一个默认的 valueOf() 方法，返回对象本身，而不是其原始值。可以通过重写 valueOf() 方法来自定义对象的原始值返回逻辑。

默认情况下，对象的 valueOf() 方法不会返回原始值，因此需要根据具体对象类型来决定是否需要重写该方法。

需要注意的是，当对象用于某些期望得到原始值的场景时，例如算术运算，JavaScript 会自动调用 valueOf() 方法来获取原始值。如果对象没有提供 valueOf() 方法，JavaScript 会返回对象本身。

## indexof

indexOf() 是 JavaScript 字符串和数组的方法，用于查找给定元素或子字符串在字符串或数组中第一次出现的索引位置。

查找最后一次出现的索引位置，lastIndexOf() 方法。

-   注意，如果查找的元素或子字符串不存在，indexOf() 和 lastIndexOf() 方法都返回 -1。

# 字符串方法

## startsWith

`string.startsWith(searchString[, position]);`
用于判断字符串是否以指定的子字符串 searchString 开头。

searchString: 要搜索的子字符串。
position (可选): 指定搜索的起始位置，默认为 0。
返回值：如果字符串以指定的子字符串开头，则返回 true，否则返回 false。

## endsWith

`string.endsWith(searchString[, length]);`
用于判断字符串是否以指定的子字符串 searchString 结尾。

length (可选): 指定搜索的结束位置，默认为字符串的长度。
返回值：如果字符串以指定的子字符串结尾，则返回 true，否则返回 false。

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
