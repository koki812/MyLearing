# symbol

1. ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值
2. symbol 属于 JavaScript 语言的原生数据类型之一
   其他数据类型是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、大整数（BigInt）、对象（Object）

## Symbol 值通过 Symbol()函数生成

对象的属性名有两种类型：一、字符串，二、 Symbol 类型

-   注意
    Symbol()函数前不能使用 new 命令，否则会报错。因为生成的 Symbol 是一个原始类型的值，不是对象，所以不能使用 new 命令来调用（ Symbol 值不是对象，所以也不能添加属性 ）

## Symbol()函数

接受一个字符串作为参数，表示对 Symbol 实例的描述

-   Symbol 的参数是一个对象，就会调用该对象的 toString()方法，将其转为字符串，然后生成一个 Symbol 值

-   注意
    Symbol()函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的 Symbol 函数的返回值是不相等的
    Symbol 值不能与其他类型的值进行运算，会报错
    Symbol 值可以显式转为字符串，也可以转为布尔值，但是不能转为数值

## Symbol.prototype.description

实例属性 description，直接返回 Symbol 值的描述

```es6
const try = Symbol("koki");

sym.description; // "koki"
```

## 作为属性名

Symbol 值都是不相等的，只要 Symbol 值作为标识符，用于对象的属性名，不会出现同名的属性

-   Symbol 值作为对象属性名时，不能用点运算符
-   在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中
-   Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。

## 属性名的遍历

Symbol 值作为属性名，遍历对象的时候，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。

Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

## Symbol.for()，Symbol.keyFor()

Symbol.for() 创建全局共享的 Symbol 值，并与给定的 key 关联，如果已存在相同 key 的 Symbol，则返回已存在的 Symbol 值，否则创建一个新的 Symbol 值。

Symbol.keyFor() 获取通过 Symbol.for() 创建的全局共享的 Symbol 的关联 key，对于非全局 Symbol 则返回 undefined。

使用全局共享的 Symbol 可以在不同的上下文中共享 Symbol 值，在多个模块或不同的窗口/框架之间传递标识符时非常有用。

## 内置的 Symbol 值

Symbol.iterator: 用于定义对象默认迭代器的 Symbol。被用于支持 for...of 循环和其他使用迭代器的语法。

Symbol.asyncIterator: 用于定义对象默认异步迭代器的 Symbol。用于支持异步迭代器的 for-await-of 循环和其他使用异步迭代器的语法。

Symbol.match: 用于指定对象在执行 String.prototype.match() 时匹配的正则表达式的 Symbol。

Symbol.replace: 用于指定对象在执行 String.prototype.replace() 时替换文本的操作的 Symbol。

Symbol.search: 用于指定对象在执行 String.prototype.search() 时搜索匹配的 Symbol。

Symbol.split: 用于指定对象在执行 String.prototype.split() 时拆分字符串的 Symbol。

Symbol.hasInstance: 用于确定对象是否为构造函数的实例的 Symbol。

Symbol.isConcatSpreadable: 用于指定对象是否可展开为数组元素的 Symbol。

Symbol.unscopables: 用于指定对象在 with 块中排除的属性的 Symbol。

Symbol.species: 用于指定派生对象的构造函数的 Symbol。用于覆盖内置对象的默认构造函数，使派生对象具有相同的类型。

Symbol.toPrimitive: 用于将对象转换为原始值的 Symbol。

Symbol.toStringTag: 用于自定义对象的默认描述字符串的 Symbol。

Symbol.hasInstance: 用于确定对象是否为构造函数的实例的 Symbol。

Symbol.isRegExp: 用于确定对象是否为正则表达式的 Symbol。

Symbol.toPrimitive: 用于将对象转换为原始值的 Symbol。

Symbol.toStringTag: 用于自定义对象的默认描述字符串的 Symbol。
