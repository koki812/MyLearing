## Outlet 组件

outlet 说的是嵌套路由，可以保证子路由共享父路由的界面而不会覆盖。
Outlet 组件，将其用于父组件中可以为子路由的元素占位，并最终渲染子路由的元素。  
大概就是说 outlet 是应用于嵌套路由的占位的。

```TypeScript
  <div>
  <Link className={styles.link} to="/grocery/delivery">
  </div>
  <div>
  <Outlet />
  </div>
```

## NavLink 组件

navlink 是一种特殊的类型，组件自动定义了两种属性能知道页面当前的路由属性是“active”还是“pending”。所以能根据 NavLink 的 active 和 penging 状态自定义应用

```TypeScript
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

## children 组件

children 组件标签之间的内容会被当做一个特殊的属性 props.children 传入组件内容
也可以自定义结构的组件的常用形式。

-   children
-   传递函数
-   传递子组件

```TypeScript
export const UserCard = ({ children }: CardProps) => {
  return (
    <div className={styles.default}>
      <div className={styles.cardWrap}>{children}</div>
    </div>
     ) ;
}

```
