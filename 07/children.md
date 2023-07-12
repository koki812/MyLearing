# 7-12Learning 
## children组件
children组件标签之间的内容会被当做一个特殊的属性props.children传入组件内容
也可以自定义结构的组件的常用形式。
 * children
 * 传递函数
 * 传递子组件
 
```
export const UserCard = ({ children }: CardProps) => {
  return (
    <div className={styles.default}>
      <div className={styles.cardWrap}>{children}</div>
    </div>
  );
};

```

## 标识选择
在运用同一组件需要不同样式的情况下,可以给定标识符进行判断给予同一组件不同样式
例

```
<div
            key={index}
            className={
              itemList.isicon ? `${styles.itemWrap}` : `${styles.itemBox}`
            }
          ></div>

```
也可以对同一位置选择display不同内容

```
{itemList.ismoney ? (
                <div className={styles.txtWrap}>
                  <div className={styles.txt}>$88.8</div>
                  <i className={`iconfont iconicon_next ${styles.nextIcon}`} />
                </div>
              ) : (
                <i className={`iconfont iconicon_next ${styles.nextIcon}`} />
              )


```
### fleX布局tips
由于文字长度不一导致使用justify-content: space-between之后,样式不一.可以给整个包括div并固定宽高