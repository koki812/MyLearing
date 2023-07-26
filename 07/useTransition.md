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
