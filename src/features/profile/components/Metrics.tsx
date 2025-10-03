import React from 'react';

interface MetricsProps {
  posts?: number;
  followers?: number;
  following?: number;
  className?: string;
}

const Metrics: React.FC<MetricsProps> = ({ 
  posts = 0, 
  followers = 0, 
  following = 0, 
  className = '' 
}) => {
  const metrics = [
    { label: 'Posts', value: posts },
    { label: 'Followers', value: followers },
    { label: 'Following', value: following }
  ];

  return (
    <div className={`flex gap-5 ${className}`}>
      {metrics.map((metric) => (
        <div key={metric.label} className="text-center">
          <div 
            className="text-lg font-semibold text-[#E6EEF3] md:text-xl"
            aria-label={`${metric.value} ${metric.label}`}
          >
            {metric.value.toLocaleString()}
          </div>
          <div className="text-sm text-[#9AA6B2]">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Metrics;
