# useDebugValue

`useDebugValue` 用于在 React DevTools 中向自定义 hook 添加标签。
接受两个参数：`value` 和 可选`format`。

-   `value` 是要提供调试信息的值，可以为任何类型。
-   可选`format` 是一个可选的格式化函数，用于将值转换为调试信息的字符串表示形式，useDebugValue(date, date => date.toDateString());
    格式化函数将接收调试值作为参数，并应返回格式化的显示值。当组件被检查时，React DevTools 将调用此函数并显示其结果。

# useDeferredValue

`useDeferredValue` 推迟对部分 UI 的更新，以优化性能，减少不必要的渲染。

`useDeferredValue(value)` 接受一个参数 `value`，表示要推迟更新的值。它返回一个新的值，该值会在下一次渲染时更新。

加载新内容时显示陈旧内容
表明内容已过时
推迟部分 UI 的重新渲染

1. 在组件中使用 `useDeferredValue` 函数，将需要推迟更新的值作为参数传入。
2. 使用返回的推迟更新的值，而不是原始的值，进行渲染或其他操作。

return：
在初始渲染期间，返回的延迟值与提供的值相同。
在更新期间，React 将使用旧值重新渲染（返回旧值），然后在后台尝试使用新值进行另一次重新渲染（返回更新后的值）。

```typescript
import { useState, useDebugValue, useDeferredValue } from "react";

export const DebugValueDemo = () => {
    const [count, setCount] = useState<number>(0);
    const deferredCount = useDeferredValue(count);

    useDebugValue(deferredCount, (value) => `Deferred Count: ${value}`);

    return (
        <div>
            <p>Count: {count}</p>
            <p>Deferred Count: {deferredCount}</p>
            <button onClick={() => setCount((num) => num + 1)}>
                Count + 1
            </button>
        </div>
    );
};
```

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

除非使用 not 或 only 操作符，否则样式都会适应在设备上显示效果。

not 用来排除掉某些特定的设备的，比如 @media not print（非打印设备）。

only 用来定某种特别的媒体类型，遇到 only 关键字时会忽略这个样式文件。

all 所有设备

-   CSS3 多媒体类型

    all 用于所有多媒体类型设备   
    print 用于打印机   
    screen 用于电脑屏幕，平板，智能手机等。   
    speech 用于屏幕阅读器   

# tailwind 初了解

## margin

    ml-x：设置元素的左边距为 x 个单位。
    mr-x：设置元素的右边距为 x 个单位。
    mt-x：设置元素的上外边距为 x 个单位。
    mb-x：设置元素的下外边距为 x 个单位。

## height

    h-screen：设置元素的高度为屏幕的高度。
    h-x：设置元素的高度为 x 个单位。

## flex

    flex：将元素设置为弹性布局，使其子元素可以自动排列。
    flex-x：将元素的弹性伸缩比例设置为 x，使其占据剩余的可用空间。
    flex-wrap：设置元素的子元素可以换行排列。
    flex-col：设置元素的子元素垂直排列。

## text

    text-center：将元素内部的文本内容居中对齐。
    text-lg：设置元素内部的文本内容为大号字体大小。
    text-[#]：设置元素内部文本内容的颜色。

## 间隔

    gap-0：将 flex 容器内部的子元素之间的间隔设置为 0，即没有任何间隔。
    gap-x-x：设置元素的水平间隔为 x 个单位。
    gap-y-x：设置元素的垂直间隔为 x 个单位。
    inset-y-0：将元素的上下位置同时设置为 0，即紧贴着父元素的上下边缘
    inset-x-0：将元素的左右位置设置为 0，即紧贴着父元素的左右边缘。
    left-0：将元素的左边位置设置为 0，即紧贴着父元素的左边缘。
    right-0：将元素的右边位置设置为 0，即紧贴着父元素的右边缘。
    top-0：将元素的上边位置设置为 0，即紧贴着父元素的上边缘。
    bottom-0：将元素的底部位置设置为 0，即紧贴着父元素的底部边缘。

## other

    w-full：将元素的宽度设置为父元素的 100%，即占满整个可用空间
    rounded-full：将元素的边框设置为圆形。
    bg-[#]：设置元素的背景色。
    self-start：设置元素的垂直对齐方式为起始位置。
    hover:cursor-pointer：在鼠标悬停时，将光标设置为指针形状
    justify-center：将元素内部的子元素水平居中对齐。
