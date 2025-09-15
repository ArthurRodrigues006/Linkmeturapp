# 🚀 Guia de Instalação - LinkMeTur

## 📋 Índice

- [Instalação Local](#-instalação-local)
- [Instalação em VPS](#-instalação-em-vps)
- [Configuração de Produção](#-configuração-de-produção)
- [Troubleshooting](#-troubleshooting)
- [Suporte](#-suporte)

## 🏠 Instalação Local

### Pré-requisitos

- **Node.js**: 18+ ([Download](https://nodejs.org/))
- **Docker**: ([Download](https://www.docker.com/get-started))
- **Git**: ([Download](https://git-scm.com/))

### Passo 1: Clone o Repositório

```bash
git clone https://github.com/linkmetur/linkmetur.git
cd linkmetur
```

### Passo 2: Instalação Automática

```bash
# Tornar scripts executáveis
chmod +x scripts/*.sh

# Executar instalação automática
./start-dev.sh
```

### Passo 3: Instalação Manual (Alternativa)

```bash
# 1. Instalar dependências
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
cd landing && npm install && cd ..

# 2. Iniciar infraestrutura
docker-compose up -d postgres redis

# 3. Aguardar serviços iniciarem
sleep 10

# 4. Executar migrations
./scripts/setup-database-production.sh

# 5. Iniciar aplicações
cd backend && npm run start:dev &
cd landing && npm run start:dev &
cd frontend && npm run dev &
```

### Passo 4: Verificar Instalação

```bash
# Executar testes
./test-setup.sh

# Verificar URLs
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:3001"
echo "Landing: http://localhost:8081"
```

## 🌐 Instalação em VPS

### Pré-requisitos do VPS

- **Ubuntu 20.04+** ou **CentOS 8+**
- **2GB RAM** mínimo (4GB recomendado)
- **20GB SSD** mínimo
- **Domínio** configurado (opcional)

### Passo 1: Preparar VPS

```bash
# Conectar ao VPS
ssh root@seu-vps-ip

# Atualizar sistema
apt update && apt upgrade -y

# Instalar dependências básicas
apt install -y curl wget git nginx postgresql postgresql-contrib redis-server
```

### Passo 2: Instalar Node.js

```bash
# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Verificar instalação
node --version
npm --version
```

### Passo 3: Instalar Docker

```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Adicionar usuário ao grupo docker
usermod -aG docker $USER

# Instalar Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### Passo 4: Deploy da Aplicação

```bash
# Clone do repositório
git clone https://github.com/linkmetur/linkmetur.git
cd linkmetur

# Configurar ambiente VPS
./scripts/switch-environment.sh vps

# Executar deploy
./scripts/deploy-vps.sh
```

### Passo 5: Configurar SSL (Let's Encrypt)

```bash
# Instalar Certbot
apt install -y certbot python3-certbot-nginx

# Obter certificado SSL
certbot --nginx -d seu-dominio.com

# Verificar renovação automática
certbot renew --dry-run
```

## ⚙️ Configuração de Produção

### Variáveis de Ambiente

#### Frontend (.env.production)
```env
NEXT_PUBLIC_API_URL=https://seu-dominio.com/api
NEXT_PUBLIC_LANDING_URL=https://seu-dominio.com
NEXT_PUBLIC_FRONTEND_URL=https://seu-dominio.com
```

#### Backend (.env.production)
```env
NODE_ENV=production
BACKEND_PORT=3001
```

#### Landing (.env.production)
```env
NODE_ENV=production
LANDING_PORT=8081
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=linkmetur_user
DB_PASSWORD=sua-senha-segura
DB_DATABASE=linkmetur
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=seu-jwt-secret-super-seguro
```

### Configuração do Banco de Dados

```bash
# Criar usuário do banco
sudo -u postgres createuser linkmetur_user
sudo -u postgres createdb linkmetur
sudo -u postgres psql -c "ALTER USER linkmetur_user PASSWORD 'sua-senha-segura';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE linkmetur TO linkmetur_user;"

# Executar migrations
./scripts/setup-database-production.sh
```

### Configuração do Nginx

```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name seu-dominio.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;
    
    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Landing API
    location /landing/ {
        proxy_pass http://localhost:8081/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Configuração do PM2

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar aplicação
pm2 start ecosystem.config.js --env production

# Salvar configuração
pm2 save

# Configurar startup
pm2 startup
```

## 🔧 Comandos Úteis

### Desenvolvimento

```bash
# Iniciar todos os serviços
./start-dev.sh

# Parar todos os serviços
pkill -f "npm run dev"
pkill -f "npm run start:dev"

# Ver logs
tail -f frontend/.next/server.log
tail -f backend/logs/app.log
tail -f landing/logs/app.log
```

### Produção

```bash
# Status dos serviços
pm2 status

# Logs em tempo real
pm2 logs

# Reiniciar todos
pm2 restart all

# Parar todos
pm2 stop all

# Iniciar todos
pm2 start all

# Monitorar recursos
pm2 monit
```

### Banco de Dados

```bash
# Backup
pg_dump -h localhost -U linkmetur_user linkmetur > backup.sql

# Restore
psql -h localhost -U linkmetur_user linkmetur < backup.sql

# Conectar ao banco
psql -h localhost -U linkmetur_user linkmetur
```

## 🧪 Testes

### Testes E2E

```bash
# Frontend
cd frontend
npm run test:e2e

# Backend
cd backend
npm run test:e2e

# Landing
cd landing
npm run test:e2e
```

### Testes de Produção

```bash
# Teste completo
./scripts/test-production.sh

# Teste de conectividade
curl http://localhost:3000
curl http://localhost:3001/health
curl http://localhost:8081/health
```

## 🐛 Troubleshooting

### Problemas Comuns

#### 1. Erro de Porta em Uso

```bash
# Verificar portas em uso
netstat -tulpn | grep :3000
netstat -tulpn | grep :3001
netstat -tulpn | grep :8081

# Matar processo
sudo kill -9 PID_DO_PROCESSO
```

#### 2. Erro de Conexão com Banco

```bash
# Verificar se PostgreSQL está rodando
sudo systemctl status postgresql

# Iniciar PostgreSQL
sudo systemctl start postgresql

# Verificar logs
sudo journalctl -u postgresql
```

#### 3. Erro de Permissão

```bash
# Corrigir permissões
sudo chown -R $USER:$USER /var/log/linkmetur
sudo chmod -R 755 /var/log/linkmetur
```

#### 4. Erro de Memória

```bash
# Verificar uso de memória
free -h

# Limpar cache
sudo sync
echo 3 | sudo tee /proc/sys/vm/drop_caches

# Aumentar swap (se necessário)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Logs Importantes

```bash
# Logs do sistema
sudo journalctl -f

# Logs do Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Logs do PM2
pm2 logs

# Logs da aplicação
tail -f /var/log/linkmetur/*.log
```

## 📊 Monitoramento

### Health Checks

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001/health
- **Landing**: http://localhost:8081/health

### Métricas

```bash
# CPU e Memória
htop

# Disco
df -h

# Rede
netstat -i

# Processos
ps aux | grep node
```

## 🔒 Segurança

### Firewall

```bash
# Configurar UFW
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### SSL/TLS

```bash
# Verificar certificado
openssl x509 -in /etc/letsencrypt/live/seu-dominio.com/fullchain.pem -text -noout

# Testar SSL
curl -I https://seu-dominio.com
```

### Backup

```bash
# Backup automático (crontab)
0 2 * * * pg_dump -h localhost -U linkmetur_user linkmetur > /var/backups/linkmetur_$(date +\%Y\%m\%d).sql
```

## 📞 Suporte

### Contatos

- **Email**: suporte@linkmetur.com.br
- **GitHub**: [Issues](https://github.com/linkmetur/linkmetur/issues)
- **Documentação**: [Wiki](https://github.com/linkmetur/linkmetur/wiki)

### SLA

- **Crítico**: 1 hora
- **Alto**: 4 horas
- **Médio**: 24 horas
- **Baixo**: 72 horas

---

*Guia atualizado em: Janeiro 2025*
*Versão: 2.0.0*
