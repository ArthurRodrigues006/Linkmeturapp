#!/bin/bash

# ====================================================================
# LINKME TUR - INSTALADOR AUTOMÁTICO PARA VPS HOSTINGER (Ubuntu 22.04)
# ====================================================================
# 
# Este script instala e configura automaticamente:
# - Docker & Docker Compose
# - Node.js 22 LTS
# - Nginx com SSL automático (Let's Encrypt)
# - PostgreSQL + Redis via Docker
# - Aplicação LinkMeTur em produção
# - Firewall UFW + Fail2ban
# - Monitoramento básico
#
# Uso: wget -qO- https://raw.githubusercontent.com/SEU_USER/Linkmeturapp/main/install-hostinger.sh | bash
# ====================================================================

set -euo pipefail

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variáveis de configuração
DOMAIN=""
EMAIL=""
DB_PASSWORD=""
JWT_SECRET=""
NEXTAUTH_SECRET=""
PROJECT_DIR="/opt/linkmetur"
LOG_FILE="/var/log/linkmetur-install.log"

# Função para logging
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

# Função para gerar senhas seguras
generate_password() {
    openssl rand -base64 32 | tr -d "=+/" | cut -c1-25
}

# Função para verificar se o comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Banner de boas-vindas
show_banner() {
    clear
    echo -e "${BLUE}"
    cat << 'EOF'
╔══════════════════════════════════════════════════════════════╗
║                     LINKME TUR INSTALLER                     ║
║                                                              ║
║              Instalação Automática VPS Hostinger            ║
║                     Ubuntu 22.04 LTS                        ║
╚══════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
}

