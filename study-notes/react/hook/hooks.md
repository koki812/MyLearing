# useEffect

-   参数 1:箭头函数()=>{}，在真正渲染 html 之前会执行它

-   参数 2

-   情况 1:没有，代表每次执行组件函数时，都会执行副作用函数

```TypeScript
useEffect(() =>{} )
```

-   情况 2:[]空数组，代表副作用函数只会执行一次

```TypeScript
useEffect(() =>{},[] )
```

-   情况 3:[依赖项]，依赖项变化时，副作用函数会执行

```TypeScript
useEffect(() =>{},[依赖项] )
```

```TypeScript
useEffect(() => {
  document.title = `${name} ${YearResult} 的档案`;
}, [name, YearResult]);

```

# useState

参数:数据的初始值  
返回值:[a,b]  
a:状态数据  
b:方法,修改状态数据的方法 setXX()

```TypeScript
const [a,b] = useState(初始值)
```

```TypeScript
const [age, setAge] = useState<number>(0);//setAge(age + 1);
const [year, setYear] = useState<number>(2000);//  setYear(year + age);
const [name, setName] = useState<string>("jack");
```

# useLocation()

useLocation 的 hook 可以返回当前的 location 对象

```TypeScript
{` ${styles.link} ${
  location.pathname === "/grocery/delivery" && styles.active
}`}
```

# useContext

`const value = useContext(SomeContext)` 从组件顶层调用，来读取和订阅上下文  
`useContext`返回调用组件的上下文值  
`SomeContext`本身不保存信息，仅提供或从组件中读取的信息类型  
`<SomeContext.Provider>`位于 useContext 组件之上，若没有 provider 那么返回上下文的 dafault value  
`createContext`返回最新值，且上下文发生变化 react 会自动重新渲染并读取上下文组件

-   tips：React 会自动重新渲染所有特定的上下文的子级，在接受提供者的 value 开始比较，若相同会跳过重新渲染并 memo，反之接收新的上下文值

```TypeScript
<!-- 父组件 -->
  <props.ChildContext.Provider value={props.YearResult}>
      <Child />
  </props.ChildContext.Provider>
<!-- 子组件 -->
  const ChildContext = createContext(2000);
  export const Child = React.memo(() => {
  const child = useContext(ChildContext);
  return (
    <div>
      <span className={styles.default}>出生年份为：{child}</span>
    </div>
  );
  });
```

# useId

生成可以传递给可访问属性的唯一的 id，从调用组件的'parent path‘生成  
`const id = userId（ ）` useId 不带任何参数，且返回唯一的 id 字符串  
不要将生成的 id 用于生成列表的 key 值

```TypeScript
const nameId = useId();
<input type="text" defaultValue={name} id={nameId} />
<input type="submit" id={nameId} />
```

运行结果：![Alt text](image-5.png)

# useRef

引用渲染不需要的值`const ref = useRef（initialValue）`，返回单个属性的对象
在顶层调用以声明一个或多个引用
参数：`initialValue`是 ref 对象的 current 属性的初始值，可以是任何类型的值（null 也可以），初次渲染之后被忽略

```TypeScript
  const ref = useRef(0);

  const handleAgeAdd = useCallback(() => {
    ref.current = ref.current + 1;
    setAge(age + 1);
    alert("你已经提交" + ref.current + "次" + name + "的档案");
  }, [age, name]);
```

-   tips

-   除初始化外，不要在渲染期间读写，且更改 ref 不会触发重新渲染，若必须则用 state 读写，所以 ref 适合存储不影响组件视图输出的信息
-   ref 的 current 的属性是可变的，但更改后不会重新渲染组件；
-   ref 可以在重新渲染之间存储信息；
-   更改 ref 不会触发重新渲染
-   ref 对于每个组件来说都是本地的

# useDebugValue

`useDebugValue` 用于在 React DevTools 中向自定义 hook 添加标签。
接受两个参数：`value` 和 可选`format`。

-   `value` 是要提供调试信息的值，可以为任何类型。
-   可选`format` 是一个可选的格式化函数，用于将值转换为调试信息的字符串表示形式，useDebugValue(date, date => date.toDateString());
    格式化函数将接收调试值作为参数，并应返回格式化的显示值。当组件被检查时，React DevTools 将调用此函数并显示其结果。

# useDeferredValue

`useDeferredValue` 推迟对部分 UI 的更新，以优化性能，减少不必要的渲染。

`useDeferredValue(value)` 接受一个参数 `value`，表示要推迟更新的值。它返回一个新的值，该值会在下一次渲染时更新。

加载新内容时显示陈旧内容
表明内容已过时
推迟部分 UI 的重新渲染

1. 在组件中使用 `useDeferredValue` 函数，将需要推迟更新的值作为参数传入。
2. 使用返回的推迟更新的值，而不是原始的值，进行渲染或其他操作。

