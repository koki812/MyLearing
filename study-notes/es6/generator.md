# Generator

## 基本概念

1. Generator 函数是一个状态机，封装了多个内部状态，每次调用 Generator 函数，都返回一个遍历器对象，可以依次遍历函数内部的每一个状态

2. Generator 函数的定义采用`function*`关键字，函数体内部使用`yield`表达式来定义不同的内部状态

3. 调用 Generator 函数会返回一个遍历器对象，用于遍历函数内部的状态每次调用遍历器对象的`next`方法，内部指针就会从上次停下的地方或函数开头开始执行，直到遇到下一个`yield`表达式或`return`语句

4. 执行过程： 调用`next`方法使得内部指针移动，从一个状态到下一个状态`next`方法返回一个对象，其中`value`属性表示当前状态的值，而`done`属性表示遍历是否结束

5. 星号位置： 在 Generator 函数的定义中，`function*`星号可以紧跟在`function`关键字后面，或者与函数名之间在不同位置的星号都是有效的

## yield 表达式

### Generator 函数的运行逻辑

1. 当遇到`yield`表达式时，函数会暂停执行，将紧跟在`yield`后面的表达式的值作为返回的对象的`value`属性值

2. 下一次调用`next`方法时，函数会继续执行，直到遇到下一个`yield`表达式

3. 如果没有再遇到新的`yield`表达式，函数会一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值作为返回的对象的`value`属性值

4. 如果函数内部没有`return`语句，则返回的对象的`value`属性值为`undefined`

### `yield`表达式的特点和使用

1. `yield`表达式后面的表达式只有在调用`next`方法并且内部指针指向该语句时才会执行这为 JavaScript 提供了手动的"惰性求值"的语法功能

2. `yield`表达式和`return`语句都能返回紧跟在语句后面的表达式的值，但是`yield`表达式具有位置记忆的功能函数内部可以执行多次`yield`表达式，但只能执行一次`return`语句

3. Generator 函数可以不使用`yield`表达式，这时就变成了一个单纯的暂缓执行函数，只有在调用`next`方法时函数才会执行

### 在普通函数中使用`yield`表达式的错误

1. `yield`表达式只能用在 Generator 函数内部，如果在普通函数中使用会导致语法错误

2. 在普通函数中，可以改用`for`循环来模拟遍历 Generator 函数中的`yield`表达式，从而避免语法错误

## 与 Iterator 接口的关系

1. Generator 函数作为遍历器生成函数：Generator 函数可以被赋值给对象的 `Symbol.iterator` 属性，从而使得该对象具有 Iterator 接口，可以使用 `for...of` 循环或者拓展运算符 `...` 进行遍历

2. 遍历器对象具有 Symbol.iterator 属性：Generator 函数生成的遍历器对象本身也具有 `Symbol.iterator` 属性，该属性指向遍历器对象生成函数，遍历器对象自己也可以被用于遍历将 Generator 函数赋值给对象的 `Symbol.iterator` 属性，可以使对象具有 Iterator 接口，从而实现遍历操作

## `next` 方法的参数

用于将值传递给 Generator 内部的上一个 `yield` 表达式

1. `yield` 表达式本身没有返回值，或者总是返回 `undefined`当在 Generator 函数中使用 `yield` 时，可以通过调用 `next` 方法并传入参数，将这个参数作为上一个 `yield` 表达式的返回值

2. 参数传递影响执行
   通过 `next` 方法的参数，可以在不同的执行阶段向 Generator 函数内部传递不同的值这样可以在每次恢复执行时，通过参数来调整函数的行为，从而影响生成器的执行流程

3. 通过 `next` 方法的参数，可以在 Generator 函数执行过程中灵活地控制流程，使其适应不同的场景和需求

## 在 Generator 函数中`for...of` 循环

1. 自动迭代 Generator 函数生成的迭代器对象，无需手动调用 `next` 方法

2. `break` 和 `return` 的影响：如果迭代器对象的 `next` 方法返回的对象中的 `done` 属性为 `true`，`for...of` 循环会中止，且不包括该返回对象

3. 将 `for...of` 循环与 Generator 函数结合，用于遍历无限序列

4. 通过在 Generator 函数中使用 `yield`，可以为任意对象添加遍历器接口，使其可以使用 `for...of` 循环进行遍历

5. 其他遍历方式，如扩展运算符 `...`、解构赋值以及 `Array.from` 方法，也会隐式调用迭代器接口

## Generator.prototype.throw()

Generator 函数返回的遍历器对象，都有一个 throw 方法，可以在函数体外抛出错误，然后错误会被内部的 try...catch 语句捕获

1. 错误的传递和捕获：在 Generator 函数体外使用 `throw()` 方法抛出的错误，可以在 Generator 函数体内用 `try...catch` 捕获同样地，Generator 函数体内使用 `throw` 关键字抛出的错误，也可以被 Generator 函数体外的 `try...catch` 语句捕获

2. 错误的传递与终止：一旦 Generator 函数体内的错误被捕获，继续执行 Generator 函数将会恢复正常，并执行到下一个 `yield` 表达式但是，如果错误未被捕获，Generator 函数的执行将终止，后续的 `yield` 表达式将不再执行

3. 错误的传递与 `next()` 方法：`throw()` 方法被捕获后，Generator 函数会附带执行到下一个 `yield` 表达式，此时等同于调用了一次 `next()` 方法

