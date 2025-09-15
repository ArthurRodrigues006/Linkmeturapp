import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './../src/app.module';

describe('API Endpoints (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
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

  afterEach(async () => {
    await app.close();
  });

  describe('AppController', () => {
    it('GET / - should return Hello World!', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });

    it('GET / - should return text/plain content type', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Content-Type', /text\/plain/);
    });
  });

  describe('HealthController', () => {
    it('GET /health - should return health status', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            status: 'ok',
            service: 'linkmetur-api'
          });
        });
    });

    it('GET /health - should return application/json content type', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    it('GET /health - should have correct service name', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res) => {
          expect(res.body.service).toBe('linkmetur-api');
        });
    });

    it('GET /health - should have ok status', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe('ok');
        });
    });
  });

  describe('Swagger Documentation', () => {
    it('GET /docs - should serve Swagger UI', () => {
      return request(app.getHttpServer())
        .get('/docs')
        .expect(200)
        .expect('Content-Type', /text\/html/);
    });

    it('GET /docs-json - should serve OpenAPI JSON', () => {
      return request(app.getHttpServer())
        .get('/docs-json')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    it('GET /docs-json - should contain API information', () => {
      return request(app.getHttpServer())
        .get('/docs-json')
        .expect(200)
        .expect((res) => {
          expect(res.body.info.title).toBe('LinkMeTur API');
          expect(res.body.info.version).toBe('1.0');
          expect(res.body.paths).toBeDefined();
        });
    });
  });

  describe('Error Handling', () => {
    it('GET /nonexistent - should return 404', () => {
      return request(app.getHttpServer())
        .get('/nonexistent')
        .expect(404);
    });

    it('POST / - should return 404 for unsupported method', () => {
      return request(app.getHttpServer())
        .post('/')
        .expect(404);
    });

    it('PUT /health - should return 404 for unsupported method', () => {
      return request(app.getHttpServer())
        .put('/health')
        .expect(404);
    });
  });

  describe('CORS Configuration', () => {
    it('should include CORS headers for allowed origin', () => {
      return request(app.getHttpServer())
        .get('/')
        .set('Origin', 'http://localhost:3000')
        .expect(200)
        .expect((res) => {
          expect(res.headers['access-control-allow-origin']).toBe('http://localhost:3000');
        });
    });
  });
});
