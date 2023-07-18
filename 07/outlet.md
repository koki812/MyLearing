# my learning

## Outlet组件

outlet 说的是嵌套路由，可以保证子路由共享父路由的界面而不会覆盖。
Outlet 组件，将其用于父组件中可以为子路由的元素占位，并最终渲染子路由的元素。  
大概就是说 outlet 是应用于嵌套路由的占位的。

```
  <div>
  <Link className={styles.link} to="/grocery/delivery">
  </div>
  <div>
  <Outlet />
  </div>
```

## NavLink组件 

navlink是一种特殊的类型，组件自动定义了两种属性能知道页面当前的路由属性是“active”还是“pending”。所以能根据NavLink的active和penging状态自定义应用   

```
<NavLink
                {...routerLinks}
                to={routerLinks.path}
                key={index}
                className={({ isActive }) =>
                  isActive ? `${styles.iconn}` : ``
                }
              >
                <i className={`iconfont ${routerLinks.icon} ${styles.icon}`} />
                <div className={styles.xbox}>{routerLinks.title}</div>
              </NavLink>

```

## useLocation()

useLocation的hook可以返回当前的location对象

```
{` ${styles.link} ${
            location.pathname === "/grocery/delivery" && styles.active
          }`}


```

## null 和 undefined 的区别

null: 是一个空值，被赋予的值为空，类型为对象  
undefined：未知的值，没有被赋予值或者对象属性不存在，类型为 undefined  
两者==但不=== 类型不一致

## 相等==和全等===

相等==

- ==两边值类型不一样时，先进行类型转换再比较
- ===两边类型不一致时，不进行类型转换，类型不同一定不等。

全等===

- 如果类型不同，不相等
- 如果两边都是数值型，并且是相同的值，那么相等
- 如果两边都是字符串，并且值一样也就是说每个位置的字符一样，那么相等
- 如果两边都是 true 或两边都是 false，那么相等
- 如果两边引用的是同一个对象，函数，地址等，那么相等
- 如果两边都是 Null 或者 两边都是 undefined，那么相等

## css 缩写

记忆点：上 右 下 左
eg：

- 1.上下左右的值不同

```
padding : top right bottom left；
```

- 2.上下左右的值相同

```
padding : 0px；
```

- 3.上下值相同

```
padding : 上下 右 左；
```

- 4.左右值相同

```
padding : 上 右左 下；
```

- 5.上下值相同 左右值相同

```
padding : 上下 右左；
```

# 运算符

## &&运算符

当前面的表达式为真时，则执行后面的表达式。相当于 if。

```
  {menu.topItem && <CardList list={menu.topItem}/>}
  {menu.bottomItem && <CardItem list={menu.bottomItem}/>}
```

## 三目运算符

当需要不是则是时，这里就用到了三目运算。相当于 if-else：

```
   {itemList.isicon ? (
                itemList.ismoney ? (
                  <div className={styles.txtWrap}>
                    <div className={styles.txt}>$88.8</div>
                    <i
                      className={`iconfont iconicon_next ${styles.nextIcon}`}
                    />
                  </div>
                ) : (
                  <div className={styles.txt}>$88.8</div>
                )
              ) : (
                <i className={`iconfont iconicon_next ${styles.nextIcon}`} />
              )}
```