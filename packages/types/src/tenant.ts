import type { ValidationRule } from './events';
/**
 * Tenant System Types
 * Defines the interfaces for multi-tenant architecture in AIBOS Engine
 */

export interface Tenant {
  /** Unique tenant identifier */
  id: string;
  /** Tenant name */
  name: string;
  /** Tenant slug for URLs */
  slug: string;
  /** Tenant description */
  description?: string;
  /** Tenant status */
  status: TenantStatus;
  /** Tenant type */
  type: TenantType;
  /** Subscription plan */
  plan: SubscriptionPlan;
  /** Tenant configuration */
  config: TenantConfig;
  /** Created date */
  createdAt: Date;
  /** Updated date */
  updatedAt: Date;
  /** Subscription start date */
  subscriptionStartDate: Date;
  /** Subscription end date */
  subscriptionEndDate?: Date;
  /** Billing information */
  billing: BillingInfo;
  /** Usage limits */
  limits: TenantLimits;
  /** Current usage */
  usage: TenantUsage;
  /** Custom domain */
  customDomain?: string;
  /** Timezone */
  timezone: string;
  /** Locale */
  locale: string;
  /** Features enabled for this tenant */
  features: string[];
  /** Modules installed for this tenant */
  installedModules: string[];
  /** Metadata */
  metadata: Record<string, any>;
}

export enum TenantStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
  PENDING = 'pending',
  TRIAL = 'trial'
}

export enum TenantType {
  INDIVIDUAL = 'individual',
  BUSINESS = 'business',
  ENTERPRISE = 'enterprise',
  PARTNER = 'partner'
}

export interface SubscriptionPlan {
  /** Plan ID */
  id: string;
  /** Plan name */
  name: string;
  /** Plan description */
  description: string;
  /** Monthly price in cents */
  monthlyPrice: number;
  /** Yearly price in cents */
  yearlyPrice: number;
  /** Currency */
  currency: string;
  /** Billing interval */
  interval: 'monthly' | 'yearly';
  /** Plan features */
  features: PlanFeature[];
  /** Usage limits */
  limits: PlanLimits;
  /** Whether plan is active */
  active: boolean;
  /** Whether plan is custom */
  custom: boolean;
}

export interface PlanFeature {
  /** Feature ID */
  id: string;
  /** Feature name */
  name: string;
  /** Feature description */
  description: string;
  /** Whether feature is included */
  included: boolean;
  /** Feature limit */
  limit?: number;
  /** Feature unit */
  unit?: string;
}

export interface PlanLimits {
  /** Maximum users */
  maxUsers: number;
  /** Maximum storage in MB */
  maxStorage: number;
  /** Maximum API calls per month */
  maxApiCalls: number;
  /** Maximum modules */
  maxModules: number;
  /** Maximum custom fields */
  maxCustomFields: number;
  /** Maximum integrations */
  maxIntegrations: number;
  /** Data retention days */
  dataRetentionDays: number;
  /** Backup frequency */
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  /** Support level */
  supportLevel: 'basic' | 'priority' | 'dedicated';
}

export interface TenantConfig {
  /** Branding configuration */
  branding: BrandingConfig;
  /** Security configuration */
  security: SecurityConfig;
  /** Integration configuration */
  integrations: IntegrationConfig;
  /** Notification configuration */
  notifications: NotificationConfig;
  /** Workflow configuration */
  workflows: WorkflowConfig;
  /** Custom fields */
  customFields: CustomField[];
  /** API configuration */
  api: ApiConfig;
}

export interface BrandingConfig {
  /** Company name */
  companyName: string;
  /** Logo URL */
  logoUrl?: string;
  /** Favicon URL */
  faviconUrl?: string;
  /** Primary color */
  primaryColor: string;
  /** Secondary color */
  secondaryColor: string;
  /** Custom CSS */
  customCss?: string;
  /** Custom JavaScript */
  customJs?: string;
}

export interface SecurityConfig {
  /** Password policy */
  passwordPolicy: PasswordPolicy;
  /** Session timeout in minutes */
  sessionTimeout: number;
  /** MFA requirement */
  mfaRequired: boolean;
  /** IP whitelist */
  ipWhitelist?: string[];
  /** Audit logging */
  auditLogging: boolean;
  /** Data encryption */
  dataEncryption: boolean;
  /** Backup encryption */
  backupEncryption: boolean;
}

