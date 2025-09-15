import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return health status', () => {
      const result = controller.get();
      
      expect(result).toEqual({
        status: 'ok',
        service: 'linkmetur-api'
      });
    });

    it('should return correct service name', () => {
      const result = controller.get();
      
      expect(result.service).toBe('linkmetur-api');
    });

    it('should return ok status', () => {
      const result = controller.get();
      
      expect(result.status).toBe('ok');
    });
  });
});
