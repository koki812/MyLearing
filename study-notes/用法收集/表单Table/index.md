# Table 表的用法收集

## 不带分页

```tsx
<Table
  columns={columns}
  scroll={{ y: 400 }}
  dataSource={filteredData}
  rowKey={(record) => record.targetPhoneNumber as string} //没有rowKey会警告缺少key prop
  rowSelection={{
    type: "checkbox", //多选/单选，checkbox | radio
    selectedRowKeys,
    //用户手动选择/取消选择某行的回调
    onSelect: (revord, selected) => {
      onSelectedRow(revord, selected);
    },
    //用户手动选择/取消选择所有行的回调
    onSelectAll: (selected, selectedRows, changeRows) => {
      onSelectedRow(changeRows, selected); //onSelectedAllRow(selected)
    },
  }}
/>
```

### 全选当前页

```tsx
const [selectedRows, setSelectedRows] = useState<
  ISaleAutoCallSettingNumberDto[]
>([]);

const onSelectedRow = (
  row: ISaleAutoCallSettingNumberDto | ISaleAutoCallSettingNumberDto[],
  selected: boolean
) => {
  const rows = Array.isArray(row) ? row : [row];

  setSelectedRows((prev) => {
    if (selected) {
      return [...prev, ...rows];
    } else {
      return prev.filter(
        (item) =>
          !rows.find((r) => r.targetPhoneNumber === item.targetPhoneNumber)
      );
    }
  });
};

const selectedRowKeys = useMemo(() => {
  return selectedRows.map((x) => x.targetPhoneNumber) as React.Key[];
}, [selectedRows]);
```

### 全选全部数据

```tsx
const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

const [selectedRows, setSelectedRows] = useState<
  ISaleAutoCallSettingNumberDto[]
>([]);

const onSelectedAllRow = (selected: boolean) => {
  const selectedData = saleCallSettingDto.data[
    clickIndex as number
  ].numbers.map((item) => item.targetPhoneNumber);

  if (selected) {
    setSelectedRowKeys(selectedData);
    setSelectedRows(saleCallSettingDto.data[clickIndex as number].numbers);
  } else {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  }
};
useEffect(() => {
  const newSelectedRowKeys = selectedRows.map((x) => x.targetPhoneNumber);

  setSelectedRowKeys(newSelectedRowKeys);
}, [selectedRows]);
```

## 带分页

```tsx
<Table
  loading={tableLoad}
  columns={columns}
  dataSource={saleCallSettingDto.data}
  rowKey={(record) => record.id}
  pagination={{
    position: ["bottomRight"],
    pageSizeOptions: [10, 20, 50, 100],
    current: saleCallSettingDto.page,
    pageSize: saleCallSettingDto.pageSize,
    showQuickJumper: true,
    showSizeChanger: true,
    style: {
      marginRight: "1rem",
    },
  }}
  onChange={(pagination) => {
    if (pagination.current && pagination.pageSize) {
      updateSaleCallSetting("page", pagination.current);
      updateSaleCallSetting("pageSize", pagination.pageSize);
    }
  }}
  rowSelection={rowSelection}
/>
```
