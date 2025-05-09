import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Video, Bookmark, User, Settings, Bell, Flame, History, Heart, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const mainNavItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Explore', path: '/explore', icon: <Compass size={20} /> },
    { name: 'Trending', path: '/trending', icon: <Flame size={20} /> },
    { name: 'Twitter Feed', path: '/twitter', icon: <Heart size={20} /> }, // Added Twitter Feed link here
  ];

  const authenticatedNavItems = [
    { name: 'My Videos', path: '/my-videos', icon: <Video size={20} /> },
    { name: 'Playlists', path: '/playlists', icon: <Bookmark size={20} /> },
    { name: 'History', path: '/history', icon: <History size={20} /> },
    { name: 'Liked Videos', path: '/liked', icon: <Heart size={20} /> },
    { name: 'My Channel', path: '/channel', icon: <Award size={20} /> },
    { name: 'Notifications', path: '/notifications', icon: <Bell size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="hidden h-screen w-64 flex-shrink-0 border-r border-gray-200 bg-white pt-16 dark:border-gray-800 dark:bg-gray-900 md:fixed md:flex md:flex-col">
      <div className="flex flex-1 flex-col overflow-y-auto p-3">
        <nav className="flex-1 space-y-1">
          <div className="py-2">
            <p className="px-3 py-2 text-xs font-semibold uppercase text-text-secondary">
              Menu
            </p>
            <ul className="space-y-1">
              {mainNavItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`sidebar-link ${isActiveRoute(item.path) ? 'active' : ''}`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {isAuthenticated && (
            <div className="py-2">
              <p className="px-3 py-2 text-xs font-semibold uppercase text-text-secondary">
                Your Account
              </p>
              <ul className="space-y-1">
                {authenticatedNavItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`sidebar-link ${isActiveRoute(item.path) ? 'active' : ''}`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
