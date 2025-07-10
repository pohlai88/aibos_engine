import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { APIRateLimit } from '@aibos/types';
import { RateLimitError } from './errorHandler';

const rateLimiters = new Map<string, RateLimiterMemory>();

export const rateLimiter = (config: APIRateLimit) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!config.enabled) {
      return next();
    }

    const key = req.ip || 'unknown';
    
    // Get or create rate limiter for this IP
    let limiter = rateLimiters.get(key);
    if (!limiter) {
      limiter = new RateLimiterMemory({
        points: config.defaults.requestsPerMinute,
        duration: 60, // 1 minute
        blockDuration: 60 * 15 // Block for 15 minutes
      });
      rateLimiters.set(key, limiter);
    }

    limiter.consume(key)
      .then(() => {
        next();
      })
      .catch(() => {
        throw new RateLimitError('Too many requests from this IP');
      });
  };
}; 