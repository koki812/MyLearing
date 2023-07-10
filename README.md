# MyLearing# MyLearing 23/07/10
### .ts和.tsx后缀的区别
TS 和 TSX
.ts 表示为 TypeScript 文件
.tsx 表示为 TypeScript 文件，但它同时还包含了 JavaScript XML（JSX）
.ts 的文件，不支持HTML语法，会报错
反之 .tsx 的文件，在遵循TypeScript的基础上，支持 JSX 语法
所以使用时与要注意区分
辅助的函数文件使用 .ts 即可
React组件方面，还是须使用.tsx  
### reactnode和JsxElement
类组件类型定义：通过 render() 返回 ReactNode
函数组件类型定义：返回 JSX.Element
### rem自适应
一. 动态的计算然后去设置html的字体大小(font-size)；然后页面大小根据一个公式去规范元素的大小
二. 根据元素的宽，高的取值，同比例换算为rem单位的值
例:在scss中设置html {
  font-size: calc(100vw / 3.75);
}
### flex弹性布局
