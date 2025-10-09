import React from 'react';
import { useToggleLike } from '../hooks/useToggleLike';
import { useLikesCount } from '@/services/like/queries';

interface LikeButtonProps {
  postId: string;
  isLiked: boolean;
  likes: number;
  className?: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ postId, isLiked, likes, className = '' }) => {
  const { toggle, isPending } = useToggleLike(postId, isLiked);
  const { data: remoteCount } = useLikesCount(postId);
  const displayLikes = typeof remoteCount === 'number' ? remoteCount : likes;

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className={`flex items-center space-x-1 hover:opacity-70 transition-opacity disabled:opacity-50 ${className}`}
      aria-label={isLiked ? 'Unlike post' : 'Like post'}
    >
      <svg
        className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`}
        fill={isLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {displayLikes > 0 && (
        <span className="text-sm font-medium text-gray-300">{displayLikes.toLocaleString()}</span>
      )}
    </button>
  );
};


