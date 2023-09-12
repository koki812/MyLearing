# UpLoad

## 使用 accpt 控制上传文件的类型，customRequest 覆盖上传逻辑

```tsx
<Upload
  customRequest={handleUploadFile}
  showUploadList={false}
  name="file"
  accept=".xls, .xlsx, .csv"
>
  <Button type="primary" className={buttonStyle}>
    批量导入
  </Button>
</Upload>
```

```tsx
const [upLoadFileData, setUpLoadFileData] = useState<IUpLoadFileData>();

const handleUploadFile = (info: { file: string | Blob | RcFile }) => {
  const formData = new FormData();

  formData.append("numbersFile", info.file);

  PostUpLoadFile(formData)
    .then((res) => {
      if (res && res.code === 200 && res.data !== null) {
        setUpLoadFileData(res.data);
        message.success("文件上传成功");
      } else {
        message.error(res ? res.msg : "上传失败");
      }
    })
    .catch((err) => {
      message.error("上传文件失败" + err);
    });
};
```

## 使用 beforeload 控制上传文件的类型

```ts
const beforeUpload = (file: RcFile): Promise<RcFile> => {
  return new Promise((resolve, reject) => {
    const fileName = file.name.toLowerCase();

    if (fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) {
      resolve(file);
    } else {
      reject(message.error("文件类型不支持，请选择Excel文件（.xls 或 .xlsx）"));
    }
  });
};
```

### 用于限制文件上传的大小

```ts
const beforeUpload = (file: RcFile): Promise<RcFile> => {
  return new Promise((resolve, reject) => {
    const fileName = file.name.toLowerCase();
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file.size <= maxSize) {
      if (fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) {
        resolve(file);
      } else {
        reject(new Error("文件类型不支持，请选择Excel文件（.xls 或 .xlsx）"));
      }
    } else {
      reject(new Error("文件大小超过5MB限制"));
    }
  });
};
```
