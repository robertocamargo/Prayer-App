import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import cacheConfig from '@config/cache';
import Redis, { Redis as RedisClient } from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';


const redisClient = new Redis(cacheConfig.config.redis);

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
})

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,):
  Promise<void> {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new AppError(err, 429);
  }
}