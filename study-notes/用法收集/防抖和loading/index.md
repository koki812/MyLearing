# 用法

## 防抖函数

```tsx
const handleDelete = useDebounceFn(() => {}, { wait: 500 }).run;
```

## 防抖 value 值

```tsx
const [value, setValue] = useState<string>("");
const debouncedValue = useDebounce<string>(value, 500);
```

## loading

```tsx
const [loading, setLoading] = useState(false);

const initUserList = () => {
  setLoading(true);

  GetRoleUser({})
    .then((res) => {
      setTimeout(() => {
        setLoading(false); //关闭
      }, 300);
    })
    .catch((error) => {
      enqueueSnackbar((error as Error).message, { variant: "error" });

      message.error((error as Error).message); //错误写法

      setLoading(false); //关闭
    })
    .finally(() => setIsDeleteLoading(false)); //或者直接在finally
};
```
