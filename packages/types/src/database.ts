/**
 * Database System Types
 * Defines the interfaces for database management and data governance in AIBOS Engine
 */

export interface DatabaseSchema {
  /** Schema name */
  name: string;
  /** Schema description */
  description?: string;
  /** Schema version */
  version: string;
  /** Tables in this schema */
  tables: DatabaseTable[];
  /** Views in this schema */
  views: DatabaseView[];
  /** Functions in this schema */
  functions: DatabaseFunction[];
  /** Triggers in this schema */
  triggers: DatabaseTrigger[];
  /** Indexes in this schema */
  indexes: DatabaseIndex[];
  /** Constraints in this schema */
  constraints: DatabaseConstraint[];
  /** Policies in this schema */
  policies: DatabasePolicy[];
  /** Created date */
  createdAt: Date;
  /** Updated date */
  updatedAt: Date;
  /** Whether schema is active */
  active: boolean;
}

export interface DatabaseTable {
  /** Table name */
  name: string;
  /** Table description */
  description?: string;
  /** Table schema */
  schema: string;
  /** Columns in this table */
  columns: DatabaseColumn[];
  /** Primary key */
  primaryKey: PrimaryKey;
  /** Foreign keys */
  foreignKeys: ForeignKey[];
  /** Unique constraints */
  uniqueConstraints: UniqueConstraint[];
  /** Check constraints */
  checkConstraints: CheckConstraint[];
  /** Default constraints */
  defaultConstraints: DefaultConstraint[];
  /** Table options */
  options: TableOptions;
  /** Created date */
  createdAt: Date;
  /** Updated date */
  updatedAt: Date;
  /** Whether table is active */
  active: boolean;
}

export interface DatabaseColumn {
  /** Column name */
  name: string;
  /** Column description */
  description?: string;
  /** Data type */
  dataType: string;
  /** Column size */
  size?: number;
  /** Precision (for decimal types) */
  precision?: number;
  /** Scale (for decimal types) */
  scale?: number;
  /** Whether column is nullable */
  nullable: boolean;
  /** Default value */
  defaultValue?: any;
  /** Whether column is identity */
  isIdentity: boolean;
  /** Identity seed */
  identitySeed?: number;
  /** Identity increment */
  identityIncrement?: number;
  /** Whether column is computed */
  isComputed: boolean;
  /** Computed expression */
  computedExpression?: string;
  /** Whether column is encrypted */
  isEncrypted: boolean;
  /** Encryption algorithm */
  encryptionAlgorithm?: string;
  /** Whether column is masked */
  isMasked: boolean;
  /** Masking function */
  maskingFunction?: string;
  /** Column order */
  ordinalPosition: number;
  /** Column metadata */
  metadata: Record<string, any>;
}

export interface PrimaryKey {
  /** Primary key name */
  name: string;
  /** Primary key columns */
  columns: string[];
  /** Whether primary key is clustered */
  clustered: boolean;
}

export interface ForeignKey {
  /** Foreign key name */
  name: string;
  /** Referenced table */
  referencedTable: string;
  /** Referenced schema */
  referencedSchema: string;
  /** Foreign key columns */
  columns: ForeignKeyColumn[];
  /** Update action */
  updateAction: 'CASCADE' | 'SET NULL' | 'SET DEFAULT' | 'RESTRICT' | 'NO ACTION';
  /** Delete action */
  deleteAction: 'CASCADE' | 'SET NULL' | 'SET DEFAULT' | 'RESTRICT' | 'NO ACTION';
  /** Whether foreign key is enabled */
  enabled: boolean;
}

export interface ForeignKeyColumn {
  /** Column name */
  column: string;
  /** Referenced column */
  referencedColumn: string;
}

export interface UniqueConstraint {
  /** Constraint name */
  name: string;
  /** Constraint columns */
  columns: string[];
  /** Whether constraint is enabled */
  enabled: boolean;
}

export interface CheckConstraint {
  /** Constraint name */
  name: string;
  /** Check expression */
  expression: string;
  /** Whether constraint is enabled */
  enabled: boolean;
}

export interface DefaultConstraint {
  /** Constraint name */
  name: string;
  /** Column name */
  column: string;
  /** Default value */
  defaultValue: any;
  /** Whether constraint is enabled */
  enabled: boolean;
}

export interface TableOptions {
  /** Table type */
  type: 'BASE TABLE' | 'VIEW' | 'TEMPORARY';
  /** Storage engine */
  storageEngine?: string;
  /** Character set */
  characterSet?: string;
  /** Collation */
  collation?: string;
  /** Row format */
  rowFormat?: string;
  /** Compression */
  compression?: string;
  /** Partitioning */
  partitioning?: PartitioningInfo;
  /** Whether table is encrypted */
  encrypted: boolean;
  /** Whether table is compressed */
  compressed: boolean;
  /** Whether table is temporary */
  temporary: boolean;
}

