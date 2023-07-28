# rem 自适应

一. 动态的计算然后去设置 html 的字体大小(font-size)；然后页面大小根据一个公式去规范元素的大小  
二. 根据元素的宽，高的取值，同比例换算为 rem 单位的值  
例:在 scss 中设置 html {
font-size: calc(100vw / 3.75);
}
