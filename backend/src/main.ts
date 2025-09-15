import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  const cfg = new DocumentBuilder().setTitle('LinkMeTur API').setVersion('1.0').build();
  const doc = SwaggerModule.createDocument(app, cfg);
  SwaggerModule.setup('/docs', app, doc);
  const port = Number(process.env.PORT) || 5001;
  await app.listen(port);
  console.log(`API http://localhost:${port} | Swagger /docs`);
}
bootstrap();
