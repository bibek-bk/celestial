
export type UserID = string;

export interface User {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  followers_count: number;
  following_count: number;
  posts_count: number;
  created_at: string;
}


export interface UpdateUserInput {
    username?: string;
    avatar_url?: string;
    bio?: string;
  }