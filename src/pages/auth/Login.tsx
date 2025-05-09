import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { API_BASE_URL } from '../../utils/api';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!emailOrUsername) {
      newErrors.emailOrUsername = 'Email or username is required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Check if input is email or username
      const isEmail = emailOrUsername.includes('@');
      
      // Create payload based on input type
      const payload = {
        [isEmail ? 'email' : 'username']: emailOrUsername,
        password
      };
      
      // Make API request
      const response = await axios.post(`${API_BASE_URL}/users/login`, payload);
      
      // Handle successful response
      if (response.data.statusCode === 200) {
        toast.success('Login successful!');
        
        // Extract data
        const { accessToken, refreshToken, user } = response.data.data;
        
        // Store tokens
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        // If remember me is checked, store in localStorage, otherwise sessionStorage
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          sessionStorage.setItem('user', JSON.stringify(user));
        }
        
        // Update auth context
        await login(user);
        
        // Redirect to home after short delay
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Invalid email/username or password. Please try again.';
      toast.error(errorMessage);
      
      setErrors({ 
        form: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-beige px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-primary">Welcome back</h2>
          <p className="mt-2 text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-orange hover:text-orange/80">
              Sign up
            </Link>
          </p>
        </div>

        {errors.form && (
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
            <p className="text-sm text-red-800 dark:text-red-300">{errors.form}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              id="emailOrUsername"
              type="text"
              label="Email or Username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              error={errors.emailOrUsername}
              placeholder="your@email.com or username"
              autoComplete="username"
            />

            <Input
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
                Remember me
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-orange hover:text-orange/80"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Sign in
          </Button>
        </form>
      </div>
      
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;