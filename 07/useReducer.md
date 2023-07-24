# useReducer

useReducer 用于管理具有复杂状态和交互逻辑的组件状态。它接收一个 reducer 函数和初始状态作为参数，并返回当前状态和一个 dispatch 函数。

三个参数：reducer 函数和初始状态还有可选 init

1. reducer 函数：reducer 函数是一个纯函数，接受当前的状态（state）和一个动作（action）作为参数，并返回一个新的状态。它用于根据传入的动作类型来更新状态。

2. 初始状态（state）：初始状态是组件的初始状态值。可以是一个简单的值（如字符串、数字等），也可以是一个复杂的对象。初始状态在组件首次渲染时被初始化，并且在使用 useReducer 时是不可变的。

3. 可选 init：返回初始状态的初始化函数。如果未指定，则初始状态设置为 initialArg。否则，初始状态设置为调用 init(initialArg)的结果

### dispatch 函数

用于触发 reducer 函数执行的函数,主要作用是向 reducer 函数传递一个动作对象，从而根据动作类型来更新状态。eg：`dispatch(action);`

1. 使用 dispatch 函数时，会触发 reducer 函数的执行，并根据传入的 action 类型来更新状态。reducer 函数在执行时会根据不同的 action 类型，执行相应的逻辑，并返回新的状态。然后，useReducer 会将新的状态值更新到组件中，并重新渲染组件。
2. 通过 dispatch 函数，可以在组件中发起各种 action，例如更新状态、添加数据、删除数据等。dispatch 函数的调用会触发 reducer 函数的执行，从而实现对状态的更新和管理。

```
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

# 运算符

## 指数运算符（`**`）

指数运算符（`**`）：
指数运算符的特点是右结合，多个指数运算符连用时，是从最右边开始计算的,eg：

```
2 ** 3 ** 2 | 2 ** (3 ** 2)
```

## 链判断运算符（`?.`）

`?.`运算符，直接在链式调用的时候判断，左侧的对象是否为 null 或 undefined。如果是的，就不再往下运算，而是返回 undefined

链判断运算符?.的三种写法

-   `obj?.prop` // 对象属性是否存在
-   `obj?.[expr]`// 对象属性是否存在
-   `func?.(...args)` // 函数或对象方法是否存在

## Null 判断运算符（`?？`）

只有运算符`?？`左侧的值为 null 或 undefined 时，才会返回右侧的值。eg： `const enable = props.enabled ?? true;`

## 逻辑赋值运算符（`||=`、`&&=`、`??=`）

`||=`、`&&=`、`??=`相当于先进行逻辑运算，然后根据运算结果，再视情况进行赋值运算。可以为变量或属性设置默认值。

```es6
x ||= y; // 或赋值运算符

x || (x = y); // 等同于

x &&= y; // 与赋值运算符

x && (x = y); // 等同于

x ??= y; // Null 赋值运算符

x ?? (x = y); // 等同于
```

# CSS Position

## static

HTML 元素的默认值
没有定位，遵循正常的文档流对象。

-   静态定位的元素不会受到 top, bottom, left, right 影响

## relative

相对定位元素的定位是相对其正常位置,移动相对定位元素，但它原本所占的空间不会改变。（即可能为空间所在位置和视觉所在位置不一致）

-   相对定位元素经常被用来作为绝对定位元素的容器块

## fixed

元素的位置相对于浏览器窗口是固定位置,窗口是滚动,也不会移动

## absolute

绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于`<html>`处于页面左上角
absolute 定位使元素的位置与文档流无关，不占据空间，能和其他元素重叠。

## sticky

`position: sticky` 基于用户的滚动位置来定位。

粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。

-   指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

## 重叠的元素（z-index ）

元素的定位与文档流无关，覆盖页面上的其它元素
z-index 属性指定了一个元素的堆叠顺序，一个元素可以有正数或负数的堆叠顺序：
（更高堆叠顺序的元素总是在较低的堆叠顺序元素的前面）

-   两个定位元素重叠，没有指定 z - index，则最后定位在 HTML 代码中的元素将被显示在最前面。
