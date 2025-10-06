// src/features/follow/FollowingList.tsx
import { useFollowing } from '@/services/follows/queries';
import { FollowButton } from './FollowButton';

interface FollowingListProps {
  userId: string;
}

export const FollowingList = ({ userId }: FollowingListProps) => {
  const { data: following, isLoading } = useFollowing(userId);

  if (isLoading) return <div>Loading...</div>;
  if (!following?.length) return <div>Not following anyone yet</div>;

  return (
    <div className="space-y-4">
      {following.map((follow) => {
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