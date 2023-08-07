# React Router

## 路径匹配和动态段

使用 path 定义与 URL 匹配的路径模式       
动态段使用 : 开头，允许从 URL 中获取参数       
可以在路径末尾使用 ? 添加可选部分        
/\* 结尾的路径模式可以匹配任何字符          

## Layout Routes

使用 `<Outlet />`布局路由在每个子路由中渲染布局         
index 属性定义索引路由，类似于默认子路由          

## 大小写匹配与加载器

使用 caseSensitive 指定路由是否区分大小写         
使用 loader 定义路由加载器，在渲染之前提供数据给路由元素          
参数从动态段中解析并传递给加载器           

## 路由操作和渲染

使用 action 触发路由操作，如表单提交        
使用 element 或 Component 渲染路由匹配的 React 元素或组件         
使用 errorElement 或 ErrorBoundary 处理路由渲染过程中的异常            

## lazy 和数据加载

使用 lazy 异步解析路由非匹配部分，支持代码分割          
useLoaderData 用于从加载器中提取数据             

## Pending Navigation UI 和 Skeleton UI

提供加载中的用户反馈，维持用户体验         
使用`<Suspense>`实现骨架屏 UI，无需等待数据加载        

## 钩子函数

使用 useParams 获取路由中的参数           
使用 useMatch 返回给定路径相对于当前位置的路由匹配数据          
使用 useFetcher 从加载器中提取数据            

## 错误处理

React Router 自动处理大多数应用程序错误，包括渲染、加载数据和更新数据过程中的错误              
当错误发生时，可以使用 errorElement 或 ErrorBoundary 渲染错误的元素/组件           
