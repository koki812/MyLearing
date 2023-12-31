# 运算符

## &&运算符

当前面的表达式为真时，则执行后面的表达式。相当于 if。

```TypeScript
  {menu.topItem && <CardList list={menu.topItem}/>}
  {menu.bottomItem && <CardItem list={menu.bottomItem}/>}
```

## 三目运算符

当需要不是则是时，这里就用到了三目运算。相当于 if-else：

```TypeScript
           {itemList.isicon ? (
              itemList.ismoney ? (
                <div className={styles.txtWrap}>
                  <div className={styles.txt}>$88.8</div>
                  <i className={`iconfont iconicon_next ${styles.nextIcon}`} />
                </div>
              ) : (
                <div className={styles.txt}>$88.8</div>
              )
            ) : (
              <i className={`iconfont iconicon_next ${styles.nextIcon}`} />
            )}
```

## 指数运算符（`**`）

指数运算符（`**`）：
指数运算符的特点是右结合，多个指数运算符连用时，是从最右边开始计算的,eg：

```
2 ** 3 ** 2 | 2 ** (3 ** 2)
```

## 链判断运算符（`?.`）

`?.`运算符，直接在链式调用的时候判断，左侧的对象是否为 null 或 undefined。如果是的，就不再往下运算，而是返回 undefined

链判断运算符?.的三种写法

-   `obj?.prop` // 对象属性是否存在
-   `obj?.[expr]`// 对象属性是否存在
-   `func?.(...args)` // 函数或对象方法是否存在

## Null 判断运算符（`?？`）

只有运算符`?？`左侧的值为 null 或 undefined 时，才会返回右侧的值。eg： `const enable = props.enabled ?? true;`

## 逻辑赋值运算符（`||=`、`&&=`、`??=`）

`||=`、`&&=`、`??=`相当于先进行逻辑运算，然后根据运算结果，再视情况进行赋值运算。可以为变量或属性设置默认值。

```es6
x ||= y; // 或赋值运算符

x || (x = y); // 等同于

x &&= y; // 与赋值运算符

x && (x = y); // 等同于

x ??= y; // Null 赋值运算符

x ?? (x = y); // 等同于
```
