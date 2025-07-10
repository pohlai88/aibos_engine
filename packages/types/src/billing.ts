/**
 * Billing System Types
 * Defines the interfaces for billing, subscription, and payment management in AIBOS Engine
 */

export interface BillingConfig {
  /** Payment provider configuration */
  paymentProvider: PaymentProviderConfig;
  /** Subscription configuration */
  subscription: SubscriptionConfig;
  /** Invoice configuration */
  invoice: InvoiceConfig;
  /** Tax configuration */
  tax: TaxConfig;
  /** Usage tracking configuration */
  usage: UsageConfig;
}

export interface PaymentProviderConfig {
  /** Primary payment provider */
  primary: PaymentProvider;
  /** Fallback payment providers */
  fallbacks: PaymentProvider[];
  /** Webhook configuration */
  webhooks: WebhookConfig[];
  /** Retry configuration */
  retry: RetryConfig;
}

export interface PaymentProvider {
  /** Provider name */
  name: 'stripe' | 'paypal' | 'square' | 'custom';
  /** Provider configuration */
  config: Record<string, any>;
  /** Whether provider is enabled */
  enabled: boolean;
  /** Provider priority */
  priority: number;
}

export interface WebhookConfig {
  /** Webhook endpoint */
  endpoint: string;
  /** Webhook secret */
  secret: string;
  /** Events to listen for */
  events: string[];
  /** Whether webhook is enabled */
  enabled: boolean;
}

export interface RetryConfig {
  /** Maximum retries */
  maxRetries: number;
  /** Retry delay in milliseconds */
  delay: number;
  /** Backoff multiplier */
  backoffMultiplier: number;
}

export interface SubscriptionConfig {
  /** Trial period in days */
  trialPeriod: number;
  /** Grace period in days */
  gracePeriod: number;
  /** Dunning management */
  dunning: DunningConfig;
  /** Proration settings */
  proration: ProrationConfig;
}

export interface DunningConfig {
  /** Whether dunning is enabled */
  enabled: boolean;
  /** Dunning schedule */
  schedule: DunningSchedule[];
  /** Maximum dunning attempts */
  maxAttempts: number;
  /** Dunning actions */
  actions: DunningAction[];
}

export interface DunningSchedule {
  /** Days after due date */
  daysAfterDue: number;
  /** Action to take */
  action: 'email' | 'sms' | 'call' | 'suspend' | 'cancel';
  /** Template to use */
  template?: string;
}

export interface DunningAction {
  /** Action type */
  type: 'email' | 'sms' | 'call' | 'suspend' | 'cancel';
  /** Action configuration */
  config: Record<string, any>;
}

export interface ProrationConfig {
  /** Whether proration is enabled */
  enabled: boolean;
  /** Proration method */
  method: 'time' | 'usage' | 'custom';
  /** Proration precision */
  precision: number;
}

export interface InvoiceConfig {
  /** Invoice numbering */
  numbering: InvoiceNumbering;
  /** Invoice templates */
  templates: InvoiceTemplate[];
  /** Payment terms */
  paymentTerms: PaymentTerm[];
  /** Late fees */
  lateFees: LateFeeConfig;
}

export interface InvoiceNumbering {
  /** Numbering format */
  format: string;
  /** Starting number */
  startNumber: number;
  /** Prefix */
  prefix: string;
  /** Suffix */
  suffix: string;
  /** Whether to reset yearly */
  resetYearly: boolean;
}

export interface InvoiceTemplate {
  /** Template ID */
  id: string;
  /** Template name */
  name: string;
  /** Template type */
  type: 'html' | 'pdf' | 'email';
  /** Template content */
  content: string;
  /** Template variables */
  variables: string[];
  /** Whether template is default */
  default: boolean;
}

export interface PaymentTerm {
  /** Term ID */
  id: string;
  /** Term name */
  name: string;
  /** Days to pay */
  days: number;
  /** Discount percentage */
  discountPercentage?: number;
  /** Whether term is default */
  default: boolean;
}

export interface LateFeeConfig {
  /** Whether late fees are enabled */
  enabled: boolean;
  /** Late fee percentage */
  percentage: number;
  /** Late fee minimum amount */
  minimumAmount: number;
  /** Late fee maximum amount */
  maximumAmount: number;
  /** Grace period in days */
  gracePeriod: number;
}

export interface TaxConfig {
  /** Tax calculation method */
  method: 'automatic' | 'manual' | 'hybrid';
  /** Tax rates */
  rates: TaxRate[];
  /** Tax exemptions */
  exemptions: TaxExemption[];
  /** Tax reporting */
  reporting: TaxReporting;
}

export interface TaxRate {
  /** Rate ID */
  id: string;
  /** Rate name */
  name: string;
  /** Rate percentage */
  percentage: number;
  /** Applicable countries */
  countries: string[];
  /** Applicable states/provinces */
  states?: string[];
  /** Whether rate is active */
  active: boolean;
}

export interface TaxExemption {
  /** Exemption ID */
  id: string;
  /** Exemption type */
  type: 'product' | 'customer' | 'region';
  /** Exemption reason */
  reason: string;
  /** Exemption configuration */
  config: Record<string, any>;
}

export interface TaxReporting {
  /** Whether tax reporting is enabled */
  enabled: boolean;
  /** Reporting frequency */
  frequency: 'monthly' | 'quarterly' | 'yearly';
  /** Reporting format */
  format: 'csv' | 'json' | 'xml';
  /** Auto-submission */
  autoSubmit: boolean;
}

