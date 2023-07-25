# css 背景

`background-image: url(img.png)`或者`background-image: url(image1.png), url(image2.png)`可以有一个或者多个背景图

`background-repeat`控制背景重复，属性用于控制图像的平铺行为。
no-repeat— 阻止背景完全重复。
repeat-x— 水平重复。
repeat-y— 垂直重复。
repeat——默认值；在两个方向重复。

`background-size` 属性（可以采用长度或百分比值或者关键字 cover/contain）来调整图像大小以适合背景

`background-position`属性允许您选择背景图像在其应用到的框中出现的位置。它使用一个坐标系，其中框的左上角为(0,0)，并且框沿着水平 ( x) 和垂直 ( y) 轴定位

`background-attachment` 属性指定内容滚动时背景如何滚动， 属性仅在有内容滚动时才起作用
scroll：当页面滚动时使元素的背景滚动。
fixed：使元素的背景固定到视口，以便在滚动页面或元素内容时它不会滚动。始终保持在屏幕上的相同位置。
local：将背景固定到其所设置的元素上，滚动元素时，背景也会随之滚动。

# css 边框

`border: 宽度 样式 颜色;`

圆角： `border-top-right-radius: 水平半径 垂直半径;`

# css 文本方向

书写模式是指文本是水平运行还是垂直运行，`writing-mode`
horizontal-tb：从上到下的块流向。句子横向排列。
vertical-rl：从右到左的块流方向。句子垂直排列。
vertical-lr：从左到右阻止流向。句子垂直排列。

# 多媒体查询语法

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
