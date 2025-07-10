import { apiService, handleApiResponse } from './api';
import { User, UserRole } from '../types/workspace';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  tenantId: string;
  permissions: string[];
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    sidebarCollapsed: boolean;
    compactMode: boolean;
    notifications: {
      email: boolean;
      push: boolean;
      inApp: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  status: 'active' | 'inactive' | 'suspended';
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenantId: string;
  permissions?: string[];
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  role?: UserRole;
  permissions?: string[];
  status?: 'active' | 'inactive' | 'suspended';
}

export interface UpdateUserPreferencesRequest {
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
  sidebarCollapsed?: boolean;
  compactMode?: boolean;
  notifications?: {
    email?: boolean;
    push?: boolean;
    inApp?: boolean;
  };
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  moduleId?: string;
  details?: Record<string, any>;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface UserStats {
  totalLogins: number;
  lastLoginAt?: string;
  modulesAccessed: string[];
  totalActions: number;
  activeDays: number;
}

// Users API
export const usersApi = {
  // Get current user profile
  async getCurrentUser(): Promise<UserProfile> {
    const response = await apiService.get<UserProfile>('/users/current');
    return handleApiResponse(response);
  },

  // Get user by ID
  async getUser(userId: string): Promise<UserProfile> {
    const response = await apiService.get<UserProfile>(`/users/${userId}`);
    return handleApiResponse(response);
  },

  // Get all users in a tenant
  async getTenantUsers(tenantId: string, filters?: {
    role?: UserRole;
    status?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<UserProfile[]> {
    const params = new URLSearchParams();
    if (filters?.role) params.append('role', filters.role);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());

    const queryString = params.toString();
    const endpoint = `/users/tenant/${tenantId}${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiService.get<UserProfile[]>(endpoint);
    return handleApiResponse(response);
  },

  // Create a new user
  async createUser(request: CreateUserRequest): Promise<UserProfile> {
    const response = await apiService.post<UserProfile>('/users', request);
    return handleApiResponse(response);
  },

  // Update user
  async updateUser(userId: string, request: UpdateUserRequest): Promise<UserProfile> {
    const response = await apiService.put<UserProfile>(`/users/${userId}`, request);
    return handleApiResponse(response);
  },

  // Delete user
  async deleteUser(userId: string): Promise<void> {
    const response = await apiService.delete(`/users/${userId}`);
    return handleApiResponse(response);
  },

  // Update user preferences
  async updateUserPreferences(userId: string, request: UpdateUserPreferencesRequest): Promise<UserProfile> {
    const response = await apiService.put<UserProfile>(`/users/${userId}/preferences`, request);
    return handleApiResponse(response);
  },

  // Get user preferences
  async getUserPreferences(userId: string): Promise<UserProfile['preferences']> {
    const response = await apiService.get<UserProfile['preferences']>(`/users/${userId}/preferences`);
    return handleApiResponse(response);
  },

  // Get user permissions
  async getUserPermissions(userId: string): Promise<string[]> {
    const response = await apiService.get<string[]>(`/users/${userId}/permissions`);
    return handleApiResponse(response);
  },

  // Update user permissions
  async updateUserPermissions(userId: string, permissions: string[]): Promise<string[]> {
    const response = await apiService.put<string[]>(`/users/${userId}/permissions`, { permissions });
    return handleApiResponse(response);
  },

  // Check if user has permission
  async checkUserPermission(userId: string, permission: string): Promise<{
    hasPermission: boolean;
    reason?: string;
  }> {
    const response = await apiService.get(`/users/${userId}/permissions/${permission}/check`);
    return handleApiResponse(response);
  },

  // Get user activity
  async getUserActivity(userId: string, filters?: {
    moduleId?: string;
    action?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  }): Promise<UserActivity[]> {
    const params = new URLSearchParams();
    if (filters?.moduleId) params.append('moduleId', filters.moduleId);
    if (filters?.action) params.append('action', filters.action);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());

    const queryString = params.toString();
    const endpoint = `/users/${userId}/activity${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiService.get<UserActivity[]>(endpoint);
    return handleApiResponse(response);
  },

  // Get user statistics
  async getUserStats(userId: string): Promise<UserStats> {
    const response = await apiService.get<UserStats>(`/users/${userId}/stats`);
    return handleApiResponse(response);
  },

  // Invite user to tenant
  async inviteUser(tenantId: string, email: string, role: UserRole, permissions?: string[]): Promise<{
    invitationId: string;
    email: string;
    expiresAt: string;
  }> {
    const response = await apiService.post(`/users/invite`, {
      tenantId,
      email,
      role,
      permissions,
    });
    return handleApiResponse(response);
  },

  // Accept user invitation
  async acceptInvitation(invitationId: string, userData: {
    firstName: string;
    lastName: string;
    password: string;
  }): Promise<UserProfile> {
    const response = await apiService.post(`/users/invite/${invitationId}/accept`, userData);
    return handleApiResponse(response);
  },

  // Resend user invitation
  async resendInvitation(invitationId: string): Promise<void> {
    const response = await apiService.post(`/users/invite/${invitationId}/resend`);
    return handleApiResponse(response);
  },

  // Cancel user invitation
  async cancelInvitation(invitationId: string): Promise<void> {
    const response = await apiService.delete(`/users/invite/${invitationId}`);
    return handleApiResponse(response);
  },
};

// User Analytics API
export const userAnalyticsApi = {
  // Get user activity over time
  async getUserActivityOverTime(userId: string, period: 'day' | 'week' | 'month' = 'week'): Promise<any> {
    const response = await apiService.get(`/users/${userId}/analytics/activity?period=${period}`);
    return handleApiResponse(response);
  },

  // Get user module usage
  async getUserModuleUsage(userId: string): Promise<any> {
    const response = await apiService.get(`/users/${userId}/analytics/modules`);
    return handleApiResponse(response);
  },

  // Get user performance metrics
  async getUserPerformance(userId: string): Promise<any> {
    const response = await apiService.get(`/users/${userId}/analytics/performance`);
    return handleApiResponse(response);
  },
}; 