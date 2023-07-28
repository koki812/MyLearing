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

## 封装请求

1. 定义一个 async function 异步函数，它可以接受 url 和 options 作为参数。在函数内部，使用 await 关键字等待 fetch 函数返回的 Promise 对象。
2. 响应的状态码不是 200（即请求失败），这时候抛出一个错误。反之，使用 await 关键字等待响应对象的 json()方法，将响应体解析为 JSON 数据。
3. 返回解析后的数据。

# fetch 封装步骤

1. 在 public 文件夹内创建 appsetting.json。

2. 在.json 写入需要存储和表示数据

```
{
  "serverUrl": "https://testapi.yamimeal.com",
  "jsVersion": "3.8.0",
  "sourceSystem": "web_customer",
  "languuagecode": "zh-TW"
}
```

3. 在 src 文件夹下创建 appsetting.ts,定义接口类型并将发起请求 json 的数据，将返回的结果定义给全局环境中 appSettings 对象

```
export interface AppSettings {
  serverUrl: string;
  jsVersion: string;
  sourceSystem: string;
  languagecode: string;
}

export const InitialAppSetting = async () => {
  if ((window as any).appSettings) return (window as any).appSettings;

  await fetch("../appsetting.json", {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  })
    .then((result) => result.json())
    .then((result: AppSettings) => ((window as any).appSettings = result));
};

```

4. 在 src 文件夹下创建 AppHook.ts，组件可以使用该 Hook 来判断数据是否加载完成，并根据 isLoad 状态进行相应的渲染处理

```
export const useAction = () => {
  const [isLoad, setIsLoad] = useState<boolean>(false);

  useEffect(() => {
    InitialAppSetting().then(() => setIsLoad(true));
  }, []);

  return { isLoad };
};

```

5. 在 App.tsx 中判断是否载入

```
export const App = () => {
  const { isLoad } = useAction();

  return isLoad ? <NavPage /> : <></>;
};

```

6. 创建 api 文件夹

7. 放入接口封装的方法

```
import { AppSettings } from "../appsettings";

export const Base = async <T>(
  url: string,
  method: "post" | "get",
  data?: object
) => {
  const settings = (window as any).appSettings as AppSettings;

  return await fetch(`${settings.serverUrl}${url}`, {
    method: method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      js_version: settings.jsVersion,
      source_system: settings.sourceSystem,
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((result: T) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
};

export const Get = async <T>(url: string) => {
  return Base<T>(url, "get");
};

export const Post = async <T>(url: string, data?: object) => {
  return Base<T>(url, "post", data);
};
```

8. 封装需要调取数据的方法

```
export const GetCardListData = async (
  params: ICardApiProps
): Promise<ITxtCardData> => {
  return await Get(
    `/api/merch/list?limit=${params.limit}&page=${params.page}&deliveryType=${params.deliveryType}&lat=${params.lat}&lng=${params.lng}`
  );
};

export const GetSwiperImgData = async (
  data: UrlPostApiProps
): Promise<IUrlDataProps[]> => {
  return await Post("/api/Advertisement/advertisements", data);
};

```

9. 在 hook 中调用封装好的方法传入参数获取数据

```
  useEffect(() => {
    GetCardListData({
      limit: 10,
      page: 1,
      deliveryType: 1,
      lat: 37,
      lng: -121,
    })
      .then((data) => {
        const { restaurants } = data;
        data && data.restaurants.length && setCardData(restaurants);
      })
      .catch((err) => {
        console.error(err);
        throw new Error(err);
      });
  }, []);

  useEffect(() => {
    GetSwiperImgData({
      languageCode: setting.languagecode,
      latLang: latlng,
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

## 在封装过程中遇到的问题

1. 关于 ts 中<T>泛型的使用

-   在更改 function 声明式为箭头函数时，在箭头函数中定义泛型与 function 声明式不同，所以在箭头函数中使用<T>定义泛型会报错
    导致这个问题原因：泛型语法与 JSX 的语法冲突，导致 TS 解析成 JSX 从而产生 unexpected token 的问题。  
     解决方法：
    1. <T>可以写在 .ts 文件下，但是不能写在 .tsx 文件下；
    2. 在<T>里加一个逗号写成<T，>；
    3. 在泛型参数上使用 extends 来提示编译器它是一个泛型 <T extends unknown>；

2. 没有挂载 InitialAppSetting 或者未挂载成功，会出现无法调用 appSettings 对象  
   解决办法：

    1. 挂载 InitialAppSetting 方法
    2. 挂载后判断是否 load 成功再显示页面

3. 关于全局环境中的 appSettings 对象
   在 appsetting.ts 中定义 setting 值，使用`import { AppSettings } from "../appsettings";`或者`import settings from "../appsettings";`会取不到在全局中定义好的 appSettings 对象情况，例如：
   ![Alt text](image-15.png)
   此时：setting 的值为 undefined，在使用 setting 值时，调取不到 appsetting.json 存储的数据
   不能直接用 import 调取 setting 使用

    解决方法：  
     `const settings = (window as any).appSettings as AppSettings;`，在需要使用 appsetting.json 存储的数据的位置定义并使用