export interface PartitioningInfo {
  /** Partitioning type */
  type: 'RANGE' | 'LIST' | 'HASH' | 'KEY';
  /** Partitioning column */
  column: string;
  /** Partition definitions */
  partitions: PartitionDefinition[];
}

export interface PartitionDefinition {
  /** Partition name */
  name: string;
  /** Partition value */
  value: any;
  /** Partition description */
  description?: string;
}

export interface DatabaseView {
  /** View name */
  name: string;
  /** View description */
  description?: string;
  /** View schema */
  schema: string;
  /** View definition */
  definition: string;
  /** View columns */
  columns: ViewColumn[];
  /** Whether view is updatable */
  updatable: boolean;
  /** Whether view is materialized */
  materialized: boolean;
  /** Created date */
  createdAt: Date;
  /** Updated date */
  updatedAt: Date;
  /** Whether view is active */
  active: boolean;
}

export interface ViewColumn {
  /** Column name */
  name: string;
  /** Column description */
  description?: string;
  /** Data type */
  dataType: string;
  /** Whether column is nullable */
  nullable: boolean;
  /** Column order */
  ordinalPosition: number;
}

export interface DatabaseFunction {
  /** Function name */
  name: string;
  /** Function description */
  description?: string;
  /** Function schema */
  schema: string;
  /** Function definition */
  definition: string;
  /** Function parameters */
  parameters: FunctionParameter[];
  /** Return type */
  returnType: string;
  /** Function language */
  language: string;
  /** Whether function is deterministic */
  deterministic: boolean;
  /** Whether function is security definer */
  securityDefiner: boolean;
  /** Created date */
  createdAt: Date;
  /** Updated date */
  updatedAt: Date;
  /** Whether function is active */
  active: boolean;
}

export interface FunctionParameter {
  /** Parameter name */
  name: string;
  /** Parameter data type */
  dataType: string;
  /** Parameter mode */
  mode: 'IN' | 'OUT' | 'INOUT';
  /** Default value */
  defaultValue?: any;
  /** Parameter order */
  ordinalPosition: number;
}

export interface DatabaseTrigger {
  /** Trigger name */
  name: string;
  /** Trigger description */
  description?: string;
  /** Trigger schema */
  schema: string;
  /** Trigger table */
  table: string;
  /** Trigger event */
  event: 'INSERT' | 'UPDATE' | 'DELETE';
  /** Trigger timing */
  timing: 'BEFORE' | 'AFTER' | 'INSTEAD OF';
  /** Trigger definition */
  definition: string;
  /** Whether trigger is enabled */
  enabled: boolean;
  /** Created date */
  createdAt: Date;
  /** Updated date */
  updatedAt: Date;
}

export interface DatabaseIndex {
  /** Index name */
  name: string;
  /** Index description */
  description?: string;
  /** Index schema */
  schema: string;
  /** Index table */
  table: string;
  /** Index columns */
  columns: IndexColumn[];
  /** Index type */
  type: 'BTREE' | 'HASH' | 'GIN' | 'GIST' | 'SPGIST' | 'BRIN';
  /** Whether index is unique */
  unique: boolean;
  /** Whether index is clustered */
  clustered: boolean;
  /** Whether index is partial */
  partial: boolean;
  /** Partial index condition */
  partialCondition?: string;
  /** Whether index is enabled */
  enabled: boolean;
  /** Created date */
  createdAt: Date;
  /** Updated date */
  updatedAt: Date;
}

export interface IndexColumn {
  /** Column name */
  name: string;
  /** Column order */
  ordinalPosition: number;
  /** Sort order */
  sortOrder: 'ASC' | 'DESC';
  /** Nulls order */
  nullsOrder: 'FIRST' | 'LAST';
}

export interface DatabaseConstraint {
  /** Constraint name */
  name: string;
  /** Constraint description */
  description?: string;
  /** Constraint schema */
  schema: string;
  /** Constraint table */
  table: string;
  /** Constraint type */
  type: 'PRIMARY KEY' | 'FOREIGN KEY' | 'UNIQUE' | 'CHECK' | 'DEFAULT' | 'NOT NULL';
  /** Constraint definition */
  definition: string;
  /** Whether constraint is enabled */
  enabled: boolean;
  /** Created date */
  createdAt: Date;
  /** Updated date */
  updatedAt: Date;
}

