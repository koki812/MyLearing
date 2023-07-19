### rem 自适应

一. 动态的计算然后去设置 html 的字体大小(font-size)；然后页面大小根据一个公式去规范元素的大小  
二. 根据元素的宽，高的取值，同比例换算为 rem 单位的值  
例:在 scss 中设置 html {
font-size: calc(100vw / 3.75);
}

## css 缩写

记忆点：上 右 下 左
eg：

- 1.上下左右的值不同

```
padding : top right bottom left；
```

- 2.上下左右的值相同

```
padding : 0px；
```

- 3.上下值相同

```
padding : 上下 右 左；
```

- 4.左右值相同

```
padding : 上 右左 下；
```

- 5.上下值相同 左右值相同

```
padding : 上下 右左；
```

# css 伪元素

## before & after

伪元素不是真正存在在 html 页面里面的元素，但是伪元素的表现和行为却能和页面元素一样，css 也可以对其操控，同时伪元素会继承原本元素的属性
伪元素使用两个冒号：：开头
eg:
::before 在原本的元素之前加入内容
::after 在原本的元素之后加入内容

tips：
伪元素一定要具备 content 属性，甚至 content：“”；也是可以存在的
还可以通过 attr 获取内容元素的属性值，如：content：attr（href）等
也可以放入图片，content：url（）；

## html

嵌套元素:将一个元素置于其他元素之中为嵌套  
空元素：不包含任何内容的元素称为空元素，这些元素只有一个标签，通常用来在此元素所在位置插入/嵌入东西  
列表：

- 无序列表：用一个 ul 元素包围
- 有序列表：ol 元素包围
  链接
  `<a href="" / >`

#### 特殊字符

![Alt text](image-2.png)
![Alt text](image-2.png)

## css

![Alt text](image.png)

### 选择器

- 标签选择器 所有指定类型的 HTML 元素 eg： p{} html{}
- id 选择器 一个元素只对应一个 ID eg: `<p id="id">` #id {}
- 类选择器 一个类可以对应多个实例 eg: `<p class="mystyle">` .mystyle{}
- 属性选择器 有特定的元素 eg： `<img src="" > ` img[src]
- 伪类选择器 特定状态下的特定元素 eg: p:hover
- 全局选择器 是由一个星号`*`代指的，它选中了文档中的所有内容 eg：选中`<article>` 元素的任何第一子元素 `article  *:first-child {}`
- 存否和值选择器
  ![Alt text](image-3.png)
- 子字符串匹配选择器
  ![Alt text](image-4.png)
  tips：大小写敏感 在闭合括号之前，使用 i 值， eg：a[class^="a" i] {}

### calc()函数

calc()函数允许在 CSS 中进行简单的计算 eg：height: calc(100% - 3rem);

### Transform 函数

transform 属性允许旋转，缩放，倾斜或平移给定元素。通过修改 CSS 视觉格式化模型的坐标空间实现
transform 指定为关键字值 none 或一个或多个 <transform-function> 值

### 盒子模型

![Alt text](image-1.png)  
margin(外边距) - 清除边框外的区域，外边距是透明的。  
border(边框) - 围绕在内边距和内容外的边框。  
padding(内边距) - 清除内容周围的区域，内边距是透明的。  
content(内容) - 盒子的内容，显示文本和图像。

### 样式

text-shadow/box-shadow ：水平偏移量 垂直偏移量 模糊半径 扩散半径 阴影基色；

### @规则

@import 将一个样式表导入另一个 CSS 样式表：  
@media，用来创建媒体查询。按照媒体查询使用条件逻辑来应用 CSS 样式。
