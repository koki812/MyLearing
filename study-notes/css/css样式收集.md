# 浏览器滚动条隐藏

::-webkit-scrollbar {
display: none;
}

# css 缩写

记忆点：上 右 下 左
eg：

-   1.上下左右的值不同

```
padding : top right bottom left；
```

-   2.上下左右的值相同

```
padding : 0px；
```

-   3.上下值相同

```
padding : 上下 右 左；
```

-   4.左右值相同

```
padding : 上 右左 下；
```

-   5.上下值相同 左右值相同

```
padding : 上下 右左；
```

## 标识选择

在运用同一组件需要不同样式的情况下,可以给定标识符进行判断给予同一组件不同样式
例

```TypeScript
<div
  key={index}
  className={
  itemList.isicon ? `${styles.itemWrap}` : `${styles.itemBox}`
  }
/>

```

也可以对同一位置选择 display 不同内容

```TypeScript
{itemList.ismoney ? (
  <div className={styles.txtWrap}>
    <div className={styles.txt}>$88.8</div>
    <i className={`iconfont iconicon_next ${styles.nextIcon}`} />
  </div>
) : (
  <i className={`iconfont iconicon_next ${styles.nextIcon}`} />
)}


```
