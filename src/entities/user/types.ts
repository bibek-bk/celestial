
export type UserID = string;

export interface User {
    id: UserID;
    username?: string;
    full_name?: string;
    avatarUrl?: string;
    avatar_url?: string;
    bio?: string;
    createdAt: string;
    followers_count?: number;
}

export interface UpdateUserInput {
    username?: string;
    avatarUrl?: string;
    bio?: string;
  }