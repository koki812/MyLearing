# Axios 封装

## 安装 Axios

```
npm install axios
```

## 创建一个 `http-client.ts` 的文件，并在其中编写封装的 Axios 模块

```ts
import axios from "axios";

// 创建一个 Axios 实例
export const api = axios.create({
    baseURL: "", // 设置基本的 API URL
    timeout: 5000, // 设置请求超时时间
});

// 请求拦截器
api.interceptors.request.use(
    (config) => {
        // 在发送请求之前可以进行一些处理，例如添加请求头等
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        // 处理请求错误
        return Promise.reject(error);
    }
);

// 响应拦截器
api.interceptors.response.use(
    (response) => {
        // 在接收响应数据之前可以进行一些处理
        return response;
    },
    (error) => {
        // 处理响应错误
        return Promise.reject(error);
    }
);
```

使用 `instance.interceptors.request.use()` 添加请求拦截器，用于在发送请求之前进行一些处理，例如添加请求头。在请求拦截器中，你可以执行任何你需要的操作，例如添加身份验证信息或日志记录。

使用 `instance.interceptors.response.use()` 添加响应拦截器，用于在接收响应数据之前进行处理。在响应拦截器中，你可以执行任何你需要的操作，例如对响应数据进行转换或错误处理。

使用封装的 Axios 实例进行 HTTP 请求，例如：

### post 请求

1. 提交数据给服务器，直接传参
2. 把参数对象传给 post 请求体，相对安全
3. 提交任意格式和数量的数据，无明显限制传输大容量非文本数据
4. 表单/javascript 同步提交
5. ajax/fetch 异步提交

#### 查询模版

```ts
export async function postData<T>(url: string, data: any): Promise<T> {
    const response = await api.post<T>(url, data);
    return response.data;
}
```

### get 请求

1. 获取简单的数据，参数添加到 URL，不安全（ 参数的数量不超过 2048 字节，限制较大 ）
2. 数据量较小，主要在 url 不超过 2kb，不适合大容量传输
3. 可能被浏览器缓存结果
4. 同步提交

#### 查询模版

1. 直接放在 url 路径/url 查询字符串的形式穿参

```ts
export async function fetchTenantRoles<T>(id: string): Promise<T> {
    const url = `/tenant/roles?TenantId=${id}`;
    const response = await api.get<T>(url);
    return response.data;
}
```

```ts
export async function fetchRestriction<T>(teamId: string): Promise<T> {
    const url = `/settlement/restriction/${teamId}`;
    const response = await api.get<T>(url);
    return response.data;
}
```

2. 通过 params 对象穿参

```ts
export async function getData<T>(url: string, params?: any): Promise<T> {
    const response = await api.get<T>(url, { params });
    return response.data;
}
```