export interface PasswordPolicy {
  /** Minimum length */
  minLength: number;
  /** Require uppercase */
  requireUppercase: boolean;
  /** Require lowercase */
  requireLowercase: boolean;
  /** Require numbers */
  requireNumbers: boolean;
  /** Require special characters */
  requireSpecialChars: boolean;
  /** Maximum age in days */
  maxAge: number;
  /** Prevent reuse of last N passwords */
  preventReuse: number;
}

export interface IntegrationConfig {
  /** SSO configuration */
  sso?: SSOConfig;
  /** LDAP configuration */
  ldap?: LDAPConfig;
  /** OAuth providers */
  oauth: OAuthProvider[];
  /** Webhook endpoints */
  webhooks: WebhookConfig[];
}

export interface SSOConfig {
  /** SSO provider */
  provider: 'saml' | 'oidc';
  /** SSO URL */
  ssoUrl: string;
  /** Entity ID */
  entityId: string;
  /** Certificate */
  certificate: string;
  /** Whether SSO is enabled */
  enabled: boolean;
}

export interface LDAPConfig {
  /** LDAP server URL */
  serverUrl: string;
  /** Bind DN */
  bindDn: string;
  /** Bind password */
  bindPassword: string;
  /** Search base */
  searchBase: string;
  /** User search filter */
  userSearchFilter: string;
  /** Whether LDAP is enabled */
  enabled: boolean;
}

export interface OAuthProvider {
  /** Provider name */
  name: string;
  /** Client ID */
  clientId: string;
  /** Client secret */
  clientSecret: string;
  /** Authorization URL */
  authUrl: string;
  /** Token URL */
  tokenUrl: string;
  /** User info URL */
  userInfoUrl: string;
  /** Scopes */
  scopes: string[];
  /** Whether provider is enabled */
  enabled: boolean;
}

export interface WebhookConfig {
  /** Webhook name */
  name: string;
  /** Webhook URL */
  url: string;
  /** HTTP method */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** Headers */
  headers: Record<string, string>;
  /** Events */
  events: string[];
  /** Whether webhook is enabled */
  enabled: boolean;
  /** Retry configuration */
  retry: RetryConfig;
}

export interface RetryConfig {
  /** Maximum retries */
  maxRetries: number;
  /** Retry delay in seconds */
  retryDelay: number;
  /** Backoff multiplier */
  backoffMultiplier: number;
}

export interface NotificationConfig {
  /** Email notifications */
  email: EmailConfig;
  /** SMS notifications */
  sms: SMSConfig;
  /** Push notifications */
  push: PushConfig;
  /** In-app notifications */
  inApp: InAppConfig;
}

export interface EmailConfig {
  /** SMTP configuration */
  smtp: SMTPConfig;
  /** From email */
  fromEmail: string;
  /** From name */
  fromName: string;
  /** Reply-to email */
  replyToEmail?: string;
  /** Whether email is enabled */
  enabled: boolean;
}

export interface SMTPConfig {
  /** SMTP host */
  host: string;
  /** SMTP port */
  port: number;
  /** Username */
  username: string;
  /** Password */
  password: string;
  /** Use TLS */
  useTls: boolean;
  /** Use SSL */
  useSsl: boolean;
}

export interface SMSConfig {
  /** SMS provider */
  provider: 'twilio' | 'aws-sns' | 'custom';
  /** Provider configuration */
  config: Record<string, any>;
  /** Whether SMS is enabled */
  enabled: boolean;
}

export interface PushConfig {
  /** Push provider */
  provider: 'firebase' | 'aws-sns' | 'custom';
  /** Provider configuration */
  config: Record<string, any>;
  /** Whether push is enabled */
  enabled: boolean;
}

export interface InAppConfig {
  /** Whether in-app notifications are enabled */
  enabled: boolean;
  /** Notification retention days */
  retentionDays: number;
  /** Maximum notifications per user */
  maxNotifications: number;
}

export interface WorkflowConfig {
  /** Workflow engine */
  engine: 'custom' | 'temporal' | 'zeebe';
  /** Engine configuration */
  config: Record<string, any>;
  /** Whether workflows are enabled */
  enabled: boolean;
}

