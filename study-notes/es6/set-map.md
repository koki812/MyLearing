# Set

成员的值都是唯一的，没有重复的值。其本身是一个构造函数，用来生成 Set 数据结构

1. Set 函数接受一个数组 或者 具有 iterable 接口的其他数据结构 作为参数，用来初始化
2. Set 加入值的时候，不会发生类型转换（5 和"5"是两个不同的值）
3. Set 内部判断两个值是否不同，使用的算法：“Same-value-zero equality”

## Set 结构的实例属性

Set.prototype.constructor：构造函数，默认就是 Set 函数     
Set.prototype.size：返回 Set 实例的成员总数

## Set 实例的四个操作方法

Set.prototype.add(value)：添加某个值，返回 Set 结构本身   
Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功   
Set.prototype.has(value)：返回一个布尔值，表示该值是否为 Set 的成员   
Set.prototype.clear()：清除所有成员，没有返回值   

## Set 实例的四个遍历方法

Set.prototype.keys()：返回键名的遍历器   
Set.prototype.values()：返回键值的遍历器    
Set.prototype.entries()：返回键值对的遍历器   
Set.prototype.forEach()：使用回调函数遍历每个成员    

-   Set 的遍历顺序就是插入顺序，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。

-   Set 结构没有键名，只有键值（ 键名和键值是同一个值 ），所以 keys 方法和 values 方法的行为完全一致。

# WeekSet

WeakSet 结构也是不重复的值的集合，数组或类似数组的对象和任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。

-   与 Set 有两个区别:

1. WeakSet 的成员只能是对象和 Symbol 值，而不能是其他类型的值。   
2. WeakSet 中的对象都是弱引用,且其不可遍历（ 没有 size 属性 ）

## 方法

WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员，返回 WeakSet 结构本身。   
WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员，清除成功返回 true，如果在 WeakSet 中找不到该成员或该成员不是对象，返回 false。   
WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。   

# Map

不止数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构，都能作为 Map 构造函数的参数。

-   Set 和 Map 都可以用来生成新的 Map。

-   set 和 get 方法，内存地址是不一样，Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键

## Map 结构的实例属性

1. size 属性返回 Map 结构的成员总数
2. Map.prototype.set(key, value)，set 方法设置键名 key 对应的键值为 value，然后返回整个 Map 结构。如果 key 已经有值，则键值会被更新，否则就新生成该键。且 set 方法返回的是当前的 Map 对象（ 链式写法 ）
3. Map.prototype.get(key)，get 方法读取 key 对应的键值，如果找不到 key，返回 undefined
4. Map.prototype.has(key)，has 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中
5. Map.prototype.delete(key)，delete()方法删除某个键，返回 true。如果删除失败，返回 false
6. Map.prototype.clear()，clear()方法清除所有成员，没有返回值

## Map 结构的遍历方法

Map.prototype.keys()：返回键名的遍历器。   
Map.prototype.values()：返回键值的遍历器。   
Map.prototype.entries()：返回所有成员的遍历器。   
Map.prototype.forEach()：遍历 Map 的所有成员。   

-   Map 的遍历顺序就是插入顺序

-   Map 与 （ 数组、对象、JSON ）可以相互转换

## WeekMap

与 Map 区别

1. WeakMap 只接受对象（null 除外）和 Symbol 值作为键名，不接受其他类型的值作为键名
2. WeakMap 的键名所指向的对象，不计入垃圾回收机制
3. 没有遍历操作，也没有 size 属性
4. 无法清空，不支持 clear 方法。

-   键所对应的对象，可能会在将来消失。WeakMap 结构有助于防止内存泄漏。

## WeekRef

用于直接创建对象的弱引用，作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动失效。

-   deref()方法，如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回 undefined。

## FinalizationRegistry

用来指定目标对象被垃圾回收机制清除以后，所要执行的回调函数。

-   register()方法，用来注册所要观察的目标对象。
