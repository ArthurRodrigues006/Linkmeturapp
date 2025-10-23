# 🚀 Deploy no Render - LinkMeTur

Este guia contém todas as instruções para fazer deploy da aplicação LinkMeTur no Render.

## 📋 Pré-requisitos

- [x] Conta no [Render](https://render.com)
- [x] Repositório no GitHub
- [x] Projeto configurado com Docker

## 🔧 Configuração Automática

O projeto já está configurado com:
- ✅ `render.yaml` otimizado
- ✅ `Dockerfile` para produção
- ✅ Variáveis de ambiente configuradas
- ✅ Next.js otimizado para produção

## 🚀 Processo de Deploy

### 1. Preparar o Projeto

```bash
# Executar verificações de produção
./scripts/check-production-ready.sh

# Preparar para deploy
./scripts/prepare-deploy.sh
```

### 2. Conectar no Render

1. Acesse [dashboard.render.com](https://dashboard.render.com)
2. Clique em "New +" → "Blueprint"
3. Conecte seu repositório GitHub
4. Selecione este repositório
5. O Render detectará automaticamente o `render.yaml`

### 3. Configurar Banco de Dados

```bash
# Ver instruções detalhadas
./scripts/setup-database-render.sh
```

**Configuração manual no Render:**
- Nome: `linkmetur-postgres`
- Database: `linkmetur`
- User: `linkmetur_user`
- Region: Oregon
- Plan: Starter (gratuito)

### 4. Variáveis de Ambiente

As seguintes variáveis são configuradas automaticamente:
- `DATABASE_URL` - Conectado automaticamente ao banco
- `NEXTAUTH_SECRET` - Gerado automaticamente
- `JWT_SECRET` - Gerado automaticamente
- `NODE_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`

**Variáveis opcionais (configure manualmente):**
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
- `MAIL_HOST`, `MAIL_USER`, `MAIL_PASS`

## 🌐 URLs de Produção

Após o deploy:
- **Frontend**: https://linkmetur-frontend.onrender.com
- **Database**: Gerenciado automaticamente pelo Render

## 📊 Monitoramento

### Logs
```bash
# No dashboard do Render
1. Acesse seu serviço
2. Clique na aba "Logs"
3. Monitore logs em tempo real
```

### Métricas
```bash
# No dashboard do Render
1. Acesse seu serviço
2. Clique na aba "Metrics"
3. Veja CPU, memória, rede
```

## 🔧 Troubleshooting

### Build Falhando
```bash
# Testar build local
cd "landing page"
npm run build

# Verificar logs no Render
# Procurar por erros de dependências ou configuração
```

### Banco de Dados
```bash
# Verificar conexão
# Logs devem mostrar "Database connected successfully"
# Se não conectar, verificar DATABASE_URL
```

### Performance
```bash
# Monitorar métricas no dashboard
# Considerar upgrade de plano se necessário
# Otimizar imagens e assets
```

## 📈 Otimizações de Produção

### Next.js
- ✅ Output standalone para Docker
- ✅ Compressão ativada
- ✅ Headers de segurança
- ✅ Otimização de imagens
- ✅ Cache configurado

### Docker
- ✅ Multi-stage build
- ✅ Node.js Alpine (menor)
- ✅ Dependências otimizadas
- ✅ Usuário não-root

### Render
- ✅ Auto-deploy configurado
- ✅ Health checks
- ✅ Variáveis de ambiente
- ✅ Database integrado

## 🔄 Atualizações

Para fazer deploy de atualizações:

```bash
# 1. Fazer suas mudanças
git add .
git commit -m "feat: nova funcionalidade"

# 2. Push para main
git push origin main

# 3. Render fará deploy automaticamente
# Acompanhe o progresso no dashboard
```

## 🆘 Suporte

### Documentação Oficial
- [Render Docs](https://render.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

### Comandos Úteis
```bash
# Verificar status dos scripts
ls -la scripts/

# Executar verificação completa
./scripts/check-production-ready.sh

# Ver configuração do banco
./scripts/setup-database-render.sh
```

---

## ✅ Checklist de Deploy

- [ ] Projeto testado localmente
- [ ] Scripts de verificação executados
- [ ] Repositório conectado no Render
- [ ] Banco de dados criado
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy bem-sucedido
- [ ] Aplicação acessível na URL
- [ ] Logs verificados
- [ ] Monitoramento configurado

🎉 **Pronto! Sua aplicação está no ar!**