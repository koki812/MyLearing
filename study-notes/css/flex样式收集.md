# flex 弹性布局

.scss 样式文件
.container {
height: 100%;
flex-direction: column;
display: flex;
}

.footer {
width: 100%;
overflow: hidden;
height: 6.25rem;
}

.content {
flex-grow: 1;
overflow-y: auto;
}
container--->content|footer

# 布局

.default {
display: flex;
justify-content: space-between;
}
.iconWrap {
display: flex;
align-items: center;
flex-direction: column;
}

flex 布局，item 垂直排列，若 space-between 不齐可设置定宽

![Alt text](image.png)
