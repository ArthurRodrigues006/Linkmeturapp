# 🚀 GUIA COMPLETO - DEPLOY VPS HOSTINGER UBUNTU 22.04

## 📋 LinkMeTur - Instalação Automatizada com Domínio

### 🎯 **O que será instalado:**
- ✅ **Docker & Docker Compose** - Containerização
- ✅ **Node.js 22 LTS** - Runtime da aplicação
- ✅ **Nginx + SSL (Let's Encrypt)** - Servidor web com HTTPS automático
- ✅ **PostgreSQL + Redis** - Banco de dados e cache
- ✅ **Aplicação LinkMeTur** - Pronta para produção
- ✅ **Firewall UFW + Fail2ban** - Segurança avançada
- ✅ **Sistema de Backup** - Automático e seguro
- ✅ **Monitoramento 24/7** - Logs e alertas
- ✅ **SSL Automático** - Certificados renovados automaticamente

---

## 🎛️ **INSTALAÇÃO EM 3 PASSOS**

### **PASSO 1: Preparar VPS Hostinger**

#### 1.1. **Criar VPS**
1. Acesse [Hostinger VPS](https://hostinger.com.br/vps-hosting)
2. Escolha o plano (mínimo: 2GB RAM, 40GB SSD)
3. Selecione **Ubuntu 22.04 LTS**
4. Anote o **IP do servidor** e **credenciais root**

#### 1.2. **Configurar Domínio**
1. Se domínio for da Hostinger:
   - Acesse hPanel → Domínios → Gerenciar → DNS Zone
   
2. Configurar registros DNS:
```dns
Tipo    Nome    Valor           TTL
A       @       SEU_IP_VPS      3600
A       www     SEU_IP_VPS      3600
```

3. **Para Cloudflare (Recomendado):**
   - Adicione domínio no Cloudflare
   - Aponte nameservers no provedor
   - Configure registros no Cloudflare

#### 1.3. **Aguardar Propagação DNS**
```bash
# Testar se DNS está funcionando:
nslookup seudominio.com
```

---

### **PASSO 2: Executar Instalação Automática**

#### 2.1. **Conectar ao VPS via SSH**
```bash
ssh root@SEU_IP_VPS
```

#### 2.2. **Executar Instalador Único**
```bash
# Baixar e executar instalador
wget -O install.sh https://raw.githubusercontent.com/ArthurRodrigues006/Linkmeturapp/main/install-hostinger-complete.sh

chmod +x install.sh
./install.sh
```

#### 2.3. **Preencher Informações**
O script pedirá:
- 🌐 **Domínio**: `seudominio.com`
- 📧 **Email**: `seuemail@gmail.com` (para SSL)
- 🔑 **Senhas**: Geradas automaticamente

#### 2.4. **Aguardar Instalação**
- ⏱️ **Tempo**: 10-15 minutos
- 📊 **Progresso**: Acompanhe no terminal
- ✅ **Sucesso**: Mensagem de confirmação

---

### **PASSO 3: Verificação e Testes**

#### 3.1. **Verificar Instalação**
```bash
# Dashboard completo
/opt/linkmetur/scripts/dashboard.sh

# Status dos serviços
cd /opt/linkmetur
docker compose -f docker-compose.prod.yml ps
```

#### 3.2. **Testar Site**
1. **HTTP**: `http://seudominio.com` → deve redirecionar para HTTPS
2. **HTTPS**: `https://seudominio.com` → deve carregar o LinkMeTur
3. **WWW**: `https://www.seudominio.com` → deve funcionar

#### 3.3. **Verificar SSL**
```bash
# Testar certificado
openssl s_client -connect seudominio.com:443 -servername seudominio.com
```

---

## 🛠️ **GESTÃO E MANUTENÇÃO**

### **📊 Dashboard de Monitoramento**
```bash
# Ver status geral
/opt/linkmetur/scripts/dashboard.sh

# Monitoramento em tempo real
watch -n 30 /opt/linkmetur/scripts/dashboard.sh
```

### **🔄 Deploy e Atualizações**
```bash
# Deploy de nova versão
/opt/linkmetur/scripts/hostinger-deploy.sh deploy

# Verificar status após deploy
/opt/linkmetur/scripts/hostinger-deploy.sh status

# Rollback se necessário
/opt/linkmetur/scripts/hostinger-deploy.sh rollback
```

### **💾 Backups**
```bash
# Backup completo manual
/opt/linkmetur/scripts/hostinger-backup.sh full

# Listar backups disponíveis
/opt/linkmetur/scripts/hostinger-backup.sh list

# Restaurar backup específico
/opt/linkmetur/scripts/hostinger-backup.sh restore caminho/para/backup.sql.gz
```

### **🔒 Segurança**
```bash
# Verificação de segurança
/opt/linkmetur/scripts/security-check.sh

# Status do firewall
sudo ufw status verbose

# Status do Fail2ban
sudo fail2ban-client status
```

---

## 📁 **ESTRUTURA DE ARQUIVOS**

```
/opt/linkmetur/
├── 📂 landing page/          # Código da aplicação Next.js
├── 📂 nginx/                 # Configurações do Nginx
├── 📂 scripts/               # Scripts de automação
│   ├── hostinger-deploy.sh   # Deploy automático
│   ├── hostinger-backup.sh   # Sistema de backup
│   ├── hostinger-security.sh # Configurações de segurança
│   ├── hostinger-monitoring.sh # Monitoramento
│   └── dashboard.sh          # Dashboard de status
├── 📂 logs/                  # Logs da aplicação
│   ├── app/                  # Logs do Next.js
│   ├── nginx/                # Logs do Nginx
│   ├── monitoring/           # Logs de monitoramento
│   └── alerts/               # Alertas do sistema
├── 📂 backups/               # Backups automáticos
├── 📂 data/                  # Dados persistentes
│   ├── postgres/             # Dados do PostgreSQL
│   ├── redis/                # Dados do Redis
│   └── uploads/              # Arquivos de upload
├── docker-compose.prod.yml   # Configuração Docker
├── .env.production          # Variáveis de ambiente
└── INSTALLATION_INFO.txt    # Informações da instalação
```

---

## 🔧 **COMANDOS ESSENCIAIS**

### **🐳 Docker**
```bash
# Ver containers rodando
docker ps

# Ver logs da aplicação
docker compose -f /opt/linkmetur/docker-compose.prod.yml logs -f app

# Reiniciar serviço específico
docker compose -f /opt/linkmetur/docker-compose.prod.yml restart app

# Rebuild completo
docker compose -f /opt/linkmetur/docker-compose.prod.yml build --no-cache
```

### **🌐 Nginx**
```bash
# Testar configuração
nginx -t

# Recarregar configuração
systemctl reload nginx

# Ver logs
tail -f /var/log/nginx/error.log
```

### **💾 PostgreSQL**
```bash
# Conectar ao banco
docker exec -it linkmetur_postgres_prod psql -U linkmetur_user -d linkmetur

# Backup manual
docker exec linkmetur_postgres_prod pg_dump -U linkmetur_user linkmetur > backup.sql
```

---

## 🚨 **SOLUÇÃO DE PROBLEMAS**

### **❌ Site não carrega**
```bash
# 1. Verificar containers
docker ps

# 2. Verificar logs
docker compose -f /opt/linkmetur/docker-compose.prod.yml logs

# 3. Reiniciar aplicação
docker compose -f /opt/linkmetur/docker-compose.prod.yml restart app

# 4. Verificar DNS
nslookup seudominio.com
```

### **🔒 Problemas com SSL**
```bash
# 1. Verificar certificado
certbot certificates

# 2. Renovar manualmente
certbot renew

# 3. Verificar configuração Nginx
nginx -t
```

### **🐢 Site lento**
```bash
# 1. Ver recursos
/opt/linkmetur/scripts/dashboard.sh

# 2. Ver logs de performance
tail -f /opt/linkmetur/logs/monitoring/resources.log

# 3. Verificar cache Redis
docker exec linkmetur_redis_prod redis-cli info memory
```

### **💾 Problemas com banco**
```bash
# 1. Verificar status do PostgreSQL
docker exec linkmetur_postgres_prod pg_isready -U linkmetur_user

# 2. Ver conexões ativas
docker exec linkmetur_postgres_prod psql -U linkmetur_user -d linkmetur -c "SELECT count(*) FROM pg_stat_activity;"

# 3. Reiniciar se necessário
docker compose -f /opt/linkmetur/docker-compose.prod.yml restart postgres
```

---

## 📈 **OTIMIZAÇÕES DE PERFORMANCE**

### **🚀 Para Sites com Muito Tráfego**
```bash
# 1. Upgrade do plano VPS (4GB+ RAM)
# 2. Ativar cache adicional:
echo "proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=10g;" >> /etc/nginx/nginx.conf

# 3. Configurar CDN (Cloudflare automático)
# 4. Otimizar banco de dados:
docker exec linkmetur_postgres_prod psql -U linkmetur_user -d linkmetur -c "VACUUM ANALYZE;"
```

### **💰 Para Sites com Orçamento Limitado**
```bash
# 1. Usar plano VPS mínimo (2GB RAM)
# 2. Reduzir recursos dos containers:
# Editar docker-compose.prod.yml → memory limits
# 3. Configurar swap se necessário:
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

---

## 🎉 **SUCESSO! SEU SITE ESTÁ NO AR!**

### **🌐 URLs Funcionais:**
- **Site Principal**: `https://seudominio.com`
- **Com WWW**: `https://www.seudominio.com`
- **HTTP** → **HTTPS** (redirecionamento automático)

### **✨ Recursos Ativos:**
- 🔒 **SSL Automático** (Let's Encrypt)
- 🛡️ **Firewall + Anti-hack** (UFW + Fail2ban)
- 💾 **Backup Diário** (Banco + Uploads)
- 📊 **Monitoramento 24/7**
- 🚀 **Performance Otimizada**
- 🔧 **Atualizações Automáticas**

---

## 📞 **SUPORTE**

### **📚 Documentação Completa:**
- `HOSTINGER_DNS_SETUP.md` - Configuração DNS
- `INSTALLATION_INFO.txt` - Informações da instalação
- `/opt/linkmetur/logs/` - Todos os logs

### **🔧 Scripts de Ajuda:**
- Dashboard: `/opt/linkmetur/scripts/dashboard.sh`
- Deploy: `/opt/linkmetur/scripts/hostinger-deploy.sh`
- Backup: `/opt/linkmetur/scripts/hostinger-backup.sh`
- Segurança: `/opt/linkmetur/scripts/security-check.sh`

### **🆘 Em Caso de Problemas:**
1. Execute: `/opt/linkmetur/scripts/dashboard.sh`
2. Verifique: `/opt/linkmetur/logs/alerts/`
3. Consulte: `HOSTINGER_DNS_SETUP.md`

---

## 🎯 **RESULTADO FINAL**

**✅ LinkMeTur rodando em produção profissional!**
- Site seguro com HTTPS
- Performance otimizada
- Backup automático
- Monitoramento ativo
- Pronto para receber usuários!

🚀 **Seu negócio digital está oficialmente online!** 🚀