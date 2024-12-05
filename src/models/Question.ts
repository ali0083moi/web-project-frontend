import { User } from "./User";
import { Category } from "./Category";
import { Answer } from "./Answer";

export type DifficultyLevel = "EASY" | "MEDIUM" | "HARD";

export interface Question {
  id: string;
  text: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: number;
  difficultyLevel: DifficultyLevel;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  category: Category;
  categoryId: string;
  createdBy: User;
  createdById: string;
  answers?: Answer[];
  relatedTo?: Question[];
  relatedFrom?: Question[];
}
