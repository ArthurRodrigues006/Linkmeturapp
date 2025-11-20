# Troubleshooting - Sistema de Login

## Problema Reportado

**Erro**: `Error code 14: Unable to open the database file` ao tentar fazer login

**Causa**: Incompatibilidade entre caminho relativo e configuração do Next.js

---

## 🔍 Diagnóstico Realizado

### 1. Configuração do Prisma Client

Identificados **dois arquivos de configuração**:
- `/lib/prisma.ts` - Versão alternativa
- `/lib/db.ts` - **Usado pela rota de login** ✅

### 2. Estado do Banco de Dados

✅ **Banco criado e populado com sucesso**
- Localização: `prisma/dev.db`
- Tamanho: 132KB
- Dados: 4 usuários, 4 corporações, 8 categorias

### 3. Teste de Conexão

✅ **Conexão funcionando via CLI**
```bash
npx tsx scripts/test-db-connection.ts
```

Resultado:
- Usuário admin encontrado
- Dados acessíveis via Prisma Client
- Query do login funciona corretamente

### 4. Problema Identificado

❌ **Incompatibilidade de caminho no Next.js**

O `next.config.js` tem:
```javascript
outputFileTracingRoot: require('path').join(__dirname, '../')
```

Isso muda o working directory do Next.js, fazendo com que o caminho relativo `file:./prisma/dev.db` não funcione corretamente durante a execução da aplicação.

---

## ✅ Solução Implementada

### 1. Criado `.env.local` com Caminho Absoluto

Arquivo: `/landing page/.env.local`

```bash
# Database - Absolute path for Next.js compatibility
DATABASE_URL="file:/Users/paulosouza/Development/linkme-tur-test/landing page/prisma/dev.db"
```

**Por que `.env.local`?**
- Tem prioridade sobre `.env`
- É ignorado pelo git (segurança)
- Permite configurações específicas por desenvolvedor

### 2. Mantido `.env` com Caminho Relativo

Arquivo: `/landing page/.env`

```bash
# Database - Relative path (for scripts and Prisma CLI)
DATABASE_URL="file:./prisma/dev.db"
```

**Por que manter?**
- Scripts de linha de comando funcionam corretamente
- Compatibilidade com Prisma CLI
- Portabilidade do projeto

---

## 📋 Próximos Passos

### 1. Reiniciar o Servidor de Desenvolvimento

**IMPORTANTE**: O Next.js precisa ser reiniciado para carregar o novo `.env.local`

```bash
# Parar o servidor atual (Ctrl+C)
# Reiniciar
npm run dev
```

### 2. Testar Login via Interface

1. Acesse: http://localhost:3000/login
2. Use as credenciais:
   - **Email**: `admin@linkmetur.com.br`
   - **Senha**: `password`
3. Verifique se o login funciona

### 3. Testar Login via API (Opcional)

```bash
./scripts/test-login.sh
```

Este script testa:
- ✅ Servidor está respondendo
- ✅ Login com credenciais corretas
- ✅ Rejeição de senha incorreta
- ✅ Rejeição de usuário inexistente

---

## 🛠️ Scripts de Manutenção

### Verificar Estado do Banco

```bash
./scripts/check-db.sh
```

Mostra:
- Existência do arquivo
- Tamanho e permissões
- Configuração do DATABASE_URL

### Testar Conexão Detalhada

```bash
npx tsx scripts/test-db-connection.ts
```

Mostra:
- Quantidade de registros
- Detalhes do usuário admin
- Lista de todos os usuários
- Teste da query de login

### Corrigir Problemas do Banco

```bash
./scripts/fix-database.sh
```

Executa:
- Verificação de permissões
- Validação do schema
- Opção de recriar banco
- Seed com dados iniciais

### Testar API de Login

```bash
./scripts/test-login.sh
```

Testa:
- Disponibilidade do servidor
- Login com credenciais válidas
- Validação de senha incorreta
- Validação de usuário inexistente

---

## 🔐 Credenciais de Teste

### Usuário Admin

```
Email: admin@linkmetur.com.br
Senha: password
Nível: 3 (super_admin)
```

### Outros Usuários de Teste

Execute para ver todos:
```bash
npx tsx scripts/test-db-connection.ts
```

---

## ❓ Troubleshooting Adicional

### Erro: "Unable to open the database file"

