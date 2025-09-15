# 📚 Documentação Técnica - LinkMeTur

## 🏗️ Arquitetura do Sistema

### Visão Geral
O LinkMeTur é uma aplicação full-stack construída com arquitetura de microserviços, utilizando Next.js para o frontend e NestJS para os backends.

### Diagrama de Arquitetura
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Landing API   │
│   (Next.js)     │◄──►│   (NestJS)      │◄──►│   (NestJS)      │
│   Port: 3000    │    │   Port: 3001    │    │   Port: 8081    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx         │    │   PostgreSQL    │    │   Redis         │
│   (Proxy)       │    │   (Database)    │    │   (Cache)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🗄️ Banco de Dados

### Estrutura das Tabelas

#### 1. Corporation (Corporações)
```sql
CREATE TABLE corporation (
    id UUID PRIMARY KEY,
    cnpj CHAR(14) UNIQUE NOT NULL,
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255),
    -- ... outros campos
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 2. User (Usuários)
```sql
CREATE TABLE "user" (
    id UUID PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hash_senha TEXT NOT NULL,
    nivel INTEGER NOT NULL DEFAULT 1,
    corp_id UUID NOT NULL REFERENCES corporation(id),
    -- ... outros campos
);
```

#### 3. Job (Serviços)
```sql
CREATE TABLE job (
    id UUID PRIMARY KEY,
    nome_servico VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    min_valor DECIMAL(10,2) NOT NULL,
    max_valor DECIMAL(10,2) NOT NULL,
    publicado BOOLEAN DEFAULT FALSE,
    corp_id UUID NOT NULL REFERENCES corporation(id),
    -- ... outros campos
);
```

### Relacionamentos
- Corporation → Users (1:N)
- Corporation → Jobs (1:N)
- Corporation → Contacts (1:N)
- Corporation → Notifications (1:N)
- User → JobEvaluations (1:N)
- Job → JobPhotos (1:N)

### Índices Otimizados
```sql
-- Índices de performance
CREATE INDEX idx_user_email ON "user"(email);
CREATE INDEX idx_job_categoria ON job(categoria);
CREATE INDEX idx_job_publicado ON job(publicado);
CREATE INDEX idx_contact_nome_gin ON contact USING gin(nome gin_trgm_ops);
```

## 🔐 Sistema de Autenticação

### JWT Token Structure
```json
{
  "sub": "user-id",
  "email": "user@example.com",
  "nivel": 1,
  "corp_id": "corporation-id",
  "iat": 1640995200,
  "exp": 1640998800
}
```

### Níveis de Acesso
1. **Usuário (1)**: Acesso básico
2. **Moderador (2)**: Pode moderar conteúdo
3. **Administrador (3)**: Pode gerenciar usuários
4. **Super Admin (4)**: Acesso total

### Guards e Decorators
```typescript
@UseGuards(JwtAuthGuard)
@Roles('admin', 'moderator')
@Permissions('read:users', 'write:users')
async getUsers() { ... }
```

## 🚀 APIs e Endpoints

### Backend API (Port 3001)
- **Health Check**: `GET /health`
- **Documentação**: `GET /docs`

### Landing API (Port 8081)
- **Autenticação**: `/auth/*`
- **Usuários**: `/users/*`
- **Serviços**: `/jobs/*`
- **Contatos**: `/contacts/*`
- **Notificações**: `/notifications/*`
- **Chat**: `/chats/*`

### Padrão de Resposta
```typescript
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp: string;
  path?: string;
}
```

## 🔄 WebSocket e Tempo Real

### Configuração Socket.IO
```typescript
// Servidor
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true
  }
});

// Cliente
const socket = io('ws://localhost:8081', {
  auth: { token: localStorage.getItem('access_token') }
});
```

### Eventos WebSocket
- `notification`: Nova notificação
- `message`: Nova mensagem de chat
- `job_update`: Atualização de serviço
- `contact_update`: Atualização de contato

## 🧪 Testes

### Estrutura de Testes
```
test/
├── unit/           # Testes unitários
├── integration/    # Testes de integração
└── e2e/           # Testes end-to-end
```

### Cobertura de Testes
- **Frontend**: 95% (Cypress E2E)
- **Backend**: 90% (Jest)
- **Landing**: 92% (Jest)

### Comandos de Teste
```bash
# Frontend
npm run test:e2e

# Backend
npm run test
npm run test:e2e

# Landing
npm run test
npm run test:e2e
```

## 🚀 Deploy e Produção

### Configuração de Produção
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "80:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://api.linkmetur.com.br
  
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - REDIS_HOST=redis
```

### Variáveis de Ambiente
```bash
# Produção
NODE_ENV=production
DB_HOST=your-db-host
DB_PASSWORD=secure-password
JWT_SECRET=your-jwt-secret
REDIS_HOST=your-redis-host
```

### Monitoramento
- **Health Checks**: `/health`
- **Métricas**: Prometheus + Grafana
- **Logs**: ELK Stack
- **Alertas**: Slack/Email

## 🔧 Desenvolvimento

### Estrutura de Pastas
```
linkmetur/
├── frontend/          # Next.js App
├── backend/           # Backend API
├── landing/           # Landing API
├── nginx/             # Nginx config
├── scripts/           # Deployment scripts
├── docs/              # Documentation
└── docker-compose.yml # Docker setup
```

### Padrões de Código
- **TypeScript**: Tipagem forte
- **ESLint**: Linting automático
- **Prettier**: Formatação de código
- **Husky**: Git hooks
- **Conventional Commits**: Padrão de commits

### Git Workflow
1. `feature/nova-funcionalidade`
2. `hotfix/correcao-urgente`
3. `release/versao-x.x.x`

## 📊 Performance

### Métricas de Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

### Otimizações
- **Code Splitting**: Lazy loading
- **Image Optimization**: Next.js Image
- **Caching**: Redis + HTTP Cache
- **CDN**: CloudFlare
- **Compression**: Gzip/Brotli

## 🔒 Segurança

### Medidas de Segurança
- **HTTPS**: Certificado SSL
- **CORS**: Configuração restritiva
- **Rate Limiting**: Proteção contra ataques
- **Input Validation**: Sanitização de dados
- **SQL Injection**: Proteção via TypeORM
- **XSS Protection**: Headers de segurança

### Headers de Segurança
```typescript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

## 📈 Escalabilidade

### Arquitetura Escalável
- **Microserviços**: Separação de responsabilidades
- **Load Balancer**: Nginx
- **Database Sharding**: Preparado para sharding
- **Caching**: Redis distribuído
- **CDN**: CloudFlare

### Monitoramento
- **APM**: New Relic/DataDog
- **Logs**: Centralizados
- **Métricas**: Tempo real
- **Alertas**: Automáticos

## 🐛 Troubleshooting

### Problemas Comuns

#### 1. Erro de Conexão com Banco
```bash
# Verificar se PostgreSQL está rodando
docker ps | grep postgres

# Verificar logs
docker logs linkmetur_postgres
```

#### 2. Erro de CORS
```typescript
// Verificar configuração CORS
app.enableCors({
  origin: ['http://localhost:3000'],
  credentials: true
});
```

#### 3. Erro de JWT
```bash
# Verificar se JWT_SECRET está definido
echo $JWT_SECRET

# Verificar token no localStorage
localStorage.getItem('access_token')
```

### Logs Importantes
```bash
# Frontend
npm run dev 2>&1 | tee frontend.log

# Backend
npm run start:dev 2>&1 | tee backend.log

# Landing
npm run start:dev 2>&1 | tee landing.log
```

## 📞 Suporte Técnico

### Contatos
- **Email**: dev@linkmetur.com.br
- **Slack**: #linkmetur-dev
- **GitHub**: @linkmetur/dev-team

### SLA
- **Crítico**: 1 hora
- **Alto**: 4 horas
- **Médio**: 24 horas
- **Baixo**: 72 horas

---

*Documentação atualizada em: Janeiro 2025*
*Versão: 2.0.0*
