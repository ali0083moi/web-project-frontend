import { User } from "./User";

export interface Follow {
  id: string;
  createdAt: Date;

  // Relations
  follower: User;
  followerId: string;
  following: User;
  followingId: string;
}
