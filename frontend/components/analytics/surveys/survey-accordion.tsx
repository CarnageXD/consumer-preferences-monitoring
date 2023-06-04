import { AccordionArrow } from "@components/common";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Typography,
} from "@material-tailwind/react";
import { Survey } from "@types";
import { useState } from "react";
import { SurveyOptionAccordion } from "./survey-text-option-accordion";
import { SurveyResponseChart } from "./survey-response-chart";

export const SurveyAccordion = ({ survey }: { survey: Survey }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <Accordion className="mt-4" open={open} icon={AccordionArrow({ open })}>
      <AccordionHeader
        className="bg-primary-blue text-white hover:text-primary-yellow px-2 rounded-xl"
        onClick={toggleOpen}
      >
        {survey.title}
      </AccordionHeader>
      <AccordionBody className="px-2">
        <div className="flex flex-col gap-4">
          {survey.questions.map((question) => {
            return (
              <div key={question.id}>
                <Typography className="text-black font-medium text-xl italic mb-2">
                  {question.question}
                </Typography>
                <div className="flex items-center">
                  <div className="flex flex-col gap-4">
                    {question.options.map((option) => {
                      return (
                        <div key={option} className="flex gap-2 text-gray-800">
                          {question.type !== "text" && (
                            <div>
                              <Typography className="text-lg font-normal">
                                {option}
                              </Typography>
                              <Typography className="text-lg font-normal">
                                {question.answerPercentages[option]
                                  ? Number(
                                      question.answerPercentages[option]
                                    ).toFixed(2)
                                  : 0}
                                %
                              </Typography>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {question.type !== "text" && (
                    <SurveyResponseChart question={question} />
                  )}
                </div>
                {question.type === "text" && (
                  <>
                    <SurveyOptionAccordion question={question} />
                    <div className="mb-4" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </AccordionBody>
    </Accordion>
  );
};
