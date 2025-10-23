# 🚀 Guia de Instalação - LinkMeTur

## 📋 Índice

no- [Pré-requisitos](#pré-requisitos)
- [Instalação Rápida](#instalação-rápida)
- [Instalação Manual](#instalação-manual)
- [Configuração](#configuração)
- [Verificação](#verificação)
- [Solução de Problemas](#solução-de-problemas)
- [Próximos Passos](#próximos-passos)

## 🔧 Pré-requisitos

### Obrigatórios
- **Node.js 18+**: [Download](https://nodejs.org/)
- **npm ou yarn**: Gerenciador de pacotes
- **Git**: [Download](https://git-scm.com/)

### Para Produção (Opcional)
- **Docker**: [Download](https://docker.com/)
- **Docker Compose**: Incluído no Docker Desktop

### Verificar Pré-requisitos

```bash
# Verificar versões
node --version    # Deve ser 18+
npm --version     # Qualquer versão recente
git --version     # Qualquer versão recente
docker --version  # Opcional
```

## ⚡ Instalação Rápida (Recomendada)

### 1. Clonar o Repositório

```bash
git clone https://github.com/linkmetur/linkmetur.git
cd linkmetur
```

### 2. Executar Script de Instalação

```bash
# Tornar executável
chmod +x start-dev.sh

# Executar (faz tudo automaticamente)
./start-dev.sh
```

**Pronto!** O script irá:
- ✅ Instalar todas as dependências
- ✅ Configurar o banco de dados
- ✅ Executar migrations
- ✅ Inserir dados iniciais
- ✅ Iniciar a aplicação

### 3. Acessar a Aplicação

- **Frontend**: http://localhost:3000
- **Prisma Studio**: `npm run db:studio`

## 🛠️ Instalação Manual

### 1. Clonar e Instalar

```bash
# Clonar repositório
git clone https://github.com/linkmetur/linkmetur.git
cd linkmetur

# Instalar dependências
npm run install:all
```

### 2. Configurar Banco de Dados

```bash
# Gerar Prisma Client
npm run db:generate

# Aplicar schema ao banco
npm run db:push

# Inserir dados iniciais (opcional)
npm run db:seed
```

### 3. Iniciar Aplicação

```bash
# Desenvolvimento
npm run dev

# Ou com infraestrutura completa
npm run dev:full
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie `.env.local` em `frontend/`:

```bash
# Banco de dados (desenvolvimento)
DATABASE_URL="file:./dev.db"

# Autenticação
NEXTAUTH_SECRET="seu-secret-super-seguro-aqui"
NEXTAUTH_URL="http://localhost:3000"

# URLs da aplicação
NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000"
```

### Configuração de Produção

Para produção, crie `.env.production`:

```bash
# Banco PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/linkmetur"

# Autenticação (produção)
NEXTAUTH_SECRET="secret-super-seguro-producao"
NEXTAUTH_URL="https://seudominio.com"

# URLs de produção
NEXT_PUBLIC_FRONTEND_URL="https://seudominio.com"
```

### Banco de Dados

#### Desenvolvimento (SQLite)
- **Localização**: `frontend/prisma/dev.db`
- **Configuração**: Automática
- **Backup**: Não necessário

#### Produção (PostgreSQL)
```bash
# Iniciar PostgreSQL via Docker
npm run dev:db

# Ou configurar PostgreSQL existente
# Alterar DATABASE_URL no .env.production
```

## ✅ Verificação

### 1. Verificar Serviços

```bash
# Aplicação rodando
curl http://localhost:3000

# Banco de dados funcionando
npm run db:studio
```

### 2. Verificar Funcionalidades

1. **Página Inicial**: http://localhost:3000
2. **Login**: http://localhost:3000/login
3. **Cadastro**: http://localhost:3000/register
4. **Dashboard**: http://localhost:3000/dashboard (após login)

### 3. Dados de Teste

Se executou o seed, use:
```
Email: admin@linkmetur.com.br
Senha: admin123
```

## 🔄 Comandos Úteis

### Desenvolvimento
```bash
npm run dev              # Iniciar em desenvolvimento
npm run build            # Build de produção
npm run start            # Iniciar em produção
npm run lint             # Verificar código
```

### Banco de Dados
```bash
npm run db:generate      # Gerar Prisma Client
npm run db:push          # Aplicar schema
npm run db:seed          # Inserir dados iniciais
npm run db:studio        # Interface visual
```

### Docker (Produção)
```bash
npm run dev:db           # PostgreSQL + Redis
npm run dev:db:down      # Parar serviços
npm run docker:logs      # Ver logs
```

## 🚨 Solução de Problemas

### Erro: "Port 3000 already in use"

```bash
# Encontrar processo usando a porta
lsof -i :3000

# Matar processo
kill -9 <PID>

# Ou usar porta diferente
PORT=3001 npm run dev
```

### Erro: "Database connection failed"

```bash
# Regenerar Prisma Client
npm run db:generate

# Recriar banco
rm frontend/prisma/dev.db
npm run db:push
npm run db:seed
```

### Erro: "Module not found"

```bash
# Limpar e reinstalar dependências
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
npm run install:all
```

### Erro: "Docker not running"

```bash
# Verificar se Docker está rodando
docker info

# Se não estiver, iniciar Docker Desktop
# Ou instalar Docker: https://docker.com
```

### Prisma Client desatualizado

```bash
# Regenerar cliente
npm run db:generate

# Se persistir, limpar cache
npx prisma generate --schema=frontend/prisma/schema.prisma
```

### Problemas de Permissão

```bash
# Linux/Mac - tornar scripts executáveis
chmod +x start-dev.sh
chmod +x scripts/*.sh

# Windows - executar como administrador
# Ou usar Git Bash / WSL
```

## 📊 Verificação de Status

### Health Check Completo

```bash
# Verificar todas as dependências
node --version
npm --version
git --version

# Verificar aplicação
curl -f http://localhost:3000 || echo "App não está rodando"

# Verificar banco
npm run db:studio &
sleep 2
curl -f http://localhost:5555 || echo "Prisma Studio não está rodando"
```

### Logs de Debug

```bash
# Logs da aplicação
npm run dev 2>&1 | tee app.log

# Logs do banco
npm run db:studio 2>&1 | tee db.log

# Logs do Docker
docker-compose -f docker-compose.dev.yml logs -f
```

## 🎯 Próximos Passos

### Após Instalação Bem-sucedida

1. **Explorar a aplicação**: http://localhost:3000
2. **Criar conta**: Usar página de registro
3. **Acessar dashboard**: Ver funcionalidades
4. **Verificar banco**: `npm run db:studio`

### Para Desenvolvimento

1. **Ler documentação**: `ARCHITECTURE.md`
2. **Entender estrutura**: Pasta `frontend/src/`
3. **Modificar código**: Hot reload automático
4. **Testar mudanças**: Refresh automático

### Para Produção

1. **Configurar domínio**: DNS + SSL
2. **Setup PostgreSQL**: Banco de produção
3. **Configurar variáveis**: `.env.production`
4. **Deploy**: Docker ou servidor

## 📞 Suporte

### Se Precisar de Ajuda

- **GitHub Issues**: [Criar issue](https://github.com/linkmetur/linkmetur/issues)
- **Email**: suporte@linkmetur.com.br
- **Documentação**: README.md e ARCHITECTURE.md

### Informações Úteis para Suporte

Sempre inclua:
- Sistema operacional
- Versão do Node.js
- Logs de erro completos
- Passos para reproduzir o problema

---

**🎉 Parabéns! LinkMeTur instalado com sucesso!**

*Última atualização: Janeiro 2025*