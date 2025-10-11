import React, { useEffect, useState } from 'react';
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
  mobile: 'w-[88px] h-[88px]', tablet: 'w-[110px] h-[110px]',
  desktop: 'w-32 h-32',
};

export const Avatar: React.FC<AvatarProps> = ({
  src = '/placeholder-user.jpg',
  alt = 'Profile avatar',
  size = 'md',
  className,
}) => {
 
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src); // Reset when src prop changes
    setIsLoading(true);
  }, [src]);

  const handleImageError = () => {
    setIsLoading(false);
    if (imgSrc !== '/placeholder-user.jpg') {
      setImgSrc('/placeholder-user.jpg'); // Only fallback once
    }
  };

  return (
    <div className={cn('relative', sizeToClasses[size], className)}>
      {isLoading && <Skeleton variant="circular" className="absolute inset-0" />}
      <img
        src={imgSrc || '/placeholder-user.jpg'}
        alt={alt}
        className={cn(
          'w-full h-full rounded-full object-cover',
          'border border-gray-700',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={() => setIsLoading(false)}
        onError={handleImageError}
      />
    </div>
  );
};


