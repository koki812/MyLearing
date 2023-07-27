# css 2D 变换

transform 属性，2D 转换方法：

    1. translate()：用于指定元素在水平和垂直方向上的平移距离。

        translate(x, y)：（ 正值向下平移，负值向上平移 ）

    2. rotate()：给定的角度顺时针或逆时针旋转元素（ 顺时针为正数，逆时针为负数（ 单位 deg ）

    3. scale()：用于指定元素在水平和垂直方向上的缩放比例（ scaleX() / scaleY() ）

        scale(x, y)：（ 1 为原始大小，小于 1 为缩小，大于 1 为放大 ）

    4. skew(): 用于指定元素在水平和垂直方向上的倾斜角度 ( skewX() / skewY() )

        skew(x, y): ( 正值表示向右倾斜，负值表示向左倾斜 )

    5. matrix()方法将所有二维变换方法合二为一。

        六个参数如下：matrix(scaleX()、skewY()、skewX()、scaleY()、translateX()、translateY())

# css 3D 变换

transform 属性，3D 转换方法：
    1. rotateX(): 将元素绕其 X 轴旋转给定角度
    2. rotateY(): 将元素绕其 Y 轴旋转给定角度
    3. rotateZ(): 将元素绕其 Z 轴旋转给定角度

# css 过渡

创建过渡效果: 1. 要添加效果的 CSS 属性 2. 效果的持续时间   

如果未指定持续时间部分，则过渡将不起作用，默认值为 0。   

1. transition   
2. transition-delay: 过渡效果的延迟（以秒为单位）   
3. transition-duration: 元素过渡效果的持续时间   
4. transition-property: 指定过渡效果应用于哪些 CSS 属性   

-   none: 表示没有属性会应用过渡效果。
    all: 表示所有属性都会应用过渡效果。
    property: 指定一个或多个属性，以逗号分隔，这些属性会应用过渡效果。

5. transition-timing-function: 指定过渡效果的速度曲线。
    - 转换计时函数属性具有以下值：
      ease- 一个缓慢开始，然后快速，然后缓慢结束的过渡效果（默认值）
      linear- 从开始到结束具有相同速度的过渡效果
      ease-in- 缓慢启动的过渡效果
      ease-out- 缓慢结束的过渡效果
      ease-in-out- 缓慢开始和结束的过渡效果
      cubic-bezier(n,n,n,n)- 在三次贝塞尔函数中定义自己的值

# css 动画

动画让元素逐渐从一种样式变为另一种样式。,使用 CSS 动画，必须为动画指定一些关键帧。,关键帧保存元素在特定时间将具有的样式。

   @keyframes 规则：动画会在某些时间逐渐从当前样式更改为新样式，动画正常工作，必须将动画绑定到元素

    1. animation-name：一个或多个动画的名称，定义了应用于元素的动画效果的名称
    2. animation-duration： 定义动画需要多长时间完成。未指定该属性，则不会发生动画，默认值为 0s
    3. animation-delay： 动画开始的延迟时间（ 可以为负值 ）
    4. animation-iteration-count：动画应运行的次数（ “infinite”使动画永远持续 ）
    5. animation-direction：动画是否应向前（正常播放）、向后或交替循环播放
    6. animation-timing-function： 指定动画的速度曲线
    7. animation-fill-mode：动画未播放时（开始前、结束后或两者）时目标元素的样式。
    8. animation ：简写属性 （ name，duration，timing-function，delay，iteration-count，direction ）

# tailwindcss

-   使用负值
    要使用负的上/右/下/左值，请在类名前面加上破折号以将其转换为负值。eg：`-left-4 -top-4`
    负 z-index 值，请在类名称前面加上破折号以将其转换为负值。eg：`-z-50`

-   使用逻辑属性
    使用 start-*和 end-*实用程序设置`inset-inline-start`和 `inset-inline-end`逻辑属性，它们根据文本方向映射到左侧或右侧。
    flex-initial 允许弹性项目收缩但不增长，同时考虑到其初始大小

-   任意值
    需要使用一次性 flex 值，而该值在主题中包含没有意义，用方括号使用任意值动态生成属性 eg：`flex-[2_2_0%]`
