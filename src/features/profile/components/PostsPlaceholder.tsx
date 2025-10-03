import React from 'react';

interface PostsPlaceholderProps {
  className?: string;
}

const PostsPlaceholder: React.FC<PostsPlaceholderProps> = ({ className = '' }) => {
  return (
    <div className={`px-4 sm:px-6 ${className}`}>
      <div className="flex flex-col items-center justify-center py-10 md:py-14">
        {/* Icon Placeholder */}
        <div 
          className="w-22 h-22 rounded-lg border-2 border-dashed border-[#1F2A36] flex items-center justify-center mb-4"
          aria-hidden="true"
        >
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 32 32" 
            fill="none" 
            className="text-[#9AA6B2]"
          >
            <path 
              d="M8 12L16 4L24 12M16 4V28M8 20L16 12L24 20" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Message */}
        <div className="text-center">
          <h2 className="text-lg font-medium text-[#E6EEF3] mb-1">
            No posts yet
          </h2>
          <p className="text-sm text-[#9AA6B2]">
            When posts appear, they'll show up here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostsPlaceholder;
