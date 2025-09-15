# 🚀 Guia de Início Rápido - LinkMeTur

## ⚡ Início Super Rápido (2 minutos)

```bash
# 1. Instalar dependências
npm run install:all

# 2. Iniciar banco e Redis
npm run dev:db

# 3. Iniciar todos os serviços
npm run dev:all
```

**Pronto!** Todos os serviços estarão rodando:
- 🌐 Frontend: http://localhost:3000
- 🔧 Backend API: http://localhost:3001
- 📄 Landing API: http://localhost:8081
- 🗄️ PostgreSQL: localhost:5432
- ⚡ Redis: localhost:6379

## 📋 Verificação Rápida

### 1. Verificar se tudo está funcionando:
```bash
# Health check do Backend
curl http://localhost:3001/health

# Health check do Landing
curl http://localhost:8081/

# Frontend (abra no navegador)
open http://localhost:3000
```

### 2. Documentação das APIs:
- **Backend Swagger**: http://localhost:3001/docs
- **Landing Swagger**: http://localhost:8081/api

## 🛠️ Comandos Úteis

### Desenvolvimento
```bash
# Parar todos os serviços
Ctrl+C

# Reiniciar apenas o banco
npm run dev:db:down && npm run dev:db

# Ver logs do Docker
docker-compose -f docker-compose.dev.yml logs -f
```

### Docker (Alternativa)
```bash
# Usar Docker para tudo
npm run docker:build
npm run docker:up

# Ver logs
npm run docker:logs

# Parar
npm run docker:down
```

## 🔧 Configuração de Ambiente

1. **Copie o arquivo de exemplo**:
```bash
cp env.example .env
```

2. **Edite as variáveis** conforme necessário:
```bash
# Principais configurações
DATABASE_URL=postgresql://linkmetur_user:linkmetur_password@localhost:5432/linkmetur
REDIS_HOST=localhost
REDIS_PORT=6379
```

## 🚨 Solução de Problemas

### Porta já em uso
```bash
# Verificar portas em uso
lsof -i :3000,3001,8081,5432,6379

# Parar processos
sudo kill -9 <PID>
```

### Banco não conecta
```bash
# Verificar se PostgreSQL está rodando
docker ps | grep postgres

# Reiniciar banco
npm run dev:db:down && npm run dev:db
```

### Dependências não instaladas
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
rm -rf backend/node_modules backend/package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf landing/node_modules landing/package-lock.json

npm run install:all
```

## 📚 Próximos Passos

1. **Explore a documentação**: Acesse os Swaggers das APIs
2. **Configure o banco**: Execute as migrações se necessário
3. **Desenvolva**: Comece a implementar suas funcionalidades
4. **Teste**: Use os endpoints de health check

## 🆘 Precisa de Ajuda?

- 📖 **Documentação completa**: `UNIFIED_ARCHITECTURE.md`
- 🐛 **Problemas**: Verifique os logs com `npm run docker:logs`
- 🔧 **Configuração**: Edite o arquivo `.env`

---

**Dica**: Mantenha este arquivo sempre à mão para consultas rápidas! 🎯
