# ANTD Tabs

```tsx
<ConfigProvider
  theme={{
    token: {
      lineWidth: 0,
    },
  }}
>
  <Tabs
    className="teamOrderDetailTabs"
    defaultActiveKey="1"
    items={tabsItems}
    tabBarStyle={{
      background: "#F2F7FA",
      width: "20.2rem",
      height: "2.5rem",
      paddingLeft: "0.3rem",
      paddingTop: "0.3rem",
      borderRadius: "2rem",
    }}
    indicatorSize={0}
    tabBarGutter={10}
  />
</ConfigProvider>
```

index.css

```css
.teamOrderDetailTabs .ant-tabs-tab.ant-tabs-tab-active {
  background: #fff;
  border-radius: 2rem;
  width: 9.5rem;
  height: 1.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.teamOrderDetailTabs .ant-tabs-tab {
  width: 9.5rem;
  height: 1.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

![tabs样式](image.png)
