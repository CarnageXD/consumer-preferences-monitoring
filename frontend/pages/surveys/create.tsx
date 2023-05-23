import { Layout, PageHeader } from "@components/common";
import { CreateQuestion } from "@components/survey";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useRef, useState } from "react";

export default function CreateSurvey() {
  const [titleFocused, setTitleFocused] = useState(false);
  const [title, setTitle] = useState(
    "Нове опитування (натисніть, щоб змінити назву)"
  );
  const [questions, setQuestions] = useState([]);

  const titleInputRef = useRef(null);

  const handleAddQuestion = () => {
    setQuestions([
      //@ts-ignore
      ...questions,
      //@ts-ignore
      {
        title: `Питання ${questions.length + 1}`,
        variants: [],
        type: "text",
      },
    ]);
  };

  const handleUpdateQuestion = () => {};

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
            {titleFocused ? (
              <Input
                ref={titleInputRef}
                placeholder="Назва опитування..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setTitleFocused(false)}
              />
            ) : (
              <Typography
                className="font-medium italic text-2xl"
                onClick={() => {
                  setTitleFocused(true);
                }}
              >
                {title}
              </Typography>
            )}
          </div>

          <div className="flex flex-col gap-8">
            {questions.map((question) => (
              <CreateQuestion
                //@ts-ignore
                key={question.title}
                //@ts-ignore
                {...question}
                setQuestion={handleUpdateQuestion}
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
