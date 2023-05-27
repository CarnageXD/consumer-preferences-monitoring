import { EditableInput, Layout, PageHeader } from "@components/common";
import { CreateQuestion } from "@components/survey";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface QuestionType {
  title: string;
  variants: string[];
  type: "checkbox" | "radio" | "text";
}

export default function CreateOrUpdateSurvey() {
  const survey: QuestionType[] = [];

  const [title, setTitle] = useState(
    "Нове опитування (натисніть, щоб змінити назву)"
  );
  const [questions, setQuestions] = useState<QuestionType[]>(survey || []);

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

  const handleUpdateQuestion = (question: QuestionType, index: number) => {
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

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedQuestions = Array.from(questions);
    const [removedQuestion] = updatedQuestions.splice(result.source.index, 1);
    updatedQuestions.splice(result.destination.index, 0, removedQuestion);

    setQuestions(updatedQuestions);
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

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {questions.map((question, index) => (
                    <Draggable
                      key={index}
                      draggableId={`question-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <CreateQuestion
                            question={question}
                            questionIndex={index}
                            setQuestion={handleUpdateQuestion}
                            removeQuestion={handleRemoveQuestion}
                            removeVariant={handleRemoveVariant}
                            handleUpdateVariantTitle={handleUpdateVariantTitle}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

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
