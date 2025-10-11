import React from 'react';

interface BioProps {
  name?: string;
  bio?: string;
  className?: string;
}

const Bio: React.FC<BioProps> = ({
  name = 'Name',
  bio = 'Bio',
  className = ''
}) => {
  return (
    <div className={`px-4 sm:px-6  ${className}`}>
      <div className="space-y-1">
        {/* Name */}
        <h1 className="text-base font-bold text-[var(--color-text-primary)] md:text-xl">
          {name}
        </h1>
        {/* Bio */}
        <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">
          {bio}
        </p>

      
      </div>
    </div>
  );
};

export default Bio;
