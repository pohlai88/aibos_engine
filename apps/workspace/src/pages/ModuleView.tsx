import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useWorkspace } from '../contexts/WorkspaceContext';
import CRM from './modules/CRM';

const ModuleView: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { installedModules } = useWorkspace();

  const currentModule = installedModules.find(m => m.id === moduleId);

  if (!currentModule) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package size={48} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Module Not Found</h2>
          <p className="text-gray-600 mb-4">The module you're looking for doesn't exist or isn't installed.</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const getModuleIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'users': <Users size={24} />,
      'calculator': <Package size={24} />,
      'user-check': <Users size={24} />,
    };
    return iconMap[iconName] || <Package size={24} />;
  };

  const getModuleContent = () => {
    switch (moduleId) {
      case 'crm-module':
        return <CRM />;
      case 'erp-module':
        return (
          <div className="text-center py-12">
            <Package size={48} className="text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">ERP Module</h2>
            <p className="text-gray-600 mb-4">ERP functionality coming soon!</p>
            <p className="text-sm text-gray-500">This module will include inventory management, financial reporting, and supply chain tracking.</p>
          </div>
        );
      case 'hr-module':
        return (
          <div className="text-center py-12">
            <Users size={48} className="text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">HR Module</h2>
            <p className="text-gray-600 mb-4">HR functionality coming soon!</p>
            <p className="text-sm text-gray-500">This module will include employee management, payroll, and performance tracking.</p>
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <Package size={48} className="text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Module Under Development</h2>
            <p className="text-gray-600 mb-4">This module is currently being developed.</p>
            <p className="text-sm text-gray-500">Check back soon for updates!</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${
              currentModule.health === 'healthy' ? 'bg-success-100' :
              currentModule.health === 'warning' ? 'bg-warning-100' :
              'bg-error-100'
            }`}>
              {getModuleIcon(currentModule.icon)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentModule.name}</h1>
              <p className="text-gray-600">v{currentModule.version}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            currentModule.enabled 
              ? 'bg-success-100 text-success-700' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {currentModule.enabled ? 'Active' : 'Inactive'}
          </div>
          <div className={`w-2 h-2 rounded-full ${
            currentModule.health === 'healthy' ? 'bg-success-500' :
            currentModule.health === 'warning' ? 'bg-warning-500' :
            'bg-error-500'
          }`}></div>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Settings size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Activity size={20} />
          </button>
        </div>
      </div>

      {/* Module Description */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">About {currentModule.name}</h2>
        <p className="text-gray-600 mb-4">{currentModule.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className="text-sm text-gray-900">{currentModule.enabled ? 'Active' : 'Inactive'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Health</p>
            <p className="text-sm text-gray-900 capitalize">{currentModule.health}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Last Updated</p>
            <p className="text-sm text-gray-900">{currentModule.lastUpdated}</p>
          </div>
        </div>
      </div>

      {/* Module Content */}
      <div className="card">
        {getModuleContent()}
      </div>
    </div>
  );
};

export default ModuleView; 