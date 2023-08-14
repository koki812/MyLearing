# i18next

```
npx create-react-app react-i18n
```

-   i18next 提供了翻译的基本能力

-   react-i18next 是 i18next 的一个插件，用来降低 react 的使用成本

```
npm i i18next react-i18next
```

## 创建 i18n.ts 文件，在根组件中导入

通过.init({})进行 i18next 的初始化配置

在配置对象中的参数：

-   debug: true 启用调试模式
-   fallbackLng: 'en'设置回退语言为英语，如果没有找到对应的翻译，将会使用英语作为默认语言
-   interpolation: { escapeValue: false }设置插值选项，其中 escapeValue 设置为 false 表示不对插入的值进行转义处理
-   resources 用于配置翻译资源

```ts
i18n.use(initReactI18next).init(
  resources: {
    en: {},
    ch: {},
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
```

## t 函数

-   获取翻译文本

1. 使用 i18next.t(key)方法来获取指定键（key）对应的翻译文本
2. 可以通过传递参数给翻译文本来进行插值

```js
// 内容国际化后代码
<div>{t("simpleContent")}</div>
```

-   使用命名空间：
    i18next 支持使用命名空间来组织翻译文本。可以在翻译资源中使用命名空间来定义不同模块或组件的翻译文本，通过 i18next.t(key, { ns: 'namespace' })来获取指定命名空间的翻译文本

-   处理复数形式：
    根据不同的数量来选择正确的翻译文本，可以使用 i18next.t(key, options)方法，并在 options 参数中传递 count 属性来处理复数形式

-   资源文件可以是 JSON，或者是其他格式的文件

```json
{
    "en": {
        "simpleContent": "Just simple content"
    },
    "zh": {
        "simpleContent": "这是一段简单的文本"
    }
}
```

```ts
// ../keys/check-keys
export default {
    GO_TO_CHECK: "GoToCheck",
};
```

```ts
// web/src/i18n/language/pages/home.ts
import KEYS from "../keys/check-keys";

export default {
    en: {
        [KEYS.GO_TO_CHECK]: "Go to check",
    },
    ch: {
        [KEYS.GO_TO_CHECK]: "检验",
    },
};
```

## 动态切换语言

使用 i18next.changeLanguage(language)方法来动态切换应用程序的语言

i18next 会自动加载对应语言的翻译资源，并更新应用程序中的翻译文本
