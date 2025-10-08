import React from 'react';
import { Avatar } from '@/design-system/components/Avatar/Avatar';
import { PostMedia } from './PostMedia';
import { ActionBar } from './ActionBar';
import { Caption } from './Caption';
import {
  PostId,
  Media,
  Comment,
  UserSummary,
  PostInteractionHandlers
} from '@/entities/post/models/types';

interface PostCardProps extends PostInteractionHandlers {
  id: PostId;
  user: UserSummary;
  media: Media[];
  caption: string;
  likes?: number;
  isLiked?: boolean;
  comments: Comment[];
  totalComments: number;
  shares: number;
  isSaved: boolean;
  timestamp: string;
  location?: string;
  className?: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  id,
  user,
  media,
  caption,
  likes,
  isLiked,
  className = '',
  onLike,

}) => {
  const handleLike = () => onLike?.(id);

  return (
    <article className={`bg-gray-900 w-full max-w-md mx-auto rounded-xl shadow-lg border border-gray-800 mb-4 sm:mb-6 overflow-hidden ${className}`}>
      {/* Post Header */}
      <header className="flex items-center p-4">
        <Avatar 
          src={user.avatar} 
          alt={`${user.username}'s avatar`} 
          size="md"
          className="cursor-pointer border-gray-700"
        />
        <div className="ml-3 flex-1">
          <div className="flex items-center">
            <button 
              className="font-semibold text-white hover:underline focus:outline-none"
              aria-label={`View ${user.username}'s profile`}
            >
              {user.username}
            </button>
            {user.isVerified && (
              <svg 
                className="w-4 h-4 ml-1 text-blue-400" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-label="Verified account"
              >
                <path 
                  fillRule="evenodd" 
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
            
          </div>
        </div>
        <button 
          className="p-1 hover:bg-gray-800 rounded-full focus:outline-none transition-colors"
          aria-label="More options"
        >
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </header>

      {/* Post Media */}
      <PostMedia media={media} />

      {/* Action Bar */}
      <ActionBar
        postId={id}
        likes={likes ?? 0}
        isLiked={isLiked}
        onLike={handleLike}
      />

      {/* Likes Count */}
      {(likes ?? 0) > 0 && (
        <div className="px-4 pb-2">
          <p className="text-sm font-semibold text-white">
            {(likes ?? 0) === 1 ? '1 like' : `${(likes ?? 0).toLocaleString()} likes`}
          </p>
        </div>
      )}

      {/* Caption */}   
      <Caption username={user.username} caption={caption} />


    </article>
  );
};



