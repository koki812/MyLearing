## useLocation()

useLocation 的 hook 可以返回当前的 location 对象

```
{` ${styles.link} ${
            location.pathname === "/grocery/delivery" && styles.active
          }`}


```

# useEffect Hooks

### 参数 1:箭头函数()=>{}，在真正渲染 html 之前会执行它

### 参数 2:

- 情况 1:没有，代表每次执行组件函数时，都会执行副作用函数

```
useEffect(() =>{} )
```

- 情况 2:[]空数组，代表副作用函数只会执行一次

```
useEffect(() =>{},[] )
```

- 情况 3:[依赖项]，依赖项变化时，副作用函数会执行

```
useEffect(() =>{},[依赖项] )
```

```
  useEffect(() => {
    document.title = `${name} ${YearResult} 的档案`;
  }, [name, YearResult]);

```

# useState Hooks

参数:数据的初始值  
返回值:[a,b]  
a:状态数据  
b:方法,修改状态数据的方法 setXX()

```
const [a,b] = useState(初始值)
```

```
  const [age, setAge] = useState<number>(0);//setAge(age + 1);
  const [year, setYear] = useState<number>(2000);//  setYear(year + age);
  const [name, setName] = useState<string>("jack");
```

## useMemo

调用函数，缓存返回的结果  
在重新渲染之间，缓存返回结果，每次渲染都会和依赖项比较，直到依赖项发生变化  
useMemo 不会使得第一次渲染更快，只是帮助减少不必要的 update  
只能在顶层组件或者自己的 hook 中调用，不允许在循环和条件中调用  
参数 1: `()=>{}`  
参数 2： 依赖项

```
useMemo(() => { },[dependency]);
```

## useContext

`const value = useContext(SomeContext)` 从组件顶层调用，来读取和订阅上下文  
`useContext`返回调用组件的上下文值  
`SomeContext`本身不保存信息，仅提供或从组件中读取的信息类型  
`<SomeContext.Provider>`位于 useContext 组件之上，若没有 provider 那么返回上下文的 dafault value  
`createContext`返回最新值，且上下文发生变化 react 会自动重新渲染并读取上下文组件

- tips：React 会自动重新渲染所有特定的上下文的子级，在接受提供者的 value 开始比较，若相同会跳过重新渲染并 memo，反之接收新的上下文值

```
<!-- 父组件 -->
    <props.ChildContext.Provider value={props.YearResult}>
        <Child />
    </props.ChildContext.Provider>
<!-- 子组件 -->
  const ChildContext = createContext(2000);
  export const Child = React.memo(() => {
  const child = useContext(ChildContext);
  return (
    <div>
      <span className={styles.default}>出生年份为：{child}</span>
    </div>
  );
});
```

## useId

生成可以传递给可访问属性的唯一的 id，从调用组件的'parent path‘生成  
`const id = userId（ ）` useId 不带任何参数，且返回唯一的 id 字符串  
不要将生成的 id 用于生成列表的 key 值

```
const nameId = useId();
<input type="text" defaultValue={name} id={nameId} />
<input type="submit" id={nameId} />
```

运行结果：![Alt text](image-5.png)

## useRef

引用渲染不需要的值`const ref = useRef（initialValue）`，返回单个属性的对象
在顶层调用以声明一个或多个引用
参数：`initialValue`是 ref 对象的 current 属性的初始值，可以是任何类型的值（null 也可以），初次渲染之后被忽略

```
const ref = useRef(0);

  const handleAgeAdd = useCallback(() => {
    ref.current = ref.current + 1;
    setAge(age + 1);
    alert("你已经提交" + ref.current + "次" + name + "的档案");
  }, [age, name]);
```

##### tips：

- 除初始化外，不要在渲染期间读写，且更改 ref 不会触发重新渲染，若必须则用 state 读写，所以 ref 适合存储不影响组件视图输出的信息
- ref 的 current 的属性是可变的，但更改后不会重新渲染组件；
- ref 可以在重新渲染之间存储信息；
- 更改 ref 不会触发重新渲染
- ref 对于每个组件来说都是本地的
