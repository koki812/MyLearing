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

## css 常用伪类

-   :hover - 当鼠标悬停在元素上时应用样式。
-   :active - 当元素被激活时应用样式。
-   :visited - 当链接已被访问过时应用样式。
-   :focus - 当元素获得焦点时应用样式。
-   :first-child - 选择元素的第一个子元素。
-   :last-child - 选择元素的最后一个子元素。
-   :nth-child(n) - 选择元素的第 n 个子元素。
-   :nth-of-type(n) - 选择元素的第 n 个指定类型的子元素。
-   :first-of-type - 选择元素的第一个指定类型的子元素。
-   :last-of-type - 选择元素的最后一个指定类型的子元素。
-   :root - 选择文档的根元素。
-   :empty - 选择没有子元素的元素。
-   :checked - 选择被选中的表单元素。
-   :disabled - 选择禁用的表单元素。
-   :enabled - 选择启用的表单元素。
-   :required - 选择必填的表单元素。
-   :optional - 选择可选的表单元素。
