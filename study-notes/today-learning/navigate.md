# Method

## `clearInterval()`，`setInterval()`

`clearInterval()` 方法是用于取消通过 `setInterval()` 函数创建的定时器
`setInterval()` 方法来定期执行某个函数，使用 `clearInterval()` 方法来停止该定时器的执行

- 基本用法：

```javascript
const intervalId = setInterval(function () {
  // 这里放定时执行的代码
}, delay);

// 在需要的时候停止定时器
clearInterval(intervalId);
```

## toFixed（）

`toFixed()` 是用于格式化数字为固定小数位数的方法，可以应用于数值类型，返回一个表示特定小数位数的字符串

### 注意

1. `toFixed()` 的参数是表示要保留的小数位数，会四舍五入到指定的小数位数

2. 返回值是一个字符串，不是一个数值

3. 如果原始数字本身就是整数，调用函数也会在末尾添加指定数量的小数位数，用零填充

4. `toFixed()` 不会改变原始数字，而是返回一个新的字符串

## navigate()

```ts
const navigate = useNavigate();
```

`navigate()` 是一个常用于导航或路由跳转的函数，在应用内部不同的页面之间进行跳转

两个参数：

1. 第一个参数是要导航到的 URL 地址，通常是字符串类型，表示要跳转的路径

2. 第二个参数是一个配置对象，可以包含额外的选项或数据。这取决于所使用的路由库，有些路由库可能支持在导航过程中传递状态或参数

## RefObject

用于在函数组件中保存对 DOM 节点或其他对象的引用，通常与 useRef 钩子一起使用，用于获取组件的实例或访问 DOM 元素

```ts
import React, { useRef } from "react";

export const MyComponent = () => {
  // 创建一个 RefObject
  const myRef = useRef(null);

  // 将 myRef 绑定到一个 DOM 元素
  const handleClick = () => {
    myRef.current.focus(); // 访问 DOM 元素的方法
  };

  return (
    <div>
      <input ref={myRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
};
```

### 访问 DOM 元素的方法

通过 `RefObject` 或者 `ref` 属性，访问 DOM 元素的方法

1. **获取焦点或失去焦点**

   ```ts
   myRef.current.focus(); // 让元素获取焦点
   myRef.current.blur(); // 让元素失去焦点
   ```

2. **改变文本内容或值**

   ```ts
   myRef.current.innerText = "新的文本内容";
   myRef.current.value = "新的输入框值";
   ```

3. **设置样式属性**

   ```ts
   myRef.current.style.backgroundColor = "red";
   myRef.current.style.fontSize = "16px";
   ```

4. **添加或移除 CSS 类名**

   ```ts
   myRef.current.classList.add("new-class");
   myRef.current.classList.remove("old-class");
   ```

5. **获取或设置属性值**

   ```ts
   const inputValue = myRef.current.value; // 获取输入框的值
   myRef.current.setAttribute("data-id", "123"); // 设置自定义属性
   ```

6. **监听事件**

   ```ts
   myRef.current.addEventListener("click", handleClick);
   myRef.current.removeEventListener("click", handleClick);
   ```

7. **触发事件**

   ```ts
   myRef.current.dispatchEvent(new Event("customEvent"));
   ```

8. **获取尺寸和位置信息**

   ```ts
   const width = myRef.current.offsetWidth; // 获取元素宽度
   const height = myRef.current.offsetHeight; // 获取元素高度
   const rect = myRef.current.getBoundingClientRect(); // 获取元素相对视口的位置信息
   ```
