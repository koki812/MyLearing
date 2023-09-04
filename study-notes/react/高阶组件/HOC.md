# 高阶组件

## 作用

1. **代码复用与逻辑抽象：** 高阶组件是实现代码复用的工具。通过将通用的逻辑从多个组件中提取出来，可以避免在各个组件中重复编写相似的代码，从而减少了代码冗余。

2. **分离关注点：** 高阶组件实现关注点的分离，将与业务无关的横切关注点（如认证、日志记录、数据获取）与组件的核心功能隔离开来。这样，组件可以更专注地解决特定的业务问题。

3. **功能扩展：** 高阶组件可以轻松地为组件添加新功能或修改现有功能，而不需要改动原始组件的代码。这使得能够更好地应对需求变化，同时保持代码的稳定性。

4. **组件组合：** 高阶组件可以嵌套使用，形成组件功能的层层叠加。这种组合性质可以构建出复杂而又高度可定制的组件，满足多样化的需求。

## 原理

1. **函数接收组件参数：** 高阶组件是一个函数，接收一个组件作为参数。这个被传入的组件可以是函数式组件或类组件。

2. **返回增强后的组件：** 高阶组件内部会创建一个新的组件，通常包裹着原始组件。这个新组件可能会添加新的状态、逻辑、props 等。

3. **共享逻辑和状态：** 高阶组件内部可以实现任何逻辑，例如状态管理、数据获取、事件处理等。这些逻辑可以在增强后的组件中共享和重用。

4. **Props 传递：** 高阶组件在返回的新组件中，除了保留原始组件的 props，还可以添加自己的 props。这意味着原始组件能够接收来自高阶组件的状态或方法。

## 使用步骤

1. **创建高阶组件函数：** 创建一个接受一个组件作为参数的函数，然后返回一个新的组件，这个函数就是高阶组件。

2. **在高阶组件中添加逻辑：** 在高阶组件内部，可以添加任何想要共享的逻辑、状态、数据获取等。这些逻辑将会影响被包装的组件。

```jsx
const withCounter = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    const [count, setCount] = useState(0);

    const increment = () => {
      setCount(count + 1);
    };

    return <WrappedComponent count={count} increment={increment} {...props} />;
  };

  return EnhancedComponent;
};
```

3. **创建被包装组件：** 在高阶组件外部，创建一个普通的 React 组件，这是你想要增强的目标组件。

```jsx
const Counter = ({ count, increment }) => {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};
```

4. **使用高阶组件：** 使用高阶组件来增强你的目标组件。将目标组件作为参数传递给高阶组件，然后将高阶组件返回的新组件渲染出来。

```jsx
const EnhancedCounter = withCounter(Counter);

const App = () => {
  return (
    <div>
      <EnhancedCounter />
    </div>
  );
};
```

## 计数器高阶组件用法

```tsx
import React, { useState } from "react";

// 高阶组件函数
const withCounter = (
  WrappedComponent: React.ComponentType<{
    count: number;
    increment: () => void;
  }>
) => {
  const EnhancedComponent: React.FC = (props) => {
    const [count, setCount] = useState<number>(0);

    const increment = () => {
      setCount(count + 1);
    };

    return <WrappedComponent count={count} increment={increment} {...props} />;
  };

  return EnhancedComponent;
};

// 被包装的组件
const Counter: React.FC<{ count: number; increment: () => void }> = ({
  count,
  increment,
}) => {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

// 使用高阶组件增强的组件
const EnhancedCounter = withCounter(Counter);

// 主应用组件
const App: React.FC = () => {
  return (
    <div>
      <EnhancedCounter />
    </div>
  );
};

export default App;
```
