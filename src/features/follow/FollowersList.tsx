// src/features/follow/FollowersList.tsx
import { useFollowers } from '@/services/follows/queries';
import { FollowButton } from './FollowButton';

interface FollowersListProps {
  userId: string;
}

export const FollowersList = ({ userId }: FollowersListProps) => {
  const { data: followers, isLoading } = useFollowers(userId);

  if (isLoading) return <div>Loading followers...</div>;
  if (!followers?.length) return <div>No followers yet</div>;

  return (
    <div className="space-y-4">
      {followers.map((follow) => {
        const profile = follow.profiles;
        if (!profile) return null;

        return (
          <div key={follow.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={profile.avatar_url || '/default-avatar.png'}
                alt={profile.username || ''}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">{profile.username}</p>
                <p className="text-sm text-gray-500">{profile.full_name}</p>
              </div>
            </div>
            <FollowButton userId={profile.id} />
          </div>
        );
      })}
    </div>
  );
};