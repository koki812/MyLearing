# useAuth()

## 用户登入登出身份验证

`useContext`是 React 提供的一个钩子函数，用于在函数式组件中获取上下文（context）的值,上下文是一种在组件树中共享数据的方法，使得在不同组件之间传递数据变得更加简便

1. **创建上下文：** 首先创建一个上下文，通过`createContext`函数来完成。这个函数创建了一个上下文对象，可以包含一些共享的值

   ```tsx
   interface AuthContextType {
     token: string;
     username: string;
     signin: (user: string, callback?: VoidFunction) => void;
     signout: (callback?: VoidFunction) => void;
   }

   export const AuthContext = createContext<AuthContextType>(null!);
   ```

2. **提供上下文值：** 在父组件中，通过提供`AuthContext.Provider`来设置上下文的值，这个值将被传递给所有使用这个上下文的子组件

   ```tsx
   export const AuthProvider = (props: { children: React.ReactNode }) => {
     const [token, setToken] = React.useState(defaultToken);
     const [username, setUsername] = React.useState(defaultUsername);

     const signin = (token: string, callback?: VoidFunction) => {
       setToken(token);
       // 解析token设置username
       const decoded = jwt_decode<{ unique_name: string }>(token);
       setUserName(decoded.unique_name);
       callback && callback();
     };

     const signout = (callback?: VoidFunction) => {
       // 清空token、username
       localStorage.removeItem(tokenKey);
       localStorage.removeItem(userNameKey);
       setToken("");
       setUserName("");
       callback && callback();
     };

     let value = { token, username, signin, signout };

     return (
       <AuthContext.Provider value={value}>
         {props.children}
       </AuthContext.Provider>
     );
   };
   ```

3. **导出 AuthProvider 组件** ： 在根组件中包裹整个程序

   ```tsx
   <AuthProvider>
     <App />
   </AuthProvider>
   ```

4. **使用`useContext`：** 在需要访问上下文值的组件中，使用`useContext`钩子来获取上下文的值,使得在函数式组件中可以直接获取共享的值，而不需要通过多层的组件传递，导出 useAuth Hook，通过返回 useContext(AuthContext) 来获取 AuthContext 的值

   ```tsx
   export default const useAuth = () => {
     return useContext(AuthContext);
   };
   ```

5. **使用`useAuth`自定义钩子函数**，从身份验证上下文中获取值

   ```tsx
   let { token, username, signin, signout } = useAuth();
   ```

## `useContext`的常见用途

1. **共享全局状态：** 通过上下文，你可以在组件之间共享全局状态，而不需要逐级传递属性。这对于应用的主题、用户认证状态等情况非常有用

2. **避免多层传递：** 避免在组件树中一层层地传递相同的属性

3. **插件和工具库：** 上下文在创建可复用的插件和工具库时也有用，使得这些工具可以在不同的组件层次结构中使用
