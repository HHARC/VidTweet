import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Bookmark, 
  Flag, 
  MessageSquare,
  Send,
  Eye
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import VideoCard from '../components/dashboard/VideoCard';
import { useAuth } from '../context/AuthContext';

const VideoPlayer: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const { isAuthenticated, user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  // Mock data
  const video = {
    id: videoId || 'video-1',
    title: 'How to Build a Social Media App with React and Tailwind CSS',
    description: 'Learn how to build a modern social media application using React, Tailwind CSS, and best practices. This comprehensive guide covers everything from setting up your development environment to deploying your finished product.',
    channelName: 'TechTutorials',
    channelId: 'channel-1',
    channelAvatar: 'https://i.pravatar.cc/150?img=68',
    subscriberCount: 1200000,
    videoCount: 342,
    publishedAt: 'April 15, 2025',
    viewCount: 1543890,
    likeCount: 85400,
    commentCount: 950,
  };

  const comments = [
    {
      id: 'comment-1',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=23',
        username: 'sarah_j',
      },
      text: 'This tutorial saved me so much time! I was struggling with building a similar app, but your explanations made everything clear. Thank you so much!',
      likes: 124,
      time: '2 days ago',
      replies: 5,
    },
    {
      id: 'comment-2',
      user: {
        name: 'Michael Chen',
        avatar: 'https://i.pravatar.cc/150?img=52',
        username: 'mchen',
      },
      text: 'Great content as always! One question though - what are your thoughts on using Redux vs. Context API for state management in a project like this?',
      likes: 89,
      time: '3 days ago',
      replies: 3,
    },
    {
      id: 'comment-3',
      user: {
        name: 'Alex Martinez',
        avatar: 'https://i.pravatar.cc/150?img=3',
        username: 'alex_dev',
      },
      text: 'I implemented everything exactly as shown but ran into issues with the authentication flow. Any chance you could cover that in more detail in a follow-up video?',
      likes: 32,
      time: '5 days ago',
      replies: 2,
    },
  ];

  const relatedVideos = Array.from({ length: 6 }, (_, i) => ({
    id: `related-${i + 1}`,
    title: `Related Tutorial: ${i + 1} - Advanced React Patterns`,
    thumbnail: `https://picsum.photos/seed/${i + 10}/640/360`,
    channelName: 'TechTutorials',
    channelAvatar: 'https://i.pravatar.cc/150?img=68',
    channelId: 'channel-1',
    views: Math.floor(Math.random() * 1000000),
    likes: Math.floor(Math.random() * 50000),
    comments: Math.floor(Math.random() * 1000),
    timestamp: `${Math.floor(Math.random() * 10) + 1} days ago`,
    duration: `${Math.floor(Math.random() * 10) + 5}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, '0')}`,
  }));

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) {
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) {
      setLiked(false);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      // In a real app, you would submit the comment to the API
      console.log('Submitting comment:', commentText);
      setCommentText('');
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <Layout>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Video player and content - takes up 2/3 of the screen on large devices */}
        <div className="lg:col-span-2">
          {/* Video player */}
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
            {/* This would be replaced with an actual video player */}
            <div className="flex h-full items-center justify-center bg-gray-900 p-4 text-white">
              <p className="text-center">
                Video Player: {video.title}
                <br />
                <span className="text-sm text-gray-400">(Video player would be integrated here)</span>
              </p>
            </div>
          </div>

          {/* Video title and actions */}
          <div className="mt-4">
            <h1 className="text-xl font-bold text-text-primary sm:text-2xl">{video.title}</h1>
            
            <div className="mt-4 flex flex-col items-start justify-between space-y-4 border-b border-gray-200 pb-4 dark:border-gray-800 sm:flex-row sm:items-center sm:space-y-0">
              <div className="flex items-center">
                <div className="flex items-center">
                  <Eye size={18} className="mr-1 text-text-secondary" />
                  <span className="text-text-secondary">{formatNumber(video.viewCount)} views</span>
                </div>
                <span className="mx-2 text-text-secondary">•</span>
                <span className="text-text-secondary">{video.publishedAt}</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <button
                  className={`flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium dark:bg-gray-800 ${
                    liked ? 'text-orange' : 'text-text-secondary'
                  }`}
                  onClick={handleLike}
                >
                  <ThumbsUp size={18} className="mr-2" />
                  {formatNumber(video.likeCount)}
                </button>
                
                <button
                  className={`flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium dark:bg-gray-800 ${
                    disliked ? 'text-orange' : 'text-text-secondary'
                  }`}
                  onClick={handleDislike}
                >
                  <ThumbsDown size={18} />
                </button>
                
                <button className="flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-text-secondary dark:bg-gray-800">
                  <Share2 size={18} className="mr-2" />
                  Share
                </button>
                
                <button
                  className={`flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium dark:bg-gray-800 ${
                    saved ? 'text-orange' : 'text-text-secondary'
                  }`}
                  onClick={handleSave}
                >
                  <Bookmark size={18} className="mr-2" />
                  {saved ? 'Saved' : 'Save'}
                </button>
                
                <button className="flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-text-secondary dark:bg-gray-800">
                  <Flag size={18} className="mr-2" />
                  Report
                </button>
              </div>
            </div>
          </div>

          {/* Channel info */}
          <div className="mt-4 flex items-start justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
            <div className="flex items-start">
              <Link to={`/channel/${video.channelId}`} className="mr-4">
                <img
                  src={video.channelAvatar}
                  alt={video.channelName}
                  className="h-12 w-12 rounded-full object-cover"
                />
              </Link>
              
              <div>
                <Link to={`/channel/${video.channelId}`} className="font-medium text-text-primary hover:text-orange">
                  {video.channelName}
                </Link>
                <p className="text-sm text-text-secondary">
                  {formatNumber(video.subscriberCount)} subscribers • {video.videoCount} videos
                </p>
              </div>
            </div>
            
            <Button
              variant={isSubscribed ? 'outline' : 'primary'}
              onClick={handleSubscribe}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
          </div>

          {/* Video description */}
          <div className="mt-4 rounded-lg bg-beige p-4 dark:bg-gray-800/50">
            <p className="text-text-primary">{video.description}</p>
          </div>

          {/* Comments section */}
          <div className="mt-6">
            <h3 className="mb-4 flex items-center text-lg font-bold text-text-primary">
              <MessageSquare size={20} className="mr-2" />
              Comments ({formatNumber(video.commentCount)})
            </h3>

            {isAuthenticated ? (
              <form className="mb-6 flex gap-4" onSubmit={handleCommentSubmit}>
                <img
                  src={user?.avatar || 'https://i.pravatar.cc/150?img=33'}
                  alt={user?.name || 'User'}
                  className="h-10 w-10 rounded-full object-cover"
                />
                
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="input mb-2"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={!commentText.trim()}
                    >
                      <Send size={16} className="mr-2" />
                      Comment
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="mb-6 rounded-lg border border-gray-200 p-4 text-center dark:border-gray-800">
                <p className="mb-2 text-text-primary">Sign in to add a comment</p>
                <Link to="/login">
                  <Button variant="primary">Sign in</Button>
                </Link>
              </div>
            )}

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Link to={`/user/${comment.user.username}`} className="font-medium text-text-primary hover:text-orange">
                        {comment.user.name}
                      </Link>
                      <span className="text-sm text-text-secondary">{comment.time}</span>
                    </div>
                    
                    <p className="mt-1 text-text-primary">{comment.text}</p>
                    
                    <div className="mt-2 flex items-center gap-4 text-text-secondary">
                      <button className="flex items-center hover:text-orange">
                        <ThumbsUp size={16} className="mr-1" />
                        {comment.likes}
                      </button>
                      
                      <button className="flex items-center hover:text-orange">
                        <ThumbsDown size={16} />
                      </button>
                      
                      <button className="text-sm hover:text-orange">Reply</button>
                      
                      {comment.replies > 0 && (
                        <button className="text-sm text-orange hover:text-orange/80">
                          View {comment.replies} {comment.replies === 1 ? 'reply' : 'replies'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related videos - takes up 1/3 of the screen on large devices */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-text-primary">Related Videos</h3>
          
          <div className="space-y-4">
            {relatedVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoPlayer;