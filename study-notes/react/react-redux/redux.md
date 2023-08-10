# Redux

Redux 是一个状态管理库，用于在应用中管理全局状态。
基于单一状态树（单一源 of truth）的概念，将应用的状态存储在一个可预测的、不可变的数据结构中。

## 核心概念

-   Action
    描述应用中发生的事件，是一个带有 type 属性的普通对象，可以携带数据

-   Reducer
    处理不同类型的 Action，更新状态，并返回新的状态对象。Reducer 是一个纯函数

-   Store
    存储应用的状态，提供了 API 来访问状态、分发 Action、注册监听器等

## Redux 函数

-   Action

    1. 创建 Action：使用普通对象来创建 Action
    2. Action Creators：使用函数来创建 Action

-   Reducer
    创建 Reducer：使用纯函数来处理 Action，更新状态，并返回新的状态对象

-   Store：

    1. 创建 Store：使用 createStore 函数来创建 Store，并传入根 Reducer
    2. 获取状态：使用 store.getState() 获取当前的状态
    3. 分发 Action：使用 store.dispatch(action) 分发 Action，从而触发状态更新
    4. 监听状态变化：使用 store.subscribe(listener) 注册监听器，在状态变化时执行回调函数

## React-Redux 钩子函数

-   useSelector：用于在组件中选择状态的部分数据，接受一个函数来选择状态
-   useDispatch：用于获取分发 Action 的函数，，将返回一个分发函数
-   useStore：用于获取 Redux Store 的引用，可以在组件中访问 Store 的功能

## React Redux

将 Redux 与 React 结合的官方库，简化了在 React 应用中的状态管理

-   Provider：React Redux 提供的组件，用于在整个应用中注入 Redux 的 Store

-   connect：用于连接 React 组件和 Redux Store，使得组件能够访问状态和操作

## Redux Toolkit 概述

Redux Toolkit 是 Redux 官方推荐的工具包，旨在简化 Redux 的使用，并提供一些标准化的模式来处理常见的状态管理任务

### 核心函数

-   configureStore
    用于创建 Redux Store，封装了 Redux Store 的一些配置，如 reducer、middleware 和 DevTools 集成
    参数：

    1. reducer（必需）：根 reducer，是一个合并了多个子 reducer 的对象。可以使用 combineReducers 函数将多个 reducer 合并为一个根 reducer
    2. middleware（可选）：一个数组，用于添加 Redux 中间件。中间件可以处理异步操作、日志记录等
    3. devTools（可选）：一个布尔值，指示是否启用 Redux DevTools 浏览器扩展。开发环境中通常会启用，以方便调试和监视状态变化
    4. preloadedState（可选）：一个对象，表示预加载的初始状态
    5. enhancers（可选）：一个数组，用于添加 Redux 增强器。增强器可以扩展 Redux Store 的功能

        ```ts
        import { configureStore } from "@reduxjs/toolkit";
        import rootReducer from "./reducers"; // 导入根 reducer

        const store = configureStore({
            reducer: rootReducer, // 根 reducer
            middleware: [], // 中间件数组
            devTools: true, // 是否启用 Redux DevTools 浏览器扩展
            preloadedState: {}, // 预加载的初始状态
            enhancers: [], // 增强器数组
        });

        export default store;
        ```

-   createSlice：
    用于创建 Reducer 和相关的 Action Creators，自动生成标准的 Redux Reducer 和 Action
    参数：

    1. name：slice 的名称，将用于生成 action 的 type 字段
    2. initialState：初始状态对象，包含了 value 属性初始化为 0
    3. reducers：一个包含 reducer 函数的对象，每个函数处理一个特定类型的 action，用于更新状态

        ```ts
        import { createSlice } from "@reduxjs/toolkit";

        const counterSlice = createSlice({
            name: "", // slice 的名称，用于生成 action 的 type
            initialState: { value: 0 }, // 初始状态
            reducers: {},
        });
        ```

-   createAsyncThunk：
    用于处理异步操作，生成可以处理异步逻辑的 Thunk Action，简化了异步数据获取和更新的过程

-   createEntityAdapter：
    用于管理实体（例如数据库中的记录），提供了一些标准化的方法来操作实体，如添加、更新、删除等

-   createReducer：
    提供了一种更灵活的方式来创建 Reducer，允许使用对象形式定义 Action 和对应的处理函数

## Redux Demo

```ts
// web/src/redux/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState: { count: number } = {
    count: 0,
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
    },
});
```

```ts
// web/src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
    },
});
```

```ts
// web/src/redux/counter.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { counterSlice } from "./counterSlice";
import { store } from "./store";

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const CounterDemo: React.FC = () => {
    const { increment, decrement } = counterSlice.actions;

    const count = useSelector((state: RootState) => state.counter.count);

    const dispatch: AppDispatch = useDispatch();

    return (
        <div>
            <div>Count: {count}</div>
            <button onClick={() => dispatch(increment())}>加一</button>
            <button onClick={() => dispatch(decrement())}>减一</button>
        </div>
    );
};
```

```ts
// web/src/index.tsx
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
```

## connect 连接 React 组件和 Redux Store

-   使用

1. 方便地访问和操作状态：通过 connect，可以将 Redux Store 中的状态映射到组件的 props 中，使得在组件中可以轻松地访问和操作这些状态。

2. 使用 mapStateToProps 和 mapDispatchToProps：使用这两个函数，可以明确地指定哪些状态需要被映射到组件的 props 中，以及哪些操作需要被映射到组件的 props 中，从而使组件可以直接调用这些操作来触发状态更新。

3. 自动触发更新：connect 会自动监听 Redux Store 中的状态变化，当状态发生变化时，会自动更新组件，无需手动编写代码来监听状态变化。

-   不使用

1. 需要手动访问状态：在组件中无法直接访问 Redux Store 中的状态，需要手动通过 store.getState() 方法来获取状态。

2. 手动订阅和取消订阅：如果需要监听状态的变化以便更新组件，需要手动订阅状态的变化，并在组件卸载时取消订阅，以防止内存泄漏。

3. 手动分发操作：如果需要触发状态的更新，需要手动分发 Redux action，通常需要手动创建 action creators，并在组件中调用它们。

```ts
// web/src/redux/counter.tsx
import React from "react";
import { connect } from "react-redux";
import { counterSlice } from "./counterSlice";
import { store } from "./store";

type RootState = ReturnType<typeof store.getState>;

const { increment, decrement } = counterSlice.actions;

const mapStateToProps = (state: RootState) => ({
    count: state.counter.count,
});

const DispatchProps = {
    increment,
    decrement,
};

interface CounterProps {
    count: number;
    increment: () => void;
    decrement: () => void;
}

const Counter: React.FC<CounterProps> = ({ count, increment, decrement }) => {
    return (
        <div>
            <div>Count: {count}</div>
            <button onClick={increment}>加一</button>
            <button onClick={decrement}>减一</button>
        </div>
    );
};

export default connect(mapStateToProps, DispatchProps)(Counter);
```
