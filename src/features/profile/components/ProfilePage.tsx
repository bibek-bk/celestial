import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import Bio from './Bio';
// import StoriesRow from './StoriesRow';
import PostsReelsToggle from './PostsReelsToggle';
import PostsPlaceholder from './PostsPlaceholder';
import ReelsPlaceholder from './ReelsPlaceholder';
import { useProfile } from '../hooks/useProfile';

interface User {
  avatar_url: string;
  avatarAlt: string;
  name: string;
  subtitle: string;
  bio: string;
  location: string;
  posts: number;
  followers: number;
  following: number;
  isFollowing: boolean;
}

interface ProfilePageProps {
  user?: User;
  onFollow?: (user: User) => void;
  className?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user = {
    avatar_url: '/placeholder-user.jpg',
    avatarAlt: 'Profile avatar',
    name: 'Unblast',
    subtitle: 'E-commerce Website',
    bio: 'Selective free resources for designers @unblast.',
    location: 'Melbourne, Victoria, Australia',
    posts: 42,
    followers: 1280,
    following: 156,
    isFollowing: false
  },
  onFollow,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'reels'>('posts');
  const { profile, isLoading } = useProfile('2d06f3c7-8630-48be-8832-41698df8a9c4');
  console.log(isLoading)
  console.log(profile,'im from profile page')


  const handleFollow = () => {
    if (onFollow) {
      onFollow(user);
    }
  };

  const handleTabChange = (tab: 'posts' | 'reels') => {
    setActiveTab(tab);
  };

  return (
    <div className={`min-h-screen bg-[var(--color-background)] ${className}`}>
      {/* Main Container */}
      <div className="max-w-full sm:max-w-[680px] lg:max-w-[720px] mx-auto">
        {/* Profile Header - starts 20px from top on mobile, 32px on tablet/desktop */}
        <div className="pt-5 sm:pt-8">
          <ProfileHeader
            avatarSrc={profile?.avatar_url || user.avatar_url}
            avatarAlt={user.avatarAlt}
            posts={user.posts}
            followers={user.followers}
            following={user.following}
            onFollow={handleFollow}
            isFollowing={user.isFollowing}
          />
        </div>

        {/* Bio Section */}
        <div className="mt-3">
          <Bio
            name={profile?.full_name || user.name}            
            subtitle={user.subtitle}
            bio={profile?.bio || user.bio}
            location={user.location}
          />
        </div>

        {/* Stories Row */}
        {/* <div className="mt-6">
          <StoriesRow />
        </div> */}

        {/* Divider */}
        <div className="mt-3 border-t border-[var(--color-border)] mx-4 sm:mx-6"></div>

        {/* Posts/Reels Toggle Bar */}
        <PostsReelsToggle
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Content based on active tab */}
        {activeTab === 'posts' ? <PostsPlaceholder /> : <ReelsPlaceholder />}
      </div>
    </div>
  );
};

export default ProfilePage;
