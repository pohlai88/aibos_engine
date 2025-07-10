import type { DeviceInfo, User } from './user';
/**
 * Authentication System Types
 * Defines the interfaces for authentication and authorization in AIBOS Engine
 */
export interface AuthConfig {
    /** JWT configuration */
    jwt: JWTConfig;
    /** Session configuration */
    session: SessionConfig;
    /** Password configuration */
    password: PasswordConfig;
    /** MFA configuration */
    mfa: MFAConfig;
    /** OAuth configuration */
    oauth: OAuthConfig;
    /** Rate limiting */
    rateLimit: AuthRateLimit;
    /** Security settings */
    security: AuthSecurity;
}
export interface JWTConfig {
    /** JWT secret */
    secret: string;
    /** JWT algorithm */
    algorithm: 'HS256' | 'HS384' | 'HS512' | 'RS256' | 'RS384' | 'RS512';
    /** JWT issuer */
    issuer: string;
    /** JWT audience */
    audience: string;
    /** Access token expiration in minutes */
    accessTokenExpiration: number;
    /** Refresh token expiration in days */
    refreshTokenExpiration: number;
    /** Whether to include user claims */
    includeUserClaims: boolean;
    /** Whether to include tenant claims */
    includeTenantClaims: boolean;
}
export interface SessionConfig {
    /** Session secret */
    secret: string;
    /** Session name */
    name: string;
    /** Session cookie settings */
    cookie: SessionCookie;
    /** Session store */
    store: SessionStore;
    /** Session cleanup interval in minutes */
    cleanupInterval: number;
    /** Maximum sessions per user */
    maxSessionsPerUser: number;
}
export interface SessionCookie {
    /** Cookie domain */
    domain?: string;
    /** Cookie path */
    path: string;
    /** Cookie secure */
    secure: boolean;
    /** Cookie httpOnly */
    httpOnly: boolean;
    /** Cookie sameSite */
    sameSite: 'strict' | 'lax' | 'none';
    /** Cookie maxAge in milliseconds */
    maxAge: number;
}
export interface SessionStore {
    /** Store type */
    type: 'memory' | 'redis' | 'database';
    /** Store configuration */
    config: Record<string, any>;
    /** Store prefix */
    prefix: string;
    /** Store ttl in seconds */
    ttl: number;
}
export interface PasswordConfig {
    /** Minimum length */
    minLength: number;
    /** Maximum length */
    maxLength: number;
    /** Require uppercase */
    requireUppercase: boolean;
    /** Require lowercase */
    requireLowercase: boolean;
    /** Require numbers */
    requireNumbers: boolean;
    /** Require special characters */
    requireSpecialChars: boolean;
    /** Prevent common passwords */
    preventCommonPasswords: boolean;
    /** Password history count */
    historyCount: number;
    /** Maximum age in days */
    maxAge: number;
    /** Lockout settings */
    lockout: PasswordLockout;
}
export interface PasswordLockout {
    /** Maximum failed attempts */
    maxAttempts: number;
    /** Lockout duration in minutes */
    lockoutDuration: number;
    /** Whether to lock account */
    lockAccount: boolean;
    /** Whether to require captcha */
    requireCaptcha: boolean;
}
export interface MFAConfig {
    /** Whether MFA is enabled */
    enabled: boolean;
    /** MFA methods */
    methods: MFAMethod[];
    /** MFA requirement */
    requirement: 'optional' | 'required' | 'conditional';
    /** Conditional MFA rules */
    conditionalRules: MFAConditionalRule[];
    /** Backup codes */
    backupCodes: BackupCodesConfig;
}
export interface MFAMethod {
    /** Method type */
    type: 'totp' | 'sms' | 'email' | 'hardware' | 'biometric';
    /** Method name */
    name: string;
    /** Method description */
    description: string;
    /** Whether method is enabled */
    enabled: boolean;
    /** Method configuration */
    config: Record<string, any>;
}
export interface MFAConditionalRule {
    /** Rule name */
    name: string;
    /** Rule condition */
    condition: string;
    /** Rule action */
    action: 'require' | 'skip' | 'optional';
    /** Rule priority */
    priority: number;
    /** Whether rule is enabled */
    enabled: boolean;
}
export interface BackupCodesConfig {
    /** Number of backup codes */
    count: number;
    /** Backup code length */
    length: number;
    /** Whether backup codes are enabled */
    enabled: boolean;
    /** Backup code format */
    format: 'numeric' | 'alphanumeric';
}
export interface OAuthConfig {
    /** OAuth providers */
    providers: OAuthProvider[];
    /** Default provider */
    defaultProvider?: string;
    /** OAuth callback URL */
    callbackUrl: string;
    /** OAuth state parameter */
    stateParam: boolean;
    /** OAuth PKCE */
    pkce: boolean;
}
export interface OAuthProvider {
    /** Provider name */
    name: string;
    /** Provider display name */
    displayName: string;
    /** Provider type */
    type: 'oauth1' | 'oauth2' | 'oidc';
    /** Client ID */
    clientId: string;
    /** Client secret */
    clientSecret: string;
    /** Authorization URL */
    authorizationUrl: string;
    /** Token URL */
    tokenUrl: string;
    /** User info URL */
    userInfoUrl?: string;
    /** Scopes */
    scopes: string[];
    /** Provider configuration */
    config: Record<string, any>;
    /** Whether provider is enabled */
    enabled: boolean;
}
export interface AuthRateLimit {
    /** Login attempts per minute */
    loginAttemptsPerMinute: number;
    /** Password reset requests per hour */
    passwordResetRequestsPerHour: number;
    /** MFA attempts per minute */
    mfaAttemptsPerMinute: number;
    /** OAuth attempts per minute */
    oauthAttemptsPerMinute: number;
    /** API requests per minute */
    apiRequestsPerMinute: number;
}
export interface AuthSecurity {
    /** CSRF protection */
    csrf: boolean;
    /** XSS protection */
    xss: boolean;
    /** Content security policy */
    csp: boolean;
    /** HSTS */
    hsts: boolean;
    /** Secure headers */
    secureHeaders: boolean;
    /** IP whitelist */
    ipWhitelist: string[];
    /** IP blacklist */
    ipBlacklist: string[];
    /** Geolocation restrictions */
    geolocation: GeolocationRestrictions;
}
export interface GeolocationRestrictions {
    /** Whether geolocation restrictions are enabled */
    enabled: boolean;
    /** Allowed countries */
    allowedCountries: string[];
    /** Blocked countries */
    blockedCountries: string[];
    /** Whether to use IP geolocation */
    useIpGeolocation: boolean;
}
export interface AuthToken {
    /** Token ID */
    id: string;
    /** Token type */
    type: 'access' | 'refresh' | 'reset' | 'invitation';
    /** User ID */
    userId: string;
    /** Tenant ID */
    tenantId: string;
    /** Token value */
    token: string;
    /** Token hash */
    hash: string;
    /** Token payload */
    payload: Record<string, any>;
    /** Token scopes */
    scopes: string[];
    /** Created date */
    createdAt: Date;
    /** Expires date */
    expiresAt: Date;
    /** Used date */
    usedAt?: Date;
    /** Revoked date */
    revokedAt?: Date;
    /** Whether token is active */
    active: boolean;
    /** Token metadata */
    metadata: Record<string, any>;
}
export interface AuthSession {
    /** Session ID */
    id: string;
    /** User ID */
    userId: string;
    /** Tenant ID */
    tenantId: string;
    /** Session token */
    token: string;
    /** Refresh token */
    refreshToken?: string;
    /** IP address */
    ipAddress: string;
    /** User agent */
    userAgent: string;
    /** Device information */
    device: DeviceInfo;
    /** Session data */
    data: Record<string, any>;
    /** Created date */
    createdAt: Date;
    /** Expires date */
    expiresAt: Date;
    /** Last activity date */
    lastActivityAt: Date;
    /** Whether session is active */
    active: boolean;
    /** Session metadata */
    metadata: Record<string, any>;
}
export interface AuthAttempt {
    /** Attempt ID */
    id: string;
    /** User ID */
    userId?: string;
    /** Tenant ID */
    tenantId?: string;
    /** Attempt type */
    type: 'login' | 'password_reset' | 'mfa' | 'oauth';
    /** Attempt status */
    status: 'success' | 'failure' | 'pending';
    /** Attempt details */
    details: Record<string, any>;
    /** IP address */
    ipAddress: string;
    /** User agent */
    userAgent: string;
    /** Created date */
    createdAt: Date;
    /** Completed date */
    completedAt?: Date;
    /** Error message */
    error?: string;
}
export interface AuthLog {
    /** Log ID */
    id: string;
    /** User ID */
    userId?: string;
    /** Tenant ID */
    tenantId?: string;
    /** Log level */
    level: 'debug' | 'info' | 'warn' | 'error';
    /** Log message */
    message: string;
    /** Log details */
    details: Record<string, any>;
    /** IP address */
    ipAddress: string;
    /** User agent */
    userAgent: string;
    /** Created date */
    createdAt: Date;
    /** Log metadata */
    metadata: Record<string, any>;
}
export interface Permission {
    /** Permission ID */
    id: string;
    /** Permission name */
    name: string;
    /** Permission description */
    description: string;
    /** Permission resource */
    resource: string;
    /** Permission actions */
    actions: string[];
    /** Permission conditions */
    conditions?: string[];
    /** Whether permission is system */
    system: boolean;
    /** Created date */
    createdAt: Date;
    /** Updated date */
    updatedAt: Date;
    /** Whether permission is active */
    active: boolean;
}
export interface Role {
    /** Role ID */
    id: string;
    /** Role name */
    name: string;
    /** Role description */
    description: string;
    /** Role permissions */
    permissions: string[];
    /** Role hierarchy */
    hierarchy: number;
    /** Whether role is system */
    system: boolean;
    /** Created date */
    createdAt: Date;
    /** Updated date */
    updatedAt: Date;
    /** Whether role is active */
    active: boolean;
}
export interface Policy {
    /** Policy ID */
    id: string;
    /** Policy name */
    name: string;
    /** Policy description */
    description: string;
    /** Policy type */
    type: 'allow' | 'deny';
    /** Policy effect */
    effect: 'allow' | 'deny';
    /** Policy resources */
    resources: string[];
    /** Policy actions */
    actions: string[];
    /** Policy conditions */
    conditions?: PolicyCondition[];
    /** Policy priority */
    priority: number;
    /** Whether policy is system */
    system: boolean;
    /** Created date */
    createdAt: Date;
    /** Updated date */
    updatedAt: Date;
    /** Whether policy is active */
    active: boolean;
}
export interface PolicyCondition {
    /** Condition type */
    type: 'string_equals' | 'string_not_equals' | 'string_like' | 'string_not_like' | 'numeric_equals' | 'numeric_not_equals' | 'numeric_greater_than' | 'numeric_less_than' | 'date_equals' | 'date_not_equals' | 'date_greater_than' | 'date_less_than' | 'boolean_equals' | 'ip_address' | 'ip_range' | 'custom';
    /** Condition key */
    key: string;
    /** Condition value */
    value: any;
    /** Condition operator */
    operator?: string;
}
export interface AuthContext {
    /** User ID */
    userId: string;
    /** Tenant ID */
    tenantId: string;
    /** User roles */
    roles: string[];
    /** User permissions */
    permissions: string[];
    /** Session ID */
    sessionId: string;
    /** IP address */
    ipAddress: string;
    /** User agent */
    userAgent: string;
    /** Request timestamp */
    timestamp: Date;
    /** Request metadata */
    metadata: Record<string, any>;
}
export interface AuthResult {
    /** Whether authentication was successful */
    success: boolean;
    /** User information */
    user?: User;
    /** Session information */
    session?: AuthSession;
    /** Token information */
    token?: AuthToken;
    /** Error message */
    error?: string;
    /** Error code */
    errorCode?: string;
    /** Additional data */
    data?: Record<string, any>;
}
export interface AuthChallenge {
    /** Challenge ID */
    id: string;
    /** Challenge type */
    type: 'mfa' | 'captcha' | 'password_change' | 'email_verification';
    /** Challenge data */
    data: Record<string, any>;
    /** Challenge expires date */
    expiresAt: Date;
    /** Whether challenge is completed */
    completed: boolean;
    /** Challenge result */
    result?: any;
}
