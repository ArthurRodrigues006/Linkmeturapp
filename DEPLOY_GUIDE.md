# 🚀 Guia de Deploy para Render

## Configuração Automática (Recomendado)

### 1. Conecte o repositório ao Render

1. Acesse [render.com](https://render.com)
2. Clique em "New +" > "Web Service"
3. Conecte seu repositório GitHub: `ArthurRodrigues006/Linkmeturapp`

### 2. Configurações do Web Service

```
Name: linkmetur-frontend
Environment: Node
Branch: landing (ou main após merge)
Root Directory: landing page
Build Command: npm install && npm run build
Start Command: npm start
```

### 3. Variáveis de Ambiente Obrigatórias

```
NODE_ENV=production
NEXTAUTH_URL=https://seu-app-name.onrender.com
NEXTAUTH_SECRET=sua-chave-secreta-muito-segura-aqui
JWT_SECRET=outra-chave-secreta-muito-segura-aqui
```

### 4. (Opcional) Banco de Dados PostgreSQL no Render

Se quiser usar banco no Render:
1. Crie um novo PostgreSQL database
2. Adicione a variável: `DATABASE_URL=postgresql://user:pass@host:port/db`

## Configuração Manual Alternativa

### Dockerfile para Deploy

O projeto já possui um `Dockerfile` otimizado para produção na pasta `landing page/`.

### Docker Compose para Produção

Use o arquivo `docker-compose.yml` na raiz do projeto para deploy completo com banco.

## Scripts Importantes

### Teste Local de Produção
```bash
cd "landing page"
npm run build
npm start
```

### Deploy com Docker
```bash
docker-compose up -d
```

### Script de Deploy
```bash
./deploy.sh
```

## Estrutura de Arquivos para Produção

```
Linkmeturapp/
├── landing page/
│   ├── Dockerfile ✅
│   ├── .dockerignore ✅
│   ├── next.config.js ✅ (otimizado)
│   ├── .env.production ✅
│   └── package.json ✅ (scripts atualizados)
├── docker-compose.yml ✅
├── render.yaml ✅ (configuração automática)
└── deploy.sh ✅ (script de deploy)
```

## Checklist de Deploy ✅

- [x] Dockerfile otimizado para Next.js standalone
- [x] next.config.js configurado para produção
- [x] Scripts de build funcionando
- [x] Variáveis de ambiente configuradas
- [x] Docker compose para produção
- [x] Render.yaml para deploy automático
- [x] Script de deploy automatizado
- [x] Build testado localmente

## URLs Após Deploy

- **Frontend**: https://seu-app-name.onrender.com
- **Cadastro**: https://seu-app-name.onrender.com/cadastro

## Problemas Comuns

### Build muito lento
- Render oferece builds gratuitos que podem ser lentos
- Considere upgrade para plano pago se necessário

### Erro de memória no build
- O Next.js 15 com standalone build está otimizado
- Se persistir, considere reduzir dependências

### Erro de variáveis de ambiente
- Verifique se todas as variáveis obrigatórias estão configuradas
- NEXTAUTH_URL deve corresponder exatamente à URL do seu app

## Comandos de Monitoramento

```bash
# Ver logs do container
docker logs nome-do-container

# Status dos serviços
docker-compose ps

# Restart do serviço
docker-compose restart frontend
```

## 🎉 Pronto para Deploy!

Agora é só seguir os passos acima e seu LinkMeTur estará funcionando em produção no Render!