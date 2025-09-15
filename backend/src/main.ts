import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({ 
    origin: [
      'http://localhost:3000', 
      'http://localhost:8081', 
      'https://app.linkmetur.com.br'
    ], 
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, Accept'
  });
  const cfg = new DocumentBuilder().setTitle('LinkMeTur API').setVersion('1.0').build();
  const doc = SwaggerModule.createDocument(app, cfg);
  SwaggerModule.setup('/docs', app, doc);
  const port = Number(process.env.BACKEND_PORT) || 3001;
  await app.listen(port);
  console.log(`API http://localhost:${port} | Swagger /docs`);
}
bootstrap();
