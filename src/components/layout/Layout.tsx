import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen bg-bg-secondary">
      <Header />
      {isAuthenticated && <Sidebar />}
      <main className={`flex-1 pt-16 transition-all ${isAuthenticated ? 'md:ml-64' : ''}`}>
        <div className="container mx-auto p-4">{children}</div>
      </main>
    </div>
  );
};

export default Layout;