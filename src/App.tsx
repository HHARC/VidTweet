import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import VideoPlayer from './pages/VideoPlayer';
import UserProfile from './pages/UserProfile';
import PlaylistManagement from './pages/PlaylistManagement';
import ChannelManagement from './pages/ChannelManagement';
import TwitterFeed from './pages/TwitterFeed'; // Import Twitter Feed Page

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem('user');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Public routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/video/:videoId" element={<VideoPlayer />} />
            
            {/* Protected routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/playlists" 
              element={
                <ProtectedRoute>
                  <PlaylistManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/channel" 
              element={
                <ProtectedRoute>
                  <ChannelManagement />
                </ProtectedRoute>
              } 
            />
            {/* Twitter Feed Page (Protected route) */}
            <Route 
              path="/twitter" 
              element={
                <ProtectedRoute>
                  <TwitterFeed />
                </ProtectedRoute>
              } 
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
