import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWorkspace } from '../../contexts/WorkspaceContext';

interface SideNavProps {
  currentModule: string | null;
  onModuleSelect: (moduleId: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const SideNav: React.FC<SideNavProps> = ({
  currentModule,
  onModuleSelect,
  collapsed,
  onToggleCollapse,
}) => {
  const location = useLocation();
  const { installedModules = [], toggleModule = () => {} } = useWorkspace() || {};

  const getModuleIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'users': <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-white text-xs">U</div>,
      'calculator': <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-white text-xs">C</div>,
      'user-check': <div className="w-5 h-5 bg-purple-500 rounded flex items-center justify-center text-white text-xs">U</div>,
    };
    return iconMap[iconName] || <div className="w-5 h-5 bg-gray-500 rounded flex items-center justify-center text-white text-xs">M</div>;
  };

  const handleModuleToggle = async (moduleId: string, enabled: boolean) => {
    try {
      await toggleModule(moduleId, enabled);
    } catch (error) {
      console.error('Failed to toggle module:', error);
    }
  };

  const navItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-white text-xs">D</div>,
      href: '/',
      active: location.pathname === '/',
    },
    {
      id: 'store',
      name: 'Module Store',
      icon: <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-white text-xs">S</div>,
      href: '/store',
      active: location.pathname === '/store',
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <div className="w-5 h-5 bg-gray-500 rounded flex items-center justify-center text-white text-xs">S</div>,
      href: '/settings',
      active: location.pathname === '/settings',
    },
  ];

  return (
    <nav className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <div className="w-5 h-5 bg-gray-400 rounded flex items-center justify-center text-white text-xs">→</div>
            ) : (
              <div className="w-5 h-5 bg-gray-400 rounded flex items-center justify-center text-white text-xs">←</div>
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                item.active
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="font-medium">{item.name}</span>}
            </Link>
          ))}
        </div>

        {/* Installed Modules */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Installed Modules
            </h3>
            <div className="space-y-2">
              {installedModules.map((module) => (
                <div
                  key={module.id}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    currentModule === module.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Link
                    to={`/modules/${module.id}`}
                    className="flex items-center space-x-3 flex-1"
                    onClick={() => onModuleSelect(module.id)}
                  >
                    <span className="flex-shrink-0">{getModuleIcon(module.icon)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{module.name}</p>
                      <p className="text-xs text-gray-500 truncate">v{module.version}</p>
                    </div>
                  </Link>
                  
                  {/* Module Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModuleToggle(module.id, !module.enabled);
                    }}
                    className={`ml-2 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      module.enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    aria-label={`Toggle ${module.name} module`}
                    aria-checked={module.enabled}
                    role="switch"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        module.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Collapsed Module Icons */}
        {collapsed && (
          <div className="flex-1 p-4 border-t border-gray-200">
            <div className="space-y-2">
              {installedModules.map((module) => (
                <div key={module.id} className="relative">
                  <Link
                    to={`/modules/${module.id}`}
                    className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                      currentModule === module.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => onModuleSelect(module.id)}
                  >
                    {getModuleIcon(module.icon)}
                  </Link>
                  
                  {/* Status indicator */}
                  <div
                    className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      module.enabled ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SideNav;