import React, { useState } from 'react';
import { useWorkspace } from '../contexts/WorkspaceContext';
import { moduleStoreApi } from '../services/modules';
import { ModuleStoreItem } from '../types/modules';
import { useApi } from '../hooks/useApi';
import { ApiResponse } from '../services/api';

const Store: React.FC = () => {
  const { installModule, installedModules } = useWorkspace();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedModule, setSelectedModule] = useState<ModuleStoreItem | null>(null);

  // Fetch available modules from store
  const {
    data: availableModules,
    loading: modulesLoading,
    error: modulesError,
    execute: fetchModules,
  } = useApi(async (): Promise<ApiResponse<ModuleStoreItem[]>> => {
    try {
      const modules = await moduleStoreApi.getAvailableModules({
        search: searchQuery || undefined,
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        sortBy,
      });
              return { success: true, data: modules, error: undefined };
      } catch (error) {
        return { 
          success: false, 
          data: [], 
          error: error instanceof Error ? error.message : 'Failed to fetch modules' 
        };
    }
  }, {
    immediate: true,
    cache: true,
    cacheKey: 'store-modules',
  });

  // Fetch categories
  const {
    data: categories,
  } = useApi(async (): Promise<ApiResponse<{ id: string; name: string; count: number }[]>> => {
    try {
      const cats = await moduleStoreApi.getModuleCategories();
              return { success: true, data: cats, error: undefined };
      } catch (error) {
        return { 
          success: false, 
          data: [], 
          error: error instanceof Error ? error.message : 'Failed to fetch categories' 
        };
    }
  }, {
    immediate: true,
    cache: true,
    cacheKey: 'store-categories',
  });

  const getModuleIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'users': <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">U</div>,
      'calculator': <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">C</div>,
      'user-check': <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">✓</div>,
      // Removed: 'crm' and 'erp' hardcoded references
      'analytics': <div className="w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">A</div>,
      'security': <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">S</div>,
      'integration': <div className="w-6 h-6 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">I</div>,
      'api': <div className="w-6 h-6 bg-gray-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">A</div>,
      'documentation': <div className="w-6 h-6 bg-teal-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">D</div>,
      'support': <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">S</div>,
    };
    return iconMap[iconName] || <div className="w-6 h-6 bg-gray-400 rounded-lg flex items-center justify-center text-white text-xs font-bold">M</div>;
  };

  const getCategoryIcon = (categoryId: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      // Removed: 'crm', 'erp', and 'hr' hardcoded references
      'finance': <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">F</div>,
      'marketing': <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">M</div>,
      'sales': <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">S</div>,
      'analytics': <div className="w-5 h-5 bg-indigo-500 rounded flex items-center justify-center text-white text-xs font-bold">A</div>,
      'security': <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">S</div>,
      'integration': <div className="w-5 h-5 bg-yellow-500 rounded flex items-center justify-center text-white text-xs font-bold">I</div>,
    };
    return iconMap[categoryId] || <div className="w-5 h-5 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-bold">M</div>;
  };

  const handleInstall = async (moduleId: string) => {
    try {
      await installModule(moduleId);
      await fetchModules();
    } catch (error) {
      console.error('Failed to install module:', error);
    }
  };

  const isModuleInstalled = (moduleId: string) => {
    return installedModules.some(m => m.id === moduleId);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchModules();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    fetchModules();
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    fetchModules();
  };

  const renderModuleCard = (module: ModuleStoreItem) => {
    const isInstalled = isModuleInstalled(module.id);
    const isEnterprise = 'enterprise' in module;
    
    return (
      <div key={module.id} className="card p-6 hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-primary-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              {getModuleIcon(module.icon)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{module.name}</h3>
                {isEnterprise && (
                  <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                    Enterprise
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">v{module.version}</p>
            </div>
          </div>
          {isInstalled && (
            <div className="flex items-center space-x-1 text-success-600">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm font-medium">Installed</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {module.description}
        </p>

        {/* Features */}
        {module.features && module.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {module.features.slice(0, 3).map((feature: string, index: number) => (
                <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                  {feature}
                </span>
              ))}
              {module.features.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                  +{module.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">★</span>
                <span>{module.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">↓</span>
                <span>{module.downloads}</span>
              </div>
            </div>
          <div className="text-sm text-gray-500">
            {module.category}
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {module.price === 0 ? 'Free' : `$${module.price}`}
            </span>
            {module.price > 0 && (
              <span className="text-sm text-gray-500">/month</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedModule(module)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="View Details"
            >
              <span className="text-lg">👁️</span>
            </button>
            
            {!isInstalled ? (
              <button
                onClick={() => handleInstall(module.id)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <span>↓</span>
                <span>Install</span>
              </button>
            ) : (
              <button
                disabled
                className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed flex items-center space-x-2"
              >
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Installed</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderModuleList = (module: ModuleStoreItem) => {
    const isInstalled = isModuleInstalled(module.id);
    const isEnterprise = 'enterprise' in module;
    
    return (
      <div key={module.id} className="card p-4 hover:shadow-md transition-all duration-200 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary-100 rounded-lg">
              {getModuleIcon(module.icon)}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-gray-900">{module.name}</h3>
                {isEnterprise && (
                  <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                    Enterprise
                  </span>
                )}
                <span className="text-sm text-gray-500">v{module.version}</span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-1">{module.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>{module.category}</span>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★</span>
                  <span>{module.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-gray-400">↓</span>
                  <span>{module.downloads}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-lg font-bold text-gray-900">
              {module.price === 0 ? 'Free' : `$${module.price}`}
            </span>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedModule(module)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="View Details"
              >
                <span className="text-lg">👁️</span>
              </button>
              
              {!isInstalled ? (
                <button
                  onClick={() => handleInstall(module.id)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                  <span>↓</span>
                  <span>Install</span>
                </button>
              ) : (
                <div className="flex items-center space-x-1 text-success-600">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm font-medium">Installed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Module Store</h1>
        <p className="text-gray-600 mt-2">
          Discover and install enterprise-grade modules to enhance your workspace.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <form onSubmit={handleSearch} className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">🔍</span>
              <input
                type="text"
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </form>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-lg">⚙️</span>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories?.map((category: { id: string; name: string; count: number }) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-lg">📈</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="popular">Most Popular</option>
              <option value="recent">Recently Added</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="space-y-1 w-4 h-4">
                <div className="bg-current rounded-sm h-1"></div>
                <div className="bg-current rounded-sm h-1"></div>
                <div className="bg-current rounded-sm h-1"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      {!searchQuery && selectedCategory === 'all' && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories?.map((category: { id: string; name: string; count: number }) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className="card p-4 text-center hover:shadow-md transition-shadow border border-gray-200 hover:border-primary-300"
            >
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-primary-100 rounded-lg">
                  {getCategoryIcon(category.id)}
                </div>
              </div>
              <h3 className="font-medium text-gray-900 text-sm">{category.name}</h3>
              <p className="text-xs text-gray-500">{category.count} modules</p>
            </button>
          ))}
        </div>
      )}

      {/* Modules */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {modulesLoading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))
        ) : modulesError ? (
          <div className="col-span-full text-center py-12">
            <div className="text-red-500 mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold mx-auto">!</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load modules</h3>
            <p className="text-gray-600 mb-4">{modulesError}</p>
            <button
              onClick={() => fetchModules()}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Try Again
            </button>
          </div>
        ) : availableModules && availableModules.length > 0 ? (
          availableModules.map((module: ModuleStoreItem) => 
            viewMode === 'grid' ? renderModuleCard(module) : renderModuleList(module)
          )
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center text-white text-2xl font-bold mx-auto">📦</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No modules found</h3>
            <p className="text-gray-600">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your search criteria or filters.'
                : 'No modules are currently available in the store.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Module Details Modal */}
      {selectedModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    {getModuleIcon(selectedModule.icon)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedModule.name}</h2>
                    <p className="text-gray-500">v{selectedModule.version} • {selectedModule.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">✕</span>
                </button>
              </div>

              <p className="text-gray-600 mb-6">{selectedModule.description}</p>

              {/* Features */}
              {selectedModule.features && selectedModule.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedModule.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedModule.rating}</div>
                  <div className="text-sm text-gray-500">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedModule.downloads}</div>
                  <div className="text-sm text-gray-500">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {selectedModule.price === 0 ? 'Free' : `$${selectedModule.price}`}
                  </div>
                  <div className="text-sm text-gray-500">Price</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => window.open(selectedModule.documentation, '_blank')}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                  >
                    <span>📖</span>
                    <span>Documentation</span>
                  </button>
                  {selectedModule.demoUrl && (
                    <button
                      onClick={() => window.open(selectedModule.demoUrl, '_blank')}
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                    >
                      <span>🔗</span>
                      <span>Demo</span>
                    </button>
                  )}
                </div>
                
                {!isModuleInstalled(selectedModule.id) ? (
                  <button
                    onClick={() => {
                      handleInstall(selectedModule.id);
                      setSelectedModule(null);
                    }}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                  >
                    <span>↓</span>
                    <span>Install Module</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2 text-success-600">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="font-medium">Already Installed</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;