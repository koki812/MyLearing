# 上传文件

```tsx
<Upload
  customRequest={handleUploadFile}
  showUploadList={false}
  name="file"
  accept=".xls, .xlsx, .csv"
>
  <Button type="primary" className={buttonStyle}>
    上传文件
  </Button>
</Upload>
```

```tsx
const handleUploadFile = (info: { file: string | Blob | RcFile }) => {
  const formData = new FormData();

  formData.append("numbersFile", info.file);

  // 使用 PostUpLoadFile 函数上传文件
  PostUpLoadFile(formData)
    .then((res) => {})
    .catch(() => {
      // 上传失败后的消息提示
      message.error("");
    });
};
```
