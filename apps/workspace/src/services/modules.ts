import { apiService, handleApiResponse } from './api';
import { InstalledModule, ModuleStoreItem, ModuleConfig } from '../types/modules';

export interface InstallModuleRequest {
  moduleId: string;
  tenantId: string;
  configuration?: Record<string, any>;
}

export interface UpdateModuleConfigRequest {
  moduleId: string;
  tenantId: string;
  configuration: Record<string, any>;
}

export interface ModuleHealthResponse {
  moduleId: string;
  health: 'healthy' | 'warning' | 'error';
  lastChecked: string;
  error?: string;
  metrics?: {
    uptime: number;
    responseTime: number;
    errorRate: number;
  };
}

// Installed Modules API
export const modulesApi = {
  // Get all installed modules for a tenant
  async getInstalledModules(tenantId: string): Promise<InstalledModule[]> {
    const response = await apiService.get<InstalledModule[]>(`/modules/installed/${tenantId}`);
    return handleApiResponse(response);
  },

  // Install a new module
  async installModule(request: InstallModuleRequest): Promise<InstalledModule> {
    const response = await apiService.post<InstalledModule>('/modules/install', request);
    return handleApiResponse(response);
  },

  // Uninstall a module
  async uninstallModule(moduleId: string, tenantId: string): Promise<void> {
    const response = await apiService.delete(`/modules/${moduleId}/tenant/${tenantId}`);
    return handleApiResponse(response);
  },

  // Update module configuration
  async updateModuleConfig(request: UpdateModuleConfigRequest): Promise<InstalledModule> {
    const response = await apiService.put<InstalledModule>(`/modules/${request.moduleId}/config`, {
      tenantId: request.tenantId,
      configuration: request.configuration,
    });
    return handleApiResponse(response);
  },

  // Get module configuration
  async getModuleConfig(moduleId: string, tenantId: string): Promise<ModuleConfig> {
    const response = await apiService.get<ModuleConfig>(`/modules/${moduleId}/config/${tenantId}`);
    return handleApiResponse(response);
  },

  // Enable/disable a module
  async toggleModule(moduleId: string, tenantId: string, enabled: boolean): Promise<InstalledModule> {
    const response = await apiService.patch<InstalledModule>(`/modules/${moduleId}/toggle`, {
      tenantId,
      enabled,
    });
    return handleApiResponse(response);
  },

  // Get module health status
  async getModuleHealth(moduleId: string, tenantId: string): Promise<ModuleHealthResponse> {
    const response = await apiService.get<ModuleHealthResponse>(`/modules/${moduleId}/health/${tenantId}`);
    return handleApiResponse(response);
  },

  // Get all modules health status for a tenant
  async getAllModulesHealth(tenantId: string): Promise<ModuleHealthResponse[]> {
    const response = await apiService.get<ModuleHealthResponse[]>(`/modules/health/${tenantId}`);
    return handleApiResponse(response);
  },
};

// Module Store API
export const moduleStoreApi = {
  // Get all available modules in the store
  async getAvailableModules(filters?: {
    category?: string;
    search?: string;
    sortBy?: string;
    limit?: number;
    offset?: number;
  }): Promise<ModuleStoreItem[]> {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());

    const queryString = params.toString();
    const endpoint = `/modules/store${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiService.get<ModuleStoreItem[]>(endpoint);
    return handleApiResponse(response);
  },

  // Get specific module details from store
  async getModuleDetails(moduleId: string): Promise<ModuleStoreItem> {
    const response = await apiService.get<ModuleStoreItem>(`/modules/store/${moduleId}`);
    return handleApiResponse(response);
  },

  // Get module categories
  async getModuleCategories(): Promise<{ id: string; name: string; count: number }[]> {
    const response = await apiService.get<{ id: string; name: string; count: number }[]>('/modules/store/categories');
    return handleApiResponse(response);
  },

  // Search modules
  async searchModules(query: string, filters?: {
    category?: string;
    sortBy?: string;
    limit?: number;
  }): Promise<ModuleStoreItem[]> {
    const params = new URLSearchParams({ query });
    if (filters?.category) params.append('category', filters.category);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await apiService.get<ModuleStoreItem[]>(`/modules/store/search?${params.toString()}`);
    return handleApiResponse(response);
  },

  // Get popular modules
  async getPopularModules(limit: number = 10): Promise<ModuleStoreItem[]> {
    const response = await apiService.get<ModuleStoreItem[]>(`/modules/store/popular?limit=${limit}`);
    return handleApiResponse(response);
  },

  // Get recently added modules
  async getRecentModules(limit: number = 10): Promise<ModuleStoreItem[]> {
    const response = await apiService.get<ModuleStoreItem[]>(`/modules/store/recent?limit=${limit}`);
    return handleApiResponse(response);
  },
};

// Module Analytics API
export const moduleAnalyticsApi = {
  // Get module usage statistics
  async getModuleUsage(moduleId: string, tenantId: string, period: 'day' | 'week' | 'month' = 'week'): Promise<any> {
    const response = await apiService.get(`/modules/${moduleId}/analytics/usage/${tenantId}?period=${period}`);
    return handleApiResponse(response);
  },

  // Get module performance metrics
  async getModulePerformance(moduleId: string, tenantId: string): Promise<any> {
    const response = await apiService.get(`/modules/${moduleId}/analytics/performance/${tenantId}`);
    return handleApiResponse(response);
  },

  // Get tenant-wide module analytics
  async getTenantModuleAnalytics(tenantId: string): Promise<any> {
    const response = await apiService.get(`/modules/analytics/tenant/${tenantId}`);
    return handleApiResponse(response);
  },
}; 