import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/common/Tabs';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import VideoCard from '../components/dashboard/VideoCard';
import { useAuth } from '../context/AuthContext';
import { Camera, Save } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    bio: 'Content creator passionate about technology and design.',
    location: 'San Francisco, CA',
    website: 'https://example.com',
  });
  
  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  
  // Mock watched videos
  const watchedVideos = Array.from({ length: 6 }, (_, i) => ({
    id: `watched-${i + 1}`,
    title: `Recently Watched Video ${i + 1} - How to Create Amazing UI Effects`,
    thumbnail: `https://picsum.photos/seed/${i + 20}/640/360`,
    channelName: 'DesignMasters',
    channelAvatar: 'https://i.pravatar.cc/150?img=32',
    channelId: 'channel-2',
    views: Math.floor(Math.random() * 500000),
    likes: Math.floor(Math.random() * 25000),
    comments: Math.floor(Math.random() * 500),
    timestamp: `${Math.floor(Math.random() * 5) + 1} days ago`,
    duration: `${Math.floor(Math.random() * 10) + 3}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, '0')}`,
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would update the user profile via API
    console.log('Updating profile:', formData);
    setIsEditing(false);
  };

  const validatePasswordForm = () => {
    const errors: Record<string, string> = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;
    
    // In a real app, you would update the password via API
    console.log('Updating password');
    
    // Reset form after successful submission
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-text-primary">Your Profile</h1>
        <p className="text-text-secondary">Manage your account information and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="history">Watch History</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="animate-fade-in">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Profile card */}
            <div className="md:col-span-1">
              <div className="card overflow-hidden">
                <div className="relative h-32 bg-gradient-to-r from-gold to-orange">
                  <div className="absolute bottom-0 left-1/2 -mb-12 -translate-x-1/2 transform">
                    <div className="relative">
                      <img
                        src={user?.avatar || 'https://i.pravatar.cc/150?img=33'}
                        alt={user?.name || 'User'}
                        className="h-24 w-24 rounded-full border-4 border-white object-cover dark:border-gray-800"
                      />
                      <button className="absolute bottom-0 right-0 rounded-full bg-white p-1.5 text-orange shadow-md hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <Camera size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-14 p-4 text-center">
                  <h3 className="text-xl font-bold text-text-primary">{user?.name}</h3>
                  <p className="text-text-secondary">@{user?.username}</p>
                  
                  <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                    <p className="text-sm text-text-secondary">Joined April 2024</p>
                    <div className="mt-2 flex justify-center gap-4">
                      <div>
                        <p className="font-bold text-text-primary">24</p>
                        <p className="text-xs text-text-secondary">Videos</p>
                      </div>
                      <div>
                        <p className="font-bold text-text-primary">1.2K</p>
                        <p className="text-xs text-text-secondary">Followers</p>
                      </div>
                      <div>
                        <p className="font-bold text-text-primary">350</p>
                        <p className="text-xs text-text-secondary">Following</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button
                      variant={isEditing ? 'ghost' : 'primary'}
                      fullWidth
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile info/edit form */}
            <div className="md:col-span-2">
              <div className="card">
                <h3 className="mb-6 text-xl font-bold text-text-primary">
                  {isEditing ? 'Edit Profile Information' : 'Profile Information'}
                </h3>
                
                <form onSubmit={handleProfileSubmit}>
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                      
                      <Input
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                    
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text-primary">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        rows={4}
                        className="input"
                        value={formData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                      
                      <Input
                        label="Website"
                        name="website"
                        value={formData.website}
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="animate-fade-in">
          <div className="card max-w-lg">
            <h3 className="mb-6 text-xl font-bold text-text-primary">Change Password</h3>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                error={passwordErrors.currentPassword}
              />
              
              <Input
                label="New Password"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                error={passwordErrors.newPassword}
              />
              
              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                error={passwordErrors.confirmPassword}
              />
              
              <div className="mt-6">
                <Button
                  type="submit"
                  variant="primary"
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="history" className="animate-fade-in">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-text-primary">Recently Watched</h3>
            <Button variant="outline">Clear Watch History</Button>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {watchedVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default UserProfile;