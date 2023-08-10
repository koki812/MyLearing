# React Redux

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

1. 使用

-   方便地访问和操作状态：通过 connect，可以将 Redux Store 中的状态映射到组件的 props 中，使得在组件中可以轻松地访问和操作这些状态

-   使用 mapStateToProps 和 mapDispatchToProps 使用这两个函数，可以明确地指定哪些状态需要被映射到组件的 props 中，以及哪些操作需要被映射到组件的 props 中，从而使组件可以直接调用这些操作来触发状态更新

-   自动触发更新：connect 会自动监听 Redux Store 中的状态变化，当状态发生变化时，会自动更新组件，无需手动编写代码来监听状态变化

2. 不使用

-   需要手动访问状态：在组件中无法直接访问 Redux Store 中的状态，需要手动通过 store.getState() 方法来获取状态。

-   手动订阅和取消订阅：如果需要监听状态的变化以便更新组件，需要手动订阅状态的变化，并在组件卸载时取消订阅，以防止内存泄漏。

-   手动分发操作：如果需要触发状态的更新，需要手动分发 Redux action，通常需要手动创建 action creators，并在组件中调用它们

```ts
import React from "react";
import { connect } from "react-redux";
import { counterSlice } from "./counterSlice";
import { store } from "./store";

type RootState = ReturnType<typeof store.getState>;

const { increment, decrement } = counterSlice.actions;

const mapDispatchToProps = {
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

const mapStateToProps = (state: RootState) => ({
    count: state.counter.count,
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```
