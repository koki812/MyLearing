# useAuth()

## auth-provider.tsx

```tsx
export interface IAuthContextProps {
  authToken: string; // 存储用户身份验证token
  signIn: (auth: string, callback?: VoidFunction) => void;
  signOut: (callback?: VoidFunction) => void;
}

// 初始化上下文为非空值
export const AuthContext = createContext<IAuthContextProps>(null!);

export const AuthProvider = (props: { children: React.ReactNode }) => {
  // 获取用于存储token的本地存储键
  const tokenKey = (window as any).appsettings?.tokenKey as string;

  // 从本地存储中获取默认token，如果不存在则默认为空字符串
  const defaultToken = localStorage.getItem(tokenKey) ?? "";

  const [authToken, setAuthToken] = useState<string>(defaultToken);

  const signIn = (auth: string, callback?: VoidFunction) => {
    setAuthToken(auth);
    localStorage.setItem(tokenKey, auth); // 将认证token存储到浏览器的缓存中
    callback && callback();
  };

  const signOut = (callback?: VoidFunction) => {
    setAuthToken("");
    localStorage.removeItem(tokenKey); // 从浏览器缓存中移除token
    callback && callback();
  };

  // 渲染AuthContext.Provider，将身份验证token、登录和注销函数提供给子组件
  return (
    <AuthContext.Provider value={{ authToken, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};
```

### 在根组件中使用 AuthProvider

```tsx
<BrowserRouter>
  <AuthProvider>
    <Router />
  </AuthProvider>
</BrowserRouter>
```

## auth-status.tsx

```tsx
export const AuthStatus = (props: { children: JSX.Element }) => {
  const location = useLocation();

  const { authToken } = useAuth(); //从上下文中取得token，注意传入的authToken类型

  if (!authToken) {
    <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return props.children;
};
```

### 使用 AuthStatus

```tsx
<Route
  path={item.path}
  element={<AuthStatus>{item.element}</AuthStatus>}
  key={index}
/>
```

## use-auth.tsx

```tsx
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
```

## 卡位

### error：AuthToken 为 null 时候仍然登陆成功

### 解决步骤

1. 没有对拿到的上下文 token 进行判断， useAuth 就存在没有值的情况

   ```tsx
   const tokenKey = (window as any).appsettings?.tokenKey as string;

   // 从本地存储中获取默认token，如果不存在则默认为空字符串
   const defaultToken = localStorage.getItem(tokenKey) ?? "";

   const [authToken, setAuthToken] = useState<string>(defaultToken);
   ```

2. 由于传入的 AuthToken 类型不正确，传入了字符串类型的 null 值，需要注意检查接口拿到的 token 传入的类型
