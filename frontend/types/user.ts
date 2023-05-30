import { Rating } from "./product";
import { Review } from "./product";
import { SurveyResponse } from "./surveys";

export interface User {
  id: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "CLIENT" | "ANALYST" | "ADMIN";
  rating: Rating[];
  review: Review[];
  surveyResponses: SurveyResponse[];
}
