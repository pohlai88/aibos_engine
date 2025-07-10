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
    id: 'notif-2',
    type: 'success',
    title: 'CRM Module Updated',
    message: 'Your CRM module has been updated to version 2.1.0',
    timestamp: new Date(Date.now() - 3600000),
    read: true,
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
    id: 'crm-module',
    name: 'Customer Relationship Management',
    description: 'Manage your customer relationships and sales pipeline',
    version: '2.1.0',
    category: 'crm',
    icon: 'users',
    enabled: true,
    installedAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    configuration: {
      companyName: 'Acme Corp',
      timezone: 'UTC',
      currency: 'USD',
    },
    permissions: ['crm_read', 'crm_write', 'crm_admin'],
    health: 'healthy',
  },
  {
    id: 'accounting-module',
    name: 'Accounting & Finance',
    description: 'Complete accounting and financial management solution',
    version: '1.5.2',
    category: 'finance',
    icon: 'calculator',
    enabled: true,
    installedAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    configuration: {
      fiscalYear: '2024',
      defaultCurrency: 'USD',
      taxRate: 0.08,
    },
    permissions: ['finance_read', 'finance_write'],
    health: 'healthy',
  },
  {
    id: 'hr-module',
    name: 'Human Resources',
    description: 'Employee management and HR processes',
    version: '1.2.1',
    category: 'hr',
    icon: 'user-check',
    enabled: false,
    installedAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    configuration: {},
    permissions: ['hr_read', 'hr_write'],
    health: 'warning',
    error: 'Module requires additional configuration',
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
    author: {
      name: 'Marketing Solutions Inc',
      email: 'support@marketingsolutions.com',
      website: 'https://marketingsolutions.com',
    },
    pricing: {
      model: 'subscription',
      price: 2999, // $29.99
      currency: 'USD',
      interval: 'monthly',
    },
    rating: 4.5,
    reviewCount: 127,
    downloadCount: 1543,
    tags: ['automation', 'campaigns', 'analytics', 'email'],
    dependencies: ['crm-module'],
    minEngineVersion: '1.0.0',
    documentation: 'https://docs.marketingsolutions.com',
    support: 'https://support.marketingsolutions.com',
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
    author: {
      name: 'ProjectFlow',
      email: 'hello@projectflow.com',
      website: 'https://projectflow.com',
    },
    pricing: {
      model: 'subscription',
      price: 1999, // $19.99
      currency: 'USD',
      interval: 'monthly',
    },
    rating: 4.8,
    reviewCount: 89,
    downloadCount: 892,
    tags: ['projects', 'tasks', 'collaboration', 'timeline'],
    dependencies: [],
    minEngineVersion: '1.0.0',
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
    author: {
      name: 'DataInsights',
      email: 'support@datainsights.com',
      website: 'https://datainsights.com',
    },
    pricing: {
      model: 'usage-based',
      price: 500, // $5.00 per 1000 API calls
      currency: 'USD',
      tiers: [
        { name: 'Starter', price: 500, limit: 1000, unit: 'api_calls' },
        { name: 'Professional', price: 2000, limit: 5000, unit: 'api_calls' },
        { name: 'Enterprise', price: 5000, limit: 15000, unit: 'api_calls' },
      ],
    },
    rating: 4.6,
    reviewCount: 203,
    downloadCount: 2341,
    tags: ['analytics', 'reporting', 'dashboards', 'insights'],
    dependencies: ['crm-module', 'accounting-module'],
    minEngineVersion: '1.0.0',
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
    id: 'crm-module',
    label: 'CRM',
    path: '/modules/crm',
    icon: 'users',
    moduleId: 'crm-module',
    badge: {
      count: 3,
      variant: 'success',
    },
  },
  {
    id: 'accounting-module',
    label: 'Accounting',
    path: '/modules/accounting',
    icon: 'calculator',
    moduleId: 'accounting-module',
  },
  {
    id: 'hr-module',
    label: 'HR',
    path: '/modules/hr',
    icon: 'user-check',
    moduleId: 'hr-module',
    badge: {
      count: 1,
      variant: 'warning',
    },
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