import React from "react";
import ExcelJS from "exceljs";
import saveAs from "file-saver";
import dayjs from "dayjs";
import { Button } from "@material-tailwind/react";
import { Review } from "@types";

export function ExportExcelButton({ reviews }: { reviews: Review[] }) {
  const exportToExcel = async () => {
    // Create workbook & add worksheet to it
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Reviews");

    // Define column headers and formatting
    worksheet.columns = [
      { header: "Дата", key: "date" },
      { header: "Продукт", key: "product" },
      { header: "Рекомендує", key: "recommended" },
      { header: "Відгук", key: "content" },
    ];

    reviews.forEach((review: Review) => {
      const newRow = worksheet.addRow({
        product: review.product.name,
        content: review.content,
        recommended: review.recommended ? "Так" : "Ні",
        date: dayjs(review.createdAt).format("DD-MM-YYYY"),
      });

      if (review.recommended) {
        newRow.eachCell(
          (cell: any) =>
            (cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFc6efce" },
            })
        );
      } else {
        newRow.eachCell(
          (cell: any) =>
            (cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFffc7ce" },
            })
        );
      }
    });

    worksheet.getRow(1).eachCell((cell: any) => (cell.font = { bold: true }));

    worksheet.columns.forEach((column: any) => {
      let maxColumnLength = 0;
      column.eachCell({ includeEmpty: true }, (cell: any) => {
        const columnLength = cell.text.length;
        if (columnLength > maxColumnLength) {
          maxColumnLength = columnLength;
        }
      });
      column.width = maxColumnLength + 2;
    });

    // Write file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "reviews.xlsx");
  };

  return (
    <Button variant="outlined" onClick={exportToExcel}>
      Завантажити Excel
    </Button>
  );
}
