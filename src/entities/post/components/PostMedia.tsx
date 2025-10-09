import React, { useState } from 'react';
import { Skeleton } from '@/design-system/components/Skeleton/Skeleton';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

interface PostMediaProps {
  media: MediaItem[];
}

export const PostMedia: React.FC<PostMediaProps> = ({ media }) => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    media.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
  );

  const handleImageLoad = (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: false }));
  };

  const handleImageError = (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: false }));
  };

  if (!media || media.length === 0) return null;

  return (
    <div className="w-full bg-black">
      {media.map((item) => (
        <div
          key={item.id}
          className="w-full aspect-square bg-gray-900 overflow-hidden rounded-md relative"
        >
          {loadingStates[item.id] && (
            <Skeleton
              variant="rectangular"
              className="absolute inset-0 w-full h-full"
            />
          )}
          {item.type === 'image' ? (
            <img
              src={item.url}
              alt={item.alt || ''}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                loadingStates[item.id] ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
              onLoad={() => handleImageLoad(item.id)}
              onError={() => handleImageError(item.id)}
            />
          ) : (
            <video
              controls
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                loadingStates[item.id] ? 'opacity-0' : 'opacity-100'
              }`}
              onLoadedData={() => handleImageLoad(item.id)}
              onError={() => handleImageError(item.id)}
            >
              <source src={item.url} />
            </video>
          )}
        </div>
      ))}
    </div>
  );
};
