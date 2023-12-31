# tailwind 初了解

-   margin
    ml-x：设置元素的左边距为 x 个单位。
    mr-x：设置元素的右边距为 x 个单位。
    mt-x：设置元素的上外边距为 x 个单位。
    mb-x：设置元素的下外边距为 x 个单位。

-   height
    h-screen：设置元素的高度为屏幕的高度。
    h-x：设置元素的高度为 x 个单位。

-   flex
    flex：将元素设置为弹性布局，使其子元素可以自动排列。
    flex-x：将元素的弹性伸缩比例设置为 x，使其占据剩余的可用空间。
    flex-wrap：设置元素的子元素可以换行排列。
    flex-col：设置元素的子元素垂直排列。

-   text
    text-center：将元素内部的文本内容居中对齐。
    text-lg：设置元素内部的文本内容为大号字体大小。
    text-[#]：设置元素内部文本内容的颜色。

-   间隔
    gap-0：将 flex 容器内部的子元素之间的间隔设置为 0，即没有任何间隔。
    gap-x-x：设置元素的水平间隔为 x 个单位。
    gap-y-x：设置元素的垂直间隔为 x 个单位。
    inset-y-0：将元素的上下位置同时设置为 0，即紧贴着父元素的上下边缘
    inset-x-0：将元素的左右位置设置为 0，即紧贴着父元素的左右边缘。
    left-0：将元素的左边位置设置为 0，即紧贴着父元素的左边缘。
    right-0：将元素的右边位置设置为 0，即紧贴着父元素的右边缘。
    top-0：将元素的上边位置设置为 0，即紧贴着父元素的上边缘。
    bottom-0：将元素的底部位置设置为 0，即紧贴着父元素的底部边缘。

w-full：将元素的宽度设置为父元素的 100%，即占满整个可用空间
rounded-full：将元素的边框设置为圆形。
bg-[#]：设置元素的背景色。
self-start：设置元素的垂直对齐方式为起始位置。
hover:cursor-pointer：在鼠标悬停时，将光标设置为指针形状
justify-center：将元素内部的子元素水平居中对齐。

# tailwindcss

-   使用负值
    要使用负的上/右/下/左值，请在类名前面加上破折号以将其转换为负值。eg：`-left-4 -top-4`
    负 z-index 值，请在类名称前面加上破折号以将其转换为负值。eg：`-z-50`

-   使用逻辑属性
    使用 start-*和 end-*实用程序设置`inset-inline-start`和 `inset-inline-end`逻辑属性，它们根据文本方向映射到左侧或右侧。
    flex-initial 允许弹性项目收缩但不增长，同时考虑到其初始大小

-   任意值
    需要使用一次性 flex 值，而该值在主题中包含没有意义，用方括号使用任意值动态生成属性 eg：`flex-[2_2_0%]`
