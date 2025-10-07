import React from 'react';
import { Comment } from '@/entities/post/models/types';

interface CommentPreviewProps {
  comments: Comment[];
  totalComments: number;
  maxPreviewComments?: number;
  onViewAll?: () => void;
  className?: string;
}

export const CommentPreview: React.FC<CommentPreviewProps> = ({
  totalComments,
  onViewAll,
  className = ''
}) => {
  if (totalComments === 0) {
    return null;
  }

  return (
    <div className={`px-4 pb-3 ${className}`}>
      <button
        onClick={onViewAll}
        className="text-sm text-gray-400 hover:text-gray-300 focus:outline-none transition-colors"
        aria-label={`View all ${totalComments} comments`}
      >
        View all {totalComments} comments
      </button>
    </div>
  );
};



