# 🚀 LinkMeTur - Comandos Rápidos

## Comandos para Iniciar o Projeto

### Opção 1: Script Automático (Recomendado)
```bash
./start-dev.sh
```

### Opção 2: Comandos Manuais

#### 1. Iniciar banco de dados
```bash
docker-compose -f docker-compose.dev.yml up -d
```

#### 2. Instalar dependências
```bash
npm run install:all
```

#### 3. Iniciar aplicação
```bash
npm run dev
```

## URLs Importantes

- **Frontend**: http://localhost:3000
- **Página de Cadastro**: http://localhost:3000/cadastro
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## Comandos Úteis

```bash
# Ver status dos containers
docker ps

# Parar containers
docker-compose -f docker-compose.dev.yml down

# Ver logs dos containers
docker-compose -f docker-compose.dev.yml logs -f

# Rebuild dos containers
docker-compose -f docker-compose.dev.yml build

# Limpar tudo e recomeçar
docker-compose -f docker-compose.dev.yml down -v
```

## Estrutura do Projeto

```
Linkmeturapp/
├── landing page/          # Frontend Next.js
│   ├── app/
│   │   ├── page.tsx      # Landing page principal
│   │   └── cadastro/     # Página de cadastro
│   └── package.json
├── docker-compose.dev.yml # Configuração do banco
├── start-dev.sh          # Script de inicialização
└── package.json          # Scripts principais
```

## Status Atual ✅

- [x] Next.js 15 funcionando
- [x] Landing page responsiva
- [x] Página de cadastro funcional
- [x] PostgreSQL rodando via Docker
- [x] Redis rodando via Docker
- [x] Build sem erros
- [x] TypeScript configurado
- [x] Tailwind CSS funcionando
- [x] Material-UI integrado

## Próximos Passos Sugeridos

1. Adicionar Prisma ORM para banco de dados
2. Implementar autenticação
3. Conectar formulário de cadastro ao banco
4. Adicionar validação de formulários
5. Implementar API routes no Next.js