4. 错误的传递与 `throw` 关键字：与 `throw()` 方法不同，全局的 `throw` 关键字抛出的错误不会影响遍历器的状态，仍然可以继续执行 `next()` 方法

## Generator.prototype.return()

用于终止 Generator 函数的遍历并返回指定的值

1. 在 Generator 函数内部调用 `return()` 方法会终止当前的遍历，且返回一个包含指定值的对象，其中 `value` 属性即为传入的参数`done` 属性会变为 `true`，表示遍历结束

2. 如果在 `return()` 方法调用时没有提供参数，则返回值的 `value` 属性为 `undefined`

3. 如果 Generator 函数内部存在 `try...finally` 代码块，并且正执行 `try` 代码块时调用了 `return()` 方法，那么会立即进入 `finally` 代码块执行完 `finally` 代码块后，整个 Generator 函数会结束

## next()、throw()、return() 的共同点

作用都是让 Generator 函数恢复执行，并且使用不同的语句替换 yield 表达式

-   next()是将 yield 表达式替换成一个值
-   throw()是将 yield 表达式替换成一个 throw 语句
-   return()是将 yield 表达式替换成一个 return 语句

## `yield*` 表达式

用于在 Generator 函数内部委托遍历给另一个可迭代对象（比如 Generator 函数、数组、字符串等）
作用是可以在一个 Generator 函数中方便地使用另一个可迭代对象的值，而无需手动遍历

### `yield*` 表达式的常见用法

1. **委托给另一个 Generator 函数：**

```javascript
const generator1 = function* () {
    yield "a";
    yield "b";
};

const generator2 = function* () {
    yield* generator1(); // 委托 generator1 的遍历
    yield "c";
};

const gen = generator2();

console.log(gen.next().value); // 'a'
console.log(gen.next().value); // 'b'
console.log(gen.next().value); // 'c'
```

2. **委托给数组或字符串和其他可迭代对象**

3. **递归委托**

```javascript
const recursiveGenerator = (arr) => {
  if (arr.length === 0) {
    return;
  }
  yield arr[0];
  yield* recursiveGenerator(arr.slice(1)); // 递归委托自身遍历
};

const gen = recursiveGenerator([1, 2, 3]);

console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
```

-   如果一个对象的属性是 Generator 函数，可以简写成下面的形式

```javascript
// 使用简写形式定义对象属性为 Generator 函数
let obj = {
    *myGeneratorMethod() {
        // Generator 函数的内容
    },
};

// 使用完整形式定义对象属性为 Generator 函数
let obj = {
    myGeneratorMethod: function* () {
        // Generator 函数的内容
    },
};
```

## Generator 函数的 `this` 行为

1. **Generator 函数的实例**：Generator 函数返回的遍历器对象是 Generator 函数的实例，可以继承 Generator 函数的 `prototype` 对象上的方法。

```javascript
function* g() {}

g.prototype.hello = function () {
    return "hi!";
};

let obj = g();

obj instanceof g; // true
obj.hello(); // 'hi!'
```

2. **Generator 函数的 this 对象**：Generator 函数内部的 `this` 对象指向的是遍历器对象，而不是调用时的对象。在 Generator 函数中，无法通过 `this` 给遍历器对象添加属性，因为 Generator 函数总是返回遍历器对象。

```javascript
function* g() {
    this.a = 11;
}

let obj = g();
obj.next();
obj.a; // undefined
```

3. **Generator 函数与 new 命令**：Generator 函数不能与 `new` 命令一起使用，会导致错误。

```javascript
function* F() {
    yield (this.x = 2);
    yield (this.y = 3);
}

new F(); // TypeError: F is not a constructor
```

4. **绕过限制的方法**：如果希望 Generator 函数返回一个正常的对象实例，并且既可以使用 `next` 方法，又可以获取正常的 `this`，可以使用一些变通的方法。可以生成一个空对象，并使用 `call` 方法绑定 Generator 函数内部的 `this`，使得调用后的对象实例具有 Generator 函数的属性。

```javascript
function* F() {
    this.a = 1;
    yield (this.b = 2);
    yield (this.c = 3);
}

var obj = {};
var f = F.call(obj);

f.next(); // { value: 2, done: false }
f.next(); // { value: 3, done: false }
f.next(); // { value: undefined, done: true }

obj.a; // 1
obj.b; // 2
obj.c; // 3
```

另一种方法是使用 `F.prototype` 来创建对象实例，使得遍历器对象与实例对象统一。

```javascript
function* F() {
    this.a = 1;
    yield (this.b = 2);
    yield (this.c = 3);
}

var f = F.call(F.prototype);

f.next(); // { value: 2, done: false }
f.next(); // { value: 3, done: false }
f.next(); // { value: undefined, done: true }

f.a; // 1
f.b; // 2
f.c; // 3
```

最后，将 `F` 改成构造函数的形式，就可以使用 `new` 命令对其进行调用。

```javascript
function* gen() {
    this.a = 1;
    yield (this.b = 2);
    yield (this.c = 3);
}

function F() {
    return gen.call(gen.prototype);
}

var f = new F();

f.next(); // { value: 2, done: false }
f.next(); // { value: 3, done: false }
f.next(); // { value: undefined, done: true }

f.a; // 1
f.b; // 2
f.c; // 3
```
