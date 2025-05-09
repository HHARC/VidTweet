import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { API_BASE_URL } from '../../utils/api';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!fullName) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!username) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!avatarFile) {
      newErrors.avatar = 'Profile picture is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('username', username);
      formData.append('password', password);
      
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }
      
      if (coverImageFile) {
        formData.append('coverImage', coverImageFile);
      }
      
      // Make API request
      const response = await axios.post(`${API_BASE_URL}/users/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Handle successful response
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        toast.success('Account created successfully!');
        
        // Get user data from response
        const userData = response.data.data;
        
        // Update auth context with the new user
        await signup(userData);
        
        // Redirect after short delay to allow toast to be seen
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'An error occurred during signup. Please try again.';
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
          <h2 className="text-3xl font-bold text-text-primary">Create an account</h2>
          <p className="mt-2 text-sm text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-orange hover:text-orange/80">
              Sign in
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
              id="fullName"
              type="text"
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
              placeholder="John Doe"
              autoComplete="name"
            />

            <Input
              id="email"
              type="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="your@email.com"
              autoComplete="email"
            />

            <Input
              id="username"
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
              placeholder="johndoe"
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
              autoComplete="new-password"
            />

            <Input
              id="confirm-password"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              placeholder="••••••••"
              autoComplete="new-password"
            />

            {/* Avatar upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                Profile Picture (required)
              </label>
              <div className="flex items-center space-x-4">
                <div 
                  onClick={() => avatarInputRef.current?.click()}
                  className={`relative h-20 w-20 cursor-pointer overflow-hidden rounded-full border-2 ${
                    errors.avatar ? 'border-red-500' : 'border-gray-300'
                  } hover:border-orange`}
                >
                  {avatarPreview ? (
                    <img 
                      src={avatarPreview} 
                      alt="Avatar preview" 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                      <span className="text-xs text-gray-500">Upload</span>
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    ref={avatarInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Choose file
                  </button>
                  {errors.avatar && (
                    <p className="mt-1 text-xs text-red-600">{errors.avatar}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Cover Image upload (optional) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                Cover Image (optional)
              </label>
              <div className="flex flex-col space-y-2">
                <div 
                  onClick={() => coverImageInputRef.current?.click()}
                  className="relative h-32 w-full cursor-pointer overflow-hidden rounded-lg border-2 border-gray-300 hover:border-orange"
                >
                  {coverImagePreview ? (
                    <img 
                      src={coverImagePreview} 
                      alt="Cover image preview" 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                      <span className="text-sm text-gray-500">Upload cover image (optional)</span>
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    ref={coverImageInputRef}
                    onChange={handleCoverImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => coverImageInputRef.current?.click()}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Choose file
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-text-secondary">
              I agree to the{' '}
              <a href="#" className="font-medium text-orange hover:text-orange/80">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-orange hover:text-orange/80">
                Privacy Policy
              </a>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Create account
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

export default Signup;