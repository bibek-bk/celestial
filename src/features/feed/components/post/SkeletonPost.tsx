import React from 'react';

interface SkeletonPostProps {
  className?: string;
}

export const SkeletonPost: React.FC<SkeletonPostProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 mb-4 ${className}`}>
      {/* Header Skeleton */}
      <div className="flex items-center p-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="ml-3 flex-1">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
        </div>
      </div>

      {/* Media Skeleton */}
      <div className="w-full aspect-square bg-gray-200 animate-pulse"></div>

      {/* Action Bar Skeleton */}
      <div className="flex items-center justify-between py-3 px-4">
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Likes Skeleton */}
      <div className="px-4 pb-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
      </div>

      {/* Caption Skeleton */}
      <div className="px-4 pb-2">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>
      </div>

      {/* Comments Skeleton */}
      <div className="px-4 pb-3">
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-28"></div>
        </div>
      </div>

      {/* Timestamp Skeleton */}
      <div className="px-4 pb-3">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
      </div>
    </div>
  );
};
