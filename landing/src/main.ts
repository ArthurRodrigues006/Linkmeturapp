import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 1. Configuração de CORS para permitir apenas origens confiáveis
  app.enableCors({
    origin: [
      'http://localhost:3000', 
      'http://localhost:3001', 
      'https://app.linkmetur.com.br'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, Accept'
  });
  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
  // 2. Configura interceptors e filtros globais
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // 3. Configura o WebSocket (Socket.IO)
  app.useWebSocketAdapter(new IoAdapter(app));

  // 4. Configuração do Swagger para documentação da API, incluindo autenticação
  const configSwagger = new DocumentBuilder()
    .setTitle('API - Linke Tur')
    .setDescription(
      `A API do Link Me Tur foi desenvolvida para facilitar
       a conexão entre empresas do setor de turismo e prestadores de serviços,
        criando um ecossistema eficiente e integrado. Com funcionalidades 
        robustas e uma estrutura segura, permite que empresas turísticas acessem
         e gerenciem serviços essenciais, otimizando operações e melhorando a 
         experiência dos clientes.`,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentFactory);

  const port = parseInt(process.env.LANDING_PORT ?? '8081');
  await app.listen(port, '0.0.0.0');
  
  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Application is running on: ${await app.getUrl()}`);
  logger.log(`📚 Swagger documentation: ${await app.getUrl()}/api`);
  logger.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
