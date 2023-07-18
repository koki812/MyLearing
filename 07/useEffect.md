# useEffect Hooks

### 参数1:箭头函数()=>{}，在真正渲染 html 之前会执行它

### 参数2:

* 情况1:没有，代表每次执行组件函数时，都会执行副作用函数
```
useEffect(() =>{} )
```
* 情况2:[]空数组，代表副作用函数只会执行一次

```
useEffect(() =>{},[] )
```
* 情况3:[依赖项]，依赖项变化时，副作用函数会执行

```
useEffect(() =>{},[依赖项] )
```

# useState Hooks

参数:数据的初始值  
返回值:[a,b]  
a:状态数据  
b:方法,修改状态数据的方法setXX()  

```
const [a,b] = useState(初始值)
```

# css 伪元素

## before & after

伪元素不是真正存在在 html 页面里面的元素，但是伪元素的表现和行为却能和页面元素一样，css 也可以对其操控，同时伪元素会继承原本元素的属性
伪元素使用两个冒号：：开头
eg:
::before 在原本的元素之前加入内容
::after 在原本的元素之后加入内容

tips：
伪元素一定要具备 content 属性，甚至 content：“”；也是可以存在的
还可以通过 attr 获取内容元素的属性值，如：content：attr（href）等
也可以放入图片，content：url（）；

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

