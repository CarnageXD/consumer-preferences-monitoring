import { EditableInput, Layout, PageHeader } from "@components/common";
import { CreateQuestion } from "@components/survey";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button, Typography } from "@material-tailwind/react";
import { Survey, SurveyQuestion } from "@types";
import { getApiUrl } from "@utils";
import mutationFetcher from "@utils/mutation-fetcher";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useSWRMutation from "swr/mutation";

export default function CreateOrUpdateSurvey({ survey }: { survey: Survey }) {
  const [title, setTitle] = useState(
    survey.title || "Нове опитування (натисніть, щоб змінити назву)"
  );
  const [questions, setQuestions] = useState<SurveyQuestion[]>(
    survey.questions || []
  );

  const { push, query } = useRouter();

  const { trigger: createSurvey } = useSWRMutation(
    getApiUrl("surveys"),
    mutationFetcher("POST")
  );

  const { trigger: updateSurvey } = useSWRMutation(
    getApiUrl(`surveys/${query.id}`),
    mutationFetcher("PATCH")
  );

  console.log("questions", questions);

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        question: `Питання ${prevQuestions.length + 1}`,
        options: ["Варіант 1"],
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

  const handleUpdateQuestion = (question: SurveyQuestion, index: number) => {
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
      updatedQuestions[questionIndex].options[variantIndex] = title;
      return updatedQuestions;
    });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const updatedQuestions = Array.from(questions);
    const [removedQuestion] = updatedQuestions.splice(result.source.index, 1);
    updatedQuestions.splice(result.destination.index, 0, removedQuestion);

    setQuestions(updatedQuestions);
  };

  const handleSaveSurvey = async () => {
    const res = query.id
      ? await updateSurvey({ title, questions })
      : await createSurvey({ title, questions });

    if (res.title) {
      push("/surveys");
    }
  };

  return (
    <Layout className="pb-24 mb-0">
      <div className="max-w-2xl">
        <div className="flex justify-between items-center">
          <PageHeader text="Створення опитування" />
          <Button
            onClick={handleSaveSurvey}
            disabled={questions.length < 2}
            className="mb-8"
          >
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
            <Droppable droppableId="question-list">
              {(provided: any) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {questions.map((question, index) => (
                    <Draggable
                      key={index}
                      draggableId={`question-${index}`} // Modified draggableId
                      index={index}
                    >
                      {(provided: any) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mt-6"
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

export const getServerSideProps = async ({
  query,
}: {
  query: { id: string[] };
}) => {
  console.log(query);
  try {
    const id = query.id;
    const url = getApiUrl(`surveys/${id}`);

    const res = await fetch(url);
    const survey = await res.json();

    return { props: { survey } };
  } catch (error) {
    console.error(error);
    return { props: { survey: null } };
  }
};
