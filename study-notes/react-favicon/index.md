# react-favicon

- 浏览器 favicon

```tsx
import Favicon from "react-favicon";

const alertTeamTodoCount = teamTodoCountById > 99 ? "99+" : teamTodoCountById;

<Favicon
  alertCount={alertTeamTodoCount || null}
  alertFillColor="red"
  alertTextColor="white"
  url={"/logo.ico"}
  iconSize={200}
/>;
```
