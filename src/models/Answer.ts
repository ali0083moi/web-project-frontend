import { User } from "./User";
import { Question } from "./Question";

export interface Answer {
  id: string;
  selectedOption: number;
  isCorrect: boolean;
  createdAt: Date;

  // Relations
  question: Question;
  questionId: string;
  player: User;
  playerId: string;
}
