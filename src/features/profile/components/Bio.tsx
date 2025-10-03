import React from 'react';

interface BioProps {
  name?: string;
  subtitle?: string;
  bio?: string;
  location?: string;
  className?: string;
}

const Bio: React.FC<BioProps> = ({
  name = 'Unblast',
  subtitle = 'E-commerce Website',
  bio = 'Selective free resources for designers @unblast.',
  location = 'Melbourne, Victoria, Australia',
  className = ''
}) => {
  return (
    <div className={`px-4 sm:px-6 ${className}`}>
      <div className="space-y-1">
        {/* Name */}
        <h1 className="text-base font-bold text-[#E6EEF3] md:text-xl">
          {name}
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-[#9AA6B2]">
          {subtitle}
        </p>

        {/* Bio */}
        <p className="text-sm text-[#E6EEF3] leading-relaxed">
          {bio}
        </p>

        {/* Location */}
        <a
          href="#location"
          className="text-sm text-[#1E90FF] hover:underline focus:outline-none focus:underline"
          aria-label={`Location: ${location}`}
        >
          {location}
        </a>
      </div>
    </div>
  );
};

export default Bio;
