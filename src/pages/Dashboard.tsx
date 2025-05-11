import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/common/Tabs';
import VideoCard from '../components/dashboard/VideoCard';
import Layout from '../components/layout/Layout';
import SkeletonLoader from '../components/common/SkeletonLoader';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';

const Dashboard: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Get token from localStorage or cookies
        const response = await axios.get(`${API_BASE_URL}/videos`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        });

        setVideos(response.data.data.videos); // Ensure you're accessing the 'videos' array directly
        setIsLoading(false);
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
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>Discover and interact with videos</p>
      </div>

      <Tabs defaultValue="for-you">
        <TabsList>
          <TabsTrigger value="for-you">For You</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value="for-you">
          {isLoading ? (
            <div className="grid gap-6">
              {[...Array(6)].map((_, index) => (
                <SkeletonLoader key={index} type="card" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6">
              {videos.map((video) => (
                <VideoCard key={video._id} {...video} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="trending">
          <p>Trending videos will appear here</p>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Dashboard;
