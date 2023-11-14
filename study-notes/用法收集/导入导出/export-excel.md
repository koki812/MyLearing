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

## 导出例子

```ts
// 导出处理函数
const handleExport = () => {
  // 初始化空数组，用于存储导出数据
  const list: {
    targetNumber: string;
    date: string;
    time: string;
  }[] = [];

  // 对数据list进行遍历
  selectedRows.map((item) => {
    // 检查数据是否存在
    if (item.recentHumanAnswerRecords) {
      item.recentHumanAnswerRecords.map((inItem) => {
        // 将处理后的数据推入list数组
        list.push({
          targetNumber: item.targetNumber
            .replace(/\+/g, "")
            .replace(/(\d)(?=(?:\d{3})+$)/g, "$1-"),
          date: monitoringDate(
            inItem.taskStartCallTime,
            inItem.taskEndCallTime
          ),
          time: monitoringTime(
            inItem.taskStartCallTime,
            inItem.taskEndCallTime
          ),
        });
      });
    }
  });

  // 检查list数组是否为空
  if (isEmpty(list)) {
    // 如果为空，显示警告消息
    message.warning("表格内无数据可导出");
  } else {
    // 如果不为空，调用导出函数onDownLoadWorkbook
    onDownLoadWorkbook(
      [
        { title: "手機號碼", key: "targetNumber", width: 150 },
        { title: "接聽時間段", key: "date", width: 160 },
        { title: "接聽時間段", key: "time", width: 100 },
      ],
      list
    );
  }
};

// 格式化日期的辅助函数
const monitoringDate = (startTime: string, endTime: string) => {
  // 检查起始时间和结束时间是否存在
  if (!startTime || !endTime) {
    return "";
  }

  // 格式化起始时间和结束时间，并进行时区转换
  const formatStartDate = dateToUtc(startTime)
    .tz("America/Los_Angeles")
    .format("YYYY/MM/DD");

  const formatEndDate = dateToUtc(endTime)
    .tz("America/Los_Angeles")
    .format("YYYY/MM/DD");

  // 如果起始日期和结束日期相同，返回单一日期，否则返回日期范围
  if (formatStartDate === formatEndDate) {
    return formatStartDate;
  } else {
    return `${formatStartDate}-${formatEndDate}`;
  }
};

// 格式化时间的辅助函数
const monitoringTime = (startTime: string, endTime: string) => {
  // 检查起始时间和结束时间是否存在
  if (!startTime || !endTime) {
    return "";
  }

  // 格式化起始时间和结束时间，并进行时区转换
  const formatStartTime = dateToUtc(startTime)
    .tz("America/Los_Angeles")
    .format("HH:mm");

  const formatEndTime = dateToUtc(endTime)
    .tz("America/Los_Angeles")
    .format("HH:mm");

  // 返回格式化后的时间范围
  return `${formatStartTime}-${formatEndTime}`;
};
```
