import { Request, Response, NextFunction } from 'express';
import { APIError } from '@aibos/types';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = req.headers['x-request-id'] as string || 'unknown';
  
  // Default error values
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const code = err.code || 'INTERNAL_ERROR';
  
  // Create API error object
  const apiError: APIError = {
    id: requestId,
    code,
    message,
    timestamp: new Date(),
    metadata: {
      type: getErrorType(statusCode),
      severity: getErrorSeverity(statusCode),
      context: {
        method: req.method,
        url: req.originalUrl,
        userAgent: req.get('User-Agent'),
        ip: req.ip,
        userId: (req as any).user?.id,
        tenantId: (req as any).tenant?.id
      },
      stackTrace: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  };

  // Log error
  console.error('API Error:', {
    requestId,
    statusCode,
    message,
    url: req.originalUrl,
    method: req.method,
    stack: err.stack
  });

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: apiError
  });
};

const getErrorType = (statusCode: number): APIError['metadata']['type'] => {
  if (statusCode >= 400 && statusCode < 500) {
    if (statusCode === 401) return 'authentication';
    if (statusCode === 403) return 'authorization';
    if (statusCode === 404) return 'not_found';
    if (statusCode === 422) return 'validation';
    if (statusCode === 429) return 'rate_limit';
    return 'validation';
  }
  return 'server_error';
};

const getErrorSeverity = (statusCode: number): APIError['metadata']['severity'] => {
  if (statusCode >= 500) return 'high';
  if (statusCode >= 400) return 'medium';
  return 'low';
};

// Custom error classes
export class ValidationError extends Error implements AppError {
  statusCode = 422;
  code = 'VALIDATION_ERROR';
  isOperational = true;

  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends Error implements AppError {
  statusCode = 401;
  code = 'AUTHENTICATION_ERROR';
  isOperational = true;

  constructor(message: string = 'Authentication required') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends Error implements AppError {
  statusCode = 403;
  code = 'AUTHORIZATION_ERROR';
  isOperational = true;

  constructor(message: string = 'Insufficient permissions') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends Error implements AppError {
  statusCode = 404;
  code = 'NOT_FOUND';
  isOperational = true;

  constructor(message: string = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends Error implements AppError {
  statusCode = 429;
  code = 'RATE_LIMIT_EXCEEDED';
  isOperational = true;

  constructor(message: string = 'Rate limit exceeded') {
    super(message);
    this.name = 'RateLimitError';
  }
} 