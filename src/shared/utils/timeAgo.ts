// src/shared/utils/timeAgo.ts
export function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
  
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);
  
    if (diffInSeconds < 60) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  }
  