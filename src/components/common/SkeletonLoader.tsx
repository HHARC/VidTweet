// src/components/common/SkeletonLoader.tsx
import React from 'react';

interface SkeletonLoaderProps {
  type: 'video' | 'comment' | 'card';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type }) => {
  if (type === 'video') {
    return (
      <div className="skeleton-video-card">
        <div className="skeleton-thumbnail w-full h-48 bg-gray-300"></div>
        <div className="skeleton-text mt-4">
          <div className="h-6 bg-gray-300 w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 w-1/2"></div>
        </div>
      </div>
    );
  }

  if (type === 'comment') {
    return (
      <div className="skeleton-comment mb-4">
        <div className="skeleton-avatar h-10 w-10 rounded-full bg-gray-300"></div>
        <div className="skeleton-comment-text mt-2">
          <div className="h-4 bg-gray-300 w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 w-1/2"></div>
        </div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="skeleton-card p-4">
        <div className="skeleton-thumbnail w-full h-40 bg-gray-300"></div>
        <div className="skeleton-text mt-4">
          <div className="h-6 bg-gray-300 w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 w-1/2"></div>
        </div>
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
