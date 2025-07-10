import { ModuleStatus, User, UserRole, UserStatus } from '@aibos/types';

// Utility function to generate unique IDs
const generateId = (): string => {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Simplified mock data that matches the complex type definitions
export const mockDB = {
  modules: [
    // Removed hardcoded CRM and ERP module references
    // Keep this array empty or add generic test modules as needed
  ],
  users: [
    {
      id: 'user-1',
      tenantId: 'tenant-1',
      email: 'admin@aibos.io',
      username: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      displayName: 'Admin User',
      status: 'active' as const,
      role: 'tenant_admin' as const,
      permissions: [],
      groups: [],
      profile: {
        timezone: 'UTC',
        locale: 'en-US'
      },
      preferences: {
        theme: 'light',
        language: 'en',
        dateFormat: 'YYYY-MM-DD',
        timeFormat: '24h',
        currency: 'USD',
        numberFormat: 'en-US',
        emailNotifications: {
          enabled: true,
          types: [],
          doNotDisturb: false
        },
        pushNotifications: {
          enabled: true,
          types: [],
          doNotDisturb: false
        },
        inAppNotifications: {
          enabled: true,
          types: [],
          doNotDisturb: false
        },
        dashboardLayout: {
          type: 'grid',
          widgets: [],
          defaultWidgets: []
        },
        sidebarCollapsed: false,
        compactMode: false,
        autoSave: true,
        keyboardShortcuts: true
      },
      settings: {
        security: {
          twoFactorAuth: {
            enabled: false,
            method: 'totp',
            backupCodes: []
          },
          sessions: {
            maxSessions: 5,
            sessionTimeout: 30,
            rememberMeDuration: 30,
            forceLogoutOnPasswordChange: true,
            forceLogoutOnSuspiciousActivity: true
          },
          password: {
            expirationDays: 90,
            requireChangeOnNextLogin: false,
            historyCount: 5,
            preventCommonPasswords: true
          },
          loginHistory: true,
          deviceManagement: true
        },
        privacy: {
          profileVisibility: 'private',
          activityVisibility: 'private',
          dataSharing: false,
          analyticsTracking: true,
          marketingEmails: false,
          thirdPartyIntegrations: false
        },
        integrations: {
          oauthConnections: [],
          apiKeys: [],
          webhookSubscriptions: [],
          externalAccounts: []
        },
        api: {
          rateLimit: {
            requestsPerMinute: 100,
            requestsPerHour: 1000,
            requestsPerDay: 10000,
            burstLimit: 50
          },
          versioning: {
            defaultVersion: 'v1',
            supportedVersions: ['v1'],
            deprecatedVersions: [],
            deprecationNoticeDays: 30
          },
          documentation: {
            enabled: true,
            theme: 'light',
            interactive: true
          }
        }
      },
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15'),
      metadata: {}
    } as User
  ],
  tenants: [
    {
      id: 'tenant-1',
      name: 'AIBOS Demo',
      domain: 'demo.aibos.io',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    }
  ]
};

export const mockDBOperations = {
  // Module operations
  getModules: (filters?: Partial<ModuleStatus>) => {
    let modules = mockDB.modules;
    if (filters) {
      modules = modules.filter(module => 
        Object.entries(filters).every(([key, value]) => 
          module[key as keyof ModuleStatus] === value
        )
      );
    }
    return modules;
  },

  getModuleById: (id: string) => {
    return mockDB.modules.find(module => (module as ModuleStatus).moduleId === id);
  },

  createModule: (moduleData: Partial<ModuleStatus>) => {
    const newModule = {
      moduleId: generateId(),
      installed: moduleData.installed || false,
      enabled: moduleData.enabled || false,
      installedAt: moduleData.installedAt || new Date(),
      updatedAt: new Date(),
      version: moduleData.version || '1.0.0',
      health: moduleData.health || 'healthy',
      error: moduleData.error
    } as ModuleStatus;
(mockDB.modules as ModuleStatus[]).push(newModule);
    return newModule;
  },

  updateModule: (id: string, updates: Partial<ModuleStatus>) => {
    const moduleIndex = mockDB.modules.findIndex(module => (module as ModuleStatus).moduleId === id);
    if (moduleIndex === -1) return null;
    
    (mockDB.modules[moduleIndex] as ModuleStatus) = {
      ...(mockDB.modules[moduleIndex] as ModuleStatus),
      ...updates,
      updatedAt: new Date()
    } as ModuleStatus;
    return mockDB.modules[moduleIndex];
  },

  deleteModule: (id: string) => {
    const moduleIndex = mockDB.modules.findIndex(module => (module as ModuleStatus).moduleId === id);
    if (moduleIndex === -1) return false;
    
    mockDB.modules.splice(moduleIndex, 1);
    return true;
  },

  // User operations
  getUsers: (filters?: Partial<User>) => {
    let users = mockDB.users;
    if (filters) {
      users = users.filter(user => 
        Object.entries(filters).every(([key, value]) => {
          const userValue = (user as any)[key];
          return userValue === value;
        })
      );
    }
    return users;
  },

  getUserById: (id: string) => {
    return mockDB.users.find(user => user.id === id);
  },

  createUser: (userData: Partial<User>) => {
    const newUser = {
      id: generateId(),
      tenantId: userData.tenantId || 'tenant-1',
      email: userData.email || 'user@example.com',
      username: userData.username || 'user',
      firstName: userData.firstName || 'New',
      lastName: userData.lastName || 'User',
      displayName: userData.displayName || 'New User',
      status: userData.status || 'active',
      role: userData.role || 'user',
      permissions: userData.permissions || [],
      groups: userData.groups || [],
      profile: userData.profile || {
        timezone: 'UTC',
        locale: 'en-US'
      },
      preferences: userData.preferences || {
        theme: 'light',
        language: 'en',
        dateFormat: 'YYYY-MM-DD',
        timeFormat: '24h',
        currency: 'USD',
        numberFormat: 'en-US',
        emailNotifications: {
          enabled: true,
          types: [],
          doNotDisturb: false
        },
        pushNotifications: {
          enabled: true,
          types: [],
          doNotDisturb: false
        },
        inAppNotifications: {
          enabled: true,
          types: [],
          doNotDisturb: false
        },
        dashboardLayout: {
          type: 'grid',
          widgets: [],
          defaultWidgets: []
        },
        sidebarCollapsed: false,
        compactMode: false,
        autoSave: true,
        keyboardShortcuts: true
      },
      settings: userData.settings || {
        security: {
          twoFactorAuth: {
            enabled: false,
            method: 'totp',
            backupCodes: []
          },
          sessions: {
            maxSessions: 5,
            sessionTimeout: 30,
            rememberMeDuration: 30,
            forceLogoutOnPasswordChange: true,
            forceLogoutOnSuspiciousActivity: true
          },
          password: {
            expirationDays: 90,
            requireChangeOnNextLogin: false,
            historyCount: 5,
            preventCommonPasswords: true
          },
          loginHistory: true,
          deviceManagement: true
        },
        privacy: {
          profileVisibility: 'private',
          activityVisibility: 'private',
          dataSharing: false,
          analyticsTracking: true,
          marketingEmails: false,
          thirdPartyIntegrations: false
        },
        integrations: {
          oauthConnections: [],
          apiKeys: [],
          webhookSubscriptions: [],
          externalAccounts: []
        },
        api: {
          rateLimit: {
            requestsPerMinute: 100,
            requestsPerHour: 1000,
            requestsPerDay: 10000,
            burstLimit: 50
          },
          versioning: {
            defaultVersion: 'v1',
            supportedVersions: ['v1'],
            deprecatedVersions: [],
            deprecationNoticeDays: 30
          },
          documentation: {
            enabled: true,
            theme: 'light',
            interactive: true
          }
        }
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: userData.metadata || {}
    } as User;
    mockDB.users.push(newUser);
    return newUser;
  },

  updateUser: (id: string, updates: Partial<User>) => {
    const userIndex = mockDB.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    mockDB.users[userIndex] = {
      ...mockDB.users[userIndex],
      ...updates,
      updatedAt: new Date()
    } as User;
    return mockDB.users[userIndex];
  },

  deleteUser: (id: string) => {
    const userIndex = mockDB.users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
    
    mockDB.users.splice(userIndex, 1);
    return true;
  },

  // Tenant operations
  getTenants: (filters?: any) => {
    let tenants = mockDB.tenants;
    if (filters) {
      tenants = tenants.filter(tenant => 
        Object.entries(filters).every(([key, value]) => 
          tenant[key as keyof typeof tenant] === value
        )
      );
    }
    return tenants;
  },

  getTenantById: (id: string) => {
    return mockDB.tenants.find(tenant => tenant.id === id);
  }
};