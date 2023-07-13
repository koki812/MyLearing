# Router

# 配置路由模式

父路由已经注册 import {BrowserRouter } from 'react-router-dom'，并且使用了<BrowserRouter></BrowserRouter>,在子组件和其它任何组件都不用再引入和在使用了
BrowserRouter 标签只用一次
tips：Link 实现组件切换时，实际上存在组件的销毁与创建，所以只有整体页面切换时才使用路由，可以让组件中得到的数据一直存在。

### router config

安装依赖(需要注意安装的依赖版本 routerV6)  
配置路由文件 routerconfig.tsx  
写相应的接口以便调用  
在对应的页面调用 router

### 路由重定向

问题：No routes matched location “/“
解决：

```
<Route path="/" element={<Navigate to="grocery" />} />
```

#### 重定向路由

重定向需使用 Route 中的 element 传入设置组件，而设置别的已经设置好的 Route 的 path, 显示效果就是该 path 对应的组件 element={<Navigate to="grocery" />}
子路由可以重定向到主路由，主路由中也可以重定向到子路由。

### 嵌套路由

在一个路由组件中嵌套另一个路由组件。可以使用 <Routes> 组件来定义路由，使用 <Route> 组件来定义具体的路由规则。在一个路由组件中嵌套另一个路由组件时，也可以在 <Route> 组件中使用 element 属性来指定要渲染的子组件。需要在<Route> 的主页面 map 中再遍历一下子路由。

例如：

```
 {routersConfig.map((routersItems: IRouterProps, index: number) => {
            return (
              <Route
                key={index}
                path={routersItems.path}
                element={routersItems.element}
              >
                {routersItems.children?.map(
                  (childItems: IRouterProps, key: number) => {
                    return (
                      <Route
                        key={key}
                        path={childItems.path}
                        element={childItems.element}
                      />
                    );
                  }
                )}
              </Route>
            );
          })}

```