**Verificar**:
1. Arquivo `.env.local` existe?
2. DATABASE_URL tem caminho absoluto completo?
3. Servidor foi reiniciado após criar `.env.local`?

**Solução**:
```bash
# Verificar arquivo
ls -la .env.local

# Se não existir, criar novamente
cat > .env.local << 'EOF'
DATABASE_URL="file:/Users/paulosouza/Development/linkme-tur-test/landing page/prisma/dev.db"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="dev-secret-change-in-production-min-32-chars-required"
JWT_SECRET="dev-jwt-secret-change-in-production-min-32-chars"
NODE_ENV=development
EOF

# Reiniciar servidor
npm run dev
```

### Erro: "Credenciais inválidas"

**Verificar**:
1. Banco foi populado com dados?
2. Email está correto?
3. Senha está correta?

**Solução**:
```bash
# Verificar dados no banco
npx tsx scripts/test-db-connection.ts

# Se necessário, repovoar banco
npm run db:seed
```

### Erro: "Prisma Client is outdated"

**Solução**:
```bash
npm run db:generate
```

### Servidor não inicia

**Verificar**:
```bash
# Porta 3000 está disponível?
lsof -i :3000

# Se estiver ocupada, matar processo
kill -9 <PID>

# Ou usar porta diferente
PORT=3001 npm run dev
```

---

## 📊 Fluxo de Login

### 1. Frontend (Login Page)

**Localização**: `app/login/page.tsx`

```typescript
// Envia credenciais para API
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
```

### 2. API Route (Backend)

**Localização**: `app/api/auth/login/route.ts`

```typescript
// 1. Validar dados de entrada
if (!email || !password) return error

// 2. Buscar usuário no banco
const user = await prisma.user.findUnique({
  where: { email },
  include: { corporation: true }
})

// 3. Verificar senha
const isValid = await bcrypt.compare(password, user.password)

// 4. Verificar se está ativo
if (!user.active) return error

// 5. Gerar JWT token
const token = jwt.sign({ userId, email, level }, JWT_SECRET)

// 6. Retornar usuário e token
return { success: true, data: { user, token } }
```

### 3. Prisma Client

**Localização**: `lib/db.ts`

```typescript
export const prisma = globalThis.prisma || new PrismaClient()
```

**Conexão**: Via DATABASE_URL do `.env.local`

### 4. Banco de Dados

**Localização**: `prisma/dev.db` (SQLite)

**Schema**: `prisma/schema.prisma`

---

## 🔒 Segurança

### Senhas

✅ **Hasheadas com bcrypt** (10 rounds)
```typescript
const hashedPassword = await bcrypt.hash(password, 10)
```

### Tokens JWT

✅ **Assinados com secret**
```typescript
jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
```

### Variáveis Sensíveis

✅ **Nunca commitadas**
- `.env.local` está no `.gitignore`
- Secrets não estão em código

---

## 📝 Logs e Debugging

### Habilitar Logs do Prisma

**Em desenvolvimento**:
```typescript
// lib/db.ts
new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})
```

### Ver Logs do Next.js

```bash
# Console do terminal onde npm run dev está rodando
# Mostra queries SQL e erros
```

### Ver Logs da API

```typescript
// app/api/auth/login/route.ts
console.log('Tentativa de login:', email)
console.error('Erro no login:', error)
```

---

## 📈 Monitoramento

### Verificar Performance

```bash
# Prisma Studio (GUI)
npm run db:studio

# Ver queries executadas
# (logs aparecem no terminal do npm run dev)
```

### Verificar Integridade

```bash
# Verificação rápida
./scripts/check-db.sh

# Verificação completa
npx tsx scripts/test-db-connection.ts
```

---

## ✅ Checklist de Resolução

- [x] Banco de dados criado e populado
- [x] Prisma Client gerado
- [x] `.env.local` criado com caminho absoluto
- [x] Scripts de teste criados
- [ ] **Servidor reiniciado** ← PRÓXIMO PASSO
- [ ] Login testado via interface
- [ ] Login testado via API

---

## 📚 Referências

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [JWT Authentication Best Practices](https://jwt.io/introduction)

---

**Data**: 10/11/2025
**Status**: ✅ Solução implementada, aguardando reinício do servidor
**Próxima Ação**: Reiniciar `npm run dev` e testar login