export interface DatabasePolicy {
  /** Policy name */
  name: string;
  /** Policy description */
  description?: string;
  /** Policy schema */
  schema: string;
  /** Policy table */
  table: string;
  /** Policy type */
  type: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'ALL';
  /** Policy condition */
  condition: string;
  /** Policy roles */
  roles: string[];
  /** Whether policy is enabled */
  enabled: boolean;
  /** Created date */
  createdAt: Date;
  /** Updated date */
  updatedAt: Date;
}

export interface DatabaseMigration {
  /** Migration ID */
  id: string;
  /** Migration name */
  name: string;
  /** Migration description */
  description?: string;
  /** Migration version */
  version: string;
  /** Migration type */
  type: 'SCHEMA' | 'DATA' | 'SEED';
  /** Migration status */
  status: MigrationStatus;
  /** Migration SQL */
  sql: string;
  /** Rollback SQL */
  rollbackSql?: string;
  /** Migration dependencies */
  dependencies: string[];
  /** Migration checksum */
  checksum: string;
  /** Applied date */
  appliedAt?: Date;
  /** Rolled back date */
  rolledBackAt?: Date;
  /** Created date */
  createdAt: Date;
  /** Updated date */
  updatedAt: Date;
}

export enum MigrationStatus {
  PENDING = 'pending',
  APPLIED = 'applied',
  FAILED = 'failed',
  ROLLED_BACK = 'rolled_back'
}

export interface DatabaseBackup {
  /** Backup ID */
  id: string;
  /** Backup name */
  name: string;
  /** Backup description */
  description?: string;
  /** Backup type */
  type: 'FULL' | 'INCREMENTAL' | 'DIFFERENTIAL';
  /** Backup status */
  status: BackupStatus;
  /** Backup size in bytes */
  size: number;
  /** Backup location */
  location: string;
  /** Backup checksum */
  checksum: string;
  /** Backup encryption */
  encryption: BackupEncryption;
  /** Backup compression */
  compression: BackupCompression;
  /** Backup retention */
  retention: BackupRetention;
  /** Created date */
  createdAt: Date;
  /** Completed date */
  completedAt?: Date;
  /** Expires date */
  expiresAt?: Date;
}

export enum BackupStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  EXPIRED = 'expired'
}

export interface BackupEncryption {
  /** Whether backup is encrypted */
  enabled: boolean;
  /** Encryption algorithm */
  algorithm?: string;
  /** Encryption key */
  key?: string;
}

export interface BackupCompression {
  /** Whether backup is compressed */
  enabled: boolean;
  /** Compression algorithm */
  algorithm?: string;
  /** Compression level */
  level?: number;
}

export interface BackupRetention {
  /** Retention period in days */
  days: number;
  /** Maximum backups to keep */
  maxBackups: number;
  /** Whether to delete expired backups */
  deleteExpired: boolean;
}

export interface DatabaseConnection {
  /** Connection ID */
  id: string;
  /** Connection name */
  name: string;
  /** Connection type */
  type: 'READ_WRITE' | 'READ_ONLY' | 'BACKUP';
  /** Connection string */
  connectionString: string;
  /** Connection pool settings */
  pool: ConnectionPool;
  /** Connection timeout */
  timeout: number;
  /** Connection retry settings */
  retry: ConnectionRetry;
  /** Whether connection is active */
  active: boolean;
  /** Created date */
  createdAt: Date;
  /** Updated date */
  updatedAt: Date;
}

export interface ConnectionPool {
  /** Minimum connections */
  min: number;
  /** Maximum connections */
  max: number;
  /** Connection timeout */
  timeout: number;
  /** Idle timeout */
  idleTimeout: number;
  /** Acquire timeout */
  acquireTimeout: number;
}

export interface ConnectionRetry {
  /** Maximum retries */
  maxRetries: number;
  /** Retry delay in milliseconds */
  delay: number;
  /** Backoff multiplier */
  backoffMultiplier: number;
}

export interface DatabaseStats {
  /** Database name */
  database: string;
  /** Date */
  date: Date;
  /** Table count */
  tableCount: number;
  /** View count */
  viewCount: number;
  /** Function count */
  functionCount: number;
  /** Trigger count */
  triggerCount: number;
  /** Index count */
  indexCount: number;
  /** Total size in bytes */
  totalSize: number;
  /** Data size in bytes */
  dataSize: number;
  /** Index size in bytes */
  indexSize: number;
  /** Active connections */
  activeConnections: number;
  /** Query count */
  queryCount: number;
  /** Slow query count */
  slowQueryCount: number;
  /** Error count */
  errorCount: number;
} 