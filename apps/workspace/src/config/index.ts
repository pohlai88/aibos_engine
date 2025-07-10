// AI-BOS Workspace Configuration

export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: 30000,
    retryAttempts: 3,
  },

  // Development Settings
  dev: {
    mode: import.meta.env.VITE_DEV_MODE === 'true',
    mockData: import.meta.env.VITE_MOCK_DATA === 'true',
  },

  // Feature Flags
  features: {
    auth: import.meta.env.VITE_ENABLE_AUTH === 'true',
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    notifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS !== 'false',
  },

  // Module Store Configuration
  moduleStore: {
    url: import.meta.env.VITE_MODULE_STORE_URL || 'http://localhost:3000/api/modules/store',
    installUrl: import.meta.env.VITE_MODULE_INSTALL_URL || 'http://localhost:3000/api/modules/install',
  },

  // Tenant Configuration
  tenant: {
    defaultId: import.meta.env.VITE_DEFAULT_TENANT_ID || 'tenant-1',
    defaultUserId: import.meta.env.VITE_DEFAULT_USER_ID || 'user-1',
  },

  // UI Configuration
  ui: {
    theme: import.meta.env.VITE_THEME || 'light',
    language: import.meta.env.VITE_LANGUAGE || 'en',
    sidebarCollapsed: false,
    compactMode: false,
  },

  // Cache Configuration
  cache: {
    enabled: true,
    defaultTTL: 5 * 60 * 1000, // 5 minutes
    maxSize: 50, // Maximum number of cached items
  },

  // Error Handling
  errors: {
    showDetails: import.meta.env.VITE_DEV_MODE === 'true',
    logToConsole: true,
    retryOnError: true,
  },
};

// Helper functions
export const isDevelopment = () => config.dev.mode;
export const isProduction = () => !config.dev.mode;
export const useMockData = () => config.dev.mockData;
export const isFeatureEnabled = (feature: keyof typeof config.features) => config.features[feature]; 