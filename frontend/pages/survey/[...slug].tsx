import { Layout, PageHeader, Textarea } from "@components/common";
import { Button, Checkbox, Radio, Typography } from "@material-tailwind/react";
import { Survey } from "@types";
import { getApiUrl } from "@utils";
import { useState } from "react";

export default function Survey({ survey }: { survey: Survey }) {
  const [values, setValues] = useState<Array<string | string[]>>([]);

  const handleAnswerChange = (questionIndex: number, answer: any) => {
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[questionIndex] = answer;
      return updatedValues;
    });
  };

  const handleSubmitSurvey = () => {
    console.log("Збережені відповіді:", values);
  };

  return (
    <Layout>
      <PageHeader text={survey.title} />
      <div className="w-1/2 flex flex-col gap-4">
        {survey.questions.map(({ question, options, type }, index) => {
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
                      label={variant}
                      onChange={() => handleAnswerChange(index, variant)}
                      checked={values[index] === variant}
                    />
                  ))}
                {type === "text" && (
                  <Textarea
                    setValue={(text) => handleAnswerChange(index, text)}
                    value={values[index] || ""}
                  />
                )}
                {type === "checkbox" &&
                  options.map((variant, variantIndex) => (
                    <Checkbox
                      key={variantIndex}
                      label={variant}
                      onChange={(event) => {
                        const isChecked = event.target.checked;
                        const updatedAnswers = [...(values[index] || [])];

                        if (isChecked) {
                          updatedAnswers.push(variant);
                        } else {
                          const variantIndex = updatedAnswers.indexOf(variant);
                          if (variantIndex > -1) {
                            updatedAnswers.splice(variantIndex, 1);
                          }
                        }

                        handleAnswerChange(index, updatedAnswers);
                      }}
                      checked={values[index]?.includes(variant) || false}
                    />
                  ))}
              </div>
            </div>
          );
        })}
        <div className="flex justify-end">
          <Button className="bg-primary-blue mt-4" onClick={handleSubmitSurvey}>
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
