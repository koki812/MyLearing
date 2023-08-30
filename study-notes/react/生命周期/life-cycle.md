# React 组件的生命周期

## 生命周期的状态

- 三个状态
  
  **Mounting(挂载)**：已插入真实 DOM      
  **Updating(更新)**：正在被重新渲染    
  **Unmounting(卸载)**：已移出真实 DOM      

在 React 中，组件的生命周期是指组件从被创建到被销毁的整个过程中，生命周期方法描述了组件的创建、更新和卸载过程，每个方法都在特定的阶段被调用

## 挂载阶段（Mounting Phase）

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

1. **constructor(props)**：组件的构造函数，在组件被创建时调用，用于初始化状态和绑定方法

2. **static getDerivedStateFromProps(props, state)**：这个静态方法在组件实例化时和每次更新时都会被调用，它接收新的 props 和当前的 state 作为参数，返回一个对象来更新 state，或者返回 null 来表示不需要更新。在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用，可以根据传入的 props 更新组件的 state。

3. **render()**：渲染方法，返回一个 React 元素，是类组件唯一必须实现的方法

4. **componentDidMount()**：在组件挂载到 DOM 后立即调用。通常用于执行副作用，比如数据获取、订阅等操作

## 更新阶段（Updating Phase）

当组件的 props 或 state 发生变化时，组件更新的生命周期调用顺序如下：

1. **static getDerivedStateFromProps(props, state)**：在更新阶段也会调用，在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用，它在更新发生前允许你根据新的 props 来更新 state

2. **shouldComponentUpdate(nextProps, nextState)**：在更新发生前被调用也就是在渲染执行之前被调用，用于判断是否需要重新渲染组件，默认返回 true。通过比较新旧 props 和 state，可以进行性能优化

3. **render()**： class 组件中唯一必须实现的方法。负责根据当前的 props 和 state 返回一个 React 元素

4. **getSnapshotBeforeUpdate(prevProps, prevState)**：在 render 之后、更新实际渲染之前调用也就是最近一次渲染输出（提交到 DOM 节点）之前调用，可以在这里获取 DOM 元素的信息，常在组件更新前需要获取 DOM 信息时使用，常用于处理滚动位置

5. **componentDidUpdate(prevProps, prevState, snapshot)**：在组件更新后被调用。通常用于处理更新后的副作用，例如数据更新后的操作

## 卸载阶段（Unmounting Phase）

当组件从 DOM 中移除时会调用如下方法：

- **componentWillUnmount()**：在组件即将被销毁及卸载之前直接调用。通常用于执行一些清理操作，比如取消订阅或清除定时器

## 错误处理阶段（Error Handling Phase）

1. **static getDerivedStateFromError(error)**：在子组件抛出错误时调用，返回一个用于更新 state 的对象

2. **componentDidCatch(error, info)**：在子组件抛出错误后调用，用于记录错误信息或发送错误报告

![life-cycle](image.png)

## 用例说明

```ts
import React, { useState, useEffect } from "react";

const FunctionComponentExample = (props) => {
  // 使用 useState 钩子来管理状态
  const [count, setCount] = useState(0);

  // `useEffect` 相当于 componentDidMount 和 componentDidUpdate
  // 使用 `useEffect` 来处理副作用操作和生命周期
  useEffect(() => {
    console.log("组件已经挂载或更新。");

    // 返回的函数将在组件即将卸载时执行
    return () => {
      console.log("组件即将被销毁。");
    };
  }, []); // 第二个参数是空数组，表示只在挂载和卸载时执行

  // 自定义方法，用于增加计数
  const incrementCount = () => {
    setCount(count + 1);
  };

  // 渲染组件内容
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>当前计数：{count}</p>
      <button onClick={incrementCount}>增加计数</button>
    </div>
  );
};

export default FunctionComponentExample;
```
