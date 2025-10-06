// src/features/follow/FollowButton.tsx
import { useFollowUser, useUnfollowUser } from '@/services/follows/mutations';
import { useIsFollowing } from '@/services/follows/queries';

interface FollowButtonProps {
  userId: string;
  className?: string;
}

export const FollowButton = ({ userId, className = '' }: FollowButtonProps) => {
  const { data: isFollowing, isLoading } = useIsFollowing(userId);
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  const handleClick = () => {
    if (isFollowing) {
      unfollowMutation.mutate(userId);
    } else {
      followMutation.mutate(userId);
    }
  };

  const isPending = followMutation.isPending || unfollowMutation.isPending;

  if (isLoading) {
    return (
      <button
        disabled
        className={`px-6 py-1.5 rounded-lg bg-gray-200 text-gray-400 ${className}`}
      >
        Loading...
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`px-6 py-1.5 rounded-lg font-semibold transition-colors ${
        isFollowing
          ? 'bg-gray-200 hover:bg-gray-300 text-black'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      } disabled:opacity-50 ${className}`}
    >
      {isPending ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
    </button>
  );
};