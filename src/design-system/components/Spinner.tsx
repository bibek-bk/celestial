interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    className?: string;
  }
  
  export const Spinner: React.FC<SpinnerProps> = ({
    size = 'md',
    color = 'currentColor',
    className = '',
  }) => {
    const sizeClasses = {
      sm: 'w-4 h-4 border-2',
      md: 'w-5 h-5 border-2',
      lg: 'w-6 h-6 border-3',
    };
  
    return (
      <div
        className={`${sizeClasses[size]} ${className} border-solid rounded-full animate-spin`}
        style={{
          borderColor: `${color}40`,
          borderTopColor: color,
        }}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  };