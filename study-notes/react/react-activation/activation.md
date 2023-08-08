# react-activation

## 用法

1. react-activation 安装

```
yarn add react-activation
```

2. 在 index 文件引入并使用 `AliveScope` 包裹

```ts
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
        <AliveScope>
            <App />
        </AliveScope>
    </BrowserRouter>
);
reportWebVitals();
```

3. 在路由文件中用`KeepAlive` 包裹需要保持状态的组件

```ts
children: [
  {
    path: "/grocery/delivery",
    element: (
      <KeepAlive cacheKey="Delivery">
        <Delivery />
      </KeepAlive>
    ),
    title: "Delivery",
  },
  {
    path: "/grocery/pickup",
    element: (
      <KeepAlive cacheKey="PickUp">
        <PickUp />
      </KeepAlive>
    ),
    title: "PickUp",
  },
],
```

-   cacheKey

    `<KeepAlive>` 声明全局唯一且不变的 cacheKey 属性，以确保缓存的稳定性

4. 注意事项

    - 不要根组件使用 `<React.StrictMode />` 严格模式

    - (React v18+) 不要使用 ReactDOMClient.createRoot, 使用 ReactDOM.render

    - 通过 KeepAlive 包裹后，会新增 dom，可能会对对布局高度有影响，可以根据需要设置对应 css 高度

        ```css
        .ka-wrapper,
        .ka-content {
            height: 100%;
        }
        ```

## 卡位

### 报错内容

[location.pathname];报错 react.development.js:209 警告：无法在尚未安装的组件上调用 setState。
这是一个空操作，但它可能表明您的应用程序中存在错误。 相反，直接分配给 `this.state` 或定义一个 `state = {};`
ProviderBridge 组件中具有所需状态的类属性。

```
[location.pathname];报错 react.development.js:209 Warning: Can't call setState on a component that is not yet mounted.
This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};`
class property with the desired state in the ProviderBridge component.
```

#### 解决方法：去掉`<React.StrictMode />`严格模式

#### 造成原因

-   react-activation 作用：

    降低初始化和更新过程的开销，提高应用的加载速度和响应性
    仅在必要时初始化组件，避免每次渲染都进行初始化

-   `<React.StrictMode />`的作用：

    React 的开发工具，检测潜在问题并引发额外的警告
    执行额外的检查和验证，有助于提高代码质量，发现潜在问题

-   二者可能的冲突情况：

    在初始化阶段可能发生冲突，严格模式会故意执行两次生命周期方法和副作用，可能与优化工具的预期行为相冲突

-   使用建议

    1. 建议避免在根组件中使用`<React.StrictMode />`，这不意味着严格模式有问题，而是为了规避潜在的冲突

    2. 如需保留 `<React.StrictMode />`的好处，可选择在根组件之外的部分使用

## README_CN 学习链接

<https://github.com/CJY0208/react-activation/blob/master/README_CN.md>
