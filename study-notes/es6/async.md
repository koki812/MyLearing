# 异步函数

## async & await & promise

async 和 await 是用于处理异步操作的关键字。通常与 Promise 对象一起使用。

-   async: async 关键字用于声明一个函数是异步函数。在异步函数中，可以使用 await 关键字暂停函数的执行，等待一个 Promise 对象的解析结果。异步函数会返回一个 Promise 对象，这个 Promise 对象的最终结果取决于异步函数内部 await 语句后面的 Promise 对象的解析结果。

-   await: await 关键字只能在异步函数内部使用。它可以暂停异步函数的执行，等待一个 Promise 对象的解析结果。当遇到 await 关键字时，异步函数会暂停执行，直到 await 后面的 Promise 对象解析为成功状态（resolved）并返回结果。然后，异步函数会继续执行，并将解析结果作为 await 表达式的值返回。

-   Promise 结果：Promise 对象表示一个异步操作的最终结果。它可以处于三种状态：pending（进行中）、resolved（已解决）和 rejected（已拒绝）。当一个 Promise 对象的异步操作成功完成时，它会进入 resolved 状态，并返回一个解析值。当一个 Promise 对象的异步操作失败或发生错误时，它会进入 rejected 状态，并返回一个拒绝原因。通过调用 Promise 对象的.then()方法或.catch()方法，可以处理 Promise 对象的解析结果或拒绝原因。

## useEffect 中的异步函数使用

useEffect 是用于在函数组件中处理副作用的 Hook，在组件渲染完成后执行，并在组件卸载时清除副作用。所以，它的回调函数不能直接声明为 async 函数，因此在 useEffect 中使用异步函数的常见方式是在回调函数内部定义一个异步函数，并使用立即执行函数将其调用。

```
useEffect(() => {
  const fetchData = async () => {};
}, []);
```

-   tips：

1. 与其他地方使用异步函数的不同之处在于，useEffect 内部的异步函数通常用于处理组件渲染后需要进行的异步操作，例如数据获取、订阅事件等。
2. 在 useEffect 的回调函数内部使用的异步函数需要设定为可取消的，在组件卸载时能够取消异步操作，防止可能的内存泄漏。这个点需要通过返回一个取消函数来实现，所以，需要注意处理异步操作的结果以及取消异步操作的情况。
