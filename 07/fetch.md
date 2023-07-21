# fetch（）

fetch()是用于发起网络请求的方法。它使用了 Promise 对象来处理异步，可以从服务器获取资源，并返回给调用者。

-   fetch() 的使用方法： fetch(url, options)

1. url 是要请求的资源的 URL
2. options 是一个可选参数对象，用于指定请求的各种设置，例如请求的方法、请求头、身份验证等。
3. fetch() 方法返回一个 Promise 对象，可以通过 then() 方法处理，并且成功的响应，或通过 catch() 方法处理失败的响应。

## fetch() 的优点

1. 更加简洁和灵活：用法更加简洁，不需要手动设置回调函数，而是通过 Promise 对象来处理异步操作。
2. 内置的 JSON 解析：默认会将响应转换为 JSON 对象，方便处理返回的数据。
3. 支持跨域请求：可以发起跨域请求，但需要服务器端进行相应的配置。

### React 和 TypeScript 中使用`fetch()`的使用步骤

1. 使用`fetch`函数：

```
fetch(url, {
 method: " ", // *GET, POST, PUT, DELETE, etc.
 mode: " ", // no-cors, *cors, same-origin
 cache: " ", // *default, no-cache, reload, force-cache, only-if-cached
 credentials: " ", // include, *same-origin, omit
 headers: {
  "Content-Type": " ", // 'Content - Type ': 'application / x - www - form - urlencoded ',
 },
 redirect: " ", // manual, *follow, error
 referrerPolicy: " ", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
 body: JSON.stringify(data), // body data type must match "Content-Type" header
})
```

-   tips：  
    mode: "no-cors" 仅允许使用一组有限的 HTTP 请求头：  
    Accept  
    Accept-Language  
    Content-Language  
    Content-Type 允许使用的值为：application/x-www-form-urlencoded、multipart/form-data 或 text/plain

2. 定义一个异步函数，用于发送网络请求：

```
const postData = async(url: string, data: UrlPostProps) => {
 const response = await fetch(url, {...
 });
 return response.json();
}
```

3. 调用异步函数：

```
useEffect(() => {
    postData("url", {
      data（json）
    }).then((data) => {
      setUrlData(data);  //const [urlData, setUrlData] = useState<IUrlDataProps[]>([]);
    });
}, []);
```

4. 运行 React 应用，当组件被渲染时，异步函数将会被调用。

# fetch()方法运用

## Post 方法

```
 const postData = async (url: string, data: UrlPostProps) => {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  useEffect(() => {
    postData("https://testapi.yamimeal.com/api/Advertisement/advertisements", {
      languageCode: "zh-TW",
      latLang: { lat: 37, lng: -121 },
      pageLocation: 0,
    })
      .then((data) => {
        setUrlData(data);
      })
      .catch((err) => {
        console.error(err);
        throw new Error(err);
      });
  }, []);

```

## Get 方法

```
  const getData = async (url: string) => {
    const response = await fetch(url, {
      method: "GET",
    });
    return response.json();
  };

  useEffect(() => {
    getData(
      `https://testapi.yamimeal.com/api/merch/list?limit=10&page=1&deliveryType=1&lat=37&lng=-121`
    )
      .then((data) => {
        const results = data.result;
        setCardData(results);
      })
      .catch((err) => {
        console.error(err);
        throw new Error(err);
      });
  }, []);

