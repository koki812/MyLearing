# Iterator（遍历器）

Iterator 是一种接口，为不同的数据结构提供统一的访问机制。
数据结构只要部署 Iterator 接口，就可以遍历操作。

## 作用

1. 为数据结构提供一个统一的访问接口
2. 数据结构的成员能够按某种次序排列
3. Iterator 接口主要供 遍历命令 for...of 循环 消费

## 遍历过程（遍历器对象本质上是指针对象）

（1）创建一个指针对象，指向当前数据结构的起始位置。

（2）第一次调用指针对象的 next 方法，将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的 next 方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的 next 方法，直到它指向数据结构的结束位置。

next 方法返回一个对象，表示当前数据成员的信息，该对象具有 value 和 done 两个属性

    -   value 属性返回当前位置的成员
    -   done 属性是一个布尔值，表示遍历是否结束，即是否还有必要再一次调用 next 方法

## makeIterator 函数

遍历器生成函数，作用是返回一个遍历器对象， makeIterator 生成的迭代器遍历数组元素           
使用 iterator.next()方法来获取迭代器的下一个值，直到迭代完成（即 done 属性为 true）        

## idMaker 函数

用于生成唯一标识符（ID）的函数            
返回一个遍历器对象（即指针对象），没有对应的数据结构            
调用 generateId.next().value 都会生成一个唯一的整数标识符            

## 默认 Iterator 接口

默认 Iterator 接口是一种统一的访问机制，为所有数据结构提供了在 for...of 循环中遍历的能力，使得数据结构可以被称为“可遍历的”（iterable）。

1. 数据结构的默认 Iterator 接口：

    - 默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性上。         
    - Symbol.iterator 属性是一个函数，执行该函数将返回一个遍历器对象。          

2. 原生具备 Iterator 接口的数据结构（即默认部署了 Iterator 接口）：

    - Array（数组）：

        直接使用 for...of 循环遍历数组中的元素，遍历顺序按照元素被添加进数组的顺序                 
        使用索引访问元素                
        使用数组提供的各种方法如 forEach、map、filter 等            

    - Map（映射）：

        使用 for...of 循环遍历 Map 的键值对，遍历顺序与成员添加的顺序一致                 
        使用 get(key) 方法获取值           
        使用 set(key, value) 方法设置值           

    - Set（集合）：

        使用 for...of 循环遍历 Set 中的元素，遍历顺序与成员添加的顺序一致             
        使用 add(value) 方法添加元素          
        使用 delete(value) 方法删除元素           

    - String（字符串）：

        使用 for...of 循环遍历字符串的每个字符，每次迭代返回一个字符            
        使用索引访问字符         
        使用字符串的方法如 split、charAt 等              

    - TypedArray（类型化数组）：

        使用 for...of 循环遍历类型化数组中的元素          
        类型化数组是一种类似数组的对象，存储的是固定类型的数据，如 Int32Array、Float64Array 等               

    - 函数的 arguments 对象

        使用 for...of 循环遍历函数的参数             
        arguments 对象包含函数调用时传递的所有参数，类似数组但不具备数组方法          

    - NodeList 对象（类似数组的对象）

        使用 for...of 循环遍历 NodeList 中的 DOM 元素             
        NodeList 是一种类似数组的对象，表示一组 DOM 元素              

3. 对象（Object）的遍历器接口：

    - 对象没有默认部署 Iterator 接口，需要手动在 Symbol.iterator 属性上部署遍历器生成函数              
    - 对象的属性遍历顺序是不确定的，因此需要手动指定遍历顺序            
    - 可以为对象自定义 Iterator 接口，然后才能使用 for...of 循环遍历对象
    - 也可以使用 Object.keys() 方法获取键名数组，然后遍历数组

4. 类似数组的对象部署遍历器接口的方法：

    - 对于类似数组的对象，可以通过引用数组的 Symbol.iterator 方法作为其遍历器接口
    - 对于 NodeList 对象，原本具有遍历接口，也可以改用数组的 Symbol.iterator 属性

5. 遍历器接口的作用：

    - 使数据结构具备可被 for...of 循环调用的能力。
    - 可以使用 for...of 循环或 while 循环遍历数据结构中的元素。

## 调用 Iterator 接口的场合

默认调用 Iterator 接口（即 Symbol.iterator 方法）

（1）解构赋值            
（2）扩展运算符（`...`）             
（3）yield\*          
（4）for...of         
（5）Array.from()          
（6）Map(), Set(), WeakMap(), WeakSet()           
（7）Promise.all()，Promise.race()              

## 遍历器对象的 return()，throw()

除了具有 next()方法，还可以具有 return()方法和 throw()方法。

    -   return() 方法在 for...of 循环提前退出时调用（通常是因为出错，或者有 break 语句），用于清理或释放资源，必须返回一个对象

    -   throw() 方法主要与 Generator 函数一起使用

    -   如果自己写遍历器对象生成函数，那么 next()方法是必须部署的，return()方法和 throw()方法是否部署是可选的

### 与其他遍历语法的比较

for 循环：传统的遍历方式，相对麻烦               
forEach 方法：简化了遍历过程，但无法使用 break、continue 等控制流程的语句            
for...in 循环：适用于遍历对象的键名，但不适用于遍历数组               
for...of 循环：语法简洁，适用于遍历任何具有 Iterator 接口的数据结构，支持 break、continue 等控制流程的语句，简化了遍历过程。           
