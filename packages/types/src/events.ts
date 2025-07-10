/**
 * Event System Types
 * Defines the interfaces for event-driven communication in AIBOS Engine
 */

export interface EventBus {
  /** Event bus configuration */
  config: EventBusConfig;
  /** Event handlers */
  handlers: EventHandler[];
  /** Event middleware */
  middleware: EventMiddleware[];
}

export interface EventBusConfig {
  /** Event bus type */
  type: 'nats' | 'redis' | 'kafka' | 'memory';
  /** Event bus configuration */
  config: Record<string, any>;
  /** Event persistence */
  persistence: EventPersistence;
  /** Event routing */
  routing: EventRouting;
  /** Event monitoring */
  monitoring: EventMonitoring;
}

export interface EventPersistence {
  /** Whether events are persisted */
  enabled: boolean;
  /** Persistence storage */
  storage: 'database' | 'file' | 'external';
  /** Retention period in days */
  retentionDays: number;
  /** Compression */
  compression: boolean;
}

export interface EventRouting {
  /** Routing strategy */
  strategy: 'topic' | 'queue' | 'fanout';
  /** Topic patterns */
  patterns: string[];
  /** Queue configuration */
  queues: QueueConfig[];
}

export interface QueueConfig {
  /** Queue name */
  name: string;
  /** Queue type */
  type: 'fifo' | 'priority' | 'dead_letter';
  /** Queue configuration */
  config: Record<string, any>;
}

export interface EventMonitoring {
  /** Whether monitoring is enabled */
  enabled: boolean;
  /** Metrics collection */
  metrics: boolean;
  /** Event tracing */
  tracing: boolean;
  /** Alerting */
  alerting: EventAlerting;
}

export interface EventAlerting {
  /** Whether alerting is enabled */
  enabled: boolean;
  /** Alert thresholds */
  thresholds: AlertThreshold[];
  /** Alert channels */
  channels: AlertChannel[];
}

export interface AlertThreshold {
  /** Threshold type */
  type: 'error_rate' | 'latency' | 'queue_size';
  /** Threshold value */
  value: number;
  /** Time window in seconds */
  window: number;
}

export interface AlertChannel {
  /** Channel type */
  type: 'email' | 'slack' | 'webhook';
  /** Channel configuration */
  config: Record<string, any>;
}

export interface Event {
  /** Event ID */
  id: string;
  /** Event type */
  type: string;
  /** Event source */
  source: string;
  /** Event target */
  target?: string;
  /** Event data */
  data: Record<string, any>;
  /** Event metadata */
  metadata: EventMetadata;
  /** Event timestamp */
  timestamp: Date;
  /** Event correlation ID */
  correlationId?: string;
  /** Event causation ID */
  causationId?: string;
}

export interface EventMetadata {
  /** Event version */
  version: string;
  /** Event schema */
  schema?: string;
  /** Event priority */
  priority: EventPriority;
  /** Event TTL in seconds */
  ttl?: number;
  /** Event tags */
  tags: string[];
  /** Event headers */
  headers: Record<string, string>;
}

export enum EventPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface EventHandler {
  /** Handler ID */
  id: string;
  /** Handler name */
  name: string;
  /** Event types */
  eventTypes: string[];
  /** Handler function */
  handler: EventHandlerFunction;
  /** Handler configuration */
  config: EventHandlerConfig;
  /** Whether handler is active */
  active: boolean;
}

export type EventHandlerFunction = (event: Event, context: EventContext) => Promise<void>;

export interface EventContext {
  /** Context ID */
  id: string;
  /** Tenant ID */
  tenantId?: string;
  /** User ID */
  userId?: string;
  /** Module ID */
  moduleId?: string;
  /** Request ID */
  requestId?: string;
  /** Context data */
  data: Record<string, any>;
}

export interface EventHandlerConfig {
  /** Handler timeout in milliseconds */
  timeout: number;
  /** Retry configuration */
  retry: RetryConfig;
  /** Concurrency limit */
  concurrency: number;
  /** Whether handler is ordered */
  ordered: boolean;
  /** Dead letter queue */
  deadLetterQueue?: string;
}

export interface EventMiddleware {
  /** Middleware ID */
  id: string;
  /** Middleware name */
  name: string;
  /** Middleware function */
  middleware: EventMiddlewareFunction;
  /** Middleware order */
  order: number;
  /** Whether middleware is active */
  active: boolean;
}

export type EventMiddlewareFunction = (event: Event, context: EventContext, next: () => Promise<void>) => Promise<void>;

export interface EventSubscription {
  /** Subscription ID */
  id: string;
  /** Subscription name */
  name: string;
  /** Event types */
  eventTypes: string[];
  /** Subscription configuration */
  config: EventSubscriptionConfig;
  /** Whether subscription is active */
  active: boolean;
}

