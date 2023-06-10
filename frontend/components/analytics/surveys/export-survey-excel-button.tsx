import React from "react";
import ExcelJS from "exceljs";
import saveAs from "file-saver";
import dayjs from "dayjs";
import { Button } from "@material-tailwind/react";
import { SurveyResponse } from "@types"; // Змініть на відповідний тип

function getQuestionType(type: string): string {
  switch (type) {
    case "radio":
      return "Одна відповідь";
    case "checkbox":
      return "Декілька відповідей";
    case "text":
      return "Текстова";
    default:
      return "";
  }
}

export function ExportSurveyExcelButton({
  surveyAnswers,
}: {
  surveyAnswers: SurveyResponse[];
}) {
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Survey Answers");

    worksheet.columns = [
      { header: "Дата", key: "date" },
      { header: "Питання", key: "question" },
      { header: "Тип питання", key: "type" },
      { header: "Відповіді", key: "answers" },
    ];

    surveyAnswers.forEach((answer: SurveyResponse) => {
      worksheet.addRow({
        question: answer.question.question,
        type: getQuestionType(answer.question.type),
        answers: answer.answers.join(", "),
        date: dayjs(answer.createdAt).format("DD-MM-YYYY"),
      });
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

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "survey_answers.xlsx");
  };

  return (
    <Button variant="outlined" onClick={exportToExcel}>
      Завантажити Excel
    </Button>
  );
}
