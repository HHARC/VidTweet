import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';

interface User {
  _id: string;
  fullName: string;
  email: string;
  username: string;
  avatar?: string;
  coverImage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => Promise<void>;
  signup: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        
        if (accessToken) {
          // Fetch current user data
          const response = await axios.get(`${API_BASE_URL}/users/current-user`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          
          if (response.data.statusCode === 200) {
            setUser(response.data.data);
          } else {
            // Token might be invalid, try to refresh
            await refreshToken();
          }
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        // Clear potentially invalid tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await axios.post(`${API_BASE_URL}/users/refresh-token`, {
        refreshToken
      });
      
      if (response.data.statusCode === 200) {
        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        
        // Fetch user data with new token
        const userResponse = await axios.get(`${API_BASE_URL}/users/current-user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        
        if (userResponse.data.statusCode === 200) {
          setUser(userResponse.data.data);
        }
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      // Clear localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const login = async (userData: User) => {
    setIsLoading(true);
    try {
      // The actual API call is being handled in the Login component
      // Just set the user in the context
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    // Note: The actual API call is being handled in the Signup component
    // The auth context just stores the user information after successful signup
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      
      if (accessToken) {
        await axios.post(`${API_BASE_URL}/users/logout`, {}, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Clear user data regardless of API success
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/forgot-password`, {
        email
      });
      
      return response.data;
    } catch (error) {
      console.error('Forgot password failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};