return：
在初始渲染期间，返回的延迟值与提供的值相同。
在更新期间，React 将使用旧值重新渲染（返回旧值），然后在后台尝试使用新值进行另一次重新渲染（返回更新后的值）。

```typescript
import { useState, useDebugValue, useDeferredValue } from "react";

export const DebugValueDemo = () => {
    const [count, setCount] = useState<number>(0);
    const deferredCount = useDeferredValue(count);

    useDebugValue(deferredCount, (value) => `Deferred Count: ${value}`);

    return (
        <div>
            <p>Count: {count}</p>
            <p>Deferred Count: {deferredCount}</p>
            <button onClick={() => setCount((num) => num + 1)}>
                Count + 1
            </button>
        </div>
    );
};
```

# useReducer

useReducer 用于管理具有复杂状态和交互逻辑的组件状态。它接收一个 reducer 函数和初始状态作为参数，并返回当前状态和一个 dispatch 函数。

三个参数：reducer 函数和初始状态还有可选 init

1. reducer 函数：reducer 函数是一个纯函数，接受当前的状态（state）和一个动作（action）作为参数，并返回一个新的状态。它用于根据传入的动作类型来更新状态。

2. 初始状态（state）：初始状态是组件的初始状态值。可以是一个简单的值（如字符串、数字等），也可以是一个复杂的对象。初始状态在组件首次渲染时被初始化，并且在使用 useReducer 时是不可变的。

3. 可选 init：返回初始状态的初始化函数。如果未指定，则初始状态设置为 initialArg。否则，初始状态设置为调用 init(initialArg)的结果

## dispatch 函数

用于触发 reducer 函数执行的函数,主要作用是向 reducer 函数传递一个动作对象，从而根据动作类型来更新状态。eg：`dispatch(action);`

1. 使用 dispatch 函数时，会触发 reducer 函数的执行，并根据传入的 action 类型来更新状态。reducer 函数在执行时会根据不同的 action 类型，执行相应的逻辑，并返回新的状态。然后，useReducer 会将新的状态值更新到组件中，并重新渲染组件。
2. 通过 dispatch 函数，可以在组件中发起各种 action，例如更新状态、添加数据、删除数据等。dispatch 函数的调用会触发 reducer 函数的执行，从而实现对状态的更新和管理。

```TypeScript
import { useReducer } from "react";

interface State {
    count: number;
}

const reducer = (state: State, action: "increase" | "decrease"): State => {
    switch (action) {
        case "increase":
            return { count: state.count + 1 };
        case "decrease":
            return { count: state.count - 1 };
        default:
            throw new Error("err");
    }
};

export const Counter = () => {
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    const handleIncrease = () => {
        dispatch("increase");
    };

    const handleDecrease = () => {
        dispatch("decrease");
    };

    return (
        <div>
            <div>Count: {state.count}</div>
            <button onClick={handleIncrease}>Increment</button>
            <button onClick={handleDecrease}>Decrement</button>
        </div>
    );
};

```

# useImperativeHandle Hook

`useImperativeHandle`用于自定义暴露给父组件的实例值或方法。
通过使用 useImperativeHandle，可以在子组件中定义需要暴露给父组件的实例值或方法，并通过 ref 在父组件中访问和调用它们。子组件与父组件进行更活的交互。

# useLayoutEffect Hook

`useLayoutEffect`在组件渲染到 DOM 之后立即执行，而不是在浏览器绘制更新之后执行。它可以立即同步地访问和操作 DOM。
如果需要在 DOM 更新之后立即执行某些操作，useLayoutEffect 更适合运用。

与 useEffect 不同，useLayoutEffect 的回调函数在每次组件渲染时都会执行，而不仅仅是在首次渲染时执行。可能会阻塞组件的渲染。需要谨慎使用，并确保其回调函数的执行时间尽可能短。

# useTransition Hook

`useTransition` 用于在 UI 元素之间创建过渡效果。它可以帮助我们在元素的添加、删除或更新时，以流畅的方式改变它们的可见性。

使用 useTransition 指定一个状态来控制元素的可见性，并在状态改变时应用过渡效果。

它接受一个布尔值作为参数，表示元素是否应该显示或隐藏。当状态从 false 变为 true 时，元素会以动画的形式从不可见到可见；当状态从 true 变为 false 时，元素会以动画的形式从可见到不可见。

一些配置选项用来定义过渡的持续时间、延迟和效果，使我们能够以流畅的方式改变元素的显示和隐藏状态。

```typescript
import React, { useState, useEffect, useLayoutEffect } from "react";

export const DemoTrasition: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useLayoutEffect(() => {
        console.log("useLayoutEffect ------ updated");
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(!isVisible);
        }, 2000);

        return () => {
            clearTimeout(timeout);
        };
    }, [isVisible]);

    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>Visibility</button>
            {isVisible && <div>Transition</div>}
        </div>
    );
};
```
