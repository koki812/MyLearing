# Proxy

Proxy 允许创建一个代理对象来拦截对目标对象的操作

Proxy 构造函数，用来生成 Proxy 实例 `var proxy = new Proxy(target, handler);`
不同的是 handler 参数的写法，其中 new Proxy()表示生成一个 Proxy 实例，target 参数表示所要拦截的目标对象，handler 参数也是一个对象，用来定制拦截行为。

## Proxy 拦截操作

### `get(target, propKey, receiver)`

拦截对象属性的读取

### `set(target, propKey, value, receiver)`

拦截对象属性的设置

-   如果目标对象自身的某个属性不可写，那么 set 方法将不起作用。
-   set 代理应当返回一个布尔值。严格模式下，set 代理如果没有返回 true，就会报错。

### `has(target, propKey)`

拦截 propKey in proxy 的操作，返回一个布尔值

### `deleteProperty(target, propKey)`

拦截 delete proxy[propKey]的操作，返回一个布尔值

-   目标对象自身的不可配置（configurable）的属性，不能被 deleteProperty 方法删除，否则报错。

### `ownKeys(target)`

拦截 `Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols( proxy )`、`Object.keys( proxy )`、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 `Object.keys()`的返回结果仅包括目标对象自身的可遍历属性

-   三类属性会被 ownKeys()方法自动过滤，不会返回

1. 目标对象上不存在的属性
2. 属性名为 Symbol 值
3. 不可遍历（enumerable）的属性

-   返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。
-   如果目标对象自身包含不可配置的属性，则该属性必须被 ownKeys()方法返回，否则报错。
-   如果目标对象是不可扩展的（non-extensible），这时 ownKeys()方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错。

### `getOwnPropertyDescriptor(target, propKey)`

拦截 `Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象

### `defineProperty(target, propKey, propDesc)`

拦截 `Object.defineProperty（ proxy, propKey, propDesc ）`、`Object.defineProperties( proxy, propDescs )`，返回一个布尔值

-   如果目标对象不可扩展（non-extensible），则 defineProperty()不能增加目标对象上不存在的属性，否则会报错。
-   如果目标对象的某个属性不可写（writable）或不可配置（configurable），则 defineProperty()方法不得改变这两个设置。

### `preventExtensions(target)`

拦截 `Object.preventExtensions(proxy)`，返回一个布尔值

-   只有目标对象不可扩展时（即 Object.isExtensible(proxy)为 false），proxy.preventExtensions 才能返回 true，否则会报错。

### `getPrototypeOf(target)`

拦截 `Object.getPrototypeOf(proxy)`，返回一个对象

拦截以下操作：

1. Object.prototype.**proto**
2. Object.prototype.isPrototypeOf()
3. Object.getPrototypeOf()
4. Reflect.getPrototypeOf()
5. instanceof

-   返回值必须是对象或者 null，否则报错。
-   如果目标对象不可扩展（non-extensible）， getPrototypeOf()方法必须返回目标对象的原型对象。

### `isExtensible(target)`

拦截 `Object.isExtensible(proxy)`，返回一个布尔值

-   只能返回布尔值，否则返回值会被自动转为布尔值。
-   有一个强限制，它的返回值必须与目标对象的 isExtensible 属性保持一致，否则就会抛出错误。

### `setPrototypeOf(target, proto)`

拦截 `Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截

-   如果目标对象不可扩展（non-extensible），setPrototypeOf()方法不得改变目标对象的原型。

### `apply(target, object, args)`

拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`

### `construct(target, args)`

拦截 Proxy 实例作为构造函数调用的操作，比如 `new proxy(...args)`

-   construct()方法返回的必须是一个对象，否则会报错。
-   construct()拦截的是构造函数，所以它的目标对象必须是函数，否则就会报错。

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
