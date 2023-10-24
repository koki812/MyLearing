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

## Upload 卡位

> 使用场景,一个 Modal 组件中使用了 Form 组件,而这个 Form 组件又包含了一些别的组件,然后在点击 Modal 的确认按钮把 Form 表单的数据全部发送
> 存在获取不到 upload 的值的情况

1. 点击确认按钮后并不能获取到 Form 组件下面 Upload 组件的信息

https://blog.ligengxin.me/posts/antd-form-get-upload-fileLsit-info/#3%E9%99%84%E5%BD%95

> getValueFromEvent 属性是有别于别的基础组件(Input 之类的)  
> 是特别为 Upload 组件新加的  
> getValueFromEvent 属性的值是 normFile  
> normFile 是一个函数,应该是 Form 组件封装了一些东西可以 normFile 当回调函数传递给 Upload 组件  
> 只要 Form.Item 给了 getValueFromEvent={normFile} 这个属性  
> Upload 组件 Props 中会多出一个 onChange 回调函数这个属性  
> 那么在 Upload 组件中使用这个 onChange 这个函数  
> 在 Upload 组件中的 onChange 中使用  
> 在 Form 组件这个文件的 normFile 函数输出了文件信息

2. Antd 上传(Upload)组件报，解决方法：`<Form.Item>`加上`valuePropName="fileList"`

```log
：Warning: [antd: Upload] `value` is not a valid prop, do you mean `fileList`?
```

3. 存在报错信息

```log
Upload.js:97 Uncaught (in promise) TypeError: (fileList || []).forEach is not a function
```

`<Form.Item`加上`getValueFromEvent={(e) => {
      if (Array.isArray(e)) return e;
      return e?.fileList;
    }}`

```tsx
<Form form={form} onFinish={onFinish}>
  <Form.Item
    label="申请发票"
    name="申请发票"
    rules={[{ required: true, message: "请填写申请发票！" }]}
    className="my-7"
    valuePropName="fileList"
    getValueFromEvent={(e: { fileList: File }) => {
      if (Array.isArray(e)) return e;
      return e?.fileList;
    }}
  >
    <Upload
      name="file"
      beforeUpload={() => {
        return false;
      }}
      accept="image/*"
    >
      <Button icon={<UploadOutlined />}>上传发票图片</Button>
    </Upload>
  </Form.Item>
</Form>
```

### 在 Form 表单中使用 Upload

```tsx
const [form] = Form.useForm();
const [fileList, setFileList] = useState<UploadFile[]>([]);
```

```tsx
<Form form={form} onFinish={onFinish}>
  <Form.Item
    label="申请发票"
    name="申请发票"
    rules={[{ required: true, message: "请填写申请发票！" }]}
    className="my-7"
  >
    <Upload
      name="file"
      fileList={fileList}
      beforeUpload={(file) => {
        setFileList([file]);
        return false;
      }}
      onRemove={() => setFileList([])}
      accept="image/*"
    >
      <Button icon={<UploadOutlined />}>上传发票图片</Button>
    </Upload>
  </Form.Item>
</Form>
```
