# `<Route>`类型声明

```typescript
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  errorElement?: React.ReactNode | null;
  ErrorBoundary?: React.ComponentType | null;
  handle?: RouteObject["handle"];
  shouldRevalidate?: ShouldRevalidateFunction;
  lazy?: LazyRouteFunction<RouteObject>;
```

## path

与 URL 匹配的路径模式

### 动态段

如果路径段以 开头，:那么它就成为“动态段”
一条路由路径中拥有多个动态段：
动态段不能是“部分”的："/teams/:teamId"

### 可选部分

?可以通过在路段末尾添加 "/project/task?/:taskId"

### Splats

如果路由路径模式以 /\* 结尾，它将匹配后面的任何字符，包括/字符。"/files/\*"

## Layout Routes

`<Outlet />`布局路由与每个子路由的 prop 一起渲染

## index

确定该路由是否为索引路由。索引路由在其父级 URL 处呈现到其父级 Outlet（类似于默认子路由）
`<Route index element={<Index />} />`

## caseSensitive

指示路由是否匹配大小写：`<Route caseSensitive element={<CaseSensitive />} />`

## loader

路由加载器在路由渲染之前被调用，每个路由都可以定义一个“加载器”函数，以便在渲染之前向路由元素提供数据。
当用户在应用程序中导航时，下一个匹配的路由分支的加载器将被并行调用，并且它们的数据通过 useLoaderData.

### params

路由参数从动态段中解析并传递给加载器,对于确定要加载的资源很有用

```ts
loader: async ({ params }) => {
    return fetch(`/api/teams/${params.teamId}.json`);
};
```

### request

将请求发送到加载器

```ts
loader({ request }) {}
```

## action

当提交从表单、获取器或提交发送到路由时，将调用路由操作。

## element/Component

当路由与 URL 匹配时要渲染的 React 元素/组件。

如果创建 React 元素，使用 element：

`<Route path="/for-sale" element={<Properties />} />`
否则，使用 Component, React Router 创建 React 元素：

`<Route path="/for-sale" Component={Properties} />`

## errorElement/ErrorBoundary

当路由在渲染时抛出异常时，在 loader 或 action，React 元素/组件将渲染,不是正常的 element/ Component。

如果自己创建 React 元素，使用 errorElement：

`<Route errorElement={ <ErrorBoundary /> } />`
否则，使用 ErrorBoundaryReact ,React Router 创建 React 元素：

`<Route ErrorBoundary={ErrorBoundary} />`

## handle

任何特定于应用程序的数据。

## lazy

为了保持应用程序包较小并支持路由的代码分割，每个路由可以提供一个异步函数来解析路由定义的非路由匹配部分

每个 lazy 函数通常都会返回动态导入的结果,然后在惰性路由模块中，导出要为路由定义的属性

## Pending Navigation UI

当用户在应用程序中导航时，下一页的数据会在页面呈现之前加载。在此期间提供用户反馈非常重要，这样应用程序就不会感觉没有响应。

```ts
export const Root = () => {
    const navigation = useNavigation();
    return <div>{navigation.state === "loading" && <GlobalSpinner />}</div>;
};
```

## Skeleton UI with `<Suspense>`

无需等待下一页的数据， defer 在数据加载时立即将 UI 翻转到带有占位符 UI 的下一个屏幕。

### defer

允许通过传递 Promise 而不是解析值来推迟从加载器返回的值。

## useParams Hooks

该 useParams 钩子返回当前 URL 中与`<Route path>`. 子路由继承父路由的所有参数。

## useMatch Hooks

返回给定路径相对于当前位置的路线的匹配数据。

## useFetcher

## 错误处理

绝大多数应用程序错误都是由 React Router 自动处理的。它将捕获在以下情况下引发的任何错误：

渲染
加载数据中
更新数据

这几乎是应用程序中的所有错误，除了事件处理程序 (`<button onClick>`) 或中引发的错误 useEffect。React Router 应用程序往往两者都很少。当抛出错误时，不会渲染路由的 element，而是 errorElement 渲染 。
