import React, { useState } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext';
import Header from './Header';
import SideNav from './SideNav';
import Footer from './Footer';
import { Notification } from '../../types/workspace';

interface LayoutProps {
  children: React.ReactNode;
  notifications: Notification[];
}

const Layout: React.FC<LayoutProps> = ({ children, notifications }) => {
  const { currentUser, installedModules } = useWorkspace();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement global search functionality
    console.log('Search query:', query);
  };

  const handleUserMenuClick = () => {
    // TODO: Implement user menu functionality
    console.log('User menu clicked');
  };

  const handleModuleSelect = (moduleId: string) => {
    // TODO: Implement module selection
    console.log('Module selected:', moduleId);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Don't render if we don't have user data yet
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header
        user={currentUser}
        notifications={notifications}
        onSearch={handleSearch}
        onUserMenuClick={handleUserMenuClick}
        onMenuToggle={toggleSidebar}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SideNav
          modules={installedModules}
          currentModule={null}
          onModuleSelect={handleModuleSelect}
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout; 