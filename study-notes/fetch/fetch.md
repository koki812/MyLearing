# fetch（）

全局的 fetch()方法是用于发起获取资源的请求。
会返回一个 promise，promise 会在请求响应后被 resolve，并传回 Response 对象。
但是遇到网络错误（其中 HTTP 404 状态并不被认为是网络错误）时，fetch() 返回的 promise 是会被 reject，同时会传回 TypeError，这也可能因为权限或其他问题导致。
所以，fetch() 检查要包括 ：

1. promise 被 resolve
2. Response.ok 属性为 true

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
