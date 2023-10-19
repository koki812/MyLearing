# 身份验证

## auth-provider.tsx

```ts
import App from "antd/es/app";
import { MessageInstance } from "antd/es/message/interface";
import dayjs, { Dayjs } from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import jwtDecode from "jwt-decode";
import React, { createContext, useState } from "react";

// 扩展 dayjs 支持 UTC 和时区
dayjs.extend(utc);
dayjs.extend(tz);

// 定义身份认证上下文属性的接口
export interface IAuthContextProps {
  token: string;
  signIn: (auth: string, callback?: VoidFunction) => void;
  signOut: () => void;
  message: MessageInstance;
  deserializeToken: () => {
    unique_name: string;
  } | null;
  dateToUtc: (time: Dayjs | string) => Dayjs;
}

// 创建身份认证上下文
export const AuthContext = createContext<IAuthContextProps>(null!);

// 身份认证提供者组件
export const AuthProvider = (props: { children: React.ReactNode }) => {
  // 获取消息实例
  const { message } = App.useApp();

  // 从应用设置中获取令牌键名
  const tokenKey = (window as any).appsettings?.tokenKey as string;

  // 从本地存储获取默认令牌，如果没有则为空字符串
  const defaultToken = localStorage.getItem(tokenKey) ?? "";

  // 使用状态来跟踪令牌
  const [token, setToken] = useState<string>(defaultToken);

  // 登录函数，接收认证令牌和可选回调函数
  const signIn = (auth: string, callback?: VoidFunction) => {
    setToken(auth);
    localStorage.setItem(tokenKey, auth);
    callback && callback();
  };

  // 登出函数
  const signOut = () => {
    setToken("");
    localStorage.removeItem(tokenKey);
  };

  // 解析令牌函数，返回令牌中的信息
  const deserializeToken = () => {
    const decoded = token ? jwtDecode<{ unique_name: string }>(token) : null;
    return decoded;
  };

  // 将日期时间转换为 UTC 时间
  const dateToUtc = (time: Dayjs | string) => {
    return dayjs.utc(time);
  };

  return (
    // 提供身份认证上下文的值
    <AuthContext.Provider
      value={{
        token,
        signIn,
        signOut,
        message,
        deserializeToken,
        dateToUtc,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
```
