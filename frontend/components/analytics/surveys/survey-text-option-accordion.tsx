import { AccordionArrow } from "@components/common";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Typography,
} from "@material-tailwind/react";
import { SurveyQuestion } from "@types";
import { useState } from "react";

export const SurveyOptionAccordion = ({
  question,
}: {
  question: SurveyQuestion;
}) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <Accordion open={open} icon={AccordionArrow({ open })}>
      <AccordionHeader
        className="px-2 rounded-xl text-gray-600 border-2 py-1 border-gray-300"
        onClick={toggleOpen}
      >
        Текстові відповіді
      </AccordionHeader>
      <AccordionBody className="px-2">
        <div className="flex gap-2 flex-col">
          {question.textAnswers.map((answer, index) => (
            <Typography className="font-medium">
              {index + 1}. {answer}
            </Typography>
          ))}
          {!question.textAnswers.length && (
            <Typography>Відповіді відсутні</Typography>
          )}
        </div>
      </AccordionBody>
    </Accordion>
  );
};
