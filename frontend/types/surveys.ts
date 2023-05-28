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
}
