import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async getHealth() {
    const dbStatus = await this.checkDatabase();
    const memoryUsage = process.memoryUsage();
    
    return {
      status: dbStatus ? 'ok' : 'error',
      service: 'linkmetur-backend-api',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbStatus ? 'connected' : 'disconnected',
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
    return {
      status: dbStatus ? 'ready' : 'not ready',
      service: 'linkmetur-backend-api',
      database: dbStatus ? 'ready' : 'not ready',
      timestamp: new Date().toISOString(),
    };
  }

  async getLiveness() {
    return {
      status: 'alive',
      service: 'linkmetur-backend-api',
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
}
