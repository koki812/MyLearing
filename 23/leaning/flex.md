## flex 布局

### flex 弹性布局

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

### flex 布局 tips

由于文字长度 不一导致 使用 justify-content: space-between 之后,样式不一.可以给整个包括 div 并固定宽高
