import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Skeleton } from '../Skeleton/Skeleton';

type LegacySize = 'sm' | 'md' | 'lg' | 'mobile' | 'tablet' | 'desktop';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: LegacySize;
  className?: string;
}

const sizeToClasses: Record<LegacySize, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  mobile: 'w-22 h-22',
  tablet: 'w-[110px] h-[110px]',
  desktop: 'w-32 h-32',
};

export const Avatar: React.FC<AvatarProps> = ({
  src = '/placeholder-user.jpg',
  alt = 'Profile avatar',
  size = 'md',
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={cn('relative', sizeToClasses[size], className)}>
      {isLoading && (
        <Skeleton
          variant="circular"
          className="absolute inset-0 w-full h-full"
        />
      )}
      <img
        src={hasError ? '/placeholder-user.jpg' : src}
        alt={alt}
        className={cn(
          'w-full h-full rounded-full object-cover aspect-square',
          'border border-gray-700 transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        loading="lazy"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};


