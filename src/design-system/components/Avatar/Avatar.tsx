import React from 'react';
import { cn } from '../../utils/cn';

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
  return (
    <div className={cn('relative', sizeToClasses[size], className)}>
      <img
        src={src}
        alt={alt}
        className={cn(
          'w-full h-full rounded-full object-cover aspect-square',
          'border border-gray-700'
        )}
        loading="lazy"
      />
    </div>
  );
};


