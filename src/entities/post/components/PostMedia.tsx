import React from 'react';

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
  if (!media || media.length === 0) return null;

  return (
    <div className="w-full bg-black">
      {media.map(item => (
        <div key={item.id} className="w-full">
          {item.type === 'image' ? (
            <img src={item.url} alt={item.alt || ''} className="w-full h-auto" />
          ) : (
            <video controls className="w-full">
              <source src={item.url} />
            </video>
          )}
        </div>
      ))}
    </div>
  );
};


