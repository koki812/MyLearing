# object 常用方法

-   Object.is(obj1, obj2): 判断两个值是否严格相等，类似于 === 的比较，不同之处只有两个：一是+0 不等于-0，二是 NaN 等于自身。

-   Object.assign(target, ...sources): 用于将源对象的所有可枚举属性复制到目标对象中（ target ），并返回目标对象。

    1. 如果目标对象中已有相同的属性名，则后面的属性值会覆盖前面的。
    2. 如果只有一个参数，会直接返回该参数
    3. 如果该参数不是对象，则会先转成对象，然后返回。
    4. undefined 和 null 无法转成对象，所以如果它们作为参数，就会报错。
    5. 如果非对象参数出现在源对象的位置（即非首参数），那么这些参数都会转成对象，如果无法转成对象，就会跳过。
    6. 如果 undefined 和 null 和其他类型的值（即数值、字符串和布尔值）不在首参数，不会报错。除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。
    7. 拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性，但拷贝属性名为 Symbol 值的属性），也不拷贝不可枚举的属性。

        注意：

        - 浅拷贝：如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用
        - 同名属性的替换
        - 数组的处理：用来处理数组，会把数组视为对象
        - 取值函数的处理：只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

-   Object.getOwnPropertyDescriptors()： 返回指定对象所有自身属性（非继承属性）的描述对象。

-   Object.getPrototypeOf(obj): 返回对象的原型。

-   Object.setPrototypeOf(obj, prototype): 设置对象的原型为指定的原型对象。

-   Object.keys(obj): 返回一个包含对象自身的所有可枚举属性的键名的数组。可供 for...of 循环使用

-   Object.values(obj): 返回一个包含对象自身的所有可枚举属性的值的数组。

    1. 会过滤属性名为 Symbol 值的属性。
    2. 参数是一个字符串，会返回各个字符组成的一个数组

-   Object.entries(obj): 返回一个包含对象自身的所有可枚举属性的键值对的数组。每个键值对是一个数组，第一个元素是键名，第二个元素是对应的值。可将对象转为 Map 结构。如果原对象的属性名是一个 Symbol 值，该属性会被忽略。

-   Object.fromEntries()： Object.entries()的逆操作，用于将一个键值对数组转为对象。

-   Object.hasOwnProperty(prop): 判断对象是否具有指定的属性，返回一个布尔值。

-   Object.hasOwn()：判断是否为自身的属性，可以接受两个参数，第一个是所要判断的对象，第二个是属性名。

    -   对于不继承 Object.prototype 的对象不会报错，而 hasOwnProperty()是会报错的。

-   Object.getOwnPropertyNames(obj): 返回一个包含对象自身的所有属性（不包括原型链上的属性）的数组。

-   Object.create(prototype, propertiesObject): 使用指定的原型对象创建一个新对象，并可选择性地为新对象设置属性。

-   Object.freeze(obj): 冻结对象，阻止对对象进行修改（添加、删除属性，修改属性值）。

-   Object.seal(obj): 密封对象，阻止对对象添加和删除属性，但允许修改属性值。

# 遍历对象属性的语法结构

## for...in

循环适用于遍历对象的所有可枚举属性，包括自身属性和原型链上的属性。
一般用于遍历对象的属性并执行相应操作。

-   循环不会遍历对象的 Symbol 类型属性，也不会遍历对象的不可枚举属性。如果想要遍历所有属性，包括 Symbol 类型和不可枚举属性，可以使用 Object.getOwnPropertyNames() 或者 Reflect.ownKeys()。

```javascript
// 使用for...in循环遍历对象属性
for (const key in obj) {
    // 检查属性是否来自于对象本身，而不是继承而来的
    if (obj.hasOwnProperty(key)) {
        console.log(`${key}: ${obj[key]}`);
    }
}
```

## Object.keys()

适用于遍历对象自身的可枚举属性的键名。只需要遍历对象自身的属性

```javascript
Object.keys(userData)
      .filter((key) => key !== "phoneNumber")
      .some((key) => userData[key as keyof IUserStaffProps] === "")
```

## Object.values()

适用于遍历对象自身的可枚举属性的值。只需要遍历对象自身的属性值

```javascript
Object.values(userData).some((item) => item === "");
```

## Object.entries()

适用于遍历对象自身的可枚举属性的键值对。需要同时遍历对象的属性和对应的属性值

```javascript
Object.entries(userData).some(
    ([key, value]) => key !== "phoneNumber" && value === ""
);
```
