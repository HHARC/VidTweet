// VideoCard.tsx
import React from 'react';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  timestamp: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ id, title, thumbnail, views, likes, timestamp }) => {
  return (
    <div className="card">
      <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
      <h3>{title}</h3>
      <p>{views} views • {timestamp}</p>
      <p>{likes} likes</p>
    </div>
  );
};

export default VideoCard;
