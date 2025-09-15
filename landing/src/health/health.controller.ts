import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async get() {
    return await this.healthService.getHealth();
  }

  @Get('ready')
  async getReady() {
    return await this.healthService.getReadiness();
  }

  @Get('live')
  async getLive() {
    return await this.healthService.getLiveness();
  }
}
