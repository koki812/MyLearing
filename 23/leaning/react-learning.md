## map 数组的运用

以数组为格式对组件进行渲染,减少代码冗余  
1、map()方法内的 JSX 元素需要指定 key 值  
2、key 值需要唯一,且不能改变  
所以使用 map 遍历时,需要给子元素添加一个 key,作为唯一的标识,而且 key 值必须要连续

## 父子组件传 props

```
export const Items = (props: ItemsProps) => {
    const { list } = props;
    return（
    ...
    {list.map((itemList: ItemProps, index: number) => {})}
    ...
    ）
}
```

```
<Items list={itemsArray} />
```

## children 组件

children 组件标签之间的内容会被当做一个特殊的属性 props.children 传入组件内容
也可以自定义结构的组件的常用形式。

- children
- 传递函数
- 传递子组件

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

也可以对同一位置选择 display 不同内容

```
{itemList.ismoney ? (
                <div className={styles.txtWrap}>
                  <div className={styles.txt}>$88.8</div>
                  <i className={`iconfont iconicon_next ${styles.nextIcon}`} />
                </div>
              ) : (
                <i className={`iconfont iconicon_next ${styles.nextIcon}`} />
              )}


```
