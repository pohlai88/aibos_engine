export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  tenantId: string;
  permissions: string[];
  preferences: UserPreferences;
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  TENANT_ADMIN = 'tenant_admin',
  USER = 'user',
  GUEST = 'guest',
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  sidebarCollapsed: boolean;
  compactMode: boolean;
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
}

export interface WorkspaceState {
  currentModule: string | null;
  sidebarCollapsed: boolean;
  notifications: Notification[];
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  moduleId?: string;
  children?: NavigationItem[];
  permissions?: string[];
  badge?: {
    count: number;
    variant: 'default' | 'success' | 'warning' | 'error';
  };
} 