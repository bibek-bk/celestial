import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import Bio from './Bio';
// import StoriesRow from './StoriesRow';
import PostsReelsToggle from './PostsReelsToggle';
import PostsPlaceholder from './PostsPlaceholder';
import ReelsPlaceholder from './ReelsPlaceholder';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '@/shared/hooks/useAuth';
import UpdateProfile from './UpdateProfile';

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
    name: '',
    bio: 'Selective free resources for designers @unblast.',
    location: 'Melbourne, Victoria, Australia',
    posts: 42,
    followers: 1280,
    following: 156,
    isFollowing: false
  },
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'reels'>('posts');
  const { id: profileId } = useParams<{ id: string }>();
  const { userId } = useAuth();
  const { profile, isLoading } = useProfile(profileId ?? userId ?? '');
  const [showEditModal, setShowEditModal] = useState(false)

  console.log(profile,'from profilePage')
  // Check if viewing own profile
  const isOwnProfile = profileId === userId;

 

  const handleEditProfile = () => {
    // Dummy edit profile handler
    setShowEditModal(true)
  };

  const handleTabChange = (tab: 'posts' | 'reels') => {
    setActiveTab(tab);
  };

  return (
    <div className={`min-h-screen bg-[var(--color-background)] ${className}`}>
      {/* Main Container */}
      <div className="max-w-full sm:max-w-[680px] mx-auto">
        {/* Profile Header - starts 20px from top on mobile, 32px on tablet/desktop */}
        {showEditModal && <UpdateProfile onClose={() => setShowEditModal(false)} />}
        <div className="pt-5 sm:pt-8">
          <ProfileHeader
            avatarSrc={profile?.avatar_url || user.avatar_url}
            avatarAlt={user.avatarAlt}
            posts={user.posts}
            followers={profile?.followers_count || 0}
            following={profile?.following_count || 0}
            onEditProfile={handleEditProfile}
            isFollowing={user.isFollowing}
            isOwnProfile={isOwnProfile}
            isLoading={isLoading}
            userId={profileId} 
          />
        </div>

        {/* Bio Section */}
        <div className="mt-3">
          <Bio
            name={profile?.username || user.name}            
            bio={profile?.bio || user.bio}
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
