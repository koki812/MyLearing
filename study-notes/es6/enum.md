# 枚举判断

## 字符串枚举判断

枚举类型的值，可以是字符串类型。
可以更容易被处理和调试，因为它们提供有意义/可调试的字符串。可以使用它们用于简单的字符串比较：

```TypeScript
export enum LocalPathEnum {
  Delivery = "/grocery/delivery",
  PickUp = "/grocery/pickup",
}

```

```TypeScript
          ${
            location.pathname === LocalPathEnum.PickUp && styles.active
          }
```