```

-   fetch（）API 学习地址：<https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch#%E5%8F%82%E8%A7%81>

# 异步函数

## async & await & promise

async 和 await 是用于处理异步操作的关键字。通常与 Promise 对象一起使用。

-   async: async 关键字用于声明一个函数是异步函数。在异步函数中，可以使用 await 关键字暂停函数的执行，等待一个 Promise 对象的解析结果。异步函数会返回一个 Promise 对象，这个 Promise 对象的最终结果取决于异步函数内部 await 语句后面的 Promise 对象的解析结果。

-   await: await 关键字只能在异步函数内部使用。它可以暂停异步函数的执行，等待一个 Promise 对象的解析结果。当遇到 await 关键字时，异步函数会暂停执行，直到 await 后面的 Promise 对象解析为成功状态（resolved）并返回结果。然后，异步函数会继续执行，并将解析结果作为 await 表达式的值返回。

-   Promise 结果：Promise 对象表示一个异步操作的最终结果。它可以处于三种状态：pending（进行中）、resolved（已解决）和 rejected（已拒绝）。当一个 Promise 对象的异步操作成功完成时，它会进入 resolved 状态，并返回一个解析值。当一个 Promise 对象的异步操作失败或发生错误时，它会进入 rejected 状态，并返回一个拒绝原因。通过调用 Promise 对象的.then()方法或.catch()方法，可以处理 Promise 对象的解析结果或拒绝原因。

## useEffect 中的异步函数使用

useEffect 是用于在函数组件中处理副作用的 Hook，在组件渲染完成后执行，并在组件卸载时清除副作用。所以，它的回调函数不能直接声明为 async 函数，因此在 useEffect 中使用异步函数的常见方式是在回调函数内部定义一个异步函数，并使用立即执行函数将其调用。

```
useEffect(() => {
  const fetchData = async () => {};
}, []);
```

-   tips：

1. 与其他地方使用异步函数的不同之处在于，useEffect 内部的异步函数通常用于处理组件渲染后需要进行的异步操作，例如数据获取、订阅事件等。
2. 在 useEffect 的回调函数内部使用的异步函数需要设定为可取消的，在组件卸载时能够取消异步操作，防止可能的内存泄漏。这个点需要通过返回一个取消函数来实现，所以，需要注意处理异步操作的结果以及取消异步操作的情况。

# fetch（） 封装

1. 在 public 配置 appsetting.json

2. 在 src 下编写 appsetting.ts，写入接口并且将其定义给 appSettings，将 接口 Appsettings 类型设置为 window 未定义的 appSettings ，即定义的 AppSettings 类型被赋予 window 的 appSettings 类型

-   "(window as any)"这是一个类型断言，用于将"window"对象视为"any"类型。
    "any"类型是 TypeScript 中的特殊类型，允许将任何值赋给它，并且禁用对赋值的类型检查
    在这种情况下，通过使用"(window as any)"，代码告诉 TypeScript 编译器不对"window"对象进行任何类型检查。
    可以用于处理特定于浏览器的 API，但是 api 定义不包含在 TypeScript 类型定义中时，非常有效。

3. 封装 fetch（）

-   创建一个 fetch 异步函数，接收一个 url ，method，data？三个参数
-   在异步函数中定义 Appsetting（需要引入）
-   `return await fetch（url,{options}）`
-   在回调函数中，使用`response.json()`方法将响应体转换为 JSON 格式。
-   在`response.json()`方法的回调函数中，判断响应的状态码是否为 200，如果是则将 JSON 数据作为`resolve`的参数传递给`Promise`对象。
-   如果响应的状态码不是 200，则将错误信息作为`reject`的参数传递给`Promise`对象。
-   在回调函数中，如果发生了任何错误（如网络错误），则将错误信息作为`reject`的参数传递给`Promise`对象。
-   返回`Promise`对象，以便调用者可以通过`.then()`和`.catch()`方法处理成功和失败的情况。

4. 导出 method 异步函数，其接受两个参数：url 和可选的 data。函数内部调用异步函数 fetch，并传入了 url、"method"以及 data 作为参数。最后，函数返回 fetch 函数的执行结果。

5. 定义一个 Data 异步函数调用 method 异步函数，最后返回调用接口得到的数据 data

6. useEffect 函数获取数据。它调用 Data 函数，并传入数据对象作为参数。使用.then()方法来处理 Data 函数返回的 Promise 对象。当返回的 Promise 对象被解析时，useEffect 函数会被执行。

## 封装 fetch 的好处

封装 fetch 函数的好处有以下几点：

1. 简化代码量：将重复的代码逻辑抽象成一个函数，减少代码的冗余和重复。
2. 统一处理错误：统一处理网络请求的错误，例如网络连接失败、请求超时等。通过捕获异常或者返回特定的错误码来统一处理错误，避免在每个请求处都写相同的错误处理逻辑。
3. 简化参数传递：将请求的参数抽象成一个对象，通过传递对象的方式简化参数的传递。方便后续对请求参数的扩展和修改。
4. 便捷添加拦截器：便捷添加请求拦截器和响应拦截器，用于在发送请求和接收响应时进行一些额外的处理，例如添加请求头、处理响应数据等。
