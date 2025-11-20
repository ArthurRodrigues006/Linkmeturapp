# Correção do Erro de Banco de Dados

## Problema Identificado

**Erro**: `Error code 14: Unable to open the database file`

### Causa Raiz
A variável `DATABASE_URL` no arquivo `.env` estava configurada com um caminho absoluto em vez de relativo:

```bash
# ❌ INCORRETO (caminho absoluto)
DATABASE_URL="file:/Users/paulosouza/Development/linkme-tur-test/landing page/prisma/dev.db"

# ✅ CORRETO (caminho relativo)
DATABASE_URL="file:./prisma/dev.db"
```

## Solução Aplicada

### 1. Correção do `.env`
Alterada a `DATABASE_URL` para usar caminho relativo:

```bash
DATABASE_URL="file:./prisma/dev.db"
```

### 2. Recriação do Banco de Dados

```bash
# Remover banco antigo
rm -f prisma/dev.db prisma/dev.db-journal

# Gerar Prisma Client
npm run db:generate

# Criar estrutura do banco
npm run db:push

# Popular com dados iniciais
npm run db:seed
```

### 3. Resultado
✅ Banco de dados criado com sucesso
✅ Dados iniciais inseridos
✅ Credenciais de teste disponíveis

## Credenciais de Acesso

```
Email: admin@linkmetur.com.br
Senha: password
Nível: 3 (super_admin)
```

## Scripts de Manutenção

### Verificação Rápida
```bash
./scripts/check-db.sh
```

Verifica:
- Existência do arquivo de banco
- Configuração correta do `.env`
- Permissões do arquivo

### Correção Completa
```bash
./scripts/fix-database.sh
```

Executa:
- Verificação completa de permissões
- Validação do schema
- Recriação do banco (opcional)
- Seed com dados iniciais

## Próximos Passos

1. **Reinicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

2. **Teste o login**:
   - Acesse: http://localhost:3000/login
   - Email: admin@linkmetur.com.br
   - Senha: password

3. **Visualize o banco (opcional)**:
   ```bash
   npm run db:studio
   ```
   Abre o Prisma Studio em http://localhost:5555

## Prevenção de Problemas Futuros

### ✅ Boas Práticas

1. **Sempre use caminhos relativos** no `.env`:
   ```bash
   DATABASE_URL="file:./prisma/dev.db"
   ```

2. **Verifique o banco antes de iniciar**:
   ```bash
   ./scripts/check-db.sh
   ```

3. **Após mudanças no schema**:
   ```bash
   npm run db:generate  # Regenerar Prisma Client
   npm run db:push      # Atualizar banco
   ```

4. **Reinicie o servidor após alterações no banco**:
   - Ctrl+C para parar
   - `npm run dev` para reiniciar

### ❌ Erros Comuns

1. **Usar caminho absoluto no DATABASE_URL**
   - Causa problemas de portabilidade
   - Pode falhar ao mover o projeto

2. **Esquecer de gerar o Prisma Client**
   - Após mudanças no schema, sempre rode `npm run db:generate`

3. **Não reiniciar o servidor**
   - Mudanças no banco podem requerer restart do Next.js

## Estrutura de Arquivos

```
landing page/
├── .env                    # ✅ DATABASE_URL corrigida
├── prisma/
│   ├── schema.prisma       # ✅ Provider: sqlite
│   ├── dev.db              # ✅ Banco criado
│   └── seed.ts             # Script de dados iniciais
└── scripts/
    ├── check-db.sh         # Verificação rápida
    └── fix-database.sh     # Correção completa
```

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev                 # Iniciar aplicação
npm run dev:db             # Iniciar apenas DB (Docker)
npm run dev:full           # Iniciar DB + App

# Banco de Dados
npm run db:generate        # Gerar Prisma Client
npm run db:push            # Atualizar estrutura
npm run db:seed            # Popular dados
npm run db:studio          # Visualizar dados
npm run db:reset           # Resetar completamente

# Verificação
./scripts/check-db.sh      # Verificar status
./scripts/fix-database.sh  # Corrigir problemas
npm run type-check         # Verificar tipos
npm run lint               # Verificar código
```

## Troubleshooting

### Erro: "Unable to open the database file"
```bash
# Verificar DATABASE_URL
cat .env | grep DATABASE_URL

# Deve mostrar: DATABASE_URL="file:./prisma/dev.db"
# Se estiver diferente, corrija e recrie o banco
```

### Erro: "Prisma Client is outdated"
```bash
npm run db:generate
```

### Erro: "Column not found" ou schema incorreto
```bash
npm run db:push
```

### Banco corrompido
```bash
rm -f prisma/dev.db
npm run db:push
npm run db:seed
```

---

**Data da Correção**: 10/11/2025
**Status**: ✅ Resolvido
**Próxima Ação**: Testar login na aplicação
