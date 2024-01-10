# select 的用法收集

```tsx
<Select
  value={!isGetTeamList ? teamId : ""}
  className="mr-6 myTeamSelect w-[11rem]"
  onChange={(value) => handleSelectTeam(value)}
  loading={isGetTeamList}
  options={myTeam ?? []}
  placement="bottomLeft"
  popupClassName="navigation-select-dropdown teamNameSelect"
  dropdownStyle={{ left: "-3rem", top: "4rem" }} //更改下拉弹窗定位
  getPopupContainer={(triggerNode) =>
    triggerNode.parentElement || document.body
  } //固定下拉弹窗根据父级相对定位
/>
```

- option 高亮 item 的 css

```css
.teamNameSelect .ant-select-item-option-selected {
  border-radius: 2rem !important;
  background: #e7feff !important;
  color: #26cac4 !important;
  font-weight: 500 !important;
}
```
