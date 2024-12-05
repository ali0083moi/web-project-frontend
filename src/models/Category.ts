import { User } from "./User";
import { Question } from "./Question";

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  createdBy: User;
  createdById: string;
  questions?: Question[];
}
