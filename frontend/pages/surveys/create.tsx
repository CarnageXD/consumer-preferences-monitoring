import { EditableInput, Layout, PageHeader } from "@components/common";
import { CreateQuestion } from "@components/survey";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

export default function CreateSurvey() {
  const [title, setTitle] = useState(
    "Нове опитування (натисніть, щоб змінити назву)"
  );
  const [questions, setQuestions] = useState<
    { title: string; variants: string[]; type: "checkbox" | "radio" | "text" }[]
  >([]);

  console.log("questions", questions);

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        title: `Питання ${prevQuestions.length + 1}`,
        variants: ["Варіант 1"],
        type: "text",
      },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(index, 1);
      return updatedQuestions;
    });
  };

  const handleUpdateQuestion = (question: any, index: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = question;
      return updatedQuestions;
    });
  };

  const handleRemoveVariant = (questionIndex: number, variantIndex: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = JSON.parse(JSON.stringify(prevQuestions));
      updatedQuestions[questionIndex].variants.splice(variantIndex, 1);
      return updatedQuestions;
    });
  };

  const handleUpdateVariantTitle = (
    title: string,
    questionIndex: number,
    variantIndex: number
  ) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].variants[variantIndex] = title;
      return updatedQuestions;
    });
  };

  return (
    <Layout className="pb-24 mb-0">
      <div className="max-w-2xl">
        <div className="flex justify-between items-center">
          <PageHeader text="Створення опитування" />
          <Button disabled={questions.length < 2} className="mb-8">
            Зберегти опитування
          </Button>
        </div>
        <div className="mt-12">
          <div className="mb-6">
            <EditableInput
              textClassname="italic text-2xl"
              value={title}
              setValue={setTitle}
            />
          </div>

          <div className="flex flex-col gap-8">
            {questions.map((question, index) => (
              <CreateQuestion
                key={index}
                question={question}
                questionIndex={index}
                setQuestion={handleUpdateQuestion}
                removeQuestion={handleRemoveQuestion}
                removeVariant={handleRemoveVariant}
                handleUpdateVariantTitle={handleUpdateVariantTitle}
              />
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleAddQuestion}
              size="sm"
              variant="outlined"
              className="mt-8 flex gap-2"
            >
              <PlusCircleIcon className="text-primary-blue h-6 w-6" />
              <Typography className="font-medium">Додати питання</Typography>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
