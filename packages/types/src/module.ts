/**
 * Module System Types
 * Defines the interfaces for plug-and-play modules in AIBOS Engine
 */

import type { CheckConstraint } from './database';
import type { ValidationRule } from './events';

export abstract class ModuleBase {
  abstract initialize(): Promise<void>;
  abstract onInstall(): Promise<void>;
  abstract onUninstall(): Promise<void>;
  abstract onEnable(): Promise<void>;
  abstract onDisable(): Promise<void>;
  abstract getStatus(): Promise<ModuleStatus>;
  abstract getConfig(): Promise<Record<string, any>>;
  abstract updateConfig(config: Record<string, any>): Promise<void>;
  abstract getMetrics(): Promise<ModuleMetrics>;
}

export interface ModuleManifest {
  /** Unique identifier for the module */
  moduleId: string;
  /** Semantic version of the module */
  version: string;
  /** Human-readable name */
  name: string;
  /** Module description */
  description: string;
  /** Author information */
  author: {
    name: string;
    email: string;
    website?: string;
  };
  /** License information */
  license: string;
  /** Module category */
  category: ModuleCategory;
  /** Tags for search and categorization */
  tags: string[];
  /** Dependencies on other modules or packages */
  dependencies: ModuleDependency[];
  /** Required permissions */
  permissions: Permission[];
  /** Database schema definition */
  dataSchema: DataSchema;
  /** API endpoints */
  entrypoints: ModuleEntrypoints;
  /** UI components and routes */
  ui: UIDefinition;
  /** Configuration schema */
  configSchema?: ConfigSchema;
  /** Minimum AIBOS Engine version required */
  minEngineVersion: string;
  /** Maximum AIBOS Engine version supported */
  maxEngineVersion?: string;
  /** Module icon (base64 or URL) */
  icon?: string;
  /** Screenshots for the module store */
  screenshots?: string[];
  /** Documentation URL */
  documentation?: string;
  /** Support URL */
  support?: string;
  /** Pricing information */
  pricing?: PricingInfo;
}

export interface ModuleDependency {
  /** Module or package name */
  name: string;
  /** Version constraint (e.g., ">=2.0.0", "~1.5.0") */
  version: string;
  /** Whether this is a peer dependency */
  peer?: boolean;
}

export interface Permission {
  /** Permission identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** Permission description */
  description: string;
  /** Resource type this permission applies to */
  resource: string;
  /** Actions allowed (read, write, delete, etc.) */
  actions: string[];
  /** Whether this is a system permission */
  system?: boolean;
}

export interface DataSchema {
  /** Database tables this module creates */
  tables: TableDefinition[];
  /** Database migrations */
  migrations: string;
  /** Foreign key relationships */
  relationships?: Relationship[];
  /** Indexes to create */
  indexes?: IndexDefinition[];
  /** Row-level security policies */
  rlsPolicies?: RLSPolicy[];
}

export interface TableDefinition {
  /** Table name */
  name: string;
  /** Table description */
  description: string;
  /** Column definitions */
  columns: ColumnDefinition[];
  /** Primary key */
  primaryKey: string[];
  /** Unique constraints */
  unique?: string[][];
  /** Check constraints */
  checks?: CheckConstraint[];
}

export interface ColumnDefinition {
  /** Column name */
  name: string;
  /** Data type */
  type: string;
  /** Whether column is nullable */
  nullable?: boolean;
  /** Default value */
  default?: any;
  /** Column description */
  description?: string;
  /** Whether column is encrypted */
  encrypted?: boolean;
  /** Validation rules */
  validation?: ValidationRule[];
}

export interface Relationship {
  /** Relationship name */
  name: string;
  /** Source table */
  fromTable: string;
  /** Source column */
  fromColumn: string;
  /** Target table */
  toTable: string;
  /** Target column */
  toColumn: string;
  /** Relationship type */
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  /** Cascade delete */
  onDelete?: 'cascade' | 'set-null' | 'restrict';
}

export interface IndexDefinition {
  /** Index name */
  name: string;
  /** Table name */
  table: string;
  /** Columns to index */
  columns: string[];
  /** Index type */
  type: 'btree' | 'hash' | 'gin' | 'gist';
  /** Whether index is unique */
  unique?: boolean;
}

export interface RLSPolicy {
  /** Policy name */
  name: string;
  /** Table name */
  table: string;
  /** Policy type */
  type: 'select' | 'insert' | 'update' | 'delete';
  /** Policy condition */
  condition: string;
  /** Whether policy is enabled by default */
  enabled?: boolean;
}

export interface ModuleEntrypoints {
  /** API base path */
  api: string;
  /** UI base path */
  ui: string;
  /** Webhook endpoints */
  webhooks?: WebhookEndpoint[];
}

export interface WebhookEndpoint {
  /** Endpoint path */
  path: string;
  /** HTTP method */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** Event types this webhook handles */
  events: string[];
  /** Authentication method */
  auth?: 'none' | 'token' | 'signature';
}

