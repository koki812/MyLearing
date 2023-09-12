# 泛型`<T>`

> 泛型（Generics）能够编写可重用、类型安全的代码
> 泛型允许定义函数、类、接口等数据结构时使用类型参数（通常表示为`<T>`），这些类型参数可以在实际使用时被替代为具体的类型

1. **泛型函数**：

   ```tsx
   const identity = <T,>(arg: T): T => {
     return arg;
   };

   const result = identity<string>("Hello, TypeScript!"); // 指定泛型类型为string

   const numberResult = identity(42); // TS会自动推断泛型类型为number
   ```

2. **泛型类**：

   ```tsx
   class Box<T> {
     private value: T;

     constructor(value: T) {
       this.value = value;
     }

     getValue(): T {
       return this.value;
     }
   }

   const numberBox = new Box<number>(10);

   const stringBox = new Box("Hello, TypeScript!");
   ```

3. **泛型接口**：

   ```tsx
   interface Pair<T, U> {
     first: T;
     second: U;
   }

   const pair: Pair<number, string> = {
     first: 1,
     second: "two",
   };
   ```

4. **泛型约束**：

   ```tsx
   const printLength = <T extends { length: number }>(obj: T): void => {
     console.log(`Length: ${obj.length}`);
   };

   const str = "Hello, TypeScript!";
   printLength(str); // 输出: Length: 17

   const num = 42;
   // 下面这行会产生编译错误，因为number类型没有length属性
   // printLength(num);
   ```

5. **多个泛型参数**：

   ```tsx
   const merge = <T, U>(a: T, b: U): [T, U] => {
     return [a, b];
   };

   const merged = merge("Hello", 42);
   ```
