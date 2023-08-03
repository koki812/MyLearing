# 遍历对象属性的语法结构

## for...in

循环适用于遍历对象的所有可枚举属性，包括自身属性和原型链上的属性。
一般用于遍历对象的属性并执行相应操作。

-   循环不会遍历对象的 Symbol 类型属性，也不会遍历对象的不可枚举属性。如果想要遍历所有属性，包括 Symbol 类型和不可枚举属性，可以使用 Object.getOwnPropertyNames() 或者 Reflect.ownKeys()。

## Object.keys()

适用于遍历对象自身的可枚举属性的键名。只需要遍历对象自身的属性

## Object.values()

适用于遍历对象自身的可枚举属性的值。只需要遍历对象自身的属性值

## Object.entries()

适用于遍历对象自身的可枚举属性的键值对。需要同时遍历对象的属性和对应的属性值

# object 常用方法

-   Object.keys(obj): 返回一个包含对象自身的所有可枚举属性的键名的数组。

-   Object.values(obj): 返回一个包含对象自身的所有可枚举属性的值的数组。

-   Object.entries(obj): 返回一个包含对象自身的所有可枚举属性的键值对的数组。每个键值对是一个数组，第一个元素是键名，第二个元素是对应的值。

-   Object.assign(target, ...sources): 用于将源对象的所有可枚举属性复制到目标对象中，并返回目标对象。如果目标对象中已有相同的属性名，则后面的属性值会覆盖前面的。

-   Object.hasOwnProperty(prop): 判断对象是否具有指定的属性，返回一个布尔值。

-   Object.getOwnPropertyNames(obj): 返回一个包含对象自身的所有属性（不包括原型链上的属性）的数组。

-   Object.getPrototypeOf(obj): 返回对象的原型。

-   Object.setPrototypeOf(obj, prototype): 设置对象的原型为指定的原型对象。

-   Object.create(prototype, propertiesObject): 使用指定的原型对象创建一个新对象，并可选择性地为新对象设置属性。

-   Object.freeze(obj): 冻结对象，阻止对对象进行修改（添加、删除属性，修改属性值）。

-   Object.seal(obj): 密封对象，阻止对对象添加和删除属性，但允许修改属性值。

-   Object.is(obj1, obj2): 判断两个值是否严格相等，类似于 === 的比较，但有一些特殊情况下的区别。

# 字符串方法

## startsWith

`string.startsWith(searchString[, position]);`
用于判断字符串是否以指定的子字符串 searchString 开头。

searchString: 要搜索的子字符串。
position (可选): 指定搜索的起始位置，默认为 0。
返回值：如果字符串以指定的子字符串开头，则返回 true，否则返回 false。

## endsWith

`string.endsWith(searchString[, length]);`
用于判断字符串是否以指定的子字符串 searchString 结尾。

length (可选): 指定搜索的结束位置，默认为字符串的长度。
返回值：如果字符串以指定的子字符串结尾，则返回 true，否则返回 false。
