import type { Permission } from './auth';
/**
 * User System Types
 * Defines the interfaces for user management and authentication in AIBOS Engine
 */
export interface User {
    /** Unique user identifier */
    id: string;
    /** Tenant ID this user belongs to */
    tenantId: string;
    /** User email */
    email: string;
    /** User username */
    username?: string;
    /** User first name */
    firstName: string;
    /** User last name */
    lastName: string;
    /** User display name */
    displayName: string;
    /** User avatar URL */
    avatarUrl?: string;
    /** User status */
    status: UserStatus;
    /** User role */
    role: UserRole;
    /** User permissions */
    permissions: Permission[];
    /** User groups */
    groups: string[];
    /** User profile */
    profile: UserProfile;
    /** User preferences */
    preferences: UserPreferences;
    /** User settings */
    settings: UserSettings;
    /** Created date */
    createdAt: Date;
    /** Updated date */
    updatedAt: Date;
    /** Last login date */
    lastLoginAt?: Date;
    /** Email verified date */
    emailVerifiedAt?: Date;
    /** Password changed date */
    passwordChangedAt?: Date;
    /** Account locked date */
    lockedAt?: Date;
    /** Account suspended date */
    suspendedAt?: Date;
    /** Metadata */
    metadata: Record<string, any>;
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    LOCKED = "locked",
    PENDING = "pending"
}
export declare enum UserRole {
    SUPER_ADMIN = "super_admin",
    TENANT_ADMIN = "tenant_admin",
    USER = "user",
    GUEST = "guest",
    API_USER = "api_user"
}
export interface UserProfile {
    /** User title */
    title?: string;
    /** User department */
    department?: string;
    /** User phone number */
    phone?: string;
    /** User mobile number */
    mobile?: string;
    /** User timezone */
    timezone: string;
    /** User locale */
    locale: string;
    /** User bio */
    bio?: string;
    /** User website */
    website?: string;
    /** User location */
    location?: string;
    /** User company */
    company?: string;
    /** User job title */
    jobTitle?: string;
    /** User skills */
    skills?: string[];
    /** User interests */
    interests?: string[];
    /** Social media links */
    socialMedia?: SocialMediaLinks;
}
export interface SocialMediaLinks {
    /** LinkedIn URL */
    linkedin?: string;
    /** Twitter URL */
    twitter?: string;
    /** GitHub URL */
    github?: string;
    /** Facebook URL */
    facebook?: string;
    /** Instagram URL */
    instagram?: string;
}
export interface UserPreferences {
    /** UI theme */
    theme: 'light' | 'dark' | 'auto';
    /** UI language */
    language: string;
    /** Date format */
    dateFormat: string;
    /** Time format */
    timeFormat: '12h' | '24h';
    /** Currency */
    currency: string;
    /** Number format */
    numberFormat: string;
    /** Email notifications */
    emailNotifications: NotificationPreferences;
    /** Push notifications */
    pushNotifications: NotificationPreferences;
    /** In-app notifications */
    inAppNotifications: NotificationPreferences;
    /** Dashboard layout */
    dashboardLayout: DashboardLayout;
    /** Sidebar collapsed */
    sidebarCollapsed: boolean;
    /** Compact mode */
    compactMode: boolean;
    /** Auto-save */
    autoSave: boolean;
    /** Keyboard shortcuts */
    keyboardShortcuts: boolean;
}
export interface NotificationPreferences {
    /** Whether notifications are enabled */
    enabled: boolean;
    /** Notification types */
    types: NotificationType[];
    /** Quiet hours start */
    quietHoursStart?: string;
    /** Quiet hours end */
    quietHoursEnd?: string;
    /** Do not disturb */
    doNotDisturb: boolean;
}
export declare enum NotificationType {
    SYSTEM = "system",
    SECURITY = "security",
    UPDATES = "updates",
    FEATURES = "features",
    BILLING = "billing",
    SUPPORT = "support",
    MODULES = "modules",
    DATA = "data",
    USERS = "users",
    REPORTS = "reports"
}
export interface DashboardLayout {
    /** Layout type */
    type: 'grid' | 'list' | 'custom';
    /** Widget positions */
    widgets: WidgetPosition[];
    /** Default widgets */
    defaultWidgets: string[];
    /** Custom layout */
    customLayout?: any;
}
export interface WidgetPosition {
    /** Widget ID */
    widgetId: string;
    /** X position */
    x: number;
    /** Y position */
    y: number;
    /** Width */
    width: number;
    /** Height */
    height: number;
    /** Whether widget is visible */
    visible: boolean;
}
export interface UserSettings {
    /** Security settings */
    security: SecuritySettings;
    /** Privacy settings */
    privacy: PrivacySettings;
    /** Integration settings */
    integrations: IntegrationSettings;
    /** API settings */
    api: ApiSettings;
}
export interface SecuritySettings {
    /** Two-factor authentication */
    twoFactorAuth: TwoFactorAuthSettings;
    /** Session management */
    sessions: SessionSettings;
    /** Password settings */
    password: PasswordSettings;
    /** Login history */
    loginHistory: boolean;
    /** Device management */
    deviceManagement: boolean;
}
export interface TwoFactorAuthSettings {
    /** Whether 2FA is enabled */
    enabled: boolean;
    /** 2FA method */
    method: 'totp' | 'sms' | 'email' | 'hardware';
    /** Backup codes */
    backupCodes: string[];
    /** Recovery email */
    recoveryEmail?: string;
    /** Recovery phone */
    recoveryPhone?: string;
}
export interface SessionSettings {
    /** Maximum concurrent sessions */
    maxSessions: number;
    /** Session timeout in minutes */
    sessionTimeout: number;
    /** Remember me duration in days */
    rememberMeDuration: number;
    /** Force logout on password change */
    forceLogoutOnPasswordChange: boolean;
    /** Force logout on suspicious activity */
    forceLogoutOnSuspiciousActivity: boolean;
}
export interface PasswordSettings {
    /** Password expiration in days */
    expirationDays: number;
    /** Require password change on next login */
    requireChangeOnNextLogin: boolean;
    /** Password history count */
    historyCount: number;
    /** Prevent common passwords */
    preventCommonPasswords: boolean;
}
export interface PrivacySettings {
    /** Profile visibility */
    profileVisibility: 'public' | 'private' | 'contacts';
    /** Activity visibility */
    activityVisibility: 'public' | 'private' | 'contacts';
    /** Data sharing */
    dataSharing: boolean;
    /** Analytics tracking */
    analyticsTracking: boolean;
    /** Marketing emails */
    marketingEmails: boolean;
    /** Third-party integrations */
    thirdPartyIntegrations: boolean;
}
export interface IntegrationSettings {
    /** OAuth connections */
    oauthConnections: OAuthConnection[];
    /** API keys */
    apiKeys: ApiKey[];
    /** Webhook subscriptions */
    webhookSubscriptions: WebhookSubscription[];
    /** External accounts */
    externalAccounts: ExternalAccount[];
}
export interface OAuthConnection {
    /** Provider name */
    provider: string;
    /** Connection ID */
    connectionId: string;
    /** Connected account */
    account: string;
    /** Scopes granted */
    scopes: string[];
    /** Connected date */
    connectedAt: Date;
    /** Last used date */
    lastUsedAt?: Date;
    /** Whether connection is active */
    active: boolean;
}
export interface ApiKey {
    /** API key ID */
    id: string;
    /** API key name */
    name: string;
    /** API key prefix */
    prefix: string;
    /** API key scopes */
    scopes: string[];
    /** Created date */
    createdAt: Date;
    /** Expires date */
    expiresAt?: Date;
    /** Last used date */
    lastUsedAt?: Date;
    /** Whether key is active */
    active: boolean;
}
export interface WebhookSubscription {
    /** Subscription ID */
    id: string;
    /** Webhook URL */
    url: string;
    /** Events */
    events: string[];
    /** Secret */
    secret: string;
    /** Created date */
    createdAt: Date;
    /** Last triggered date */
    lastTriggeredAt?: Date;
    /** Whether subscription is active */
    active: boolean;
}
export interface ExternalAccount {
    /** Account ID */
    id: string;
    /** Provider */
    provider: string;
    /** Account name */
    name: string;
    /** Account email */
    email: string;
    /** Connected date */
    connectedAt: Date;
    /** Last synced date */
    lastSyncedAt?: Date;
    /** Whether account is active */
    active: boolean;
}
export interface ApiSettings {
    /** Rate limiting */
    rateLimit: RateLimitSettings;
    /** API versioning */
    versioning: VersioningSettings;
    /** Documentation */
    documentation: DocumentationSettings;
}
export interface RateLimitSettings {
    /** Requests per minute */
    requestsPerMinute: number;
    /** Requests per hour */
    requestsPerHour: number;
    /** Requests per day */
    requestsPerDay: number;
    /** Burst limit */
    burstLimit: number;
}
export interface VersioningSettings {
    /** Default API version */
    defaultVersion: string;
    /** Supported versions */
    supportedVersions: string[];
    /** Deprecated versions */
    deprecatedVersions: string[];
    /** Version deprecation notice days */
    deprecationNoticeDays: number;
}
export interface DocumentationSettings {
    /** Whether documentation is enabled */
    enabled: boolean;
    /** Documentation URL */
    url?: string;
    /** Documentation theme */
    theme: 'light' | 'dark';
    /** Interactive documentation */
    interactive: boolean;
}
export interface UserSession {
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
export interface DeviceInfo {
    /** Device type */
    type: 'desktop' | 'mobile' | 'tablet' | 'unknown';
    /** Operating system */
    os: string;
    /** Browser */
    browser: string;
    /** Device name */
    name?: string;
    /** Device model */
    model?: string;
    /** Device manufacturer */
    manufacturer?: string;
}
export interface UserActivity {
    /** Activity ID */
    id: string;
    /** User ID */
    userId: string;
    /** Tenant ID */
    tenantId: string;
    /** Activity type */
    type: ActivityType;
    /** Activity description */
    description: string;
    /** Activity details */
    details: Record<string, any>;
    /** IP address */
    ipAddress: string;
    /** User agent */
    userAgent: string;
    /** Created date */
    createdAt: Date;
    /** Session ID */
    sessionId?: string;
    /** Module ID */
    moduleId?: string;
    /** Resource type */
    resourceType?: string;
    /** Resource ID */
    resourceId?: string;
}
export declare enum ActivityType {
    LOGIN = "login",
    LOGOUT = "logout",
    PASSWORD_CHANGE = "password_change",
    PROFILE_UPDATE = "profile_update",
    SETTINGS_UPDATE = "settings_update",
    MODULE_INSTALL = "module_install",
    MODULE_UNINSTALL = "module_uninstall",
    DATA_CREATE = "data_create",
    DATA_UPDATE = "data_update",
    DATA_DELETE = "data_delete",
    API_CALL = "api_call",
    FILE_UPLOAD = "file_upload",
    FILE_DOWNLOAD = "file_download",
    EXPORT = "export",
    IMPORT = "import",
    REPORT_GENERATE = "report_generate",
    INTEGRATION_CONNECT = "integration_connect",
    INTEGRATION_DISCONNECT = "integration_disconnect"
}
export interface UserGroup {
    /** Group ID */
    id: string;
    /** Tenant ID */
    tenantId: string;
    /** Group name */
    name: string;
    /** Group description */
    description?: string;
    /** Group permissions */
    permissions: Permission[];
    /** Group members */
    members: string[];
    /** Created date */
    createdAt: Date;
    /** Updated date */
    updatedAt: Date;
    /** Whether group is active */
    active: boolean;
    /** Group metadata */
    metadata: Record<string, any>;
}
export interface UserInvitation {
    /** Invitation ID */
    id: string;
    /** Tenant ID */
    tenantId: string;
    /** Invited email */
    email: string;
    /** Invited by user ID */
    invitedBy: string;
    /** Invitation role */
    role: UserRole;
    /** Invitation permissions */
    permissions: Permission[];
    /** Invitation groups */
    groups: string[];
    /** Invitation message */
    message?: string;
    /** Invitation token */
    token: string;
    /** Expires date */
    expiresAt: Date;
    /** Accepted date */
    acceptedAt?: Date;
    /** Created date */
    createdAt: Date;
    /** Whether invitation is active */
    active: boolean;
}