export interface EventSubscriptionConfig {
  /** Subscription type */
  type: 'topic' | 'queue' | 'stream';
  /** Subscription pattern */
  pattern: string;
  /** Subscription group */
  group?: string;
  /** Subscription offset */
  offset: 'earliest' | 'latest' | 'specific';
  /** Subscription timeout */
  timeout: number;
}

export interface EventPublisher {
  /** Publisher ID */
  id: string;
  /** Publisher name */
  name: string;
  /** Publisher configuration */
  config: EventPublisherConfig;
  /** Whether publisher is active */
  active: boolean;
}

export interface EventPublisherConfig {
  /** Publisher type */
  type: 'sync' | 'async' | 'batch';
  /** Publisher timeout */
  timeout: number;
  /** Publisher retry */
  retry: RetryConfig;
  /** Publisher batching */
  batching?: BatchingConfig;
}

export interface BatchingConfig {
  /** Batch size */
  size: number;
  /** Batch timeout in milliseconds */
  timeout: number;
  /** Batch compression */
  compression: boolean;
}

export interface EventSchema {
  /** Schema ID */
  id: string;
  /** Schema name */
  name: string;
  /** Schema version */
  version: string;
  /** Schema definition */
  definition: Record<string, any>;
  /** Schema validation */
  validation: SchemaValidation;
  /** Whether schema is active */
  active: boolean;
}

export interface SchemaValidation {
  /** Whether validation is enabled */
  enabled: boolean;
  /** Validation rules */
  rules: ValidationRule[];
  /** Validation mode */
  mode: 'strict' | 'loose';
}

export interface ValidationRule {
  /** Rule type */
  type: 'required' | 'type' | 'format' | 'range' | 'custom';
  /** Rule field */
  field: string;
  /** Rule parameters */
  params: Record<string, any>;
  /** Rule message */
  message: string;
}

export interface EventMetrics {
  /** Metrics ID */
  id: string;
  /** Event type */
  eventType: string;
  /** Metrics timestamp */
  timestamp: Date;
  /** Event count */
  count: number;
  /** Event size in bytes */
  size: number;
  /** Processing time in milliseconds */
  processingTime: number;
  /** Error count */
  errorCount: number;
  /** Success rate */
  successRate: number;
}

export interface EventTrace {
  /** Trace ID */
  id: string;
  /** Event ID */
  eventId: string;
  /** Trace spans */
  spans: EventSpan[];
  /** Trace metadata */
  metadata: Record<string, any>;
}

export interface EventSpan {
  /** Span ID */
  id: string;
  /** Span name */
  name: string;
  /** Span start time */
  startTime: Date;
  /** Span end time */
  endTime?: Date;
  /** Span duration in milliseconds */
  duration?: number;
  /** Span tags */
  tags: Record<string, string>;
  /** Span logs */
  logs: EventLog[];
}

export interface EventLog {
  /** Log timestamp */
  timestamp: Date;
  /** Log level */
  level: 'debug' | 'info' | 'warn' | 'error';
  /** Log message */
  message: string;
  /** Log data */
  data: Record<string, any>;
}

export interface EventFilter {
  /** Filter ID */
  id: string;
  /** Filter name */
  name: string;
  /** Filter conditions */
  conditions: FilterCondition[];
  /** Filter actions */
  actions: FilterAction[];
  /** Whether filter is active */
  active: boolean;
}

export interface FilterCondition {
  /** Condition field */
  field: string;
  /** Condition operator */
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'regex' | 'in' | 'not_in' | 'gt' | 'gte' | 'lt' | 'lte';
  /** Condition value */
  value: any;
}

export interface FilterAction {
  /** Action type */
  type: 'drop' | 'modify' | 'route' | 'log';
  /** Action configuration */
  config: Record<string, any>;
}

export interface EventScheduler {
  /** Scheduler ID */
  id: string;
  /** Scheduler name */
  name: string;
  /** Scheduler configuration */
  config: EventSchedulerConfig;
  /** Whether scheduler is active */
  active: boolean;
}

export interface EventSchedulerConfig {
  /** Schedule type */
  type: 'cron' | 'interval' | 'once';
  /** Schedule expression */
  expression: string;
  /** Schedule timezone */
  timezone: string;
  /** Schedule retry */
  retry: RetryConfig;
  /** Schedule timeout */
  timeout: number;
}

export interface RetryConfig {
  /** Maximum retries */
  maxRetries: number;
  /** Retry delay in milliseconds */
  delay: number;
  /** Backoff multiplier */
  backoffMultiplier: number;
  /** Maximum delay in milliseconds */
  maxDelay: number;
} 