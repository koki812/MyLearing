# 使用 tailwindcss 与 antd 冲突，Button 按钮透明

按钮是 antd 的`<Button/>`有异常，背景颜色是透明的，但是鼠标悬浮有背景颜色

## 问题出现的原因

- 原因是使用了 tailwindcss ，默认情况会有 tailwindcss 的默认属性

- 代码块内 background-color: transparent; 默认属性导致的

```css
button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}

<style > button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}
```

## 解决方案

1. 禁止 tailwindcss 的默认属性
2. 添加 corePlugins 对象，并设置 preflight 为 false
3. 修改文件 tailwind.config.js

```js
module.exports = {
  ...
  ...
  corePlugins: {
    preflight: false
  }
}
```
