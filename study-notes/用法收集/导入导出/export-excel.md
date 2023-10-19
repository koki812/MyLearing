# 导出 excel

```ts
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import ExcelJS, { Workbook } from "ExcelJS";
import saveAs from "file-saver";

import { IExcelProps } from "./props";

// 导出Excel工作簿
export const onDownLoadWorkbook = (
  columns: ColumnsType<string[]>,
  rows: { targetNumber: string }[]
) => {
  // 保存工作簿到文件
  const saveWorkbook = (workbook: Workbook, fileName: string) => {
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: "" });

      // 使用文件保存器保存文件
      saveAs(blob, fileName);
    });
  };

  const DEFAULT_COLUMN_WIDTH = 20; // 默认列宽

  // 生成表格的列头
  const generateTableHeaders = (columns: ColumnsType<string[]>) => {
    const excel: IExcelProps[] = [];

    columns.map((item) => {
      excel.push({
        // 列标题
        header: item?.title?.toString() || "",
        // 列标识
        key: item?.key?.toString() || "",
        // 列宽度
        width: Number(item?.width) / 5 || DEFAULT_COLUMN_WIDTH,
      });
    });

    return excel;
  };

  // 创建一个新的Excel工作簿
  const workbook = new ExcelJS.Workbook();

  // 设置工作簿的属性
  workbook.creator = "Me";
  workbook.lastModifiedBy = "Her";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();

  // 创建一个工作表
  const worksheet = workbook.addWorksheet("My Sheet");

  // 设置工作表的列
  worksheet.columns = generateTableHeaders(columns);

  // 向工作表添加行数据
  worksheet.addRows(rows);

  // 保存工作簿到文件
  saveWorkbook(
    workbook,
    `${"create at " + dayjs(new Date()).format("MM-DD-YYYY hh-mm")}.xlsx`
  );
};
```

```ts
const handleExport = () => {
  // // 从数据源中筛选出包含有效手机号码的记录并转换为目标格式
  // const numberList: { targetNumber: string }[] = dataSource.records
  //   .filter((x) => !!x.targetNumber)
  //   .map((x) => ({ targetNumber: x.targetNumber.toString() }));

  // 检查是否有可导出的数据
  if (isEmpty(numberList)) {
    message.warning("表格内无数据可导出");
  } else {
    // 调用导出Excel的函数
    onDownLoadWorkbook(
      [{ title: "手機號碼", key: "targetNumber", width: 200 }],
      numberList
    );
  }
};
```
