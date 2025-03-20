import { ColumnsType } from "antd/es/table";
import ExcelJS, { Workbook } from "exceljs";
import saveAs from "file-saver";

import { IExcelProps, ISheetConfig } from "../../props";

export const onDownLoadWorkbook = (
  sheets: ISheetConfig[],
  excelTitle: string
) => {
  // 导出文件
  const saveWorkbook = (workbook: Workbook, fileName: string) => {
    workbook.xlsx.writeBuffer().then((data: BlobPart) => {
      const blob = new Blob([data], { type: "" });

      saveAs(blob, fileName);
    });
  };

  const DEFAULT_COLUMN_WIDTH = 20;

  // 生成表头配置
  const generateTableHeaders = (columns: ColumnsType<string[]>) => {
    const excel: IExcelProps[] = [];

    columns.map((item) => {
      excel.push({
        header: item?.title?.toString() || "",
        key: item?.key?.toString() || "",
        width: Number(item?.width) / 5 || DEFAULT_COLUMN_WIDTH,
      });
    });

    return excel;
  };

  // 创建 Workbook
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "Me";
  workbook.lastModifiedBy = "Her";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();

  // 添加多个 Sheet
  sheets.forEach((sheetConfig, index) => {
    const worksheet = workbook.addWorksheet(
      sheetConfig.sheetName || `sheet${index + 1}`
    );

    worksheet.columns = generateTableHeaders(sheetConfig.columns);

    // 添加标题
    const totalColumns = sheetConfig.columns.length;

    worksheet.mergeCells(1, 1, 1, totalColumns);
    const titleCell = worksheet.getCell(1, 1);

    titleCell.value = excelTitle;
    titleCell.alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    titleCell.font = {
      bold: true,
      size: 12,
    };

    // 添加表头
    const headerRow = worksheet.getRow(2);

    sheetConfig.columns.forEach((col, colIndex) => {
      const cell = headerRow.getCell(colIndex + 1);

      cell.value = typeof col.title === "string" ? col.title : "";
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    });

    // 添加数据
    sheetConfig.rows.forEach((row, rowIndex) => {
      const currentRow = worksheet.getRow(3 + rowIndex);

      sheetConfig.columns.forEach((col, colIndex) => {
        if (col.key) {
          const cell = currentRow.getCell(colIndex + 1);

          cell.value = row[String(col.key)] ?? "";
          cell.alignment = {
            wrapText: true,
            vertical: "middle",
            horizontal: "center",
          };
        }
      });
    });
  });

  // 保存 Excel
  saveWorkbook(workbook, `${excelTitle}.xlsx`);
};