# Função para coletar informações do usuário
collect_info() {
    log "Coletando informações de configuração..."
    
    echo -e "\n${YELLOW}=== CONFIGURAÇÃO INICIAL ===${NC}"
    
    # Domain
    while [[ -z "$DOMAIN" ]]; do
        read -p "🌐 Digite seu domínio (ex: meusite.com): " DOMAIN
        if [[ ! "$DOMAIN" =~ ^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$ ]]; then
            error "Domínio inválido. Use apenas letras, números e hífens."
            DOMAIN=""
        fi
    done
    
    # Email for SSL
    while [[ -z "$EMAIL" ]]; do
        read -p "📧 Digite seu email para certificados SSL: " EMAIL
        if [[ ! "$EMAIL" =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
            error "Email inválido."
            EMAIL=""
        fi
    done
    
    # Gerar senhas automaticamente
    DB_PASSWORD=$(generate_password)
    JWT_SECRET=$(generate_password)
    NEXTAUTH_SECRET=$(generate_password)
    
    log "✅ Configurações coletadas com sucesso"
    info "Domínio: $DOMAIN"
    info "Email: $EMAIL"
    info "Senhas geradas automaticamente"
}

# Função para verificar requisitos do sistema
check_requirements() {
    log "Verificando requisitos do sistema..."
    
    # Verificar se é Ubuntu 22.04
    if [[ ! -f /etc/os-release ]] || ! grep -q "Ubuntu 22.04" /etc/os-release; then
        error "Este script é para Ubuntu 22.04 LTS apenas"
    fi
    
    # Verificar se é root
    if [[ $EUID -ne 0 ]]; then
        error "Este script deve ser executado como root (use sudo)"
    fi
    
    # Verificar conexão com internet
    if ! ping -c 1 google.com &> /dev/null; then
        error "Sem conexão com internet"
    fi
    
    # Verificar memória RAM (mínimo 1GB)
    MEMORY=$(free -m | awk 'NR==2{print $2}')
    if [[ $MEMORY -lt 900 ]]; then
        warning "RAM baixa detectada (${MEMORY}MB). Recomendado: 2GB+"
    fi
    
    # Verificar espaço em disco (mínimo 10GB)
    DISK=$(df / | awk 'NR==2 {print $4}')
    if [[ $DISK -lt 10485760 ]]; then # 10GB em KB
        warning "Espaço em disco baixo. Recomendado: 20GB+"
    fi
    
    log "✅ Requisitos do sistema verificados"
}

# Atualizar sistema
update_system() {
    log "Atualizando sistema Ubuntu 22.04..."
    
    export DEBIAN_FRONTEND=noninteractive
    
    apt-get update -y
    apt-get upgrade -y
    
    # Instalar dependências básicas
    apt-get install -y \
        curl \
        wget \
        git \
        unzip \
        software-properties-common \
        apt-transport-https \
        ca-certificates \
        gnupg \
        lsb-release \
        htop \
        ncdu \
        tree \
        vim \
        ufw \
        fail2ban \
        logrotate \
        cron
    
    log "✅ Sistema atualizado com sucesso"
}

# Instalar Docker
install_docker() {
    log "Instalando Docker..."
    
    # Remover versões antigas se existirem
    apt-get remove -y docker docker-engine docker.io containerd runc || true
    
    # Adicionar repositório oficial do Docker
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    apt-get update -y
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    
    # Iniciar e habilitar Docker
    systemctl start docker
    systemctl enable docker
    
    # Verificar instalação
    if ! docker --version &> /dev/null; then
        error "Falha na instalação do Docker"
    fi
    
    log "✅ Docker instalado com sucesso: $(docker --version)"
}

# Instalar Node.js
install_nodejs() {
    log "Instalando Node.js 22 LTS..."
    
    # Usar NodeSource para Node.js 22
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
    apt-get install -y nodejs
    
    # Verificar instalação
    NODE_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)
    
    if [[ ! "$NODE_VERSION" =~ ^v22 ]]; then
        error "Falha na instalação do Node.js 22"
    fi
    
    log "✅ Node.js instalado: $NODE_VERSION"
    log "✅ npm instalado: $NPM_VERSION"
}

# Instalar Nginx
install_nginx() {
    log "Instalando Nginx..."
    
    apt-get install -y nginx
    
    # Iniciar e habilitar Nginx
    systemctl start nginx
    systemctl enable nginx
    
    # Verificar se está rodando
    if ! systemctl is-active --quiet nginx; then
        error "Nginx não está rodando"
    fi
    
    log "✅ Nginx instalado e rodando"
}

# Instalar Certbot para SSL
install_certbot() {
    log "Instalando Certbot para SSL automático..."
    
    apt-get install -y certbot python3-certbot-nginx
    
    log "✅ Certbot instalado"
}

# Configurar firewall
setup_firewall() {
    log "Configurando firewall UFW..."
    
    # Resetar UFW
    ufw --force reset
    
    # Regras básicas
    ufw default deny incoming
    ufw default allow outgoing
    
    # Permitir SSH (importante!)
    ufw allow ssh
    ufw allow 22/tcp
    
    # Permitir HTTP/HTTPS
    ufw allow 80/tcp
    ufw allow 443/tcp
    
    # Habilitar UFW
    ufw --force enable
    
    log "✅ Firewall configurado"
}

# Configurar Fail2ban
setup_fail2ban() {
    log "Configurando Fail2ban..."
    
    # Backup da configuração original
    cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.conf.backup
    
    # Criar configuração customizada
    cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
# Banir por 10 minutos
bantime = 600
# Janela de tempo para contar tentativas (5 minutos)
findtime = 300
# Máximo de tentativas antes do ban
maxretry = 5
# IP whitelist (ajuste conforme necessário)
ignoreip = 127.0.0.1/8 ::1

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 10
EOF

    # Reiniciar Fail2ban
    systemctl restart fail2ban
    systemctl enable fail2ban
    
    log "✅ Fail2ban configurado"
}

# Baixar código do projeto
download_project() {
    log "Baixando código do projeto..."
    
    # Criar diretório do projeto
    mkdir -p "$PROJECT_DIR"
    cd "$PROJECT_DIR"
    
    # Clonar repositório
    git clone https://github.com/ArthurRodrigues006/Linkmeturapp.git .
    
    # Verificar se o download foi bem-sucedido
    if [[ ! -f "package.json" ]]; then
        error "Falha ao baixar o projeto"
    fi
    
    log "✅ Projeto baixado em $PROJECT_DIR"
}

# Continua no próximo arquivo...
EOF# Continução do install-hostinger.sh

# Criar arquivos de configuração
create_configs() {
    log "Criando arquivos de configuração..."
    
    # Docker Compose para produção
    cat > "$PROJECT_DIR/docker-compose.prod.yml" << EOF
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: linkmetur_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: linkmetur
      POSTGRES_USER: linkmetur_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/postgres-init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - linkmetur_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U linkmetur_user -d linkmetur"]
      interval: 30s
      timeout: 10s
      retries: 3
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: linkmetur_redis
    restart: unless-stopped
    command: redis-server --appendonly yes --requirepass ${DB_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - linkmetur_network
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 30s
      timeout: 3s
      retries: 3
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # Next.js Application
  app:
    build:
      context: ./landing page
      dockerfile: Dockerfile
    container_name: linkmetur_app
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
      - DATABASE_URL=postgresql://linkmetur_user:${DB_PASSWORD}@postgres:5432/linkmetur
      - NEXTAUTH_URL=https://${DOMAIN}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - JWT_SECRET=${JWT_SECRET}
      - REDIS_URL=redis://:${DB_PASSWORD}@redis:6379
      - NEXT_PUBLIC_API_URL=https://${DOMAIN}/api
      - NEXT_PUBLIC_FRONTEND_URL=https://${DOMAIN}
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - linkmetur_network
    volumes:
      - app_uploads:/app/public/uploads
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: linkmetur_nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.prod.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/sites-available:/etc/nginx/sites-available:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
      - /var/www/certbot:/var/www/certbot:ro
      - nginx_logs:/var/log/nginx
    depends_on:
      - app
    networks:
      - linkmetur_network
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  app_uploads:
    driver: local
  nginx_logs:
    driver: local

networks:
  linkmetur_network:
    driver: bridge
EOF

    # Arquivo .env para produção
    cat > "$PROJECT_DIR/.env.production" << EOF
# LinkMeTur Production Environment
NODE_ENV=production
DOMAIN=${DOMAIN}

# Database
DATABASE_URL=postgresql://linkmetur_user:${DB_PASSWORD}@postgres:5432/linkmetur
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=linkmetur_user
DB_PASSWORD=${DB_PASSWORD}
DB_DATABASE=linkmetur

# Redis
REDIS_URL=redis://:${DB_PASSWORD}@redis:6379
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=${DB_PASSWORD}

# Authentication
NEXTAUTH_URL=https://${DOMAIN}
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
JWT_SECRET=${JWT_SECRET}

# Application URLs
NEXT_PUBLIC_API_URL=https://${DOMAIN}/api
NEXT_PUBLIC_FRONTEND_URL=https://${DOMAIN}

# SSL Email
SSL_EMAIL=${EMAIL}

# Security
BCRYPT_ROUNDS=12

# Logging
LOG_LEVEL=info
EOF

    log "✅ Arquivos de configuração criados"
}

# Configurar Nginx
setup_nginx() {
    log "Configurando Nginx..."
    
    mkdir -p "$PROJECT_DIR/nginx/sites-available"
    
    # Configuração principal do Nginx
    cat > "$PROJECT_DIR/nginx/nginx.prod.conf" << 'EOF'
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                   '$status $body_bytes_sent "$http_referer" '
                   '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    # Performance
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 20M;

    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private must-revalidate no_last_modified no_etag auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/x-javascript
        application/xml+rss
        application/javascript
        application/json
        image/svg+xml;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;

    # Include sites
    include /etc/nginx/sites-available/*;
}
EOF

    # Configuração do site
    cat > "$PROJECT_DIR/nginx/sites-available/linkmetur.conf" << EOF
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    # Let's Encrypt challenge
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Redirect all other traffic to HTTPS
    location / {
        return 301 https://${DOMAIN}\$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name ${DOMAIN} www.${DOMAIN};

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    
    # SSL Security
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Security Headers
    add_header Strict-Transport-Security "max-age=63072000" always;
    
    # Proxy to Next.js app
    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # API rate limiting
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Login rate limiting
    location /api/auth/ {
        limit_req zone=login burst=5 nodelay;
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)\$ {
        proxy_pass http://app:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_set_header Host \$host;
    }

    # Health check
    location /health {
        access_log off;
        proxy_pass http://app:3000/api/health;
        proxy_set_header Host \$host;
    }
}
EOF

    log "✅ Nginx configurado"
}

# Continua...
EOF# Continuação final do install-hostinger.sh

# Setup SSL com Let's Encrypt
setup_ssl() {
    log "Configurando SSL com Let's Encrypt..."
    
    # Parar Nginx temporariamente
    systemctl stop nginx
    
    # Obter certificado SSL
    certbot certonly \
        --standalone \
        --non-interactive \
        --agree-tos \
        --email "$EMAIL" \
        --domains "$DOMAIN" \
        --rsa-key-size 4096
    
    if [[ $? -ne 0 ]]; then
        error "Falha ao obter certificado SSL"
    fi
    
    # Configurar renovação automática
    echo "0 12 * * * /usr/bin/certbot renew --quiet && systemctl reload nginx" | crontab -
    
    log "✅ SSL configurado com sucesso"
}

# Build e start da aplicação
deploy_application() {
    log "Fazendo build e deploy da aplicação..."
    
    cd "$PROJECT_DIR"
    
    # Carregar variáveis de ambiente
    source .env.production
    
    # Build e start com Docker Compose
    docker compose -f docker-compose.prod.yml build --no-cache
    docker compose -f docker-compose.prod.yml up -d
    
    # Aguardar serviços ficarem prontos
    log "Aguardando serviços ficarem prontos..."
    sleep 30
    
    # Verificar se os serviços estão rodando
    if ! docker compose -f docker-compose.prod.yml ps | grep -q "Up"; then
        error "Falha ao iniciar os serviços"
    fi
    
    # Iniciar Nginx
    systemctl start nginx
    
    log "✅ Aplicação deployada com sucesso"
}

# Criar scripts de manutenção
create_maintenance_scripts() {
    log "Criando scripts de manutenção..."
    
    mkdir -p "$PROJECT_DIR/maintenance"
    
    # Script de backup do banco
    cat > "$PROJECT_DIR/maintenance/backup-database.sh" << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/linkmetur/backups"
DATE=$(date +"%Y%m%d_%H%M%S")
mkdir -p "$BACKUP_DIR"

# Backup PostgreSQL
docker exec linkmetur_postgres pg_dump -U linkmetur_user -d linkmetur > "$BACKUP_DIR/db_backup_$DATE.sql"

# Manter apenas os últimos 7 backups
find "$BACKUP_DIR" -name "db_backup_*.sql" -type f -mtime +7 -delete

echo "Backup criado: $BACKUP_DIR/db_backup_$DATE.sql"
EOF

    # Script de update
    cat > "$PROJECT_DIR/maintenance/update-app.sh" << 'EOF'
#!/bin/bash
PROJECT_DIR="/opt/linkmetur"
cd "$PROJECT_DIR"

echo "Atualizando aplicação..."

# Backup antes do update
./maintenance/backup-database.sh

# Pull latest changes
git pull origin main

# Rebuild and restart
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d

echo "Aplicação atualizada com sucesso"
EOF

    # Script de monitoramento
    cat > "$PROJECT_DIR/maintenance/monitor.sh" << 'EOF'
#!/bin/bash
PROJECT_DIR="/opt/linkmetur"
cd "$PROJECT_DIR"

echo "=== STATUS DOS SERVIÇOS ==="
docker compose -f docker-compose.prod.yml ps

echo ""
echo "=== USO DE RECURSOS ==="
docker stats --no-stream

echo ""
echo "=== LOGS RECENTES ==="
docker compose -f docker-compose.prod.yml logs --tail=20
EOF

    # Script de limpeza
    cat > "$PROJECT_DIR/maintenance/cleanup.sh" << 'EOF'
#!/bin/bash
echo "Limpando sistema..."

# Limpar containers e imagens não utilizadas
docker system prune -f

# Limpar logs antigos
journalctl --vacuum-time=7d

# Limpar cache do apt
apt-get autoremove -y
apt-get autoclean

echo "Limpeza concluída"
EOF

    # Tornar scripts executáveis
    chmod +x "$PROJECT_DIR/maintenance/"*.sh
    
    # Criar cron job para backup diário
    echo "0 2 * * * $PROJECT_DIR/maintenance/backup-database.sh" | crontab -
    
    log "✅ Scripts de manutenção criados"
}

# Configurar monitoramento básico
setup_monitoring() {
    log "Configurando monitoramento básico..."
    
    # Criar script de health check
    cat > "$PROJECT_DIR/maintenance/healthcheck.sh" << 'EOF'
#!/bin/bash
PROJECT_DIR="/opt/linkmetur"
cd "$PROJECT_DIR"

# Verificar se os containers estão rodando
CONTAINERS_UP=$(docker compose -f docker-compose.prod.yml ps -q | wc -l)
if [[ $CONTAINERS_UP -lt 4 ]]; then
    echo "ALERT: Nem todos os containers estão rodando"
    docker compose -f docker-compose.prod.yml up -d
fi

# Verificar se o site está respondendo
if ! curl -f -s "https://$(grep DOMAIN .env.production | cut -d'=' -f2)" > /dev/null; then
    echo "ALERT: Site não está respondendo"
    # Tentar reiniciar
    docker compose -f docker-compose.prod.yml restart app
fi

# Verificar uso de disco
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [[ $DISK_USAGE -gt 85 ]]; then
    echo "ALERT: Uso de disco alto: ${DISK_USAGE}%"
fi
EOF

    chmod +x "$PROJECT_DIR/maintenance/healthcheck.sh"
    
    # Executar health check a cada 5 minutos
    echo "*/5 * * * * $PROJECT_DIR/maintenance/healthcheck.sh" | crontab -
    
    log "✅ Monitoramento básico configurado"
}

# Função principal
main() {
    show_banner
    
    log "=== INICIANDO INSTALAÇÃO LINKME TUR ==="
    
    collect_info
    check_requirements
    update_system
    install_docker
    install_nodejs
    install_nginx
    install_certbot
    setup_firewall
    setup_fail2ban
    download_project
    create_configs
    setup_nginx
    setup_ssl
    deploy_application
    create_maintenance_scripts
    setup_monitoring
    
    # Mostrar informações finais
    show_final_info
}

# Mostrar informações finais
show_final_info() {
    clear
    echo -e "${GREEN}"
    cat << 'EOF'
╔══════════════════════════════════════════════════════════════╗
║                 INSTALAÇÃO CONCLUÍDA COM SUCESSO!           ║
╚══════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
    
    echo -e "${BLUE}🎉 LinkMeTur foi instalado e configurado com sucesso!${NC}"
    echo ""
    echo -e "${YELLOW}📋 INFORMAÇÕES IMPORTANTES:${NC}"
    echo ""
    echo -e "🌐 Site: https://$DOMAIN"
    echo -e "🔒 SSL: Configurado automaticamente"
    echo -e "📧 Email SSL: $EMAIL"
    echo -e "📂 Projeto: $PROJECT_DIR"
    echo ""
    echo -e "${YELLOW}🔑 CREDENCIAIS (SALVE COM SEGURANÇA):${NC}"
    echo -e "Database Password: $DB_PASSWORD"
    echo -e "JWT Secret: $JWT_SECRET"
    echo -e "NextAuth Secret: $NEXTAUTH_SECRET"
    echo ""
    echo -e "${YELLOW}🛠️ COMANDOS ÚTEIS:${NC}"
    echo -e "Ver status: cd $PROJECT_DIR && docker compose -f docker-compose.prod.yml ps"
    echo -e "Ver logs: cd $PROJECT_DIR && docker compose -f docker-compose.prod.yml logs"
    echo -e "Backup: $PROJECT_DIR/maintenance/backup-database.sh"
    echo -e "Atualizar: $PROJECT_DIR/maintenance/update-app.sh"
    echo -e "Monitor: $PROJECT_DIR/maintenance/monitor.sh"
    echo ""
    echo -e "${YELLOW}🔧 CONFIGURAÇÃO DNS:${NC}"
    echo "Aponte seu domínio $DOMAIN para o IP deste servidor"
    echo "Registros necessários:"
    echo "A     $DOMAIN     $(curl -s ipinfo.io/ip)"
    echo "CNAME www.$DOMAIN $DOMAIN"
    echo ""
    echo -e "${GREEN}✅ Instalação completa! Seu site estará online em alguns minutos.${NC}"
    
    # Salvar informações em arquivo
    cat > "$PROJECT_DIR/INSTALLATION_INFO.txt" << EOF
LinkMeTur - Informações da Instalação
=====================================
Data: $(date)
Domínio: $DOMAIN
Email: $EMAIL
IP Servidor: $(curl -s ipinfo.io/ip)

Credenciais:
- Database Password: $DB_PASSWORD
- JWT Secret: $JWT_SECRET  
- NextAuth Secret: $NEXTAUTH_SECRET

Arquivos importantes:
- Projeto: $PROJECT_DIR
- Logs: /var/log/linkmetur-install.log
- Backups: $PROJECT_DIR/backups/

Scripts de manutenção:
- $PROJECT_DIR/maintenance/backup-database.sh
- $PROJECT_DIR/maintenance/update-app.sh
- $PROJECT_DIR/maintenance/monitor.sh
- $PROJECT_DIR/maintenance/cleanup.sh

Status dos serviços:
$(cd "$PROJECT_DIR" && docker compose -f docker-compose.prod.yml ps)
EOF

    log "✅ Instalação finalizada com sucesso!"
    log "📄 Informações salvas em: $PROJECT_DIR/INSTALLATION_INFO.txt"
}

# Executar instalação
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi