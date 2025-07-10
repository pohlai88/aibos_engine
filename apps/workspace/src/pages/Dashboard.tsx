import React, { useState } from 'react';
import { useWorkspace } from '../contexts/WorkspaceContext';
import { mockNotifications } from '../utils/mockData';
import { apiService } from '../services/api';

// Tailwind CSS-based icon components
const CheckCircle = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <div className={`${className} flex items-center justify-center`} style={{ width: size, height: size }}>
    <div className="w-full h-full bg-current rounded-full flex items-center justify-center">
      <div className="w-3/4 h-3/4 bg-white rounded-full flex items-center justify-center">
        <div className="w-1/2 h-1/2 bg-current rounded-full"></div>
      </div>
    </div>
  </div>
);

const Users = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <div className={`${className} flex items-center justify-center`} style={{ width: size, height: size }}>
    <div className="relative">
      <div className="w-3 h-3 bg-current rounded-full"></div>
      <div className="w-3 h-3 bg-current rounded-full absolute -top-1 -left-1"></div>
      <div className="w-3 h-3 bg-current rounded-full absolute -top-1 -right-1"></div>
    </div>
  </div>
);

const TrendingUp = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <div className={`${className} flex items-center justify-center`} style={{ width: size, height: size }}>
    <div className="relative w-full h-full">
      <div className="absolute bottom-0 left-0 w-1 h-3 bg-current"></div>
      <div className="absolute bottom-1 left-1 w-1 h-2 bg-current"></div>
      <div className="absolute bottom-2 left-2 w-1 h-4 bg-current"></div>
      <div className="absolute bottom-3 left-3 w-1 h-1 bg-current"></div>
    </div>
  </div>
);

const Activity = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <div className={`${className} flex items-center justify-center`} style={{ width: size, height: size }}>
    <div className="relative w-full h-full">
      <div className="absolute bottom-0 left-0 w-1 h-2 bg-current"></div>
      <div className="absolute bottom-0 left-2 w-1 h-4 bg-current"></div>
      <div className="absolute bottom-0 left-4 w-1 h-1 bg-current"></div>
      <div className="absolute bottom-0 left-6 w-1 h-3 bg-current"></div>
    </div>
  </div>
);

const Package = ({ className, size = 20 }: { className?: string; size?: number }) => (
  <div className={`${className} flex items-center justify-center`} style={{ width: size, height: size }}>
    <div className="relative w-full h-full">
      <div className="w-full h-full border-2 border-current rounded"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-current"></div>
    </div>
  </div>
);

const Clock = ({ className, size = 20 }: { className?: string; size?: number }) => (
  <div className={`${className} flex items-center justify-center`} style={{ width: size, height: size }}>
    <div className="relative w-full h-full">
      <div className="w-full h-full border-2 border-current rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 w-0.5 h-2 bg-current transform -translate-x-1/2 -translate-y-1/2 origin-bottom"></div>
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-current transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { installedModules, currentTenant } = useWorkspace();
  const [apiTestResult, setApiTestResult] = useState<string>('');
  const [isTesting, setIsTesting] = useState(false);
  
  const activeModules = installedModules.filter(m => m.enabled);
  const recentNotifications = mockNotifications.slice(0, 3);

  const getModuleIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'users': <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">U</div>,
      'calculator': <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs">C</div>,
      'user-check': <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center text-white text-xs">U</div>,
    };
    return iconMap[iconName] || <div className="w-6 h-6 bg-gray-500 rounded flex items-center justify-center text-white text-xs">M</div>;
  };

  const testApiConnection = async () => {
    setIsTesting(true);
    setApiTestResult('');
    try {
      // Test tenants endpoint
      const tenantsResponse = await apiService.get('/v1/tenants');
      const modulesResponse = await apiService.get('/v1/modules');
      let tenantsCount = Array.isArray(tenantsResponse.data) ? tenantsResponse.data.length : 0;
      let modulesCount = Array.isArray(modulesResponse.data) ? modulesResponse.data.length : 0;
      if (tenantsResponse.success && modulesResponse.success) {
        setApiTestResult(`✅ API Connected! Found ${tenantsCount} tenants and ${modulesCount} modules`);
      } else {
        setApiTestResult(`❌ API Error: ${tenantsResponse.error || modulesResponse.error}`);
      }
    } catch (error) {
      setApiTestResult(`❌ Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with your modules.
          {currentTenant && (
            <span className="block text-sm text-gray-500 mt-1">
              Workspace: {currentTenant.name}
            </span>
          )}
        </p>
      </div>

      {/* API Test Section */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">API Connection Test</h2>
          <button
            onClick={testApiConnection}
            disabled={isTesting}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            <div className={`w-4 h-4 bg-white rounded flex items-center justify-center text-blue-600 text-xs ${isTesting ? 'animate-spin' : ''}`}>↻</div>
            <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
          </button>
        </div>
        {apiTestResult && (
          <div className={`p-3 rounded-lg ${
            apiTestResult.includes('✅') ? 'bg-success-50 text-success-700' : 'bg-error-50 text-error-700'
          }`}>
            {apiTestResult}
          </div>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Modules</p>
              <p className="text-2xl font-bold text-gray-900">{activeModules.length}</p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <CheckCircle className="text-success-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {currentTenant?.usage.currentUsers || 0}
              </p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Users className="text-primary-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">
                {currentTenant ? `${Math.round(currentTenant.usage.currentStorage / 1000)}GB` : '0GB'}
              </p>
            </div>
            <div className="p-3 bg-secondary-100 rounded-lg">
              <TrendingUp className="text-secondary-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Health</p>
              <p className="text-2xl font-bold text-success-600">98%</p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <Activity className="text-success-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Status */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Module Status</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {installedModules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        module.health === 'healthy' ? 'bg-success-100' :
                        module.health === 'warning' ? 'bg-warning-100' :
                        'bg-error-100'
                      }`}>
                        {getModuleIcon(module.icon)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{module.name}</h3>
                        <p className="text-sm text-gray-500">v{module.version}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        module.enabled 
                          ? 'bg-success-100 text-success-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {module.enabled ? 'Active' : 'Inactive'}
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        module.health === 'healthy' ? 'bg-success-500' :
                        module.health === 'warning' ? 'bg-warning-500' :
                        'bg-error-500'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'success' ? 'bg-success-500' :
                    notification.type === 'warning' ? 'bg-warning-500' :
                    notification.type === 'error' ? 'bg-error-500' :
                    'bg-info-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <a
                href="/notifications"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                View all activity →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/store"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <Package className="text-primary-600" size={20} />
            <div>
              <p className="font-medium text-gray-900">Browse Modules</p>
              <p className="text-sm text-gray-500">Find new modules to install</p>
            </div>
          </a>
          
          <a
            href="/settings"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <Clock className="text-primary-600" size={20} />
            <div>
              <p className="font-medium text-gray-900">Configure Modules</p>
              <p className="text-sm text-gray-500">Update settings and preferences</p>
            </div>
          </a>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 