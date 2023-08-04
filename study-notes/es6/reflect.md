# Reflect

## 目的

（1）从 Reflect 对象上可以拿到语言内部的方法。

（2）修改某些 Object 方法的返回结果，让其变得更合理。

（3）让 Object 操作都变成函数行为。

（4）不管 Proxy 怎么修改默认行为，总可以在 Reflect 上获取默认行为。

## 静态方法

### Reflect.get(target, name, receiver)

查找并返回 target 对象的 name 属性，如果没有该属性，则返回 undefined

-   如果 name 属性部署了读取函数（getter），则读取函数的 this 绑定 receiver。
-   如果第一个参数不是对象，Reflect.get 方法会报错。

### Reflect.set(target, name, value, receiver)

设置 target 对象的 name 属性等于 value

-   如果 name 属性设置了赋值函数，则赋值函数的 this 绑定 receiver。
-   如果第一个参数不是对象，Reflect.set 会报错。

### Reflect.has(target, name)

对应 name in obj 里面的 in 运算符

-   如果 Reflect.has()方法的第一个参数不是对象，会报错

### Reflect.deleteProperty(target, name)

等同于 delete obj[name]，用于删除对象的属性

-   返回一个布尔值
    删除成功，或者被删除的属性不存在，返回 true；
    删除失败，被删除的属性依然存在，返回 false。

-   如果 Reflect.deleteProperty()方法的第一个参数不是对象，会报错。

### Reflect.construct(target, args)

等同于 new target(...args)，这提供了一种不使用 new，来调用构造函数的方法

-   如果 Reflect.construct()方法的第一个参数不是函数，会报错。

### Reflect.getPrototypeOf(target)

用于读取对象的**proto**属性，对应 Object.getPrototypeOf(obj)

-   Reflect.getPrototypeOf 和 Object.getPrototypeOf 的区别：         
    如果参数不是对象，Object.getPrototypeOf 会将这个参数转为对象，然后再运行          
    Reflect.getPrototypeOf 会报错

### Reflect.setPrototypeOf(target, prototype)

用于设置目标对象的原型（prototype），对应 Object.setPrototypeOf(obj, newProto)方法。

-   返回一个布尔值，表示是否设置成功
-   无法设置目标对象的原型（比如，目标对象禁止扩展）返回 false
-   target 不是对象，Object.setPrototypeOf 返回第一个参数本身，Reflect.setPrototypeOf 报错
-   target 是 undefined 或 null，Object.setPrototypeOf 和 Reflect.setPrototypeOf 都会报错

### Reflect.apply(target, thisArg, args)

等同于 Function.prototype.apply.call(func, thisArg, args)，用于绑定 this 对象后执行给定函数

### Reflect.defineProperty(target, name, desc)

等同于 Object.defineProperty，用来为对象定义属性

-   如果 target 不是对象，就会抛出错误

### Reflect.getOwnPropertyDescriptor(target, name)

基本等同于 Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象

-   Reflect.getOwnPropertyDescriptor 和 Object.getOwnPropertyDescriptor 的区别是：
    -   如果 target 不是对象：           
        Object.getOwnPropertyDescriptor()不报错，返回 undefined        
        Reflect.getOwnPropertyDescriptor()会抛出错误，表示参数非法

### Reflect.isExtensible(target)

返回一个布尔值，表示当前对象是否可扩展

-   如果参数不是对象        
    Object.isExtensible 会返回 false，非对象不可扩展        
    Reflect.isExtensible 会报错        

### Reflect.preventExtensions(target)

用于让一个对象变为不可扩展，返回一个布尔值，表示是否操作成功

-   如果参数不是对象           
    Object.preventExtensions 在 ES5 环境报错，在 ES6 环境返回传入的参数           
    Reflect.preventExtensions 会报错       

### Reflect.ownKeys(target)

用于返回对象的所有属性，等同于 Object.getOwnPropertyNames 与 Object.getOwnPropertySymbols 之和

-   如果 Reflect.ownKeys()方法的第一个参数不是对象，会报错
