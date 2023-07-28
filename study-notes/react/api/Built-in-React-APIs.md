# Built-in React APIs

## createContext

-   用于创建一个上下文（context）对象。上下文对象可以在组件树中的任何位置被访问和更新，用于实现组件之间的数据共享。    
    `const SomeContext = createContext(defaultValue)`   
    defaultValue：是一个可选的默认值，用于在没有匹配到 Provider 时使用。默认值是静态的，不会随着时间的推移而改变。   

## forwardRef（render）

-   用于向子组件传递 ref 引用，可以用来包裹函数组件或类组件，使其能够接收父组件传递的 ref

    且其只能用于传递 ref 引用，而不能用于传递其他 props。（ 如果需要同时传递 props 和 ref 引用，使用 React.forwardRef 方法（类组件中使用）或 useImperativeHandle 钩子（函数组件中使用） ）

    -   render：组件的渲染函数。React 使用 props 和 ref 从其父组件接收到的参数调用此函数。返回的 JSX 将是组件的输出
    -   return： 返回一个可以在 JSX 中渲染的 React 组件。由 forwardRef 返回的组件也能够接收 refprop。
    -   props：父组件传递的 props。
    -   ref：ref 父组件传递的属性。ref 是对象或函数。如果父组件没有传递 ref，将是 null。将 ref 收到的数据传递给另一个组件，或者将其传递给 useImperativeHandle.

```typescript
const Component = forwardRef((props, ref) => {
    // 组件的内容
});
```

## lazy

-   允许您推迟加载组件的代码，直到第一次渲染它。`const SomeComponent = lazy(load)`

    -   load（ 不接收任何参数 ）：返回 Promise 或另一个 thenable 的函数。

        1. load 直到第一次尝试渲染返回的组件时，React 才会调用。
        2. React 第一次调用后 load，会等待它解析，然后将解析后的值渲染为 React 组件。返回的 Promise 和 Promise 的解析值都会被缓存

        -   因此 React 不会调用 load 多次。如果 Promise 被拒绝，React 会将 throw 拒绝原因交给最近的错误边界来处理。

    -   return：lazy 返回一个可以在树中渲染的 React 组件。当惰性组件的代码仍在加载时，尝试渲染它将会挂起。用`<Suspense>`在加载时显示加载指示器。

## memo

-   允许在组件的 props 未更改时跳过重新渲染组件 `memo(Component, arePropsEqual?)`

    -   Component：要记住的组件。 memo 不会修改此组件，而是返回一个新的记忆组件。任何有效的 React 组件，包括函数和 forwardRef 组件，都被接受。

    -   可选 arePropsEqual：接受两个参数的函数：组件的先前属性及其新属性。true 如果新旧 props 相等，它应该返回：也就是说，如果组件将渲染相同的输出，并且使用新 props 的行为方式与旧 props 相同。否则它应该返回 false。通常，您不会指定此函数。默认情况下，React 会将每个 prop 与 Object.is.

    -   返回一个新的 React 组件。它的行为与提供给的组件相同，memo 只是当其父级重新渲染时，React 并不总是重新渲染它，除非它的 props 已更改。

## startTransition

-   可以在不阻塞 UI 的情况下更新状态 `startTransition(scope)`

    -   scope：一种通过调用一个或多个 set 函数来更新某些状态的函数。React 立即 scope 不带参数调用，并将 scope 函数调用期间同步调度的所有状态更新标记为转换。它们将是非阻塞的，并且不会显示不需要的加载指示器。
    -   startTransition 不返回任何内容。

```typescript
import { createContext, lazy, startTransition, useRef, useState } from "react";
import { ForwardRefDemo } from "./forwardRef";
import { Memoized } from "./memoized";

const Lazy = lazy(() => import("../todo-list/index"));

const ContextDemo = createContext<string>("value");

export const BuiltReactApi = () => {
    const [count, setCount] = useState<number>(0);

    const ref = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        startTransition(() => {
            setCount(count + 1);
        });
    };

    return (
        <div>
            <ContextDemo.Provider value="context value">
                <Lazy />
            </ContextDemo.Provider>

            <ForwardRefDemo text="Ref Demo" ref={ref} />

            <Memoized count={count} />

            <button onClick={handleClick}> Count++ </button>
        </div>
    );
};
```

```typescript
export const ForwardRefDemo = forwardRef<HTMLDivElement, { text: string }>(
    ({ text }, ref) => {
        return <div ref={ref}>{text}</div>;
    }
);
```

```typescript
export const Memoized = memo(({ count }: { count: number }) => {
    console.log("Rendering");
    return <div>{count}</div>;
});
```
