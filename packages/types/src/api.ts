/**
 * API System Types
 * Defines the interfaces for REST and GraphQL APIs in AIBOS Engine
 */

export interface APIConfig {
  /** API versioning */
  versioning: APIVersioning;
  /** API documentation */
  documentation: APIDocumentation;
  /** API rate limiting */
  rateLimit: APIRateLimit;
  /** API security */
  security: APISecurity;
  /** API monitoring */
  monitoring: APIMonitoring;
}

export interface APIVersioning {
  /** Default API version */
  defaultVersion: string;
  /** Supported versions */
  supportedVersions: string[];
  /** Deprecated versions */
  deprecatedVersions: string[];
  /** Version deprecation notice days */
  deprecationNoticeDays: number;
  /** Version strategy */
  strategy: 'url' | 'header' | 'parameter';
}

export interface APIDocumentation {
  /** Whether documentation is enabled */
  enabled: boolean;
  /** Documentation URL */
  url?: string;
  /** Documentation theme */
  theme: 'light' | 'dark';
  /** Interactive documentation */
  interactive: boolean;
  /** API specification format */
  format: 'openapi' | 'graphql' | 'raml';
}

export interface APIRateLimit {
  /** Whether rate limiting is enabled */
  enabled: boolean;
  /** Rate limit strategy */
  strategy: 'token_bucket' | 'leaky_bucket' | 'fixed_window' | 'sliding_window';
  /** Default limits */
  defaults: RateLimitDefaults;
  /** Custom limits */
  custom: RateLimitCustom[];
}

export interface RateLimitDefaults {
  /** Requests per minute */
  requestsPerMinute: number;
  /** Requests per hour */
  requestsPerHour: number;
  /** Requests per day */
  requestsPerDay: number;
  /** Burst limit */
  burstLimit: number;
}

export interface RateLimitCustom {
  /** Rate limit pattern */
  pattern: string;
  /** Rate limit limits */
  limits: RateLimitDefaults;
  /** Rate limit scope */
  scope: 'user' | 'tenant' | 'ip' | 'global';
}

export interface APISecurity {
  /** Authentication methods */
  authentication: AuthenticationMethod[];
  /** Authorization */
  authorization: AuthorizationConfig;
  /** CORS configuration */
  cors: CORSConfig;
  /** Security headers */
  headers: SecurityHeaders;
}

export interface AuthenticationMethod {
  /** Method type */
  type: 'jwt' | 'oauth2' | 'api_key' | 'basic' | 'custom';
  /** Method configuration */
  config: Record<string, any>;
  /** Whether method is enabled */
  enabled: boolean;
  /** Method priority */
  priority: number;
}

export interface AuthorizationConfig {
  /** Authorization model */
  model: 'rbac' | 'abac' | 'pbac';
  /** Default permissions */
  defaultPermissions: string[];
  /** Permission inheritance */
  inheritance: boolean;
  /** Permission caching */
  caching: boolean;
}

export interface CORSConfig {
  /** Whether CORS is enabled */
  enabled: boolean;
  /** Allowed origins */
  allowedOrigins: string[];
  /** Allowed methods */
  allowedMethods: string[];
  /** Allowed headers */
  allowedHeaders: string[];
  /** Exposed headers */
  exposedHeaders: string[];
  /** Credentials */
  credentials: boolean;
  /** Max age */
  maxAge: number;
}

export interface SecurityHeaders {
  /** Whether security headers are enabled */
  enabled: boolean;
  /** Headers to include */
  headers: Record<string, string>;
}

export interface APIMonitoring {
  /** Whether monitoring is enabled */
  enabled: boolean;
  /** Request logging */
  requestLogging: boolean;
  /** Response logging */
  responseLogging: boolean;
  /** Error tracking */
  errorTracking: boolean;
  /** Performance monitoring */
  performanceMonitoring: boolean;
}

export interface APIRequest {
  /** Request ID */
  id: string;
  /** Request method */
  method: string;
  /** Request URL */
  url: string;
  /** Request path */
  path: string;
  /** Request query parameters */
  query: Record<string, any>;
  /** Request headers */
  headers: Record<string, string>;
  /** Request body */
  body?: any;
  /** Request timestamp */
  timestamp: Date;
  /** Request metadata */
  metadata: RequestMetadata;
}

export interface RequestMetadata {
  /** Client IP */
  clientIp: string;
  /** User agent */
  userAgent: string;
  /** Tenant ID */
  tenantId?: string;
  /** User ID */
  userId?: string;
  /** Session ID */
  sessionId?: string;
  /** Request correlation ID */
  correlationId?: string;
  /** Request trace ID */
  traceId?: string;
}

export interface APIResponse {
  /** Response ID */
  id: string;
  /** Response status code */
  statusCode: number;
  /** Response headers */
  headers: Record<string, string>;
  /** Response body */
  body?: any;
  /** Response timestamp */
  timestamp: Date;
  /** Response metadata */
  metadata: ResponseMetadata;
}

export interface ResponseMetadata {
  /** Response time in milliseconds */
  responseTime: number;
  /** Response size in bytes */
  size: number;
  /** Response encoding */
  encoding?: string;
  /** Response compression */
  compression?: string;
}

export interface APIError {
  /** Error ID */
  id: string;
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Error details */
  details?: any;
  /** Error timestamp */
  timestamp: Date;
  /** Error metadata */
  metadata: ErrorMetadata;
}

