// ProfileHeader.tsx
import React from 'react';

interface ProfileHeaderProps {
  avatar: string;
  banner: string;
  name: string;
  subscribers: number;
  totalVideos: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ avatar, banner, name, subscribers, totalVideos }) => {
  return (
    <div className="relative">
      <div className="h-48 bg-gradient-to-r from-gold to-orange">
        <img src={banner} alt="Banner" className="w-full h-full object-cover" />
      </div>
      
      <div className="absolute bottom-0 left-0 ml-4 -mt-16">
        <img src={avatar} alt="Avatar" className="h-32 w-32 rounded-full border-4 border-white object-cover" />
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p>{subscribers} subscribers • {totalVideos} videos</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