export interface UsageConfig {
  /** Usage tracking */
  tracking: UsageTracking;
  /** Usage billing */
  billing: UsageBilling;
  /** Usage limits */
  limits: UsageLimits;
}

export interface UsageTracking {
  /** Whether usage tracking is enabled */
  enabled: boolean;
  /** Tracking granularity */
  granularity: 'minute' | 'hour' | 'day' | 'month';
  /** Data retention in days */
  retentionDays: number;
  /** Real-time tracking */
  realTime: boolean;
}

export interface UsageBilling {
  /** Billing method */
  method: 'tiered' | 'per_unit' | 'flat_rate';
  /** Billing frequency */
  frequency: 'hourly' | 'daily' | 'monthly';
  /** Billing precision */
  precision: number;
  /** Rounding method */
  rounding: 'up' | 'down' | 'nearest';
}

export interface UsageLimits {
  /** Whether limits are enforced */
  enforced: boolean;
  /** Limit actions */
  actions: LimitAction[];
  /** Limit notifications */
  notifications: LimitNotification[];
}

export interface LimitAction {
  /** Action type */
  type: 'warn' | 'throttle' | 'block' | 'bill_overage';
  /** Threshold percentage */
  threshold: number;
  /** Action configuration */
  config: Record<string, any>;
}

export interface LimitNotification {
  /** Notification type */
  type: 'email' | 'sms' | 'in_app';
  /** Threshold percentage */
  threshold: number;
  /** Notification template */
  template: string;
}

export interface Subscription {
  /** Subscription ID */
  id: string;
  /** Tenant ID */
  tenantId: string;
  /** Plan ID */
  planId: string;
  /** Subscription status */
  status: SubscriptionStatus;
  /** Current period start */
  currentPeriodStart: Date;
  /** Current period end */
  currentPeriodEnd: Date;
  /** Trial start */
  trialStart?: Date;
  /** Trial end */
  trialEnd?: Date;
  /** Cancellation date */
  canceledAt?: Date;
  /** Cancellation reason */
  cancelReason?: string;
  /** Subscription metadata */
  metadata: Record<string, any>;
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  PAST_DUE = 'past_due',
  UNPAID = 'unpaid',
  TRIAL = 'trial',
  PAUSED = 'paused'
}

export interface Invoice {
  /** Invoice ID */
  id: string;
  /** Tenant ID */
  tenantId: string;
  /** Invoice number */
  number: string;
  /** Invoice status */
  status: InvoiceStatus;
  /** Invoice amount */
  amount: number;
  /** Invoice currency */
  currency: string;
  /** Invoice due date */
  dueDate: Date;
  /** Invoice paid date */
  paidDate?: Date;
  /** Invoice items */
  items: InvoiceItem[];
  /** Invoice metadata */
  metadata: Record<string, any>;
}

export enum InvoiceStatus {
  DRAFT = 'draft',
  OPEN = 'open',
  PAID = 'paid',
  VOID = 'void',
  UNCOLLECTIBLE = 'uncollectible'
}

export interface InvoiceItem {
  /** Item ID */
  id: string;
  /** Item description */
  description: string;
  /** Item quantity */
  quantity: number;
  /** Item unit price */
  unitPrice: number;
  /** Item amount */
  amount: number;
  /** Item tax amount */
  taxAmount: number;
  /** Item metadata */
  metadata: Record<string, any>;
}

export interface Payment {
  /** Payment ID */
  id: string;
  /** Invoice ID */
  invoiceId: string;
  /** Payment amount */
  amount: number;
  /** Payment currency */
  currency: string;
  /** Payment status */
  status: PaymentStatus;
  /** Payment method */
  method: PaymentMethod;
  /** Payment date */
  date: Date;
  /** Payment metadata */
  metadata: Record<string, any>;
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  CANCELED = 'canceled',
  REFUNDED = 'refunded'
}

export interface PaymentMethod {
  /** Method type */
  type: 'credit_card' | 'bank_transfer' | 'paypal' | 'stripe';
  /** Method details */
  details: Record<string, any>;
  /** Method metadata */
  metadata: Record<string, any>;
}

export interface Usage {
  /** Usage ID */
  id: string;
  /** Tenant ID */
  tenantId: string;
  /** Usage metric */
  metric: string;
  /** Usage value */
  value: number;
  /** Usage unit */
  unit: string;
  /** Usage period start */
  periodStart: Date;
  /** Usage period end */
  periodEnd: Date;
  /** Usage metadata */
  metadata: Record<string, any>;
}

export interface BillingEvent {
  /** Event ID */
  id: string;
  /** Event type */
  type: BillingEventType;
  /** Event data */
  data: Record<string, any>;
  /** Event timestamp */
  timestamp: Date;
  /** Event metadata */
  metadata: Record<string, any>;
}

export enum BillingEventType {
  SUBSCRIPTION_CREATED = 'subscription_created',
  SUBSCRIPTION_UPDATED = 'subscription_updated',
  SUBSCRIPTION_CANCELED = 'subscription_canceled',
  INVOICE_CREATED = 'invoice_created',
  INVOICE_PAID = 'invoice_paid',
  INVOICE_FAILED = 'invoice_failed',
  PAYMENT_SUCCEEDED = 'payment_succeeded',
  PAYMENT_FAILED = 'payment_failed',
  USAGE_RECORDED = 'usage_recorded',
  LIMIT_EXCEEDED = 'limit_exceeded'
} 