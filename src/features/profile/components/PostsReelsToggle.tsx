import React from 'react';

interface PostsReelsToggleProps {
  activeTab: 'posts' | 'reels';
  onTabChange: (tab: 'posts' | 'reels') => void;
  className?: string;
}

const PostsReelsToggle: React.FC<PostsReelsToggleProps> = ({
  activeTab,
  onTabChange,
  className = ''
}) => {
  return (
    <div className={`px-4 sm:px-6 ${className}`}>
      <div className="flex border-b border-[#14202B]">
        {/* Posts Tab */}
        <button
          onClick={() => onTabChange('posts')}
          className={`flex-1 py-3 px-4 text-center font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:ring-offset-2 focus:ring-offset-[#0B1220] ${
            activeTab === 'posts'
              ? 'text-[#E6EEF3] border-b-2 border-[#1E90FF]'
              : 'text-[#9AA6B2] hover:text-[#E6EEF3]'
          }`}
          aria-label="View posts"
          role="tab"
          aria-selected={activeTab === 'posts'}
        >
          <div className="flex items-center justify-center gap-2">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              className={activeTab === 'posts' ? 'text-[#1E90FF]' : 'text-[#9AA6B2]'}
            >
              <rect 
                x="3" 
                y="3" 
                width="7" 
                height="7" 
                rx="1" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <rect 
                x="14" 
                y="3" 
                width="7" 
                height="7" 
                rx="1" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <rect 
                x="14" 
                y="14" 
                width="7" 
                height="7" 
                rx="1" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <rect 
                x="3" 
                y="14" 
                width="7" 
                height="7" 
                rx="1" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </svg>
            Posts
          </div>
        </button>

        {/* Reels Tab */}
        <button
          onClick={() => onTabChange('reels')}
          className={`flex-1 py-3 px-4 text-center font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:ring-offset-2 focus:ring-offset-[#0B1220] ${
            activeTab === 'reels'
              ? 'text-[#E6EEF3] border-b-2 border-[#1E90FF]'
              : 'text-[#9AA6B2] hover:text-[#E6EEF3]'
          }`}
          aria-label="View reels"
          role="tab"
          aria-selected={activeTab === 'reels'}
        >
          <div className="flex items-center justify-center gap-2">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              className={activeTab === 'reels' ? 'text-[#1E90FF]' : 'text-[#9AA6B2]'}
            >
              <rect 
                x="2" 
                y="3" 
                width="20" 
                height="14" 
                rx="2" 
                ry="2" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <line 
                x1="8" 
                y1="21" 
                x2="16" 
                y2="21" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <line 
                x1="12" 
                y1="17" 
                x2="12" 
                y2="21" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </svg>
            Reels
          </div>
        </button>
      </div>
    </div>
  );
};

export default PostsReelsToggle;
