import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Sun, Moon, Upload, User, LogOut, Video } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left side: Logo and mobile menu toggle */}
        <div className="flex items-center">
          <button
            className="mr-2 rounded-md p-2 text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            onClick={toggleMobileMenu}
          >
            <Menu size={24} />
          </button>
          
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-orange text-white">
              <Video size={20} />
            </div>
            <span className="text-xl font-bold text-text-primary">VidTweet</span>
          </Link>
        </div>

        {/* Middle: Search bar */}
        <div className="hidden flex-1 max-w-xl px-6 md:block">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search videos, channels, or users..."
              className="input pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 flex h-full items-center justify-center px-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Right side: Theme toggle, upload, and user menu */}
        <div className="flex items-center space-x-2">
          <button
            className="rounded-md p-2 text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isAuthenticated ? (
            <>
              <Button 
                variant="primary" 
                className="hidden md:flex"
                onClick={() => navigate('/upload')}
              >
                <Upload size={18} className="mr-2" />
                Upload
              </Button>

              <div className="relative">
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-beige"
                  onClick={toggleUserMenu}
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-orange" />
                  )}
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
                    <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                      <p className="text-sm font-medium text-text-primary">{user?.name}</p>
                      <p className="text-xs text-text-secondary">@{user?.username}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/channel"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Your Channel
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                className="hidden md:inline-flex"
                onClick={() => navigate('/login')}
              >
                Sign in
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-2 dark:border-gray-800 dark:bg-gray-900 md:hidden">
          <form onSubmit={handleSearch} className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <nav className="grid gap-1">
            <Link
              to="/"
              className="flex items-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="flex items-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/trending"
              className="flex items-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Trending
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/upload"
                  className="flex items-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Upload
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;