import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class HealthService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    private redisService: RedisService,
  ) {}

  async getHealth() {
    const dbStatus = await this.checkDatabase();
    const redisStatus = await this.checkRedis();
    const memoryUsage = process.memoryUsage();
    
    return {
      status: dbStatus && redisStatus ? 'ok' : 'error',
      service: 'linkmetur-landing-api',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbStatus ? 'connected' : 'disconnected',
      redis: redisStatus ? 'connected' : 'disconnected',
      memory: {
        used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        total: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        external: Math.round(memoryUsage.external / 1024 / 1024),
      },
      version: process.env.npm_package_version || '1.0.0',
    };
  }

  async getReadiness() {
    const dbStatus = await this.checkDatabase();
    const redisStatus = await this.checkRedis();
    return {
      status: dbStatus && redisStatus ? 'ready' : 'not ready',
      service: 'linkmetur-landing-api',
      database: dbStatus ? 'ready' : 'not ready',
      redis: redisStatus ? 'ready' : 'not ready',
      timestamp: new Date().toISOString(),
    };
  }

  async getLiveness() {
    return {
      status: 'alive',
      service: 'linkmetur-landing-api',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      if (!this.dataSource.isInitialized) {
        return false;
      }
      await this.dataSource.query('SELECT 1');
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  private async checkRedis(): Promise<boolean> {
    try {
      await this.redisService.set('health-check', 'ok', 10);
      const result = await this.redisService.get('health-check');
      return result === 'ok';
    } catch (error) {
      console.error('Redis health check failed:', error);
      return false;
    }
  }
}
