import React from 'react';
import { Avatar } from '@/design-system/components/Avatar/Avatar';
import { Button } from '@/design-system/components/Button/Button';
import Metrics from './Metrics';
import { FollowButton } from '@/features/follow/FollowButton';

interface ProfileHeaderProps {
  userId:string;
  avatarSrc?: string;
  avatarAlt?: string;
  posts?: number;
  followers?: number;
  following?: number;
  onFollow?: () => void;
  onEditProfile?: () => void;
  isFollowing?: boolean;
  isOwnProfile?: boolean;
  className?: string;
  isLoading: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatarSrc ,
  avatarAlt = 'Profile avatar',
  posts = 42,
  followers = 1280,
  following = 156,
  userId,
  onEditProfile,
  isOwnProfile = false,
  className = '',
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

        {/* Follow/Edit Profile Button */}
        {isOwnProfile ? (
          <Button
            onClick={onEditProfile}
            aria-label="Edit profile"
            className="w-full sm:w-auto sm:min-w-[120px] gap-2"
          >
            Edit Profile
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="opacity-80"
              aria-hidden="true"
            >
              <path
                d="M8.5 1.5L10.5 3.5L3.5 10.5L1.5 10.5L1.5 8.5L8.5 1.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        ) : (
          <FollowButton
          userId={userId}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
