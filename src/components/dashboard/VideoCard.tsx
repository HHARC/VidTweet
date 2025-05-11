import React from 'react';
import { Link } from 'react-router-dom';

interface VideoCardProps {
  _id: string;  // Make sure the ID field matches your video model
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  _id,  // destructure the _id from the props
  title,
  thumbnail,
  views,
  likes,
  comments,
  createdAt,
}) => {
  return (
    <div className="card">
      {/* Ensure the link path uses the correct video _id */}
      <Link to={`/video/${_id}`}>
        <img src={thumbnail} alt={title} className="w-full h-auto" />
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p>{views} views</p>
        <p>{likes} likes</p>
        <p>{comments} comments</p>
        <p className="text-gray-500">{createdAt}</p>
      </div>
    </div>
  );
};

export default VideoCard;
