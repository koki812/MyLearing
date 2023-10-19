# fetch 写法收集

```TypeScript
// 定义响应状态码的枚举
export enum ResponseCode {
  ok = 200,                   // 成功
  unauthorized = 401,         // 未授权
  internalservererror = 500,  // 服务器内部错误
}

// 定义通用的响应接口，包括状态码、消息和数据
export interface IResponse<T> {
  code: number;
  msg: string;
  data: T;
}

// 发送 POST 请求的函数，接收 URL 和可选数据对象
export async function Post<T>(url: string, data?: object) {
  return await base<T>(url, "post", data);
}

// 发送 GET 请求的函数，接收 URL
export async function Get<T>(url: string) {
  return await base<T>(url, "get");
}

// 处理未授权访问的函数
const noPermissionFun = () => {
  const tokenKey = (window as any).appsettings?.tokenKey as string;

  localStorage.setItem(tokenKey, "");

  message.error("登录已过期，请重新登录", 1, () => {
    window.location.reload();
  });
};

// 发送请求的通用函数，接收 URL、请求方法（post 或 get）、可选数据对象或 FormData
export async function base<T>(
  url: string,
  method: "post" | "get",
  data?: object | FormData
) {
  // 获取应用程序设置
  const appsetting = (window as any).appsettings as IAppSettings;

  // 设置请求头，包括授权令牌和内容类型
  const headers: { Authorization: string; "Content-Type"?: string } = {
    Authorization:
      "Bearer " +
      (localStorage.getItem(appsetting.tokenKey ?? "")
        ? (localStorage.getItem(appsetting.tokenKey ?? "") as string)
        : ""),
  };

  // 检查是否是 FormData 类型的请求数据
  const isFormData = data instanceof FormData;

  // 如果不是 FormData，设置请求头的内容类型为 JSON
  if (!isFormData) headers["Content-Type"] = "application/json";

  // 将请求数据转换为字符串形式
  const body = isFormData ? data : JSON.stringify(data);

  // 使用Fetch API发送请求
  return await fetch(`${appsetting.serverUrl}${url}`, {
    method: method,    // 请求方法（POST 或 GET）
    body: body,        // 请求体数据
    headers: headers,  // 请求头
  })
    .then((res) => {
      // 处理响应状态码
      if (res.status === ResponseCode.unauthorized) noPermissionFun();
      else return res.json();
    })
    .then((res: IResponse<T>) => {
      // 处理响应数据
      if (res.code === ResponseCode.ok) {
        return res.data;
      } else {
        if (res.code === ResponseCode.unauthorized) {
          // 处理未授权的情况
          noPermissionFun();

          return null;
        } else {
          // 抛出错误，包含响应消息
          throw new Error(res.msg);
        }
      }
    })
    .catch((err) => {
      // 处理异常错误
      throw new Error(err.message);
    });
}
```
