import React from 'react';
import { Skeleton } from '@/design-system/components/Skeleton/Skeleton';

interface SkeletonPostProps {
  className?: string;
}

export const SkeletonPost: React.FC<SkeletonPostProps> = ({ className = '' }) => {
  return (
    <div className={`bg-[var(--color-background-secondary)] rounded-lg w-full sm:w-md shadow-sm border border-[var(--color-border)] mb-4 ${className}`}>
      {/* Header Skeleton */}
      <div className="flex items-center p-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="ml-3 flex-1">
          <Skeleton variant="text" height={16} width={96} className="mb-2" />
          <Skeleton variant="text" height={12} width={64} />
        </div>
      </div>

      {/* Media Skeleton */}
      <Skeleton variant="rectangular" className="w-full aspect-square" />

      {/* Action Bar Skeleton */}
      <div className="flex items-center justify-between py-3 px-4">
        <div className="flex items-center space-x-4">
          <Skeleton variant="rectangular" width={24} height={24} />
          <Skeleton variant="rectangular" width={24} height={24} />
          <Skeleton variant="rectangular" width={24} height={24} />
        </div>
        <Skeleton variant="rectangular" width={24} height={24} />
      </div>

      {/* Likes Skeleton */}
      <div className="px-4 pb-2">
        <Skeleton variant="text" height={16} width={80} />
      </div>

      {/* Caption Skeleton */}
      <div className="px-4 pb-2">
        <div className="space-y-2">
          <Skeleton variant="text" height={16} width="100%" />
          <Skeleton variant="text" height={16} width="75%" />
        </div>
      </div>

     

     
    </div>
  );
};


