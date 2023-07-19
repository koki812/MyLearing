### .ts 和.tsx 后缀的区别

TS 和 TSX  
.ts 表示为 TypeScript 文件  
.tsx 表示为 TypeScript 文件，但它同时还包含了 JavaScript XML（JSX）  
.ts 的文件，不支持 HTML 语法，会报错  
反之 .tsx 的文件，在遵循 TypeScript 的基础上，支持 JSX 语法  
所以使用时与要注意区分  
辅助的函数文件使用 .ts 即可  
React 组件方面，还是须使用.tsx

### reactnode 和 JsxElement

类组件类型定义：通过 render() 返回 ReactNode  
函数组件类型定义：返回 JSX.Element

### ts 强类型

问题不能将 xxx 类型的 unfined 属性分配给类型“IntrinsicAttributes & RouteProps”。
需要加判断，判断该变量是否为空，再去使用该变量
解决：

```
{routersItems.children?.map(
                  (childItems: IRouterProps, key: number) => {
                    return (
                      <Route
                        key={key}
                        path={childItems.path}
                        element={childItems.element}
                      />
                    );
                  }
                )}

```

## null 和 undefined 的区别

null: 是一个空值，被赋予的值为空，类型为对象  
undefined：未知的值，没有被赋予值或者对象属性不存在，类型为 undefined  
两者==但不=== 类型不一致

## 相等==和全等===

相等==

- ==两边值类型不一样时，先进行类型转换再比较
- ===两边类型不一致时，不进行类型转换，类型不同一定不等。

全等===

- 如果类型不同，不相等
- 如果两边都是数值型，并且是相同的值，那么相等
- 如果两边都是字符串，并且值一样也就是说每个位置的字符一样，那么相等
- 如果两边都是 true 或两边都是 false，那么相等
- 如果两边引用的是同一个对象，函数，地址等，那么相等
- 如果两边都是 Null 或者 两边都是 undefined，那么相等

# 枚举判断

## 字符串枚举判断

枚举类型的值，可以是字符串类型。
可以更容易被处理和调试，因为它们提供有意义/可调试的字符串。可以使用它们用于简单的字符串比较：

```
export enum LocalPathEnum {
  Delivery = "/grocery/delivery",
  PickUp = "/grocery/pickup",
}

```

```
${
            location.pathname === LocalPathEnum.PickUp && styles.active
          }
```
