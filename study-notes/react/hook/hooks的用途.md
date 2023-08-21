# Hooks 的用途

> 与状态的流转相关的：

- useState：管理组件内部的状态
- useReducer：管理更复杂的状态逻辑
- useContext：共享全局数据

> 与处理副作用相关的：

- useEffect

  - useEffectEvent：对 useEffect 能力的补充，用于在特定事件发生时执行副作用操作

    ```ts
    const Component = () => {
      useEffectEvent(
        // 监听滚动事件
        "scroll",
        // 事件回调
        (event) => {
          // 滚动时执行的操作
        }
      );
  
      return <div>...</div>;
    };
    ```

  - useInsertionEffect： 对 useEffect 场景的补充，用于在 DOM 插入时执行操作

    ```ts
    const Component = () => {
      useInsertionEffect(() => {
        // DOM 插入后执行的操作
      });
  
      return <div>...</div>;
    };
    ```

- useLayoutEffect：在浏览器 layout 和 paint 之后同步执行
  
    ```ts
    useLayoutEffect(() => {
      // componentDidMount
  
      return () => {
        // componentWillUnmount
      };
    }, []);
    ```

> 与提高操作自由度相关的：

- useRef：保存引用，以便在组件渲染之间保持持久化值

> 控制 useRef 防止其失控

- useImperativeHandle：控制 useRef 的暴露

    ```ts
    useImperativeHandle(ref, createHandle, [deps]);
    ```

  - ref: 被传入组件并被 ref 引用的 ref 对象

  - createHandle: 一个返回要暴露给父组件的实例值的函数

  - deps: 创建实例值的依赖数组

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

- useMutableSource ：大多数订阅外部数据源的场景

  ```ts
  // 创建可变源
  const mutableSource = createMutableSource(initialState);
  
  const Component = () => {
    // 订阅可变源
    const state = useMutableSource(mutableSource);
  
    return <div>{state.count}</div>;
  };
  
  // 更新可变源
  const updateMutableSource = (updatedState) => {
    mutableSource.setState(updatedState);
  };
  ```

- useSyncExternalStore：底层自定义订阅逻辑的能力,满足有更多定制需求的场景
  
  ```ts
  const Component = () => {
    const state = useSyncExternalStore(
      // 订阅函数
      (subscribe) => {
        // ...订阅实现
        return () => {
          // 取消订阅
        };
      },
      // 获取快照状态
      () => snapshot
    );
  
    return <div>{state.count}</div>;
  };
  
  // 更新数据源
  const updateStore = (newState) => {
    // ...更新数据源
  };
  ```

> 生成在服务端/客户端唯一的 id

- useId：标识元素，确保其唯一性

> 用于建立`<Suspense>`缓存

- useCacheRefresh：在数据更新时刷新缓存

  ```ts
  const { refreshCache, cacheUpdated } = useCacheRefresh();
  ```

- refreshCache - 调用此方法通知缓存已刷新,触发重新渲染

- cacheUpdated - 一个 boolean 值,表示缓存是否已刷新

> 优化表单提交 ( 围绕 form 标签的 action 属性 )

- useOptimistic：在数据还没有真正更新到服务器的时候,先在本地展示更新后的结果

  ```ts
  const [optimistic, setOptimistic] = useOptimistic();
  ```

- useFormStatus：跟踪表单的提交状态,是否正在提交,是否提交成功或者失败等

  ```ts
  const { isSubmitting, isSubmitted, submit } = useFormStatus();
  ```
