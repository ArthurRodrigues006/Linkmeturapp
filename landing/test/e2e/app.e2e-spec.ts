import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('service');
      });
  });

  it('/api (GET) - Swagger documentation', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200);
  });
});

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/auth/login (POST) - should return 400 for invalid data', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({})
      .expect(400);
  });

  it('/auth/signup (POST) - should return 400 for invalid data', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({})
      .expect(400);
  });

  it('/auth/profile (GET) - should return 401 without token', () => {
    return request(app.getHttpServer())
      .get('/auth/profile')
      .expect(401);
  });
});

describe('JobsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/jobs (GET) - should return jobs list', () => {
    return request(app.getHttpServer())
      .get('/jobs')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/jobs (POST) - should return 401 without token', () => {
    return request(app.getHttpServer())
      .post('/jobs')
      .send({
        nome_servico: 'Test Service',
        categoria: 'Test',
        descricao: 'Test Description',
        min_valor: 100,
        max_valor: 200,
      })
      .expect(401);
  });
});

describe('ContactsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/contacts (GET) - should return 401 without token', () => {
    return request(app.getHttpServer())
      .get('/contacts')
      .expect(401);
  });

  it('/contacts (POST) - should return 401 without token', () => {
    return request(app.getHttpServer())
      .post('/contacts')
      .send({
        nome: 'Test Contact',
        email: 'test@example.com',
        telefone: '11999999999',
      })
      .expect(401);
  });
});

describe('NotificationsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/notifications (GET) - should return 401 without token', () => {
    return request(app.getHttpServer())
      .get('/notifications')
      .expect(401);
  });

  it('/notifications/unread/count (GET) - should return 401 without token', () => {
    return request(app.getHttpServer())
      .get('/notifications/unread/count')
      .expect(401);
  });
});
