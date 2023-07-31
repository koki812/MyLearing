# async 函数

在异步函数中使用 `await` 关键字暂停函数的执行，等待一个 Promise 对象的解析结果

异步函数会返回一个 Promise 对象，这个 Promise 对象的最终结果取决于异步函数内部 `await` 语句后面的 Promise 对象的解析结果

可使用 `then（ ）`｜ `catch（ ）`方法添加回调函数。当函数执行的时候，遇到 `await` 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句

## 与 Generator 函数区别

1. 自带执行器
2. 函数里有异步操作，`await` 表示紧跟在后面的表达式需要等待结果。
3. `await` 命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，自动转成立即 resolved 的 Promise 对象）
4. 函数的返回值是 Promise 对象

## async 语法

### 错误处理机制

async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参，只有 async 函数内部的异步操作执行完，才会执行 then 方法指定的回调函数。

## await 命令

`await` 只能在异步函数内部使用，可暂停异步函数的执行，等待一个 Promise 对象的解析结果

1. `await`命令后面通常是一个 Promise 对象，它会等待该 Promise 对象的状态变为 resolved，并返回 Promise 对象的结果。如果`await`后面不是 Promise 对象，它会直接返回对应的值。
2. 如果`await`后面的 Promise 对象变为 rejected 状态，则可以通过`catch`方法的回调函数接收到 reject 的参数。
3. 任何一个`await`语句后面的 Promise 对象变为 rejected 状态，整个`async`函数都会中断执行。
4. 如果希望即使前一个异步操作失败，也不要中断后面的异步操作，可以将第一个`await`放在`try...catch`结构中。这样不论第一个异步操作是否成功，第二个`await`都会执行。
5. 另一种处理前面可能出现错误的方法是，在`await`后面的 Promise 对象再跟一个`catch`方法来处理错误。

### 错误处理

1. 如果`await`后面的异步操作出错，等同于`async`函数返回的 Promise 对象被 reject。
2. 为了防止出错，最好将`await`命令放在`try...catch`代码块中。
3. 如果有多个`await`命令，可以统一放在`try...catch`结构中进行错误处理。

## 关于`async`函数的实现原理

1. `async`函数的实现原理是将 Generator 函数和自动执行器包装在一个函数中。
2. `async`函数会返回一个 Promise 对象，当调用这个函数时，会立即执行内部的 Generator 函数，并返回一个 Promise 对象。
3. `await`关键字用于暂停`async`函数的执行，等待 Promise 对象的状态变为 resolved，并返回 Promise 对象的结果。
4. 一旦 Promise 对象的状态变为 resolved，自动执行器会恢复函数的执行，并将 Promise 对象的结果作为`await`表达式的值。
5. 如果 Promise 对象的状态变为 rejected，自动执行器会抛出一个异常，可以通过`try...catch`语句来捕获并处理异常。

### 使用注意点

1. 将`await`命令放在`try...catch`代码块中，以便捕获可能的错误。
2. 如果多个`await`命令后面的异步操作不存在继发关系，最好让它们同时触发，以提高效率。
3. `await`命令只能在`async`函数中使用，在普通函数中使用会报错。
4. `async`函数可以保留运行堆栈。

## 顶层 await

1. `await`命令通常需要放在`async`函数内部使用，否则会报错。这是因为`await`需要等待一个 Promise 对象的状态变为 resolved，并返回结果。只有在`async`函数内部，才能使用`await`来暂停函数的执行。

2. 在模块的顶层独立使用`await`命令是允许的，并且可以用来解决模块异步加载的问题。当使用`await`命令加载一个模块时，它会等待被加载模块中的异步操作完成，然后再执行后续的代码。这样可以确保在加载模块时获取到正确的输出值。

3. 为了让原始模块输出一个 Promise 对象，可以将异步操作包装在一个`async`函数中，并返回一个 Promise 对象。这样，模块的使用者可以通过等待这个 Promise 对象的状态变化来判断异步操作是否完成。

4. 使用顶层`await`时，模块的加载会等待依赖模块的异步操作完成，然后才会执行后续的代码。这样可以确保在加载模块时获取到正确的输出值，不会因为加载时机的不同而得到不一样的值。

5. 需要注意的是，顶层`await`只能在 ES6 模块中使用，不能在 CommonJS 模块中使用。这是因为 CommonJS 模块的`require()`方法是同步加载的，无法处理顶层`await`的异步操作。因此，顶层`await`只适用于 ES6 模块的加载场景。

## async 函数的实现原理

将 Generator 函数和自动执行器，包装在一个函数里,
所有的 async 函数都可以写成以下形式，其中 spawn 函数就是自动执行器。

```es6
async function fn(args) {
// ...
}

// 等同于

function fn(args) {
  return spawn(function\* () {
  // ...
  });
}
```
