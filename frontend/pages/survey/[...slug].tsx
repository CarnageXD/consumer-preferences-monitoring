import { Layout, PageHeader, Textarea } from "@components/common";
import { Button, Checkbox, Radio, Typography } from "@material-tailwind/react";
import { useState } from "react";

export default function Survey() {
  const mockedSurvey = {
    title: "Задоволення продукцією",
    questions: [
      {
        question: "Як би ви оцінили загальну якість нашої продукції?",
        variants: ["Погано", "Задовільно", "Відмінно"],
        type: "radio",
      },
      {
        question: "Якими словами ви описали б смак наших сирів?",
        variants: [],
        type: "text",
      },
      {
        question: "Чи відповідає упаковка продукту вашим очікуванням?",
        variants: ["Ні", "Так"],
        type: "checkbox",
      },
      {
        question: "Якими словами ви описали б смак наших сирів?",
        variants: [],
        type: "text",
      },
    ],
  };

  const [values, setValues] = useState<Array<string | string[]>>([]);
  console.log("values", values);

  const handleAnswerChange = (questionIndex: number, answer: any) => {
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[questionIndex] = answer;
      return updatedValues;
    });
  };

  const handleSubmitSurvey = () => {
    // Виконайте потрібні дії зі збереженими відповідями (values)
    console.log("Збережені відповіді:", values);
  };

  return (
    <Layout>
      <PageHeader text={mockedSurvey.title} />
      <div className="w-1/2 flex flex-col gap-4">
        {mockedSurvey.questions.map(({ question, variants, type }, index) => {
          return (
            <div key={index}>
              <Typography className="font-normal text-lg">
                {index + 1}. {question}
              </Typography>
              <div className="flex gap-8">
                {type === "radio" &&
                  variants.map((variant, variantIndex) => (
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
                  variants.map((variant, variantIndex) => (
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
