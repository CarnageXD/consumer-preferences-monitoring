import { Textarea } from "@components/common";
import { Option, Radio, Select, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

interface CreateQuestionProps {
  title: string;
  type: "checkbox" | "radio" | "text";
  variants: any[];
}

export const CreateQuestion = ({
  title,
  type,
  variants,
}: CreateQuestionProps) => {
  const [questionType, setQuestionType] = useState("text");

  console.log(questionType);

  return (
    <div className="border px-4 py-2 rounded-xl border-gray-500">
      <div className="flex justify-between items-center">
        <Typography className="px-2 font-medium text-lg">{title}</Typography>
        <div className="w-[200px]">
          <Select
            defaultValue="text"
            value={questionType}
            onChange={(value) => setQuestionType(value as string)}
          >
            <Option value="text">Текст</Option>
            <Option value="radio">Одна відповідь</Option>
            <Option value="checkbox">Декілька відповідей</Option>
          </Select>
        </div>
      </div>

      {type === "text" && <Textarea placeholder="Текстова відповідь" />}
      {type === "radio" &&
        variants.map((variant, index) => <Radio label={`Варіант ${1}`} />)}
      {type === "text" && <Textarea placeholder="Текстова відповідь" />}
    </div>
  );
};
