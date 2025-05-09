import React from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical, ThumbsUp, MessageSquare, Eye } from 'lucide-react';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  channelAvatar: string;
  channelId: string;
  views: number;
  likes: number;
  comments: number;
  timestamp: string;
  duration: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  title,
  thumbnail,
  channelName,
  channelAvatar,
  channelId,
  views,
  likes,
  comments,
  timestamp,
  duration,
}) => {
  return (
    <div className="card overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
        <Link to={`/video/${id}`}>
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-80 px-1.5 py-0.5 text-xs font-medium text-white">
            {duration}
          </div>
        </Link>
      </div>

      <div className="mt-3">
        <div className="flex">
          <Link to={`/channel/${channelId}`} className="mr-3 flex-shrink-0">
            <img
              src={channelAvatar}
              alt={channelName}
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
          
          <div className="flex-1 min-w-0">
            <Link to={`/video/${id}`} className="block">
              <h3 className="mb-1 line-clamp-2 font-medium text-text-primary">
                {title}
              </h3>
            </Link>
            
            <Link to={`/channel/${channelId}`} className="text-sm text-text-secondary hover:text-orange">
              {channelName}
            </Link>
            
            <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-text-secondary">
              <div className="flex items-center">
                <Eye size={14} className="mr-1" />
                {views >= 1000000
                  ? `${(views / 1000000).toFixed(1)}M`
                  : views >= 1000
                  ? `${(views / 1000).toFixed(1)}K`
                  : views} views
              </div>
              
              <div className="flex items-center">
                <ThumbsUp size={14} className="mr-1" />
                {likes >= 1000000
                  ? `${(likes / 1000000).toFixed(1)}M`
                  : likes >= 1000
                  ? `${(likes / 1000).toFixed(1)}K`
                  : likes}
              </div>
              
              <div className="flex items-center">
                <MessageSquare size={14} className="mr-1" />
                {comments >= 1000000
                  ? `${(comments / 1000000).toFixed(1)}M`
                  : comments >= 1000
                  ? `${(comments / 1000).toFixed(1)}K`
                  : comments}
              </div>
              
              <div className="text-text-secondary">{timestamp}</div>
            </div>
          </div>
          
          <button className="ml-2 flex-shrink-0 rounded-full p-1 text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;