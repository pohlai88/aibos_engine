import { apiService, handleApiResponse } from './api';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  groupMode: 'shared' | 'isolated';
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'suspended';
  settings: {
    timezone: string;
    locale: string;
    currency: string;
    dateFormat: string;
  };
  limits: {
    maxUsers: number;
    maxStorage: number;
    maxModules: number;
  };
  usage: {
    currentUsers: number;
    currentStorage: number;
    currentModules: number;
  };
}

export interface TenantChild {
  id: string;
  name: string;
  slug: string;
  groupMode: 'shared' | 'isolated';
  status: 'active' | 'inactive';
  createdAt: string;
  installedModules: string[];
}

export interface TenantStats {
  totalUsers: number;
  totalModules: number;
  totalStorage: number;
  activeModules: number;
  lastActivity: string;
  monthlyUsage: {
    users: number;
    storage: number;
    apiCalls: number;
  };
}

export interface CreateTenantRequest {
  name: string;
  parentId?: string;
  groupMode: 'shared' | 'isolated';
  settings?: Partial<Tenant['settings']>;
}

export interface UpdateTenantRequest {
  name?: string;
  groupMode?: 'shared' | 'isolated';
  settings?: Partial<Tenant['settings']>;
  status?: 'active' | 'inactive' | 'suspended';
}

// Tenants API
export const tenantsApi = {
  // Get current tenant information
  async getCurrentTenant(): Promise<Tenant> {
    const response = await apiService.get<Tenant>('/tenants/current');
    return handleApiResponse(response);
  },

  // Get tenant by ID
  async getTenant(tenantId: string): Promise<Tenant> {
    const response = await apiService.get<Tenant>(`/tenants/${tenantId}`);
    return handleApiResponse(response);
  },

  // Get tenant children (sub-tenants)
  async getTenantChildren(tenantId: string): Promise<TenantChild[]> {
    const response = await apiService.get<TenantChild[]>(`/tenants/${tenantId}/children`);
    return handleApiResponse(response);
  },

  // Get tenant descendants (all nested children)
  async getTenantDescendants(tenantId: string): Promise<TenantChild[]> {
    const response = await apiService.get<TenantChild[]>(`/tenants/${tenantId}/descendants`);
    return handleApiResponse(response);
  },

  // Create a new tenant
  async createTenant(request: CreateTenantRequest): Promise<Tenant> {
    const response = await apiService.post<Tenant>('/tenants', request);
    return handleApiResponse(response);
  },

  // Update tenant
  async updateTenant(tenantId: string, request: UpdateTenantRequest): Promise<Tenant> {
    const response = await apiService.put<Tenant>(`/tenants/${tenantId}`, request);
    return handleApiResponse(response);
  },

  // Delete tenant
  async deleteTenant(tenantId: string): Promise<void> {
    const response = await apiService.delete(`/tenants/${tenantId}`);
    return handleApiResponse(response);
  },

  // Get tenant statistics
  async getTenantStats(tenantId: string): Promise<TenantStats> {
    const response = await apiService.get<TenantStats>(`/tenants/${tenantId}/stats`);
    return handleApiResponse(response);
  },

  // Get tenant hierarchy
  async getTenantHierarchy(tenantId: string): Promise<{
    parent?: Tenant;
    current: Tenant;
    children: TenantChild[];
  }> {
    const response = await apiService.get(`/tenants/${tenantId}/hierarchy`);
    return handleApiResponse(response);
  },

  // Check if tenant has access to a module
  async checkModuleAccess(tenantId: string, moduleId: string): Promise<{
    hasAccess: boolean;
    reason?: string;
  }> {
    const response = await apiService.get(`/tenants/${tenantId}/modules/${moduleId}/access`);
    return handleApiResponse(response);
  },

  // Get tenant settings
  async getTenantSettings(tenantId: string): Promise<Tenant['settings']> {
    const response = await apiService.get<Tenant['settings']>(`/tenants/${tenantId}/settings`);
    return handleApiResponse(response);
  },

  // Update tenant settings
  async updateTenantSettings(tenantId: string, settings: Partial<Tenant['settings']>): Promise<Tenant['settings']> {
    const response = await apiService.put<Tenant['settings']>(`/tenants/${tenantId}/settings`, settings);
    return handleApiResponse(response);
  },

  // Get tenant usage
  async getTenantUsage(tenantId: string): Promise<Tenant['usage']> {
    const response = await apiService.get<Tenant['usage']>(`/tenants/${tenantId}/usage`);
    return handleApiResponse(response);
  },

  // Get tenant limits
  async getTenantLimits(tenantId: string): Promise<Tenant['limits']> {
    const response = await apiService.get<Tenant['limits']>(`/tenants/${tenantId}/limits`);
    return handleApiResponse(response);
  },
};

// Tenant Analytics API
export const tenantAnalyticsApi = {
  // Get tenant activity over time
  async getTenantActivity(tenantId: string, period: 'day' | 'week' | 'month' = 'week'): Promise<any> {
    const response = await apiService.get(`/tenants/${tenantId}/analytics/activity?period=${period}`);
    return handleApiResponse(response);
  },

  // Get tenant user activity
  async getTenantUserActivity(tenantId: string): Promise<any> {
    const response = await apiService.get(`/tenants/${tenantId}/analytics/users`);
    return handleApiResponse(response);
  },

  // Get tenant module usage
  async getTenantModuleUsage(tenantId: string): Promise<any> {
    const response = await apiService.get(`/tenants/${tenantId}/analytics/modules`);
    return handleApiResponse(response);
  },

  // Get tenant storage usage
  async getTenantStorageUsage(tenantId: string): Promise<any> {
    const response = await apiService.get(`/tenants/${tenantId}/analytics/storage`);
    return handleApiResponse(response);
  },
}; 