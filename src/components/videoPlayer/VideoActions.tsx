import React from 'react';
import { ThumbsUp, ThumbsDown, Share2, Bookmark, Flag } from 'lucide-react';
import { formatNumber } from '../../utils/helpers';

interface VideoActionsProps {
  video: any;
}

const VideoActions: React.FC<VideoActionsProps> = ({ video }) => {
  const { likeCount, dislikeCount, views, isLiked, isSaved } = video;

  return (
    <div className="video-actions flex items-center justify-between mt-4">
      <div className="flex items-center gap-4">
        <button className={`like-button ${isLiked ? 'liked' : ''}`}>
          <ThumbsUp size={18} /> {formatNumber(likeCount)}
        </button>
        <button className={`dislike-button ${isLiked ? 'disliked' : ''}`}>
          <ThumbsDown size={18} />
        </button>
        <button className="share-button">
          <Share2 size={18} />
          Share
        </button>
        <button className="save-button">
          <Bookmark size={18} />
          {isSaved ? 'Saved' : 'Save'}
        </button>
        <button className="report-button">
          <Flag size={18} />
          Report
        </button>
      </div>
      <div className="views">
        <span>{formatNumber(views)} views</span>
      </div>
    </div>
  );
};

export default VideoActions;
