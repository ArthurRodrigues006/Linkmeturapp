# Arquitetura Unificada - LinkMeTur

## Visão Geral

O projeto LinkMeTur foi unificado para funcionar como um ecossistema integrado, onde todos os componentes (API, Backend, Frontend e Landing Page) conversam sincronamente através de uma arquitetura de microserviços bem estruturada.

## Estrutura do Projeto

```
LinkMeTur/
├── backend/          # API Backend (NestJS) - Porta 3001
├── frontend/         # Frontend Next.js - Porta 3000
├── landing/          # Landing Page API (NestJS) - Porta 8081
├── docker-compose.yml
├── docker-compose.dev.yml
└── package.json      # Workspace principal
```

## Serviços e Portas

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| Frontend | 3000 | Interface do usuário (Next.js) |
| Backend API | 3001 | API principal (NestJS) |
| Landing API | 8081 | API da landing page (NestJS) |
| PostgreSQL | 5432 | Banco de dados principal |
| Redis | 6379 | Cache e sessões |

## Comunicação Entre Serviços

### 1. Frontend → Backend API
- **Rota**: `http://localhost:3000/api/*` → `http://localhost:3001/*`
- **Configuração**: Rewrites no `next.config.ts`
- **CORS**: Configurado para permitir comunicação

### 2. Frontend → Landing API
- **Rota**: `http://localhost:3000/landing/*` → `http://localhost:8081/*`
- **Configuração**: Rewrites no `next.config.ts`
- **CORS**: Configurado para permitir comunicação

### 3. Backend ↔ Landing
- **Comunicação**: Direta via HTTP/WebSocket
- **CORS**: Configurado para permitir comunicação entre APIs

## Banco de Dados Compartilhado

Ambos os serviços (Backend e Landing) compartilham o mesmo banco PostgreSQL:
- **URL**: `postgresql://linkmetur_user:linkmetur_password@localhost:5432/linkmetur`
- **Sincronização**: Automática em desenvolvimento
- **Entidades**: Compartilhadas entre os serviços

## Cache Redis Compartilhado

Ambos os serviços utilizam o mesmo Redis para:
- Cache de dados
- Sessões de usuário
- Rate limiting
- WebSocket connections

## Scripts de Desenvolvimento

### Desenvolvimento Local (Recomendado)
```bash
# Instalar dependências
npm run install:all

# Iniciar banco e Redis
npm run dev:db

# Iniciar todos os serviços
npm run dev:all

# Ou iniciar tudo de uma vez
npm run dev:full
```

### Desenvolvimento com Docker
```bash
# Construir e iniciar todos os serviços
npm run docker:build
npm run docker:up

# Ver logs
npm run docker:logs

# Parar serviços
npm run docker:down
```

### Scripts Individuais
```bash
# Backend apenas
npm run dev:backend

# Frontend apenas
npm run dev:frontend

# Landing apenas
npm run dev:landing
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `env.example`:

```bash
# Configurações do Banco de Dados
DATABASE_URL=postgresql://linkmetur_user:linkmetur_password@localhost:5432/linkmetur

# Configurações do Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Configurações dos Serviços
BACKEND_PORT=3001
FRONTEND_PORT=3000
LANDING_PORT=8081

# URLs dos Serviços
BACKEND_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
LANDING_URL=http://localhost:8081
```

## Fluxo de Dados

1. **Usuário acessa Frontend** (localhost:3000)
2. **Frontend faz requisições** para Backend API (localhost:3001)
3. **Backend processa** e salva no PostgreSQL
4. **Backend utiliza Redis** para cache e sessões
5. **Landing Page** pode ser acessada diretamente (localhost:8081)
6. **Comunicação WebSocket** entre todos os serviços

## Segurança

- **CORS** configurado para origens específicas
- **Rate Limiting** implementado globalmente
- **JWT** para autenticação
- **Validação** de dados com class-validator
- **Helmet** para headers de segurança

## Monitoramento

- **Swagger** disponível em:
  - Backend: `http://localhost:3001/docs`
  - Landing: `http://localhost:8081/api`
- **Logs** centralizados via Docker
- **Health checks** implementados

## Próximos Passos

1. Configurar CI/CD
2. Implementar monitoramento com Prometheus/Grafana
3. Adicionar testes de integração
4. Configurar load balancer
5. Implementar backup automático do banco

## Troubleshooting

### Problemas Comuns

1. **Porta já em uso**: Verifique se não há outros serviços rodando nas portas
2. **CORS errors**: Verifique as configurações de CORS nos serviços
3. **Banco não conecta**: Verifique se o PostgreSQL está rodando
4. **Redis não conecta**: Verifique se o Redis está rodando

### Comandos de Diagnóstico

```bash
# Verificar portas em uso
lsof -i :3000,3001,8081,5432,6379

# Ver logs dos containers
docker-compose logs -f

# Reiniciar serviços
npm run docker:down && npm run docker:up
```
