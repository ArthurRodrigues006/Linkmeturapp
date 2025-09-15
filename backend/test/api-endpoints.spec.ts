import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './../src/app.module';

describe('API Endpoints Integration Tests', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // Configure the app similar to main.ts
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
    
    // Setup Swagger documentation
    const config = new DocumentBuilder()
      .setTitle('LinkMeTur API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);
    
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Root Endpoint', () => {
    it('should respond to GET /', async () => {
      const response = await request(app.getHttpServer())
        .get('/')
        .expect(200);

      expect(response.text).toBe('Hello World!');
      expect(response.headers['content-type']).toMatch(/text\/plain/);
    });

    it('should handle multiple requests to GET /', async () => {
      const promises = Array(5).fill(null).map(() => 
        request(app.getHttpServer()).get('/').expect(200)
      );
      
      const responses = await Promise.all(promises);
      responses.forEach(response => {
        expect(response.text).toBe('Hello World!');
      });
    });
  });

  describe('Health Check Endpoint', () => {
    it('should respond to GET /health', async () => {
      const response = await request(app.getHttpServer())
        .get('/health')
        .expect(200);

      expect(response.body).toEqual({
        status: 'ok',
        service: 'linkmetur-api'
      });
      expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    it('should be fast (under 100ms)', async () => {
      const start = Date.now();
      await request(app.getHttpServer())
        .get('/health')
        .expect(200);
      const duration = Date.now() - start;
      
      expect(duration).toBeLessThan(100);
    });

    it('should handle concurrent health checks', async () => {
      const promises = Array(10).fill(null).map(() => 
        request(app.getHttpServer()).get('/health').expect(200)
      );
      
      const responses = await Promise.all(promises);
      responses.forEach(response => {
        expect(response.body.status).toBe('ok');
        expect(response.body.service).toBe('linkmetur-api');
      });
    });
  });

  describe('Swagger Documentation', () => {
    it('should serve Swagger UI at /docs', async () => {
      const response = await request(app.getHttpServer())
        .get('/docs')
        .expect(200);

      expect(response.headers['content-type']).toMatch(/text\/html/);
      expect(response.text).toContain('swagger');
    });

    it('should serve OpenAPI JSON at /docs-json', async () => {
      const response = await request(app.getHttpServer())
        .get('/docs-json')
        .expect(200);

      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.body.info.title).toBe('LinkMeTur API');
      expect(response.body.info.version).toBe('1.0');
      expect(response.body.paths).toBeDefined();
    });

    it('should include all endpoints in OpenAPI spec', async () => {
      const response = await request(app.getHttpServer())
        .get('/docs-json')
        .expect(200);

      const spec = response.body;
      expect(spec.paths['/']).toBeDefined();
      expect(spec.paths['/health']).toBeDefined();
      expect(spec.paths['/docs']).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      await request(app.getHttpServer())
        .get('/api/nonexistent')
        .expect(404);
    });

    it('should return 404 for unsupported HTTP methods', async () => {
      await request(app.getHttpServer())
        .post('/')
        .expect(404);

      await request(app.getHttpServer())
        .put('/health')
        .expect(404);

      await request(app.getHttpServer())
        .delete('/health')
        .expect(404);
    });

    it('should handle malformed requests gracefully', async () => {
      await request(app.getHttpServer())
        .get('/health')
        .set('Accept', 'application/xml')
        .expect(200); // Should still work with different Accept header
    });
  });

  describe('CORS Configuration', () => {
    it('should allow requests from localhost:3000', async () => {
      const response = await request(app.getHttpServer())
        .get('/')
        .set('Origin', 'http://localhost:3000')
        .expect(200);

      expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');
    });

    it('should include CORS headers for health endpoint', async () => {
      const response = await request(app.getHttpServer())
        .get('/health')
        .set('Origin', 'http://localhost:3000')
        .expect(200);

      expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');
    });
  });

  describe('Performance Tests', () => {
    it('should handle 100 concurrent requests', async () => {
      const promises = Array(100).fill(null).map(() => 
        request(app.getHttpServer()).get('/health')
      );
      
      const responses = await Promise.all(promises);
      const successCount = responses.filter(res => res.status === 200).length;
      
      expect(successCount).toBe(100);
    }, 10000); // 10 second timeout

    it('should maintain response time under load', async () => {
      const start = Date.now();
      const promises = Array(50).fill(null).map(() => 
        request(app.getHttpServer()).get('/')
      );
      
      await Promise.all(promises);
      const duration = Date.now() - start;
      
      expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
    }, 10000);
  });

  describe('Content Type Validation', () => {
    it('should return correct content types for all endpoints', async () => {
      const rootResponse = await request(app.getHttpServer()).get('/');
      expect(rootResponse.headers['content-type']).toMatch(/text\/plain/);

      const healthResponse = await request(app.getHttpServer()).get('/health');
      expect(healthResponse.headers['content-type']).toMatch(/application\/json/);

      const docsResponse = await request(app.getHttpServer()).get('/docs');
      expect(docsResponse.headers['content-type']).toMatch(/text\/html/);

      const docsJsonResponse = await request(app.getHttpServer()).get('/docs-json');
      expect(docsJsonResponse.headers['content-type']).toMatch(/application\/json/);
    });
  });
});
