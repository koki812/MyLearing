# Promise

从语法上说，Promise 是一个对象，它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

## 特点

-   优点
    （1）对象的状态不受外界影响。Promise 对象有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。只有异步操作的结果，决定当前是哪一种状态，任何其他操作都无法改变这个状态，其他手段无法改变。
    （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。

-   缺点
    （1）无法取消 Promise，一旦新建它就会立即执行，无法中途取消
    （2）如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部
    （3）处于 pending 状态时，无法得知目前进展到哪一个阶段

## Promise.prototype.then()

then 方法可以接受两个回调函数作为参数。

1. 第一个回调函数是 Promise 对象的状态变为 resolved 时调用
2. 第二个回调函数是 Promise 对象的状态变为 rejected 时调用
3. 返回一个新的 Promise 对象，通过链式调用多个 then()方法。
4. 返回一个 Promise 对象，后续的 then()方法将等待该 Promise 对象的状态变为 resolved 或 rejected。
5. 没有传入任何参数，将会把 Promise 对象的状态传递到下一个 then()方法。

-   调用 resolve 或 reject 并不会终结 Promise 的参数函数的执行。

## Promise.prototype.catch()

.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

1. 指定 Promise 对象状态变为 rejected 时的回调函数。
2. 返回一个新的 Promise 对象，通过链式调用多个 catch()方法。
3. 没有传入任何参数，将会把 Promise 对象的拒绝原因传递到下一个 catch()方法。

## Promise.prototype.finally()

不管 promise 最后的状态，在执行完 then 或 catch 指定的回调函数以后，都会执行 finally 方法指定的回调函数。（finally 方法的回调函数不接受任何参数）

## Promise.all()

1. 当所有输入的 Promise 对象都变为 resolved 状态时，返回的 Promise 对象变为 resolved 状态。
2. 如果其中一个 Promise 对象变为 rejected 状态，则返回的 Promise 对象立即变为 rejected 状态（并把第一个变为 rejected 状态的 Promise 对象的拒绝原因作为自己的拒绝原因）。
3. 如果传入的可迭代对象为空，返回的 Promise 对象将立即变为 resolved 状态。
4. 通过调用 then()方法来指定当所有 Promise 对象都变为 resolved 状态时的回调函数。

## Promise.race()

1. 当第一个输入的 Promise 对象状态变为 resolved 或 rejected 时，返回的 Promise 对象的状态也变为相同的状态。（使用第一个完成的 Promise 对象的返回值或拒绝原因）。
2. 如果传入的可迭代对象为空，返回的 Promise 对象将永远处于待定状态。
3. 可以通过调用 then()方法来指定当第一个 Promise 对象完成时的回调函数。

## Promise.allSettled()

用来确定一组异步操作是否都结束了（不管成功或失败）。

## Promise.any()

1. 当所有输入的 Promise 对象都变为 resolved 或 rejected 状态时，返回的 Promise 对象变为 resolved 状态。
2. 返回的 Promise 对象的值是一个数组，数组中的每个元素代表对应 Promise 对象的状态和结果。
3. 无论输入的 Promise 对象是 resolved 还是 rejected，Promise.allSettled()都会等待所有 Promise 对象都完成。
4. 可以通过调用 then()方法来指定当所有 Promise 对象都变为 resolved 或 rejected 状态时的回调函数。

## Promise.resolve()

用于将现有对象转为 Promise 对象

1. 如果传入的参数是一个 Promise 对象，直接返回该 Promise 对象。
2. 如果传入的参数是一个 thenable 对象，将其转换为一个 Promise 对象，即执行 thenable 对象的 then()方法。。
3. 如果参数是一个原始值，或者是一个不具有 then()方法的对象，则 Promise.resolve()方法返回一个新的 Promise 对象，状态为 resolved。
4. 不带有任何参数，Promise.resolve()方法允许调用时不带参数，直接返回一个 resolved 状态的 Promise 对象。

## Promise.reject()

Promise.reject(reason)方法也会返回一个新的 Promise 对象，该对象的状态为 rejected。

## Promise.try()

用于创建一个新的 Promise 对象，并立即执行一个函数（同步或者异步）。

1. 如果是同步函数，则返回的对象会被立即解决（resolved），并且其解决值（resolve value）是函数的返回值。
2. 如果是异步函数，则返回的 Promise 对象会等待函数完成后再解决，并且其解决值是函数返回的值或者抛出的错误。
