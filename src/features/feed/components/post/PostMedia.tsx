import React, { useState } from 'react';

interface PostMediaProps {
  media: Array<{
    id: string;
    type: 'image' | 'video';
    url: string;
    alt?: string;
  }>;
  className?: string;
}

export const PostMedia: React.FC<PostMediaProps> = ({ media, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const nextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevMedia = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const currentMedia = media[currentIndex];

  if (!media.length) {
    return (
      <div className={`w-full aspect-square bg-gray-100 flex items-center justify-center ${className}`}>
        <p className="text-gray-400">No media</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Main Media Display */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        {currentMedia.type === 'image' ? (
          <img
            src={currentMedia.url}
            alt={currentMedia.alt || 'Post image'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <video
            src={currentMedia.url}
            className="w-full h-full object-cover"
            controls={isVideoPlaying}
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
            poster={currentMedia.alt}
          />
        )}

        {/* Navigation Arrows (only show if multiple media) */}
        {media.length > 1 && (
          <>
            <button
              onClick={prevMedia}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-opacity"
              aria-label="Previous media"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextMedia}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-opacity"
              aria-label="Next media"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Media Indicators */}
      {media.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to media ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
