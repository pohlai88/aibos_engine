import { Router } from 'express';
import { APIConfig } from '@aibos/types';
import authRoutes from './auth';
import moduleRoutes from './modules';
import tenantRoutes from './tenants';
import userRoutes from './users';

export const setupRoutes = (config: APIConfig): Router => {
  const router = Router();

  // API metadata middleware
  router.use((req, res, next) => {
    // Add API version to response headers
    res.setHeader('X-API-Version', config.versioning.defaultVersion);
    res.setHeader('X-API-Deprecated', 'false');
    
    // Add request ID if not present
    if (!req.headers['x-request-id']) {
      req.headers['x-request-id'] = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    next();
  });

  // Mount route modules
  router.use('/auth', authRoutes);
  router.use('/modules', moduleRoutes);
  router.use('/tenants', tenantRoutes);
  router.use('/users', userRoutes);

  // API info endpoint
  router.get('/', (req, res) => {
    res.json({
      name: 'AIBOS Core Engine API',
      version: config.versioning.defaultVersion,
      supportedVersions: config.versioning.supportedVersions,
      documentation: config.documentation.enabled ? config.documentation.url : null,
      endpoints: {
        auth: '/auth',
        modules: '/modules',
        tenants: '/tenants',
        users: '/users'
      }
    });
  });

  return router;
}; 