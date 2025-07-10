import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const requestId = req.headers['x-request-id'] as string || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Add request ID to headers if not present
  if (!req.headers['x-request-id']) {
    req.headers['x-request-id'] = requestId;
  }

  // Log request
  console.log(`[${new Date().toISOString()}] ${requestId} ${req.method} ${req.originalUrl}`, {
    method: req.method,
    url: req.originalUrl,
    query: req.query,
    body: req.method !== 'GET' ? req.body : undefined,
    headers: {
      'user-agent': req.get('User-Agent'),
      'content-type': req.get('Content-Type'),
      authorization: req.get('Authorization') ? '[REDACTED]' : undefined
    },
    ip: req.ip,
    userId: (req as any).user?.id,
    tenantId: (req as any).tenant?.id
  });

  // Override res.json to log response
  const originalJson = res.json;
  res.json = function(data: any) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log(`[${new Date().toISOString()}] ${requestId} ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`, {
      statusCode: res.statusCode,
      duration,
      responseSize: JSON.stringify(data).length,
      success: data?.success
    });
    
    return originalJson.call(this, data);
  };

  next();
}; 