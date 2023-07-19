## useContext

`const value = useContext(SomeContext)` 从组件顶层调用，来读取和订阅上下文  
`useContext`返回调用组件的上下文值  
`SomeContext`本身不保存信息，仅提供或从组件中读取的信息类型  
`<SomeContext.Provider>`位于 useContext 组件之上，若没有 provider 那么返回上下文的 dafault value  
`createContext`返回最新值，且上下文发生变化 react 会自动重新渲染并读取上下文组件

- tips：React 会自动重新渲染所有特定的上下文的子级，在接受提供者的 value 开始比较，若相同会跳过重新渲染并 memo，反之接收新的上下文值

## useId

生成可以传递给可访问属性的唯一的 id，从调用组件的'parent path‘生成  
`const id = userId（ ）` useId 不带任何参数，且返回唯一的 id 字符串  
不要将生成的 id 用于生成列表的 key 值
