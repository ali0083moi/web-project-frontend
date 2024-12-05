import { Category } from "./Category";
import { Question } from "./Question";
import { Answer } from "./Answer";
import { Follow } from "./Follow";

export type UserRole = "DESIGNER" | "PLAYER";

export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  email: string;
  avatarUrl?: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  createdQuestions?: Question[];
  createdCategories?: Category[];
  answers?: Answer[];
  followers?: Follow[];
  following?: Follow[];
}
