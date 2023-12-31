# Type Operator

## 断言 as any

as any 是类型断言。它将一个值强制转换为 any 类型，将取消 TypeScript 对该值的类型检查          
使用 as any 可以绕过类型检查，可能会导致类型安全问题。         

-   as any 主要用于解决特殊情况下的类型不匹配问题或临时性的类型转换

## keyof

keyof 是索引类型查询操作符。获取一个对象类型的所有属性名组成的联合类型。        
当想要使用对象的属性名作为类型时，可以使用 keyof，其可以在泛型和条件类型中引用对象的属性名类型。         

-   主要用于在类型声明中引用对象的属性名类型。

## typeof

在 TypeScript 中，typeof 可以用作类型查询和类型守卫。        
类型查询：用于获取类型的字符串表示         
类型守卫：用于在运行时检查表达式的类型           

## valueOf

valueOf() 是 JavaScript 中对象的一个方法，返回对象的原始值（primitive value）。当对一个对象进行类型转换时，JavaScript 会自动调用对象的 valueOf() 方法来获取其原始值。

object.valueOf();     
object: 需要获取原始值的对象。            
valueOf() 方法的默认行为在不同类型的对象上可能会有所不同。通常情况下，JavaScript 原生对象会有一个默认的 valueOf() 方法，返回对象本身，而不是其原始值。可以通过重写 valueOf() 方法来自定义对象的原始值返回逻辑。

默认情况下，对象的 valueOf() 方法不会返回原始值，因此需要根据具体对象类型来决定是否需要重写该方法。

需要注意的是，当对象用于某些期望得到原始值的场景时，例如算术运算，JavaScript 会自动调用 valueOf() 方法来获取原始值。如果对象没有提供 valueOf() 方法，JavaScript 会返回对象本身。

## indexof

indexOf() 是 JavaScript 字符串和数组的方法，用于查找给定元素或子字符串在字符串或数组中第一次出现的索引位置。       

查找最后一次出现的索引位置，lastIndexOf() 方法。       

-   注意，如果查找的元素或子字符串不存在，indexOf() 和 lastIndexOf() 方法都返回 -1。

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

```javascript
const str = "Hello, World!";

console.log(str.endsWith("World!"));              // 输出 true，因为字符串以 "World!" 结尾
console.log(str.endsWith("World!", 13));          // 输出 true，因为字符串前13个字符以 "World!" 结尾
console.log(str.endsWith("Hello", 5));            // 输出 true，因为字符串前5个字符以 "Hello" 结尾
console.log(str.endsWith("Hello", str.length));   // 输出 true，因为整个字符串与 "Hello" 相等

console.log(str.startsWith("Hello"));             // 输出 true，因为字符串以 "Hello" 开头
console.log(str.startsWith("Hello", 5));          // 输出 true，因为字符串的前5个字符以 "Hello" 开头
console.log(str.startsWith("World", 7));          // 输出 true，因为字符串的第7个字符开始以 "World" 开头
console.log(str.startsWith("World", str.length)); // 输出 false，因为整个字符串不以 "World" 开头
```