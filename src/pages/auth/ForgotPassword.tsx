import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toast

const ForgotPassword: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { changePassword } = useAuth();  // Assuming `changePassword` is a function in your context

  const validateForm = () => {
    if (!username || !email || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await changePassword(username, email, newPassword);  // API call to backend
      setIsLoading(false);
      toast.success('Password changed successfully!');  // Show success toast
    } catch (error) {
      setIsLoading(false);
      setError('Failed to change password. Please try again.');
      toast.error('Failed to change password. Please try again.');  // Show error toast
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-beige px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-primary">Change Password</h2>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your username, email, and a new password to reset it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
              <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />

            <Input
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              required
            />
          </div>

          <Button type="submit" isLoading={isLoading}>
            Change Password
          </Button>

          <div className="text-center">
            <Link to="/login" className="text-sm font-medium text-orange hover:text-orange/80">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
