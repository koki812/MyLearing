# Hooks 的用途

> 与状态的流转相关的：

- useState：管理组件内部的状态
- useReducer：管理更复杂的状态逻辑
- useContext：共享全局数据

> 与处理副作用相关的：

- useEffect

  - useEffectEvent：对 useEffect 能力的补充，用于在特定事件发生时执行副作用操作

  - useInsertionEffect： 对 useEffect 场景的补充，用于在 DOM 插入时执行操作

- useLayoutEffect：在浏览器 layout 和 paint 之后同步执行

> 与提高操作自由度相关的：

- useRef：保存引用，以便在组件渲染之间保持持久化值

  > 控制 useRef 防止其失控

  - useImperativeHandle：控制 useRef 的暴露

> 与性能优化相关的：

- useMemo：记忆化计算结果
- useCallback：记忆化函数，避免不必要的函数创建

> 与调试相关：

- useDebugValue：在 React 开发工具中显示自定义的调试值

> 减少性能优化心智负担

- useMemoCache：React 内部为 React Forget 提供缓存支持的编译器 Hook

> 并发相关 hook：降低更新的优先级

- useTransition：降低更新的优先级，以实现更流畅的界面响应
- useDeferredValue：推迟某些状态的更新，以降低更新的优先级

> 使现有的库兼容 React 的并发模式，允许 React 与外部数据源交互

- useMutableSource
- useSyncExternalStore

> 生成在服务端/客户端唯一的 id

- useId：标识元素，确保其唯一性

> 用于建立`<Suspense>`缓存

- useCacheRefresh：在数据更新时刷新缓存

> 优化表单提交 ( 围绕 form 标签的 action 属性 )

- useOptimistic
- useFormStatus