export interface CustomField {
  /** Field ID */
  id: string;
  /** Field name */
  name: string;
  /** Field type */
  type: 'text' | 'number' | 'boolean' | 'date' | 'select' | 'multiselect' | 'file';
  /** Field label */
  label: string;
  /** Field description */
  description?: string;
  /** Whether field is required */
  required: boolean;
  /** Default value */
  defaultValue?: any;
  /** Validation rules */
  validation?: ValidationRule[];
  /** Options (for select/multiselect) */
  options?: CustomFieldOption[];
  /** Entity type this field applies to */
  entityType: string;
  /** Whether field is active */
  active: boolean;
}

export interface CustomFieldOption {
  /** Option value */
  value: string;
  /** Option label */
  label: string;
  /** Option description */
  description?: string;
}

export interface ApiConfig {
  /** API rate limiting */
  rateLimit: RateLimitConfig;
  /** API authentication */
  authentication: ApiAuthConfig;
  /** API documentation */
  documentation: ApiDocConfig;
}

export interface RateLimitConfig {
  /** Requests per minute */
  requestsPerMinute: number;
  /** Requests per hour */
  requestsPerHour: number;
  /** Requests per day */
  requestsPerDay: number;
  /** Burst limit */
  burstLimit: number;
}

export interface ApiAuthConfig {
  /** API key authentication */
  apiKey: boolean;
  /** OAuth authentication */
  oauth: boolean;
  /** JWT authentication */
  jwt: boolean;
  /** API key expiration days */
  apiKeyExpirationDays: number;
}

export interface ApiDocConfig {
  /** Whether API docs are enabled */
  enabled: boolean;
  /** API docs URL */
  url?: string;
  /** API docs theme */
  theme: 'light' | 'dark';
}

export interface BillingInfo {
  /** Billing contact */
  contact: BillingContact;
  /** Payment method */
  paymentMethod: PaymentMethod;
  /** Billing address */
  address: BillingAddress;
  /** Tax information */
  tax: TaxInfo;
  /** Invoice settings */
  invoice: InvoiceSettings;
}

export interface BillingContact {
  /** Contact name */
  name: string;
  /** Contact email */
  email: string;
  /** Contact phone */
  phone?: string;
}

export interface PaymentMethod {
  /** Payment method type */
  type: 'credit_card' | 'bank_transfer' | 'paypal' | 'stripe';
  /** Payment method details */
  details: Record<string, any>;
  /** Whether payment method is default */
  isDefault: boolean;
}

export interface BillingAddress {
  /** Street address */
  street: string;
  /** City */
  city: string;
  /** State/province */
  state: string;
  /** Postal code */
  postalCode: string;
  /** Country */
  country: string;
}

export interface TaxInfo {
  /** Tax ID */
  taxId?: string;
  /** Tax exempt */
  taxExempt: boolean;
  /** Tax rate */
  taxRate: number;
}

export interface InvoiceSettings {
  /** Invoice prefix */
  prefix: string;
  /** Invoice numbering */
  numbering: 'sequential' | 'date-based';
  /** Payment terms */
  paymentTerms: number;
  /** Late fee percentage */
  lateFeePercentage: number;
  /** Auto-send invoices */
  autoSend: boolean;
}

export interface TenantLimits {
  /** Maximum users */
  maxUsers: number;
  /** Maximum storage in MB */
  maxStorage: number;
  /** Maximum API calls per month */
  maxApiCalls: number;
  /** Maximum modules */
  maxModules: number;
  /** Maximum custom fields */
  maxCustomFields: number;
  /** Maximum integrations */
  maxIntegrations: number;
  /** Data retention days */
  dataRetentionDays: number;
  /** Backup frequency */
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  /** Support level */
  supportLevel: 'basic' | 'priority' | 'dedicated';
}

export interface TenantUsage {
  /** Current user count */
  userCount: number;
  /** Current storage usage in MB */
  storageUsage: number;
  /** Current API calls this month */
  apiCallsThisMonth: number;
  /** Current module count */
  moduleCount: number;
  /** Current custom field count */
  customFieldCount: number;
  /** Current integration count */
  integrationCount: number;
  /** Last backup date */
  lastBackupDate?: Date;
  /** Next backup date */
  nextBackupDate?: Date;
}

export interface TenantStats {
  /** Tenant ID */
  tenantId: string;
  /** Date */
  date: Date;
  /** Active users */
  activeUsers: number;
  /** API requests */
  apiRequests: number;
  /** Storage usage in MB */
  storageUsage: number;
  /** Error count */
  errorCount: number;
  /** Response time in milliseconds */
  responseTime: number;
  /** Revenue in cents */
  revenue: number;
} 