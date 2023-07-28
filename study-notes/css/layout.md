# Normal Flow(盒子模型)

各个元素的框的布局方式是将它们恰好具有的任何填充、边框或边距添加到其内容中（盒子模型）。
默认情况下，块级元素的内容填充包含它的父元素的可用内联空间，并沿着块维度增长以容纳其内容。内联元素的大小就是其内容的大小。

## 盒子模型

![image](https://github.com/koki812/MyLearing/assets/139139520/2ba095a8-c9c5-44fe-9438-8b1f25df6e50)     
 
margin(外边距) - 清除边框外的区域，外边距是透明的。  
border(边框) - 围绕在内边距和内容外的边框。  
padding(内边距) - 清除内容周围的区域，内边距是透明的。  
content(内容) - 盒子的内容，显示文本和图像。

# 弹性盒（flex）

Flexbox 是一种一维布局方法，用于按行或列排列项目。弯曲（展开）以填充额外的空间或收缩以适应较小的空间`display:flex`
弹性模型     

![image](https://github.com/koki812/MyLearing/assets/139139520/52549a8e-a5a0-4629-9b3c-7cbc5449375a)     


-   flex-directionand flex-wrap:的简写形式 flex-flow,即`flex-direction: row; flex-wrap: wrap;`等价`flex-flow: row wrap;`

-   指定 Flex 值内的最小尺寸值，每个弹性项目将首先获得 x 的可用空间。之后，剩余的可用空间将根据比例单位共享。`flex: 1 xrem;`

-   更改 Flex 项目的布局顺序而不影响源顺序的功能（order）

    默认情况下，所有弹性项目 order 的值为 0。
    具有较高 order 值的 Flex item 在显示顺序中将比具有较低 order 值的 item 晚出现。
    具有相同 order 值的 Flex 商品将显示在其源 order 中。有四个 item，其顺序值分别设置为 2、1、1 和 0，则它们的显示顺序将为第 4、第 2、第 3、第 1。第三项出现在第二项之后，因为它具有相同的顺序值并且在源顺序中位于第二项之后。也可以设置负顺序值以使 item 早于值为 0 的 item 出现。

## flex 布局 tips

由于文字长度不一导致使用 justify-content: space-between 之后,样式不一.可以给整个包括 div 并固定宽高

# 网格布局（grid）

## grid 布局初了解

1. 在父容器上应用 grid 布局，通过设置父容器的 display 属性为 grid 来实现。eg：`display: grid;`。

2. 定义布局网格行和列：使用 grid-template-rows 和 grid-template-columns 属性来定义网格的行和列。eg：`grid-template-rows: 1rem 2rem;`和`grid-template-columns: 1fr 2fr;` // 表示有两行，第一行高度为 1rem，第二行高度为 2rem；有两列，第一列宽度为 1/3，第二列宽度为 2/3。

3. 指定子元素的位置：使用 grid-row 和 grid-column 属性来指定子元素在网格中的位置。eg：`grid-row: 1 / 3;`和`grid-column: 2 / span 2;`// 表示子元素跨越了从第 1 行到第 3 行，占据了从第 2 列开始的 2 个列。

4. 其他布局属性：用其他 grid 布局属性来进一步控制布局，eg：grid-gap 用于设置网格行和列之间的间距，也可以用 justify-items 和 align-items 用于设置子元素在网格单元格内的对齐方式等。

CSS 网格布局是一种用于 Web 的二维布局，允许将内容布置在行和列中。

-   使用属性 grid-template-areas 并为设计的各个元素命名，在网格上排列 item
    规则 grid-template-areas 如下：
    需要填充网格的每个单元格。
    要跨越两个单元格，重复该名称。
    要将单元格留空，使用.（句点）。
    区域必须是矩形的。
    区域不能在不同位置重复。

# Floats

1. 设置浮动：通过将元素的 float 属性设置为 left 或 right，使元素从正常的文档流中脱离，并向左或向右浮动。

2. 创建多列布局：通过设置多个元素的浮动属性，可以实现多列布局。每个列的宽度可以使用百分比或固定值来控制。

3. 图文混排：使用浮动布局可以将文本和图像元素进行混排，使它们按照指定的顺序排列。

4. 清除浮动：由于浮动元素脱离了文档流，可能会对其他元素的布局产生影响。为了避免这种问题，通常需要进行清除浮动（clearfix）的处理，以确保父容器正确包含浮动元素。

-   浮动布局可能导致父容器高度塌陷、布局错乱和元素重叠等问题，使用清除浮动、设置适当的宽度和使用 overflow: hidden 等技巧解决。

-   清除浮动元素并且不再出现在它旁边， `clear: left;`
    left：清除的项目向左浮动。
    right：清除项目向右浮动。
    both：清除左侧或右侧的所有浮动项目。

-   `display: flow-root;` 创建一个包含块（containing block）来包裹浮动元素，同时自动清除浮动。

# Position

## static

HTML 元素的默认值
没有定位，遵循正常的文档流对象。

-   静态定位的元素不会受到 top, bottom, left, right 影响

## relative

相对定位元素的定位是相对其正常位置,移动相对定位元素，但它原本所占的空间不会改变。（即可能为空间所在位置和视觉所在位置不一致）

-   相对定位元素经常被用来作为绝对定位元素的容器块

## fixed

元素的位置相对于浏览器窗口是固定位置,窗口是滚动,也不会移动

## absolute

绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于`<html>`处于页面左上角
absolute 定位使元素的位置与文档流无关，不占据空间，能和其他元素重叠。

## sticky

`position: sticky` 基于用户的滚动位置来定位。

粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。

-   指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

## 重叠的元素

元素的定位与文档流无关，覆盖页面上的其它元素
z-index 属性指定了一个元素的堆叠顺序，一个元素可以有正数或负数的堆叠顺序：
（更高堆叠顺序的元素总是在较低的堆叠顺序元素的前面）

-   两个定位元素重叠，没有指定 z - index，则最后定位在 HTML 代码中的元素将被显示在最前面。

# 多列布局（multicol）

具有`<div>`一类的容器会成为 multicol 容器。使用以下两个属性之一`multicol：column-count`或 `column-width`来多列布局。
`column-count`属性将一个数字作为其值并创建该数量的列。
`column-width`属性设置列宽
`column-gap`属性更改列之间间隙的大小
`column-rule`属性在列之间添加规则（` column-rule-color``column-rule-style``column-rule-width `的缩写）eg:`column-rule: width style color`
`column-span`属性跨越多列的元素,不能使元素只跨越某些列。该属性只能具有值 none（这是默认值）或 all。
`break-inside`属性用于指定在分页或列布局中是否允许元素内部发生分页断行或列断行。

这个属性可以应用于块级元素，用于控制元素是否可以被分割到不同的页面或列中。

-   由 multicol 创建的列不能单独设置样式。
    1. 无法使一列比其他列更大
    2. 无法更改单个列的背景或文本颜色

# 响应式设计

响应式网页设计（RWD）是一种网页设计方法，使网页在所有屏幕尺寸和分辨率上都能良好呈现，同时确保良好的可用性。

媒体查询，默认情况下，多种布局方法（包括多列布局、Flexbox 和 Grid）都是响应式的

## 多媒体查询语法

多媒体查询由多种媒体组成，包含一个或多个表达式，表达式根据条件是否成立返回 true 或 false。

```
@media not|only mediatype and (expressions) {
    CSS ...;
}
```

如果指定的多媒体类型匹配设备类型则查询结果返回 true，文档会在匹配的设备上显示指定样式效果。

除非， not 或 only 操作符，否则所有的样式会适应在所有设备上显示效果。

not: not 是用来排除掉某些特定的设备的，比如 @media not print（非打印设备）。

only: 用来定某种特别的媒体类型，遇到 only 关键字时会忽略这个样式文件。

all: 所有设备，这个应该经常看到

-   CSS3 多媒体类型
    all 用于所有多媒体类型设备
    print 用于打印机
    screen 用于电脑屏幕，平板，智能手机等。
    speech 用于屏幕阅读器
