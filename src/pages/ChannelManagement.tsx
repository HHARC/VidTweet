import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '../components/common/Tabs';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import VideoCard from '../components/dashboard/VideoCard';
import { 
  Camera, 
  Save, 
  Users, 
  Video, 
  ThumbsUp, 
  Eye, 
  BarChart3,
  Clock
} from 'lucide-react';

interface ChannelStats {
  subscribers: number;
  totalVideos: number;
  totalViews: number;
  totalLikes: number;
  watchTime: string;
  engagementRate: string;
}

const ChannelManagement: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Channel form state
  const [formData, setFormData] = useState({
    name: 'Your Channel Name',
    description: 'This is your channel description. Share details about your channel and what viewers can expect from your content.',
    category: 'Technology',
    tags: 'coding, tech, tutorials',
  });
  
  // Mock channel stats
  const channelStats: ChannelStats = {
    subscribers: 1243,
    totalVideos: 28,
    totalViews: 48760,
    totalLikes: 5890,
    watchTime: '2,450 hours',
    engagementRate: '4.8%',
  };
  
  // Mock channel videos
  const channelVideos = Array.from({ length: 6 }, (_, i) => ({
    id: `channel-video-${i + 1}`,
    title: `How to Build a Social Media App - Part ${i + 1}`,
    thumbnail: `https://picsum.photos/seed/${i + 30}/640/360`,
    channelName: 'Your Channel Name',
    channelAvatar: 'https://i.pravatar.cc/150?img=33',
    channelId: 'your-channel',
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
    timestamp: `${Math.floor(Math.random() * 15) + 1} days ago`,
    duration: `${Math.floor(Math.random() * 10) + 5}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, '0')}`,
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChannelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would update the channel via API
    console.log('Updating channel:', formData);
    setIsEditing(false);
  };

  // Function to format numbers with K, M suffix
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
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-text-primary">Your Channel</h1>
        <p className="text-text-secondary">Manage your channel and view analytics</p>
      </div>

      <div className="mb-8">
        <div className="relative h-48 rounded-t-lg bg-gradient-to-r from-gold to-orange md:h-64">
          <button className="absolute bottom-4 right-4 rounded-full bg-white p-2 text-orange shadow-md hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
            <Camera size={20} />
          </button>
        </div>
        
        <div className="rounded-b-lg bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-start md:flex-row md:items-end">
              <div className="relative -mt-12 md:-mt-16">
                <img
                  src="https://i.pravatar.cc/150?img=33"
                  alt="Channel Avatar"
                  className="h-24 w-24 rounded-full border-4 border-white object-cover dark:border-gray-800 md:h-32 md:w-32"
                />
                <button className="absolute bottom-0 right-0 rounded-full bg-white p-1.5 text-orange shadow-md hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <Camera size={16} />
                </button>
              </div>
              
              <div className="mt-4 flex-1 md:ml-6 md:mt-0">
                <h2 className="text-2xl font-bold text-text-primary">{formData.name}</h2>
                <p className="mt-1 text-text-secondary">
                  {formatNumber(channelStats.subscribers)} subscribers • {channelStats.totalVideos} videos
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Button
                  variant={isEditing ? 'ghost' : 'primary'}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel Editing' : 'Edit Channel'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="animate-fade-in">
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="card">
              <div className="flex items-center justify-between">
                <h3 className="text-text-secondary">Subscribers</h3>
                <Users size={20} className="text-orange" />
              </div>
              <p className="mt-2 text-3xl font-bold text-text-primary">{formatNumber(channelStats.subscribers)}</p>
              <p className="mt-1 text-xs text-green-500">+12.5% this month</p>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <h3 className="text-text-secondary">Videos</h3>
                <Video size={20} className="text-orange" />
              </div>
              <p className="mt-2 text-3xl font-bold text-text-primary">{channelStats.totalVideos}</p>
              <p className="mt-1 text-xs text-green-500">+3 this month</p>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <h3 className="text-text-secondary">Total Views</h3>
                <Eye size={20} className="text-orange" />
              </div>
              <p className="mt-2 text-3xl font-bold text-text-primary">{formatNumber(channelStats.totalViews)}</p>
              <p className="mt-1 text-xs text-green-500">+8.3% this month</p>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <h3 className="text-text-secondary">Total Likes</h3>
                <ThumbsUp size={20} className="text-orange" />
              </div>
              <p className="mt-2 text-3xl font-bold text-text-primary">{formatNumber(channelStats.totalLikes)}</p>
              <p className="mt-1 text-xs text-green-500">+15.2% this month</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-bold text-text-primary">Recent Videos</h3>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {channelVideos.slice(0, 3).map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card">
              <h3 className="mb-4 flex items-center text-lg font-bold text-text-primary">
                <BarChart3 size={20} className="mr-2 text-orange" />
                Performance Overview
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Watch Time</span>
                    <span className="font-medium text-text-primary">{channelStats.watchTime}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div className="h-full w-2/3 rounded-full bg-orange" />
                  </div>
                </div>
                
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Engagement Rate</span>
                    <span className="font-medium text-text-primary">{channelStats.engagementRate}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div className="h-full w-1/2 rounded-full bg-orange" />
                  </div>
                </div>
                
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Subscriber Growth</span>
                    <span className="font-medium text-text-primary">+15.3%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div className="h-full w-3/4 rounded-full bg-orange" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="mb-4 flex items-center text-lg font-bold text-text-primary">
                <Clock size={20} className="mr-2 text-orange" />
                Upcoming Tasks
              </h3>
              
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
                  />
                  <div>
                    <p className="font-medium text-text-primary">Upload weekly video</p>
                    <p className="text-sm text-text-secondary">Due in 2 days</p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
                  />
                  <div>
                    <p className="font-medium text-text-primary">Respond to comments</p>
                    <p className="text-sm text-text-secondary">15 unread comments</p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
                  />
                  <div>
                    <p className="font-medium text-text-primary">Plan content calendar</p>
                    <p className="text-sm text-text-secondary">For next month</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="animate-fade-in">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h3 className="text-xl font-bold text-text-primary">Your Videos</h3>
            
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search videos..."
                className="w-full max-w-xs"
              />
              
              <Button
                variant="primary"
                onClick={() => window.location.href = '/upload'}
              >
                Upload New
              </Button>
            </div>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {channelVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="animate-fade-in">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-text-primary">Channel Analytics</h3>
            
            <div className="flex items-center space-x-2">
              <select className="input w-auto">
                <option>Last 28 days</option>
                <option>Last 90 days</option>
                <option>Last 12 months</option>
                <option>Lifetime</option>
              </select>
              
              <Button variant="outline">Export</Button>
            </div>
          </div>
          
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="card">
              <div className="flex items-center justify-between">
                <h3 className="text-text-secondary">Views</h3>
                <Eye size={20} className="text-orange" />
              </div>
              <p className="mt-2 text-3xl font-bold text-text-primary">{formatNumber(channelStats.totalViews)}</p>
              <p className="mt-1 text-xs text-green-500">+8.3% vs previous period</p>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <h3 className="text-text-secondary">Watch Time</h3>
                <Clock size={20} className="text-orange" />
              </div>
              <p className="mt-2 text-3xl font-bold text-text-primary">{channelStats.watchTime}</p>
              <p className="mt-1 text-xs text-green-500">+12.7% vs previous period</p>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <h3 className="text-text-secondary">Subscribers</h3>
                <Users size={20} className="text-orange" />
              </div>
              <p className="mt-2 text-3xl font-bold text-text-primary">+{formatNumber(123)}</p>
              <p className="mt-1 text-xs text-green-500">+15.3% vs previous period</p>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <h3 className="text-text-secondary">Engagement</h3>
                <ThumbsUp size={20} className="text-orange" />
              </div>
              <p className="mt-2 text-3xl font-bold text-text-primary">{channelStats.engagementRate}</p>
              <p className="mt-1 text-xs text-green-500">+2.1% vs previous period</p>
            </div>
          </div>
          
          <div className="card">
            <h3 className="mb-4 text-lg font-bold text-text-primary">Audience Demographics</h3>
            
            <div className="mt-4 h-64 bg-gray-100 dark:bg-gray-700">
              <div className="flex h-full items-center justify-center">
                <p className="text-text-secondary">Analytics chart would be displayed here</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="animate-fade-in max-w-3xl">
          <div className="card">
            <h3 className="mb-6 text-xl font-bold text-text-primary">Channel Settings</h3>
            
            <form onSubmit={handleChannelSubmit} className="space-y-4">
              <Input
                label="Channel Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              
              <div>
                <label className="mb-1 block text-sm font-medium text-text-primary">
                  Channel Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  className="input"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                
                <Input
                  label="Tags (comma separated)"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              
              {isEditing && (
                <div className="mt-6 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                  >
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ChannelManagement;