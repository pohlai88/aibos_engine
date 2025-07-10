// import { DataSource } from 'typeorm';
import { Tenant } from './entities/tenant.entity';

export class DatabaseService {
  private static instances = new Map<string, any>(); // DataSource

  constructor(private config: {
    isolationStrategy: 'schema-per-tenant' | 'database-per-tenant';
    migrationPolicy: 'versioned' | 'timestamped';
  }) {}

  public async initialize() {
    // Initialize connection pool
    console.log('Initializing database service...');
  }

  public async forTenant(tenantId: string): Promise<any> { // DataSource
    if (!DatabaseService.instances.has(tenantId)) {
      // Temporarily create a mock data source
      const mockDs = {
        query: async (sql: string) => {
          console.log(`Mock DB Query: ${sql}`);
          return [];
        },
        initialize: async () => {
          console.log(`Initializing mock data source for tenant: ${tenantId}`);
        }
      };
      
      await mockDs.initialize();
      await this.setupTenantIsolation(tenantId, mockDs);
      DatabaseService.instances.set(tenantId, mockDs);
    }
    return DatabaseService.instances.get(tenantId)!;
  }

  private async setupTenantIsolation(tenantId: string, ds: any) { // DataSource
    if (this.config.isolationStrategy === 'schema-per-tenant') {
      await ds.query(`CREATE SCHEMA IF NOT EXISTS tenant_${tenantId}`);
      await ds.query(`SET search_path TO tenant_${tenantId}`);
    }
    await ds.query(`SET app.current_tenant = '${tenantId}'`);
  }

  public async closeTenantConnection(tenantId: string) {
    const ds = DatabaseService.instances.get(tenantId);
    if (ds) {
      console.log(`Closing connection for tenant: ${tenantId}`);
      DatabaseService.instances.delete(tenantId);
    }
  }

  public async runMigrations(tenantId: string, migrations: string[]) {
    const ds = await this.forTenant(tenantId);
    
    for (const migration of migrations) {
      await ds.query(migration);
    }
  }
} 