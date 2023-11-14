# 上传

## 上传文件

```tsx
//上传文件写法
<Upload
  customRequest={handleUploadFile} //通过覆盖默认的上传行为，可以自定义自己的上传实现
  showUploadList={false}
  name="file"
  accept=".xls, .xlsx, .csv"
>
  <Button type="primary" className={buttonStyle}>
    上传文件
  </Button>
</Upload>;

// 上传图片写法
const [uploadRecord, setUploadRecord] =
  useState<UploadChangeParam<UploadFile>>();

<Upload
  beforeUpload={() => {
    return false;
  }}
  onChange={(records) => setUploadRecord(records)}
  maxCount={1}
  accept="image/*"
>
  <Button className="flex items-center" icon={<UploadOutlined />}>
    选择图片
  </Button>
</Upload>;
```

```tsx
const handleUploadFile = (info: { file: string | Blob | RcFile }) => {
  const formData = new FormData();

  formData.append("fileKey", info.file);

  // 使用 PostUpLoadFile 函数上传文件
  PostUpLoadFile(formData)
    .then((res) => {
      setData(res ?? []);
    })
    .catch(() => {
      // 上传失败后的消息提示
      message.error("");
      setData([]);
    });
};
```

## 上传图片

```tsx
// TravelFound上传图片写法
const [uploadRecord, setUploadRecord] =
  useState<UploadChangeParam<UploadFile>>();

<Upload
  beforeUpload={() => {
    return false; //控制台警告post：404（Not Found）解决方法, beforeUpload设置成false，阻止文件自动上传
  }}
  onChange={(records) => setUploadRecord(records)}
  maxCount={1}
  accept="image/*"
>
  <Button className="flex items-center" icon={<UploadOutlined />}>
    选择图片
  </Button>
</Upload>;
```

> 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
> 支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象）
> 也可以返回 Upload.LIST_IGNORE，此时列表中将不展示此文件。

```tsx
// MetaShower上传图片写法
<Upload
  listType="text"
  fileList={fileList}
  showUploadList={false} //是否展示文件列表 , true的话可以使用itemRender字段自定义上传列表项
  beforeUpload={beforeUpload}
  customRequest={handleUploadImg}
  className="w-24"
  accept="image/*"
>
  <Button type="primary" className="w-24" loading={loading} disabled={loading}>
    上传
  </Button>
</Upload>;

// beforeUpload的拦截逻辑
const beforeUpload = (file: RcFile): Promise<RcFile> => {
  return new Promise((resolve, reject) => {
    const maxSize = file.size / 1024 / 1024 > 20; //检查文件的大小
    if (maxSize) {
      message.error("请上传20M以内的图片！");
      reject(file);
    } else {
      setUploadVal({
        ...uploadVal,
        inputVal: file.name,
      });
      console.log(file);

      resolve(file);
    }
  });
};

// customRequest 覆盖自动上传的逻辑，如果不能通过beforeUpload的校验就不会进入到这一步
const handleUploadImg = (info: { file: string | Blob | RcFile }) => {
  const formData = new FormData();
  formData.append("file", info.file);
  const newFile: UploadFile[] = [];

  setLoading(true);
  PostUrlImg(formData)
    .then((res) => {
      if (res) {
        setLoading(false);
        message.success(`上传成功`);
        newFile.push({ url: res.fileUrl, uid: "", name: uploadVal.inputVal });
        setFileList(newFile);
        setUploadVal({
          ...uploadVal,
          uploadId: res.id,
        });
      }
    })
    .catch((error) => {
      setLoading(false);
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

### 方案一

```tsx
<Form form={form} onFinish={onFinish}>
  <Form.Item
    label="申请发票"
    name="申请发票"
    rules={[{ required: true, message: "请填写申请发票！" }]}
    className="my-7"
    valuePropName="fileList" // Form中的fileList，子节点的值的属性
    getValueFromEvent={(e: { fileList: File }) => {
      if (Array.isArray(e)) return e;
      return e?.fileList;
    }} //设置将 event 的值转换成字段值
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

### 方案二

> 在 Form 表单中使用 Upload

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
      fileList={fileList} // Upload中的fileList，已经上传的文件列表
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
