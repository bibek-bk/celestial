import React, { useState } from 'react';

interface ActionBarProps {
  likes: number;
  isLiked: boolean;
  comments: number;
  shares: number;
  isSaved: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
  className?: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  likes,
  isLiked,
  comments,
  shares,
  isSaved,
  onLike,
  onComment,
  onShare,
  onSave,
  className = ''
}) => {
  const [localLikes, setLocalLikes] = useState(likes);
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localIsSaved, setLocalIsSaved] = useState(isSaved);

  const handleLike = () => {
    setLocalLikes(prev => localIsLiked ? prev - 1 : prev + 1);
    setLocalIsLiked(prev => !prev);
    onLike?.();
  };

  const handleSave = () => {
    setLocalIsSaved(prev => !prev);
    onSave?.();
  };

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className={`flex items-center justify-between py-3 px-4 border-t border-gray-800 ${className}`}>
      <div className="flex items-center gap-6">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className="flex items-center space-x-1 hover:opacity-70 transition-opacity"
          aria-label={localIsLiked ? 'Unlike post' : 'Like post'}
        >
          <svg
            className={`w-6 h-6 ${localIsLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            fill={localIsLiked ? 'currentColor' : 'none'}
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
          {localLikes > 0 && (
            <span className="text-sm font-medium text-gray-300">
              {formatCount(localLikes)}
            </span>
          )}
        </button>

        {/* Comment Button */}
        <button
          onClick={onComment}
          className="flex items-center space-x-1 hover:opacity-70 transition-opacity"
          aria-label="Comment on post"
        >
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {comments > 0 && (
            <span className="text-sm font-medium text-gray-300">
              {formatCount(comments)}
            </span>
          )}
        </button>

        {/* Share Button */}
        <button
          onClick={onShare}
          className="flex items-center space-x-1 hover:opacity-70 transition-opacity"
          aria-label="Share post"
        >
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
          {shares > 0 && (
            <span className="text-sm font-medium text-gray-300">
              {formatCount(shares)}
            </span>
          )}
        </button>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="hover:opacity-70 transition-opacity"
        aria-label={localIsSaved ? 'Remove from saved' : 'Save post'}
      >
        <svg
          className={`w-6 h-6 ${localIsSaved ? 'text-yellow-500 fill-current' : 'text-gray-400'}`}
          fill={localIsSaved ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </button>
    </div>
  );
};