export interface UIDefinition {
  /** Main application component */
  app: string;
  /** Navigation items */
  navigation?: NavigationItem[];
  /** Widgets for dashboard */
  widgets?: WidgetDefinition[];
  /** Settings pages */
  settings?: SettingsPage[];
}

export interface NavigationItem {
  /** Navigation label */
  label: string;
  /** Navigation path */
  path: string;
  /** Icon name */
  icon?: string;
  /** Child navigation items */
  children?: NavigationItem[];
  /** Required permissions */
  permissions?: string[];
}

export interface WidgetDefinition {
  /** Widget ID */
  id: string;
  /** Widget name */
  name: string;
  /** Widget description */
  description: string;
  /** Widget component */
  component: string;
  /** Default size */
  size: 'small' | 'medium' | 'large';
  /** Refresh interval in seconds */
  refreshInterval?: number;
  /** Required permissions */
  permissions?: string[];
}

export interface SettingsPage {
  /** Page ID */
  id: string;
  /** Page name */
  name: string;
  /** Page description */
  description: string;
  /** Settings component */
  component: string;
  /** Required permissions */
  permissions?: string[];
}

export interface ConfigSchema {
  /** Configuration properties */
  properties: Record<string, ConfigProperty>;
  /** Required properties */
  required?: string[];
  /** Additional properties allowed */
  additionalProperties?: boolean;
}

export interface ConfigProperty {
  /** Property type */
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  /** Property description */
  description?: string;
  /** Default value */
  default?: any;
  /** Validation rules */
  validation?: ValidationRule[];
  /** Enum values (for string type) */
  enum?: any[];
  /** Minimum value (for number type) */
  minimum?: number;
  /** Maximum value (for number type) */
  maximum?: number;
  /** Minimum length (for string/array type) */
  minLength?: number;
  /** Maximum length (for string/array type) */
  maxLength?: number;
}

export interface PricingInfo {
  /** Pricing model */
  model: 'free' | 'one-time' | 'subscription' | 'usage-based';
  /** Price in cents */
  price?: number;
  /** Currency */
  currency?: string;
  /** Billing interval (for subscription) */
  interval?: 'monthly' | 'yearly';
  /** Usage tiers (for usage-based) */
  tiers?: UsageTier[];
  /** Free tier limits */
  freeTier?: {
    /** Maximum users */
    maxUsers?: number;
    /** Maximum storage in MB */
    maxStorage?: number;
    /** Maximum API calls per month */
    maxApiCalls?: number;
  };
}

export interface UsageTier {
  /** Tier name */
  name: string;
  /** Price in cents */
  price: number;
  /** Usage limit */
  limit: number;
  /** Unit (users, storage_mb, api_calls, etc.) */
  unit: string;
}

export enum ModuleCategory {
  FINANCE = 'finance',
  MARKETING = 'marketing',
  SALES = 'sales',
  PROJECT_MANAGEMENT = 'project-management',
  COMMUNICATION = 'communication',
  ANALYTICS = 'analytics',
  INTEGRATION = 'integration',
  SECURITY = 'security',
  UTILITY = 'utility',
  CUSTOM = 'custom'
}

export interface ModuleInterface {
  /** Module manifest */
  manifest: ModuleManifest;
  /** Initialize the module */
  initialize(): Promise<void>;
  /** Install the module */
  onInstall(): Promise<void>;
  /** Uninstall the module */
  onUninstall(): Promise<void>;
  /** Enable the module */
  onEnable(): Promise<void>;
  /** Disable the module */
  onDisable(): Promise<void>;
  /** Get module status */
  getStatus(): Promise<ModuleStatus>;
  /** Get module configuration */
  getConfig(): Promise<Record<string, any>>;
  /** Update module configuration */
  updateConfig(config: Record<string, any>): Promise<void>;
  /** Get module metrics */
  getMetrics(): Promise<ModuleMetrics>;
}

export interface ModuleStatus {
  /** Module ID */
  moduleId: string;
  /** Installation status */
  installed: boolean;
  /** Whether module is enabled */
  enabled: boolean;
  /** Installation date */
  installedAt?: Date;
  /** Last updated date */
  updatedAt?: Date;
  /** Version */
  version: string;
  /** Health status */
  health: 'healthy' | 'warning' | 'error';
  /** Error message if any */
  error?: string;
}

export interface ModuleMetrics {
  /** Module ID */
  moduleId: string;
  /** CPU usage percentage */
  cpuUsage: number;
  /** Memory usage in MB */
  memoryUsage: number;
  /** API request count */
  apiRequests: number;
  /** Database query count */
  dbQueries: number;
  /** Error count */
  errorCount: number;
  /** Response time in milliseconds */
  responseTime: number;
  /** Active users */
  activeUsers: number;
  /** Storage usage in MB */
  storageUsage: number;
}