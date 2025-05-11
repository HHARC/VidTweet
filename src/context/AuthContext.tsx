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
  changePassword: (username: string, email: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        
        if (accessToken) {
          const response = await axios.get(`${API_BASE_URL}/users/current-user`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          if (response.data.statusCode === 200) {
            setUser(response.data.data);
          } else {
            await refreshToken();
          }
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
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
      
      const response = await axios.post(`${API_BASE_URL}/users/refresh-token`, { refreshToken });
      
      if (response.data.statusCode === 200) {
        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        
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
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const login = async (userData: User) => {
    setIsLoading(true);
    try {
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
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/forgot-password`, { email });
      return response.data;
    } catch (error) {
      console.error('Forgot password failed:', error);
      throw error;
    }
  };

  const changePassword = async (username: string, email: string, newPassword: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/change-password`, {
        username,
        email,
        newPassword
      });
      
      if (response.status === 200) {
        alert("Password changed successfully!");
      }
    } catch (error) {
      console.error('Password change failed:', error);
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
        changePassword,
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
