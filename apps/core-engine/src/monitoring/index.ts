import { Application } from 'express';
import { APIMonitoring } from '@aibos/types';

export const setupMonitoring = (app: Application, config: APIMonitoring) => {
  if (!config.enabled) {
    return;
  }

  // Basic metrics collection
  const metrics = {
    requests: 0,
    errors: 0,
    startTime: Date.now()
  };

  // Middleware to collect metrics
  app.use((req, res, next) => {
    metrics.requests++;
    next();
  });

  // Metrics endpoint
  app.get('/metrics', (req, res) => {
    const uptime = Date.now() - metrics.startTime;
    
    res.json({
      success: true,
      data: {
        uptime,
        requests: metrics.requests,
        errors: metrics.errors,
        errorRate: metrics.requests > 0 ? (metrics.errors / metrics.requests) * 100 : 0,
        requestsPerMinute: (metrics.requests / (uptime / 60000)).toFixed(2)
      }
    });
  });

  // Health check with more details
  app.get('/health/detailed', (req, res) => {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: Date.now() - metrics.startTime,
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0'
    };

    res.json({
      success: true,
      data: health
    });
  });

  console.log('📊 Monitoring enabled');
}; 