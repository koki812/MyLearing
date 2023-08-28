# excel 导入

## 安装依赖库

```bash
yarn add antd xlsx file-saver
yarn add --dev @types/react @types/react-dom @types/xlsx
```

## 卡位

- 找不到名称“saveAs”

  1. `saveAs`函数通常来自于`file-saver`库，需要确保正确导入它

  ```tsx
  import { saveAs } from "file-saver";
  ```

  2. 已经添加了这个导入语句

  - **确认安装了`file-saver`库**：在项目根目录运行以下命令确保它已经安装：

    ```bash
    yarn add file-saver
    # 或者
    npm install file-saver
    ```

  - **尝试重新编译项目**

- 无法找到模块“file-saver”的声明文件。“/Users/koki/call-vite/auto-call/node_modules/file-saver/dist/FileSaver.min.js”隐式拥有 "any" 类型。
  尝试使用 `npm i --save-dev @types/file-saver` (如果存在)，或者添加一个包含 `declare module 'file-saver';` 的新声明

> 因为 TypeScript 找不到 `file-saver` 的类型声明文件，因此它将它视为 "any" 类型

1. **安装类型声明**：

   您需要安装与 `file-saver` 相关的类型声明。在您的项目根目录下运行以下命令：

   ```bash
   npm install --save-dev @types/file-saver
   ```

   或者，如果您使用 Yarn，可以运行：

   ```bash
   yarn add --dev @types/file-saver
   ```

2. **添加声明文件**：声明文件告诉 TypeScript，当您在项目中导入 `file-saver` 时，它的类型应该被视为已声明，从而避免出现隐式的 "any" 类型

   在项目中的某个地方，例如您的 `src` 目录下，创建一个名为 `file-saver.d.ts` 的文件。在这个文件中添加以下内容：

   ```tsx
   declare module "file-saver";
   ```

3. **重新编译项目**

- 控制台报错： `Uncaught SyntaxError: The requested module '/node_modules/.vite/deps/xlsx.js?v=3de05d80' does not provide an export named 'default' (at index.tsx:3:8)`

  因为在 Vite 项目中，从 `xlsx` 模块导入时出现了问题。Vite 默认情况下使用 ES 模块的方式进行模块解析，但在某些情况下，可能会导致某些模块不正确地被识别

  1. 确保正确地导入了 `xlsx` 模块的导出

  ```tsx
  // 尝试使用命名导入来导入 xlsx 模块
  import * as XLSX from "xlsx";

  // ...之后的代码
  ```

  2. 如果在项目中使用了 TypeScript，可能还需要为 xlsx 模块添加正确的类型声明

  ```bash
  npm install --save-dev @types/xlsx
  ```

## 简单的的一个导入 demo

```ts
import { Button, message, Table, Upload } from "antd";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelUploadDemo: React.FC = () => {
  // 状态管理上传后的数据
  const [data, setData] = useState<any[]>([]);

  // 处理上传文件
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();

    // 当文件读取完成后触发
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);

      // 使用 XLSX 库解析 Excel 文件
      const workbook = XLSX.read(data, { type: "array" });

      // 获取第一个工作表
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      // 将工作表数据转换成 JSON
      const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // 更新数据状态
      setData(parsedData);

      // 显示成功消息
      message.success("Excel data uploaded successfully!");
    };

    // 读取文件数据
    reader.readAsArrayBuffer(file);
  };

  // 根据数据生成表格列定义
  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({ title: key, dataIndex: key, key }))
      : [];

  return (
    <div>
      {/* 文件上传区域 */}
      <Upload
        accept=".xlsx,.xls"
        showUploadList={false}
        beforeUpload={(file) => {
          // 处理上传文件
          handleFileUpload(file);

          // 阻止默认上传行为
          return false;
        }}
      >
        <Button>Upload Excel File</Button>
      </Upload>
      {/* 数据表格 */}
      {data.length > 0 ? (
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default ExcelUploadDemo;
```
