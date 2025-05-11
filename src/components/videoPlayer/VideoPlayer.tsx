import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share2, Bookmark, Flag, MessageSquare, Send } from 'lucide-react';
import Layout from '../layout/Layout';
import Button from '../common/Button';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import SkeletonLoader from '../common/SkeletonLoader';
import VideoActions from './VideoActions';
import CommentSection from './CommentSection';
import RelatedVideos from './RelatedVideos';

const VideoPlayer: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [video, setVideo] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch video and its comments
  const fetchVideoData = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // Get token from localStorage or cookies

      // Send token in Authorization header
      const videoResponse = await axios.get(`${API_BASE_URL}/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        },
      });
      setVideo(videoResponse.data.data);

      const commentsResponse = await axios.get(`${API_BASE_URL}/comments/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        },
      });
      setComments(commentsResponse.data.data);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching video data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  if (isLoading) {
    return (
      <Layout>
        <div className="video-container">
          <div className="video-player">
            <SkeletonLoader type="video" />
          </div>
          <SkeletonLoader type="comment" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="video-container">
        <div className="video-player">
          <h1>{video.title}</h1>
          <video controls>
            <source src={video.videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <VideoActions video={video} />

        <div className="comments-section">
          <CommentSection comments={comments} videoId={videoId} />
        </div>

        <RelatedVideos videoId={videoId} />
      </div>
    </Layout>
  );
};

export default VideoPlayer;
