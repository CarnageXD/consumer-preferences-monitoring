import { User } from "./user";

export interface Survey {
  id: number;
  title: string;
  questions: SurveyQuestion[];
}

export interface SurveyQuestion {
  id: number;
  question: string;
  type: "text" | "radio" | "checkbox";
  options: string[];
  survey: Survey;
  surveyResponses: SurveyResponse[];
}

export interface SurveyResponse {
  id: number;
  survey: Survey;
  user: User;
  question: SurveyQuestion;
  answers: string[];
}
