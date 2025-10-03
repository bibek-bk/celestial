
export type UserID = string;

export interface User {
    id: UserID;
    username: string;
    avatarUrl?: string;
    bio?: string;
    createdAt: string;
}

export interface UpdateUserInput {
    username?: string;
    avatarUrl?: string;
    bio?: string;
  }