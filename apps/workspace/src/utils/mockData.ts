import { User, UserRole, Notification } from '../types/workspace';
import { InstalledModule, ModuleStoreItem } from '../types/modules';
import { NavigationItem } from '../types/workspace';

// Mock User
export const mockUser: User = {
  id: 'user-1',
  email: 'admin@acme.com',
  firstName: 'John',
  lastName: 'Doe',
  displayName: 'John Doe',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  role: UserRole.TENANT_ADMIN,
  tenantId: 'tenant-1',
  permissions: ['read', 'write', 'admin'],
  preferences: {
    theme: 'light',
    language: 'en',
    sidebarCollapsed: false,
    compactMode: false,
    notifications: {
      email: true,
      push: true,
      inApp: true,
    },
  },
};

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'info',
    title: 'Welcome to AI-BOS',
    message: 'Your workspace is ready. Start exploring your modules!',
    timestamp: new Date(),
    read: false,
  },
  {
    id: 'notif-3',
    type: 'warning',
    title: 'Storage Warning',
    message: 'You are approaching your storage limit',
    timestamp: new Date(Date.now() - 7200000),
    read: false,
  },
];

// Mock Installed Modules
export const mockInstalledModules: InstalledModule[] = [
  {
    id: 'accounting-module',
    name: 'Accounting & Finance',
    description: 'Complete accounting and financial management solution',
    version: '1.5.2',
    category: 'finance',
    icon: 'calculator',
    enabled: true,
    installedAt: '2024-01-10',
    updatedAt: '2024-01-18',
    configuration: {
      fiscalYear: '2024',
      defaultCurrency: 'USD',
      taxRate: 0.08,
    },
    permissions: {
      roles: ['finance_read', 'finance_write'],
      capabilities: [],
      dataAccess: { read: [], write: [], delete: [] }
    },
    health: 'HEALTHY',
  },
];

// Mock Module Store Items
export const mockModuleStore: ModuleStoreItem[] = [
  {
    id: 'marketing-module',
    name: 'Marketing Automation',
    description: 'Automate your marketing campaigns and track performance',
    version: '1.0.0',
    category: 'marketing',
    icon: 'megaphone',
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop',
    ],
    author: 'Marketing Solutions Inc',
    documentation: 'https://docs.marketingsolutions.com',
    support: {
      documentation: 'https://docs.marketingsolutions.com',
      community: '',
      responseTime: '',
      sla: '',
      email: 'support@marketingsolutions.com',
    },
    rating: 4.5,
    tags: ['automation', 'campaigns', 'analytics', 'email'],
    price: 2999,
    downloads: 1543,
    lastUpdated: '2025-07-10',
    features: [],
    requirements: [],
    publisher: '',
    verified: false,
    featured: false,
    trending: false,
    new: false,
    comingSoon: false,
    deprecated: false,
  },
  {
    id: 'project-management-module',
    name: 'Project Management',
    description: 'Plan, track, and manage your projects effectively',
    version: '1.3.0',
    category: 'project_management',
    icon: 'kanban',
    screenshots: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    ],
    author: 'ProjectFlow',
    rating: 4.8,
    tags: ['projects', 'tasks', 'collaboration', 'timeline'],
    price: 1999,
    downloads: 892,
    lastUpdated: '2025-07-10',
    features: [],
    requirements: [],
    publisher: '',
    verified: false,
    featured: false,
    trending: false,
    new: false,
    comingSoon: false,
    deprecated: false,
  },
  {
    id: 'analytics-module',
    name: 'Business Analytics',
    description: 'Advanced analytics and reporting for your business',
    version: '2.0.0',
    category: 'analytics',
    icon: 'bar-chart-3',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    ],
    author: 'DataInsights',
    rating: 4.6,
    tags: ['analytics', 'reporting', 'dashboards', 'insights'],
    price: 500,
    downloads: 2341,
    lastUpdated: '2025-07-10',
    features: [],
    requirements: [],
    publisher: '',
    verified: false,
    featured: false,
    trending: false,
    new: false,
    comingSoon: false,
    deprecated: false,
  },
];

// Mock Navigation Items
export const mockNavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: 'layout-dashboard',
  },
  {
    id: 'accounting-module',
    label: 'Accounting',
    path: '/modules/accounting',
    icon: 'calculator',
    moduleId: 'accounting-module',
  },
  {
    id: 'store',
    label: 'Module Store',
    path: '/store',
    icon: 'shopping-cart',
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'settings',
  },
];