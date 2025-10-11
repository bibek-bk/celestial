
import { UserPlus } from "lucide-react";
import { useToggleFollow } from "./hooks/useToggleFollow";
import { cn } from "@/design-system";

interface FollowButtonProps {
  userId: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  showCount?: boolean;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  userId,
  size = 'md',
  variant = 'primary',
  // showCount = false,
}) => {
  const { isFollowing, isPending, toggleFollow } =
    useToggleFollow(userId);
  console.log(isFollowing);


  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const baseClasses =
    'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed max-w-[300px] sm:max-w-[110px] min-w-[110px] w-full';

  const variantClasses = isFollowing
    ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
    : variant === 'primary'
      ? 'bg-blue-500 hover:bg-blue-600 text-white'
      : 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50';



  return (
    <button
      onClick={toggleFollow}
      disabled={isPending}
      className={cn(baseClasses,sizeClasses[size] ,variantClasses)}
    >
      {isFollowing ? '' : <UserPlus size={16} />}
      <span>{isFollowing ? 'Following' : 'Follow'}</span>
    </button>
  );
};