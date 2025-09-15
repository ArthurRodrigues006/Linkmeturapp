import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import * as redisStore from 'cache-manager-ioredis';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CorporationsModule } from './corporations/corporations.module';
import { AuthenticationsModule } from './authentications/authentications.module';
import { ChatsModule } from './chats/chats.module';
import { JobModule } from './job/job.module';
import { ContactsModule } from './contacts/contacts.module';
import { RequestForProposalModule } from './request-for-proposal/request-for-proposal.module';
import { ProposalModule } from './proposal/proposal.module';
import { RequestModule } from './request/request.module';
import { NotificationModule } from './notification/notification.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    // Configura o ConfigModule para gerenciar variáveis de ambiente
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configura o TypeORM de forma assíncrona para usar o ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'linkmetur_user'),
        password: configService.get<string>('DB_PASSWORD', 'linkmetur_password'),
        database: configService.get<string>('DB_DATABASE', 'linkmetur'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>('NODE_ENV') === 'development',
        logging: configService.get<string>('NODE_ENV') === 'development',
        ssl: configService.get<string>('NODE_ENV') === 'production' ? {
          rejectUnauthorized: false,
        } : false,
      }),
      inject: [ConfigService],
    }),

    // Adiciona o Rate Limiting globalmente para prevenir ataques de força bruta
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 segundos
        limit: 10, // 10 requisições por minuto
      },
    ]),

    // Adiciona o Cache globalmente com Redis
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        ttl: 300, // Tempo padrão de cache em segundos
      }),
      inject: [ConfigService],
    }),

    // Módulos da aplicação
    UsersModule,

    CorporationsModule,

    AuthenticationsModule,

    JobModule,

    ChatsModule,

    ContactsModule,

    RequestForProposalModule,

    ProposalModule,

    RequestModule,

    NotificationModule,

    DatabaseModule,

    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      // Adicione esta seção para aplicar o guard de Throttler globalmente
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
