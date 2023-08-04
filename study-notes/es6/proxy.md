# Proxy

Proxy 允许创建一个代理对象来拦截对目标对象的操作。

Proxy 构造函数，用来生成 Proxy 实例 `var proxy = new Proxy(target, handler);`
不同的是 handler 参数的写法，其中 new Proxy()表示生成一个 Proxy 实例，target 参数表示所要拦截的目标对象，handler 参数也是一个对象，用来定制拦截行为。

## Proxy 拦截操作

`get(target, propKey, receiver)`：拦截对象属性的读取。

`set(target, propKey, value, receiver)`：拦截对象属性的设置。

`has(target, propKey)`：拦截 propKey in proxy 的操作，返回一个布尔值。

`deleteProperty(target, propKey)`：拦截 delete proxy[propKey]的操作，返回一个布尔值。

`ownKeys(target)`：拦截 `Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols( proxy )`、`Object.keys( proxy )`、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 `Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。

`getOwnPropertyDescriptor(target, propKey)`：拦截 `Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。

`defineProperty(target, propKey, propDesc)`：拦截 `Object.defineProperty（ proxy, propKey, propDesc ）`、`Object.defineProperties( proxy, propDescs )`，返回一个布尔值。

`preventExtensions(target)`：拦截 `Object.preventExtensions(proxy)`，返回一个布尔值。

`getPrototypeOf(target)`：拦截 `Object.getPrototypeOf(proxy)`，返回一个对象。

`isExtensible(target)`：拦截 `Object.isExtensible(proxy)`，返回一个布尔值。

`setPrototypeOf(target, proto)`：拦截 `Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

`apply(target, object, args)`：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。

`construct(target, args)`：拦截 Proxy 实例作为构造函数调用的操作，比如 `new proxy(...args)`。

## Proxy.revocable()

方法返回一个可取消的 Proxy 实例

`Proxy.revocable()`目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

## this 问题

### this 的丢失问题

当使用 Proxy 代理一个对象的方法时，方法内部的 this 指向可能会丢失。因为 Proxy 中的拦截器方法并不是目标对象本身的方法，而是代理对象的方法。如果在拦截器方法中使用 this，它将指向代理对象而不是目标对象。

-   解决方法：
    在拦截器方法中，可以使用 Reflect 对象来调用目标对象的原始方法，并且将 this 设置为目标对象。

### this 的绑定问题

在 Proxy 中拦截器方法的 this 不会自动绑定到代理对象上。意味着不能在拦截器方法中访问代理对象的属性或方法，因为 this 不会指向代理对象本身。

-   解决方法：
    在创建 Proxy 实例时，显式地将拦截器方法绑定到代理对象上，确保 this 指向代理对象。

Proxy 的 this 问题在于拦截器方法，因此需要注意在拦截器方法中如何处理 this。
使用 Reflect 对象来调用目标对象的方法，设置正确的 this 上下文，或者显式地将拦截器方法绑定到代理对象上。
