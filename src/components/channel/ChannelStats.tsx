// ChannelStats.tsx
import React from 'react';

interface ChannelStatsProps {
  subscribers: number;
  totalVideos: number;
  totalViews: number;
  totalLikes: number;
}

const ChannelStats: React.FC<ChannelStatsProps> = ({ subscribers, totalVideos, totalViews, totalLikes }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
      <div className="card">
        <h3>Subscribers</h3>
        <p>{subscribers}</p>
      </div>
      <div className="card">
        <h3>Total Videos</h3>
        <p>{totalVideos}</p>
      </div>
      <div className="card">
        <h3>Total Views</h3>
        <p>{totalViews}</p>
      </div>
      <div className="card">
        <h3>Total Likes</h3>
        <p>{totalLikes}</p>
      </div>
    </div>
  );
};

export default ChannelStats;
