# 数组的常用方法

## Array.prototype.forEach()

用于遍历数组的每个元素并执行指定的回调函数
`array.forEach(callback[currentValue[, index[, array]]](, thisArg));`
callback: 回调函数，用于处理数组中的每个元素。接收三个参数：
currentValue: 数组当前遍历到的元素的值。
index (可选): 数组当前遍历到的元素的索引。
array (可选): 被遍历的数组本身。
thisArg (可选): 在执行 callback 回调函数时，用作 this 的值。

-   forEach() 不会返回一个新的数组，而是对原数组进行遍历操作。
-   forEach() 方法对数组的每个元素执行一次回调函数，但不会改变原数组的内容。
-   不可在循环中使用 break 或 return 来提前终止遍历。

## Array.prototype.map()

map() 方法对数组的每个元素执行一次回调函数，并将回调函数的返回值作为新数组的元素。

-   map() 返回一个新的数组，原始数组保持不变。

## Array.prototype.filter()

filter() 方法对数组的每个元素执行一次回调函数，根据回调函数返回的布尔值来决定是否保留该元素。

-   filter() 返回一个新的数组，包含符合条件的元素，原始数组保持不变。

## Array.prototype.reduce()

`array.reduce(callback[accumulator, currentValue[, index[, array]]](, initialValue));`
reduce() 方法对数组的每个元素执行一次回调函数，并将回调函数的返回值累积到一个最终结果中。

accumulator: 累积的结果，每次迭代都会更新。
initialValue (可选): 初始的累积值，如果提供了该参数，则第一次调用回调函数时，accumulator 的初始值为 initialValue，否则为数组的第一个元素。

-   用于对数组的元素进行累加或计算最终结果。

## Array.prototype.find()

`array.find(callback[element[, index[, array]]](, thisArg));`
find() 方法对数组的每个元素执行一次回调函数，返回第一个满足回调函数条件的元素，如果没有找到满足条件的元素，则返回 undefined。

element: 数组当前遍历到的元素的值。

-   find() 用于查找数组中满足条件的第一个元素。如果没有找到，则返回 undefined。

## Array.prototype.findIndex()

findIndex() 方法对数组的每个元素执行一次回调函数，返回第一个满足回调函数条件的元素的索引，如果没有找到满足条件的元素，则返回 -1。

-   查找数组中满足条件的第一个元素的索引。如果没有找到，则返回 -1

## Array.prototype.includes()

`array.includes(searchElement[, fromIndex]);`
includes() 方法用于判断数组是否包含指定的元素，返回一个布尔值。如果数组包含该元素，则返回 true，否则返回 false。

searchElement: 要搜索的元素。
fromIndex (可选): 搜索的起始索引位置，默认为 0。

-   判断数组是否包含指定的元素，返回一个布尔值。

## Array.prototype.some()

some() 方法在数组的每个元素上都执行一个指定的测试条件（由回调函数指定）

当数组中至少有一个元素满足测试条件时，some() 方法返回 true。
如果数组中没有元素满足测试条件，some() 方法返回 false。
如果数组为空（没有元素），则 some() 方法也会返回 false。

-   some() 方法只要有一个元素满足条件就返回 true，所有元素都不满足条件才返回 false。

## Array.prototype.every()

every() 方法在数组的每个元素上都执行一个指定的测试条件（由回调函数指定）。

当数组的每个元素都满足测试条件时，every() 方法返回 true。
如果数组中至少有一个元素不满足测试条件，every() 方法返回 false。
如果数组为空（没有元素），则 every() 方法也会返回 true。

-   every() 方法要求所有元素都满足条件才返回 true，只要有一个不满足就返回 false。

## Array.from()

一个静态方法，它可以用于从一个可迭代对象或类数组对象创建一个新的数组
`Array.from(iterable[, mapFn[, thisArg]]);`

iterable: 可迭代对象或类数组对象，例如字符串、数组、Set、Map 等。
mapFn (可选): 一个回调函数，用于对数组中的每个元素进行处理后返回新数组的元素。该回调函数可以接收三个参数：

-   返回一个新的数组，原始可迭代对象或类数组对象保持不变。
