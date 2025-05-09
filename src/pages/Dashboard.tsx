import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/common/Tabs';
import VideoCard from '../components/dashboard/VideoCard';
import Layout from '../components/layout/Layout';

interface Video {
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

const Dashboard: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching videos from API
    const fetchVideos = async () => {
      try {
        // This would be an API call in a real application
        setTimeout(() => {
          const mockVideos: Video[] = Array.from({ length: 12 }, (_, i) => ({
            id: `video-${i + 1}`,
            title: `How to Build a Social Media App in 2025 - Part ${i + 1}`,
            thumbnail: `https://picsum.photos/seed/${i + 1}/640/360`,
            channelName: 'TechTutorials',
            channelAvatar: 'https://i.pravatar.cc/150?img=68',
            channelId: 'channel-1',
            views: Math.floor(Math.random() * 1000000),
            likes: Math.floor(Math.random() * 50000),
            comments: Math.floor(Math.random() * 1000),
            timestamp: '3 days ago',
            duration: `${Math.floor(Math.random() * 10) + 5}:${Math.floor(Math.random() * 60)
              .toString()
              .padStart(2, '0')}`,
          }));
          setVideos(mockVideos);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary">Discover videos from creators you follow and trending content</p>
      </div>

      <Tabs defaultValue="for-you">
        <TabsList className="mb-6">
          <TabsTrigger value="for-you">For You</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>

        <TabsContent value="for-you" className="animate-fade-in">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="card space-y-3">
                  <div className="aspect-video w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                  <div className="flex animate-pulse space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                      <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="trending">
          <p className="text-text-secondary">Trending videos will appear here.</p>
        </TabsContent>

        <TabsContent value="following">
          <p className="text-text-secondary">Videos from channels you follow will appear here.</p>
        </TabsContent>

        <TabsContent value="recommended">
          <p className="text-text-secondary">Recommended videos based on your watch history will appear here.</p>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Dashboard;