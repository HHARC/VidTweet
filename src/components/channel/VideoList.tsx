// VideoList.tsx
import React from 'react';
import VideoCard from './VideoCard'; // Reusable card for each video

interface VideoListProps {
  videos: Array<{
    id: string;
    title: string;
    thumbnail: string;
    views: number;
    likes: number;
    timestamp: string;
  }>;
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  );
};

export default VideoList;