export interface ErrorMetadata {
  /** Error type */
  type: 'validation' | 'authentication' | 'authorization' | 'not_found' | 'server_error' | 'rate_limit';
  /** Error severity */
  severity: 'low' | 'medium' | 'high' | 'critical';
  /** Error context */
  context: Record<string, any>;
  /** Error stack trace */
  stackTrace?: string;
}

export interface APIRoute {
  /** Route ID */
  id: string;
  /** Route path */
  path: string;
  /** Route method */
  method: string;
  /** Route handler */
  handler: RouteHandler;
  /** Route middleware */
  middleware: RouteMiddleware[];
  /** Route configuration */
  config: RouteConfig;
  /** Whether route is active */
  active: boolean;
}

export type RouteHandler = (req: APIRequest, res: APIResponse) => Promise<void>;

export interface RouteMiddleware {
  /** Middleware ID */
  id: string;
  /** Middleware name */
  name: string;
  /** Middleware function */
  middleware: MiddlewareFunction;
  /** Middleware order */
  order: number;
  /** Whether middleware is active */
  active: boolean;
}

export type MiddlewareFunction = (req: APIRequest, res: APIResponse, next: () => Promise<void>) => Promise<void>;

export interface RouteConfig {
  /** Route timeout in milliseconds */
  timeout: number;
  /** Route rate limiting */
  rateLimit?: RateLimitDefaults;
  /** Route authentication */
  authentication: boolean;
  /** Route authorization */
  authorization: string[];
  /** Route validation */
  validation: RouteValidation;
  /** Route caching */
  caching: RouteCaching;
}

export interface RouteValidation {
  /** Whether validation is enabled */
  enabled: boolean;
  /** Request validation schema */
  requestSchema?: any;
  /** Response validation schema */
  responseSchema?: any;
  /** Validation mode */
  mode: 'strict' | 'loose';
}

export interface RouteCaching {
  /** Whether caching is enabled */
  enabled: boolean;
  /** Cache TTL in seconds */
  ttl: number;
  /** Cache key strategy */
  keyStrategy: 'url' | 'custom';
  /** Cache key function */
  keyFunction?: (req: APIRequest) => string;
}

export interface GraphQLConfig {
  /** GraphQL endpoint */
  endpoint: string;
  /** GraphQL playground */
  playground: GraphQLPlayground;
  /** GraphQL introspection */
  introspection: boolean;
  /** GraphQL tracing */
  tracing: boolean;
  /** GraphQL caching */
  caching: GraphQLCaching;
}

export interface GraphQLPlayground {
  /** Whether playground is enabled */
  enabled: boolean;
  /** Playground URL */
  url?: string;
  /** Playground theme */
  theme: 'light' | 'dark';
  /** Playground settings */
  settings: Record<string, any>;
}

export interface GraphQLCaching {
  /** Whether caching is enabled */
  enabled: boolean;
  /** Cache TTL in seconds */
  ttl: number;
  /** Cache strategy */
  strategy: 'query' | 'field' | 'type';
  /** Cache invalidation */
  invalidation: CacheInvalidation;
}

export interface CacheInvalidation {
  /** Whether invalidation is enabled */
  enabled: boolean;
  /** Invalidation strategy */
  strategy: 'time' | 'event' | 'manual';
  /** Invalidation events */
  events: string[];
}

export interface GraphQLRequest {
  /** Request ID */
  id: string;
  /** GraphQL query */
  query: string;
  /** GraphQL variables */
  variables?: Record<string, any>;
  /** GraphQL operation name */
  operationName?: string;
  /** Request context */
  context: GraphQLContext;
  /** Request timestamp */
  timestamp: Date;
}

export interface GraphQLContext {
  /** User information */
  user?: any;
  /** Tenant information */
  tenant?: any;
  /** Request metadata */
  metadata: Record<string, any>;
}

export interface GraphQLResponse {
  /** Response ID */
  id: string;
  /** GraphQL data */
  data?: any;
  /** GraphQL errors */
  errors?: GraphQLError[];
  /** Response extensions */
  extensions?: Record<string, any>;
  /** Response timestamp */
  timestamp: Date;
}

export interface GraphQLError {
  /** Error message */
  message: string;
  /** Error locations */
  locations?: GraphQLLocation[];
  /** Error path */
  path?: string[];
  /** Error extensions */
  extensions?: Record<string, any>;
}

export interface GraphQLLocation {
  /** Line number */
  line: number;
  /** Column number */
  column: number;
}

export interface APIMetrics {
  /** Metrics ID */
  id: string;
  /** API endpoint */
  endpoint: string;
  /** Metrics timestamp */
  timestamp: Date;
  /** Request count */
  requestCount: number;
  /** Response time in milliseconds */
  responseTime: number;
  /** Error count */
  errorCount: number;
  /** Success rate */
  successRate: number;
  /** Throughput */
  throughput: number;
}

export interface APILog {
  /** Log ID */
  id: string;
  /** Request ID */
  requestId: string;
  /** Log level */
  level: 'debug' | 'info' | 'warn' | 'error';
  /** Log message */
  message: string;
  /** Log data */
  data: Record<string, any>;
  /** Log timestamp */
  timestamp: Date;
}

export interface APISchema {
  /** Schema ID */
  id: string;
  /** Schema name */
  name: string;
  /** Schema version */
  version: string;
  /** Schema type */
  type: 'openapi' | 'graphql' | 'raml';
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

// Simplified API response types for basic REST endpoints
export interface SimpleAPIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: number;
    message: string;
  };
}

export interface SimpleAPIError {
  code: number;
  message: string;
} 