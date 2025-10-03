import React from 'react';
import Avatar from './Avatar';
import Metrics from './Metrics';

interface ProfileHeaderProps {
  avatarSrc?: string;
  avatarAlt?: string;
  posts?: number;
  followers?: number;
  following?: number;
  onFollow?: () => void;
  isFollowing?: boolean;
  className?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatarSrc = '/placeholder-user.jpg',
  avatarAlt = 'Profile avatar',
  posts = 42,
  followers = 1280,
  following = 156,
  onFollow,
  isFollowing = false,
  className = ''
}) => {
  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 ${className}`}>
      {/* Avatar */}
      <div className="flex-shrink-0 ml-4 sm:ml-6">
        <Avatar 
          src={avatarSrc}
          alt={avatarAlt}
          size="mobile"
          className="sm:w-[110px] sm:h-[110px] lg:w-32 lg:h-32"
        />
      </div>

      {/* Metrics and Follow Button */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between w-full px-4 sm:px-0">
        {/* Metrics */}
        <div className="mb-4 sm:mb-0">
          <Metrics 
            posts={posts}
            followers={followers}
            following={following}
          />
        </div>

        {/* Follow Button */}
        <button
          onClick={onFollow}
          className={`
            h-9 px-[18px] rounded-md font-medium text-white
            bg-[#1E90FF] hover:bg-[#1B7FE6] active:bg-[#196FD6]
            transition-colors duration-200
            w-full sm:w-auto sm:min-w-[120px]
            flex items-center justify-center gap-2
            focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:ring-offset-2 focus:ring-offset-[#0B1220]
          `}
          aria-label={isFollowing ? 'Unfollow user' : 'Follow user'}
          aria-pressed={isFollowing}
        >
          {isFollowing ? 'Following' : 'Follow'}
          {/* Chevron down icon placeholder */}
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 12 12" 
            fill="none" 
            className="opacity-80"
            aria-hidden="true"
          >
            <path 
              d="M3 4.5L6 7.5L9 4.5" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
