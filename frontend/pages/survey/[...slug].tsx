import { Layout, PageHeader, Textarea } from "@components/common";
import { useAuth } from "@context/auth";
import { Button, Checkbox, Radio, Typography } from "@material-tailwind/react";
import { Survey } from "@types";
import { getApiUrl } from "@utils";
import mutationFetcher from "@utils/mutation-fetcher";
import { useRouter } from "next/router";
import { useReducer } from "react";
import useSWRMutation from "swr/mutation";

const initialState = [] as any;

function reducer(state: any, action: any) {
  const existingResponseIndex = state.findIndex(
    (response: any) => response.questionId === action.questionId
  );

  switch (action.type) {
    case "DELETE_RESPONSE":
      return state.filter(
        (response: any) => response.questionId !== action.questionId
      );
    case "UPDATE_RESPONSE":
      if (existingResponseIndex > -1) {
        return state.map((response: any) =>
          response.questionId === action.questionId
            ? { ...response, answers: [action.answer] }
            : response
        );
      } else {
        return [
          ...state,
          { questionId: action.questionId, answers: [action.answer] },
        ];
      }
    case "TOGGLE_CHECKBOX":
      if (existingResponseIndex > -1) {
        return state.map((response: any) =>
          response.questionId === action.questionId
            ? {
                ...response,
                answers: action.isChecked
                  ? [...response.answers, action.answer]
                  : response.answers.filter((a: any) => a !== action.answer),
              }
            : response
        );
      } else if (action.isChecked) {
        return [
          ...state,
          { questionId: action.questionId, answers: [action.answer] },
        ];
      } else {
        return state;
      }
    default:
      throw new Error();
  }
}

export default function Survey({ survey }: { survey: Survey }) {
  const { user } = useAuth();
  const [responses, dispatch] = useReducer(reducer, initialState);

  const { push } = useRouter();

  const { trigger: addSurveyResponses } = useSWRMutation(
    getApiUrl("survey-responses"),
    mutationFetcher("POST")
  );

  const handleInputChange = (questionId: number, answer: string) => {
    if (answer === "") {
      dispatch({ type: "DELETE_RESPONSE", questionId });
    } else {
      dispatch({ type: "UPDATE_RESPONSE", questionId, answer });
    }
  };

  const handleCheckboxChange = (
    questionId: number,
    answer: string,
    isChecked: boolean
  ) => {
    const actionType =
      isChecked ||
      (!isChecked &&
        responses.find((response: any) => response.questionId === questionId)
          ?.answers.length > 1)
        ? "TOGGLE_CHECKBOX"
        : "DELETE_RESPONSE";

    dispatch({ type: actionType, questionId, answer, isChecked });
  };

  const handleSurveyCompletion = async () => {
    const payload = {
      surveyId: survey.id,
      userId: user?.id,
      responses,
    };

    console.log(payload);

    const res = await addSurveyResponses(payload);
    console.log("res", res);

    if ("response" in res) {
      push("/surveys");
    }
  };

  return (
    <Layout>
      <PageHeader text={survey.title} />
      <div className="w-1/2 flex flex-col gap-4">
        {survey.questions.map(({ id, question, options, type }, index) => {
          return (
            <div key={index}>
              <Typography className="font-normal text-lg">
                {index + 1}. {question}
              </Typography>
              <div className="flex gap-8">
                {type === "radio" &&
                  options.map((variant, variantIndex) => (
                    <Radio
                      key={variantIndex}
                      name={`question-${id}`}
                      label={variant}
                      onChange={() => handleInputChange(id, variant)}
                    />
                  ))}
                {type === "text" && (
                  <Textarea
                    setValue={(value) => handleInputChange(id, value)}
                  />
                )}
                {type === "checkbox" &&
                  options.map((variant, variantIndex) => (
                    <Checkbox
                      key={variantIndex}
                      label={variant}
                      onChange={(event) =>
                        handleCheckboxChange(id, variant, event.target.checked)
                      }
                    />
                  ))}
              </div>
            </div>
          );
        })}
        <div className="flex justify-end">
          <Button
            disabled={responses.length < survey.questions.length}
            className="bg-primary-blue mt-4"
            onClick={handleSurveyCompletion}
          >
            Завершити опитування
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({
  query,
}: {
  query: { slug: string[] };
}) => {
  try {
    const id = query.slug[0];
    const url = getApiUrl(`surveys/${id}`);

    const res = await fetch(url);
    const survey = await res.json();

    return { props: { survey } };
  } catch (error) {
    console.error(error);
    return { props: { survey: null } };
  }
};
