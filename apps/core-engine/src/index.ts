import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { APIConfig, APIRequest, APIResponse, APIError } from '@aibos/types';
import { setupRoutes } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { rateLimiter } from './middleware/rateLimiter';
import { setupMonitoring } from './monitoring';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// API Configuration
const apiConfig: APIConfig = {
  versioning: {
    defaultVersion: 'v1',
    supportedVersions: ['v1'],
    deprecatedVersions: [],
    deprecationNoticeDays: 30,
    strategy: 'url'
  },
  documentation: {
    enabled: true,
    url: '/api-docs',
    theme: 'light',
    interactive: true,
    format: 'openapi'
  },
  rateLimit: {
    enabled: true,
    strategy: 'token_bucket',
    defaults: {
      requestsPerMinute: 100,
      requestsPerHour: 1000,
      requestsPerDay: 10000,
      burstLimit: 20
    },
    custom: []
  },
  security: {
    authentication: [
      {
        type: 'jwt',
        config: {
          secret: process.env.JWT_SECRET || 'your-secret-key',
          expiresIn: '24h'
        },
        enabled: true,
        priority: 1
      }
    ],
    authorization: {
      model: 'rbac',
      defaultPermissions: ['read:own'],
      inheritance: true,
      caching: true
    },
    cors: {
      enabled: true,
      allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['X-Total-Count'],
      credentials: true,
      maxAge: 86400
    },
    headers: {
      enabled: true,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block'
      }
    }
  },
  monitoring: {
    enabled: true,
    requestLogging: true,
    responseLogging: true,
    errorTracking: true,
    performanceMonitoring: true
  }
};

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(cors(apiConfig.security.cors));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Custom middleware
app.use(requestLogger);
app.use(rateLimiter(apiConfig.rateLimit));

// Setup monitoring
setupMonitoring(app, apiConfig.monitoring);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: apiConfig.versioning.defaultVersion,
    environment: NODE_ENV
  });
});

// API routes
app.use('/api/v1', setupRoutes(apiConfig));

// 404 handler
app.use('*', (req, res) => {
  const error: APIError = {
    id: req.headers['x-request-id'] as string || 'unknown',
    code: 'NOT_FOUND',
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date(),
    metadata: {
      type: 'not_found',
      severity: 'low',
      context: {
        method: req.method,
        url: req.originalUrl,
        userAgent: req.get('User-Agent')
      }
    }
  };

  res.status(404).json({
    success: false,
    error
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AIBOS Core Engine running on port ${PORT}`);
  console.log(`📊 Environment: ${NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API Docs: http://localhost:${PORT}${apiConfig.documentation.url}`);
  console.log(`⚙️  API Version: ${apiConfig.versioning.defaultVersion}`);
});

export default app; 