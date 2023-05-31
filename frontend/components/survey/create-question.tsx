import { EditableInput, Textarea } from "@components/common";
import {
  ArrowsUpDownIcon,
  PlusCircleIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import {
  Button,
  IconButton,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { SurveyQuestion } from "@types";
import React, { useState } from "react";

interface CreateQuestionProps {
  question: SurveyQuestion;
  questionIndex: number;
  setQuestion: (question: any, questionIndex: number) => void;
  removeQuestion: (index: number) => void;
  removeVariant: (questionIndex: number, variantIndex: number) => void;
  handleUpdateVariantTitle: (
    title: string,
    questionIndex: number,
    variantIndex: number
  ) => void;
}

export const CreateQuestion = ({
  question,
  setQuestion,
  removeQuestion,
  questionIndex,
  removeVariant,
  handleUpdateVariantTitle,
}: CreateQuestionProps) => {
  const [localTitle, setLocalTitle] = useState(question.question);

  const handleSetQuestion = (type: string, value: any) => {
    const newQuestion = { ...question, [type]: value };
    setQuestion(newQuestion, questionIndex);
  };

  const handleTitleChange = (value: string) => {
    setLocalTitle(value);
    handleSetQuestion("question", value);
  };

  return (
    <div className="border px-4 py-2 rounded-xl border-gray-500">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ArrowsUpDownIcon className="text-gray-500 h-5 w-5 cursor-pointer" />
          <EditableInput
            inputClassName="mr-4"
            value={localTitle}
            setValue={handleTitleChange}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-[200px]">
            <Select
              defaultValue="text"
              value={question.type}
              onChange={(value) => handleSetQuestion("type", value as string)}
            >
              <Option value="text">Текст</Option>
              <Option value="radio">Одна відповідь</Option>
              <Option value="checkbox">Декілька відповідей</Option>
            </Select>
          </div>
          <IconButton
            size="sm"
            onClick={() => removeQuestion(questionIndex)}
            variant="outlined"
            className="border-gray-500 hover:text-red-500 hover:border-red-500 focus:ring-0 text-gray-500"
          >
            <TrashIcon className="h-4 w-4 text-inherit" />
          </IconButton>
        </div>
      </div>

      {question.type === "text" && (
        <Textarea
          readOnly
          placeholder="Текстова відповідь"
          className="hover:!border-gray-300 focus:!border-gray-300 active:!border-gray-300"
        />
      )}
      {(question.type === "radio" || question.type === "checkbox") &&
        question.options.map((option, index) => (
          <div key={index} className="mt-8 flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div
                className={`h-8 w-8 ${
                  question.type === "checkbox"
                    ? "rounded-none text-lg"
                    : "rounded-full text-5xl"
                } border-2 border-gray-300 flex justify-center items-start text-gray-300 relative`}
              >
                {question.type === "checkbox" ? (
                  "✓"
                ) : (
                  <div className="absolute -top-3 left-0">•</div>
                )}
              </div>
              <EditableInput
                value={option}
                setValue={(value) =>
                  handleUpdateVariantTitle(value, questionIndex, index)
                }
                inputClassName="h-9"
              />
            </div>
            <IconButton
              onClick={() => removeVariant(questionIndex, index)}
              size="sm"
              variant="outlined"
              className="border-gray-500 hover:text-red-500 hover:border-red-500 focus:ring-0 text-gray-500"
            >
              <XMarkIcon className="h-4 w-4 text-inherit" />
            </IconButton>
          </div>
        ))}
      {question.type !== "text" && (
        <Button
          size="sm"
          variant="outlined"
          className="mt-8 h-9 flex gap-2"
          onClick={() =>
            handleSetQuestion("options", [...question.options, "Новий варіант"])
          }
        >
          <PlusCircleIcon className="text-primary-blue h-6 w-6" />
          <Typography className="font-medium">Додати варіант</Typography>
        </Button>
      )}
    </div>
  );
};
