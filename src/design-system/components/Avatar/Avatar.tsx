
import { cn } from '../../utils/cn';
import { Skeleton } from '../Skeleton/Skeleton';

type LegacySize = 'sm' | 'md' | 'lg' | 'mobile' | 'tablet' | 'desktop';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: LegacySize;
  className?: string;
  isLoading: boolean;
}

const sizeToClasses: Record<LegacySize, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  mobile: 'w-[88px] h-[88px]', tablet: 'w-[110px] h-[110px]',
  desktop: 'w-32 h-32',
};

export const Avatar: React.FC<AvatarProps> = ({
  src = '/placeholder-user.jpg',
  alt = 'Profile avatar',
  size = 'md',
  isLoading,
  className,
}) => {

  return (
    <div className={cn('relative', sizeToClasses[size], className)}>
      {isLoading ? <Skeleton variant="circular" className="bg-gray-700" width='100%'
        height='100%' /> : <img
        src={src}
        alt={alt}
        className={cn(
          'w-full h-full rounded-full object-cover',
          'border border-gray-700',
        )}
      />}

    </div>
  );
};


