import React, { useState } from 'react';

interface CaptionProps {
  username: string;
  caption: string;
  maxLength?: number;
  className?: string;
}

export const Caption: React.FC<CaptionProps> = ({ 
  username, 
  caption, 
  maxLength = 150,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const shouldTruncate = caption.length > maxLength;
  const displayCaption = isExpanded || !shouldTruncate 
    ? caption 
    : caption.substring(0, maxLength) + '...';

  return (
    <div className={`px-4 pb-2 ${className}`}>
      <div className="text-sm">
        <button 
          className="font-semibold text-white hover:underline focus:outline-none"
          aria-label={`View ${username}'s profile`}
        >
          {username}
        </button>
        <span className="ml-2 text-gray-300">
          {displayCaption}
        </span>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-1 text-gray-400 hover:text-gray-300 font-medium focus:outline-none"
            aria-label={isExpanded ? 'Show less' : 'Show more'}
          >
            {isExpanded ? ' less' : ' more'}
          </button>
        )}
      </div>
    </div>
  );
};



