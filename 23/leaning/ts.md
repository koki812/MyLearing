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
