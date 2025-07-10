export interface ModuleStoreItem {
  id: string;
  name: string;
  description: string;
  version: string;
  category: string;
  icon: string;
  price: number;
  rating: number;
  downloads: number;
  author: string;
  lastUpdated: string;
  tags: string[];
  features: string[];
  requirements: ModuleRequirements;
  screenshots: string[];
  documentation: string;
  demoUrl?: string;
  sourceCode?: string;
  license: string;
  support: ModuleSupport;
  integrations: ModuleIntegration[];
  configuration: ModuleConfiguration;
  deployment: ModuleDeployment;
  analytics: ModuleAnalytics;
}

export interface ModuleRequirements {
  minVersion: string;
  dependencies: string[];
  systemRequirements: {
    memory: string;
    storage: string;
    cpu: string;
  };
  databaseRequirements?: {
    type: 'postgresql' | 'mysql' | 'mongodb';
    version: string;
    schemas: string[];
  };
}

export interface ModuleSupport {
  email: string;
  documentation: string;
  community: string;
  responseTime: string;
  sla: string;
}

export interface ModuleIntegration {
  type: 'api' | 'webhook' | 'database' | 'file' | 'oauth';
  name: string;
  description: string;
  required: boolean;
  configSchema: Record<string, any>;
}

export interface ModuleConfiguration {
  schema: Record<string, any>;
  defaults: Record<string, any>;
  validation: Record<string, any>;
  ui: ModuleConfigUI;
}

export interface ModuleConfigUI {
  sections: ModuleConfigSection[];
  layout: 'tabs' | 'accordion' | 'single';
}

export interface ModuleConfigSection {
  id: string;
  title: string;
  description: string;
  fields: ModuleConfigField[];
  required: boolean;
}

export interface ModuleConfigField {
  name: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'multiselect' | 'textarea' | 'file' | 'json';
  label: string;
  description: string;
  required: boolean;
  default?: any;
  options?: Array<{ value: string; label: string }>;
  validation?: Record<string, any>;
}

export interface ModuleDeployment {
  type: 'container' | 'serverless' | 'static' | 'hybrid';
  resources: {
    cpu: string;
    memory: string;
    storage: string;
  };
  environment: Record<string, string>;
  healthCheck: {
    endpoint: string;
    interval: number;
    timeout: number;
  };
}

export interface ModuleAnalytics {
  metrics: string[];
  dashboards: ModuleDashboard[];
  reports: ModuleReport[];
}

export interface ModuleDashboard {
  id: string;
  name: string;
  description: string;
  widgets: ModuleWidget[];
}

export interface ModuleWidget {
  id: string;
  type: 'chart' | 'metric' | 'table' | 'list';
  title: string;
  dataSource: string;
  config: Record<string, any>;
}

export interface ModuleReport {
  id: string;
  name: string;
  description: string;
  schedule: string;
  format: 'pdf' | 'csv' | 'json';
  recipients: string[];
}

export interface InstalledModule {
  id: string;
  name: string;
  version: string;
  status: 'active' | 'inactive' | 'error' | 'updating';
  installedAt: string;
  lastUpdated: string;
  configuration: Record<string, any>;
  health: ModuleHealth;
  permissions: ModulePermissions;
  usage: ModuleUsage;
}

export interface ModuleHealth {
  status: 'healthy' | 'warning' | 'error';
  lastChecked: string;
  uptime: number;
  responseTime: number;
  errorRate: number;
  issues: ModuleIssue[];
}

export interface ModuleIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface ModulePermissions {
  roles: string[];
  capabilities: string[];
  dataAccess: {
    read: string[];
    write: string[];
    delete: string[];
  };
}

export interface ModuleUsage {
  activeUsers: number;
  apiCalls: number;
  storageUsed: string;
  lastActivity: string;
  trends: {
    period: string;
    data: Array<{ date: string; value: number }>;
  };
}

export interface ModuleConfig {
  moduleId: string;
  tenantId: string;
  configuration: Record<string, any>;
  lastModified: string;
  version: number;
}

// Enterprise Module Types
export interface EnterpriseModule extends ModuleStoreItem {
  enterprise: {
    tier: 'basic' | 'professional' | 'enterprise';
    features: string[];
    limits: Record<string, number>;
    sla: {
      uptime: number;
      responseTime: number;
      support: string;
    };
    compliance: string[];
    security: ModuleSecurity;
  };
}

export interface ModuleSecurity {
  encryption: string[];
  authentication: string[];
  authorization: string[];
  audit: boolean;
  compliance: string[];
}

// Module Installation Types
export interface ModuleInstallationRequest {
  moduleId: string;
  tenantId: string;
  configuration: Record<string, any>;
  options: {
    autoConfigure: boolean;
    createSampleData: boolean;
    enableAnalytics: boolean;
  };
}

export interface ModuleInstallationResponse {
  success: boolean;
  moduleId: string;
  installationId: string;
  status: 'installing' | 'configured' | 'ready' | 'failed';
  message: string;
  nextSteps: string[];
  configuration: Record<string, any>;
}

// Module Marketplace Types
export interface ModuleCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
  featured: boolean;
}

export interface ModuleReview {
  id: string;
  moduleId: string;
  userId: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
}

export interface ModulePricing {
  model: 'free' | 'subscription' | 'usage' | 'one-time';
  tiers: ModulePricingTier[];
  custom: boolean;
}

export interface ModulePricingTier {
  name: string;
  price: number;
  period: 'month' | 'year' | 'one-time';
  features: string[];
  limits: Record<string, number>;
  popular: boolean;
} 