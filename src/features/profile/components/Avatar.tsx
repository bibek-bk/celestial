import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'mobile' | 'tablet' | 'desktop';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src = '/placeholder-user.jpg', 
  alt = 'Profile avatar', 
  size = 'desktop',
  className = '' 
}) => {
  // Responsive size classes
  const sizeClasses = {
    mobile: 'w-22 h-22', // 88px
    tablet: 'w-[110px] h-[110px]',
    desktop: 'w-32 h-32' // 128px
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        object-cover 
        shadow-sm
        ${className}
      `}
      aria-label={alt}
    />
  );
};

export default Avatar;
