# react-activation

## 报错内容

[location.pathname];报错 react.development.js:209 警告：无法在尚未安装的组件上调用 setState。
这是一个空操作，但它可能表明您的应用程序中存在错误。 相反，直接分配给 `this.state` 或定义一个 `state = {};`
ProviderBridge 组件中具有所需状态的类属性。

```
[location.pathname];报错 react.development.js:209 Warning: Can't call setState on a component that is not yet mounted.
This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};`
class property with the desired state in the ProviderBridge component.
```

### 解决方法：去掉`<React.StrictMode />`严格模式

### 造成原因

react-activation 是一个用于优化 React 应用性能的工具

它的目标是减少在初始化和更新过程中的不必要工作，从而提高应用的加载速度和响应性和确保组件只在需要时进行初始化，而不是在每次渲染时都进行初始化。

`<React.StrictMode />`是 React 提供的一个开发工具

用于在开发环境中检测应用中的潜在问题，并在一些情况下引发额外的警告。在严格模式下，React 会进行一些额外的检查和验证，以帮助开发者发现潜在的问题，从而提高代码质量。

`<React.StrictMode />`可能会对某些优化工具（如 react-activation）产生一些负面影响，尤其是在初始化阶段。

这是因为严格模式会故意执行两次某些生命周期方法和副作用（如渲染两次），以便捕获潜在的问题。这可能与优化工具的预期行为相冲突，因为优化工具可能会尝试避免不必要的初始化和副作用。

因此，react-activation 在使用它的情况下避免在根组件中使用 `<React.StrictMode />`。

不是说严格模式本身是错误的，在使用了特定优化工具时，某些情况下可能会出现冲突，导致预期之外的行为或警告。

在使用 react-activation 并且希望保留 `<React.StrictMode />`的好处，

可以考虑在根组件之外的部分使用严格模式，同时获得性能优化和开发时的额外检查。

只将严格模式应用于特定的开发和测试环境，而在生产环境中不使用严格模式。

使用优化工具时，根据具体情况权衡使用 `<React.StrictMode />`，以确保在性能和开发体验之间取得平衡。

## 使用 react-activation 注意事项

1. 不要使用`<React.StrictMode />`严格模式
2. (React v18+) 不要使用 ReactDOMClient.createRoot, 而是使用 ReactDOM.render, #225 (comment)

## README_CN

<https://github.com/CJY0208/react-activation/blob/master/README_CN.md>
