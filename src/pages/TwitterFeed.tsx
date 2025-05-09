import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/common/Tabs';
import Layout from '../components/layout/Layout';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';

// Define Tweet interface
interface Tweet {
  id: number;
  content: string;
  author: string;
  authorHandle: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  hasMedia?: boolean;
  mediaUrl?: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

const TwitterFeed: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newTweet, setNewTweet] = useState('');
  const [activeTab, setActiveTab] = useState('timeline');

  useEffect(() => {
    // Simulate fetching tweets from API
    const fetchTweets = async () => {
      try {
        // This would be an API call in a real application
        setTimeout(() => {
          const mockTweets: Tweet[] = [
            {
              id: 1,
              content: "Just launched our new product! Check it out and let me know what you think. #ProductLaunch #Tech",
              author: "Sarah Johnson",
              authorHandle: "@sarahjohnson",
              authorAvatar: "https://i.pravatar.cc/150?img=1",
              likes: 245,
              comments: 42,
              shares: 18,
              timestamp: "2h ago",
              hasMedia: true,
              mediaUrl: "https://picsum.photos/seed/1/640/360",
              isLiked: false,
              isBookmarked: true
            },
            {
              id: 2,
              content: "Working on a new React project with Tailwind CSS. The developer experience is amazing! 🚀 #ReactJS #TailwindCSS #WebDev",
              author: "Alex Developer",
              authorHandle: "@alexdev",
              authorAvatar: "https://i.pravatar.cc/150?img=3",
              likes: 189,
              comments: 27,
              shares: 8,
              timestamp: "4h ago",
              isLiked: true,
              isBookmarked: false
            },
            {
              id: 3,
              content: "The key to success in software development is consistent learning and practice. What are you learning today? #CodingLife #Programming",
              author: "Tech Mentor",
              authorHandle: "@techmentor",
              authorAvatar: "https://i.pravatar.cc/150?img=5",
              likes: 421,
              comments: 56,
              shares: 32,
              timestamp: "6h ago",
              isLiked: false,
              isBookmarked: false
            },
            {
              id: 4,
              content: "Just finished my latest UI design for a client. Really happy with how it turned out! #UIDesign #UX",
              author: "Design Master",
              authorHandle: "@designmaster",
              authorAvatar: "https://i.pravatar.cc/150?img=7",
              likes: 312,
              comments: 41,
              shares: 16,
              timestamp: "12h ago",
              hasMedia: true,
              mediaUrl: "https://picsum.photos/seed/4/640/360",
              isLiked: false,
              isBookmarked: false
            },
            {
              id: 5,
              content: "Excited to announce that I'll be speaking at the upcoming Web Development Conference in June! Who else is attending? #WebDevConf2025 #Speaking",
              author: "Jessica Speaker",
              authorHandle: "@jessspeaker",
              authorAvatar: "https://i.pravatar.cc/150?img=9",
              likes: 278,
              comments: 63,
              shares: 42,
              timestamp: "1d ago",
              isLiked: true,
              isBookmarked: true
            }
          ];
          setTweets(mockTweets);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching tweets:', error);
        setIsLoading(false);
      }
    };

    fetchTweets();
  }, []);

  const handlePostTweet = () => {
    if (newTweet.trim()) {
      // Add new tweet to the top of the list
      const newTweetObj: Tweet = {
        id: Date.now(),
        content: newTweet,
        author: "Current User",
        authorHandle: "@currentuser",
        authorAvatar: "https://i.pravatar.cc/150?img=12",
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: "Just now",
        isLiked: false,
        isBookmarked: false
      };
      
      setTweets([newTweetObj, ...tweets]);
      setNewTweet('');
    }
  };

  const handleLikeTweet = (id: number) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === id) {
        return {
          ...tweet,
          isLiked: !tweet.isLiked,
          likes: tweet.isLiked ? tweet.likes - 1 : tweet.likes + 1
        };
      }
      return tweet;
    }));
  };

  const handleBookmarkTweet = (id: number) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === id) {
        return {
          ...tweet,
          isBookmarked: !tweet.isBookmarked
        };
      }
      return tweet;
    }));
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-text-primary">Twitter Feed</h1>
        <p className="text-text-secondary">Stay updated with tweets from people you follow</p>
      </div>

      {/* Tweet Composer */}
      <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex">
          <div className="mr-3">
            <div className="w-10 h-10 rounded-full bg-orange text-white flex items-center justify-center text-lg font-semibold">
              U
            </div>
          </div>
          <div className="flex-1">
            <textarea
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-text-primary dark:text-text-secondary"
              rows={3}
              placeholder="What's happening?"
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button
                className="bg-orange hover:bg-orange/90 text-white font-medium px-4 py-2 rounded-full transition-all"
                onClick={handlePostTweet}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="timeline" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="animate-fade-in">
          {isLoading ? (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 animate-pulse">
                  <div className="flex space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                      <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="mt-4 h-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="mt-4 flex justify-between">
                    <div className="w-16 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-16 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-16 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {tweets.map((tweet) => (
                <TweetCard 
                  key={tweet.id} 
                  tweet={tweet} 
                  onLike={handleLikeTweet} 
                  onBookmark={handleBookmarkTweet} 
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="trending" className="animate-fade-in">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-text-primary dark:text-text-secondary mb-4">
              Trending Topics
            </h3>
            <div className="space-y-4">
              {["#WebDevelopment", "#ReactJS", "#TailwindCSS", "#JavaScript", "#TechNews"].map((topic, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-3">
                  <p className="text-orange font-medium">{topic}</p>
                  <p className="text-sm text-text-secondary">{Math.floor(Math.random() * 50) + 10}K tweets</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bookmarks" className="animate-fade-in">
          <div className="space-y-6">
            {!isLoading && tweets.filter(tweet => tweet.isBookmarked).map((tweet) => (
              <TweetCard 
                key={tweet.id} 
                tweet={tweet} 
                onLike={handleLikeTweet} 
                onBookmark={handleBookmarkTweet} 
              />
            ))}
            {!isLoading && tweets.filter(tweet => tweet.isBookmarked).length === 0 && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-medium text-text-primary dark:text-text-secondary mb-2">
                  No bookmarks yet
                </h3>
                <p className="text-text-secondary">
                  When you bookmark tweets, they'll appear here.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="mentions" className="animate-fade-in">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-text-primary dark:text-text-secondary mb-2">
              No mentions yet
            </h3>
            <p className="text-text-secondary">
              When people mention you, those tweets will appear here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

// Tweet Card Component
interface TweetCardProps {
  tweet: Tweet;
  onLike: (id: number) => void;
  onBookmark: (id: number) => void;
}

const TweetCard: React.FC<TweetCardProps> = ({ tweet, onLike, onBookmark }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="p-4">
        {/* Tweet Header */}
        <div className="flex justify-between">
          <div className="flex">
            <img 
              src={tweet.authorAvatar} 
              alt={tweet.author} 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="font-semibold text-text-primary dark:text-text-secondary">{tweet.author}</p>
              <p className="text-sm text-text-secondary">{tweet.authorHandle}</p>
            </div>
          </div>
          <button className="text-text-secondary hover:text-orange">
            <MoreHorizontal size={18} />
          </button>
        </div>
        
        {/* Tweet Content */}
        <div className="mt-3">
          <p className="text-text-primary dark:text-text-secondary whitespace-pre-wrap">
            {tweet.content}
          </p>
          
          {tweet.hasMedia && (
            <div className="mt-3">
              <img 
                src={tweet.mediaUrl} 
                alt="Tweet media" 
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          )}
          
          <p className="mt-2 text-sm text-text-secondary">{tweet.timestamp}</p>
        </div>
        
        {/* Tweet Actions */}
        <div className="mt-4 flex justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <button 
            className={`flex items-center space-x-1 ${tweet.isLiked ? 'text-red-500' : 'text-text-secondary hover:text-red-500'}`}
            onClick={() => onLike(tweet.id)}
          >
            <Heart size={18} fill={tweet.isLiked ? "currentColor" : "none"} />
            <span>{tweet.likes}</span>
          </button>
          
          <button className="flex items-center space-x-1 text-text-secondary hover:text-blue-500">
            <MessageCircle size={18} />
            <span>{tweet.comments}</span>
          </button>
          
          <button className="flex items-center space-x-1 text-text-secondary hover:text-green-500">
            <Share2 size={18} />
            <span>{tweet.shares}</span>
          </button>
          
          <button 
            className={`flex items-center space-x-1 ${tweet.isBookmarked ? 'text-orange' : 'text-text-secondary hover:text-orange'}`}
            onClick={() => onBookmark(tweet.id)}
          >
            <Bookmark size={18} fill={tweet.isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwitterFeed;