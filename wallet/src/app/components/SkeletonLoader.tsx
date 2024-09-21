import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 3 }) => {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white bg-opacity-50 rounded-lg p-4 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <div className="h-6 bg-purple-200 rounded w-1/3"></div>
            <div className="h-6 bg-purple-200 rounded w-1/4"></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-4 bg-purple-200 rounded"></div>
            <div className="h-4 bg-purple-200 rounded"></div>
            <div className="h-4 bg-purple-200 rounded"></div>
            <div className="h-4 bg-purple-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
