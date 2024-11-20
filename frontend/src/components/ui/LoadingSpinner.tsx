import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-weather-primary dark:border-weather-secondary"></div>
    </div>
  );
};

export default LoadingSpinner;