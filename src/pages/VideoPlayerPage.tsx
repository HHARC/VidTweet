import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';
import { ThumbsUp, ThumbsDown, Share2, Bookmark, Flag, MessageSquare, Send } from 'lucide-react';
import Layout from '../components/layout/Layout';
import SkeletonLoader from '../components/common/SkeletonLoader';

const VideoPlayerPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [video, setVideo] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch video and comments data
  const fetchVideoData = async () => {
    try {
      const videoResponse = await axios.get(`${API_BASE_URL}/videos/${videoId}`);
      setVideo(videoResponse.data.data);

      const commentsResponse = await axios.get(`${API_BASE_URL}/comments/${videoId}`);
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

  // Check if video is available before rendering
  if (isLoading || !video) {
    return <SkeletonLoader type="video" />;
  }

  return (
    <Layout>
      <div className="video-player-container">
        <div className="video-player">
          {/* Check if video data is available */}
          <h1>{video.title || 'Loading...'}</h1>
          <video controls>
            <source src={video.videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video actions */}
          <div className="video-actions">
            <button>
              <ThumbsUp /> Like
            </button>
            <button>
              <ThumbsDown /> Dislike
            </button>
            <button>
              <Share2 /> Share
            </button>
            <button>
              <Bookmark /> Save
            </button>
            <button>
              <Flag /> Report
            </button>
          </div>

          {/* Video description */}
          <div className="video-description">
            <h4>Description:</h4>
            <p>{video.description}</p>
          </div>

          {/* Comments section */}
          <div className="comments-section">
            <h3>Comments ({comments.length})</h3>
            {comments.map((comment) => (
              <div key={comment._id}>
                <div>
                  <h5>{comment.user.username}</h5>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related videos */}
        <div className="related-videos">
          <h3>Related Videos</h3>
          {/* Display related videos */}
        </div>
      </div>
    </Layout>
  );
};

export default VideoPlayerPage;
