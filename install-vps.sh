#!/bin/bash

# Instalador Automático LinkMeTur para Ubuntu 22.04 LTS
# Uso: ./install-vps.sh [dominio]

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
DOMAIN=${1:-"linkmetur.com.br"}
PROJECT_NAME="linkmetur"
PROJECT_DIR="/opt/linkmetur"
BACKUP_DIR="/opt/backups/linkmetur"
LOG_DIR="/var/log/linkmetur"

# Função para logging
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Verificar se está rodando como root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        error "Este script deve ser executado como root. Use: sudo ./install-vps.sh"
    fi
}

# Atualizar sistema
update_system() {
    log "Atualizando sistema..."
    apt update && apt upgrade -y
    success "Sistema atualizado."
}

# Instalar dependências
install_dependencies() {
    log "Instalando dependências..."
    
    # Instalar Docker
    if ! command -v docker &> /dev/null; then
        log "Instalando Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sh get-docker.sh
        rm get-docker.sh
        success "Docker instalado."
    else
        success "Docker já está instalado."
    fi
    
    # Instalar Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        log "Instalando Docker Compose..."
        curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        chmod +x /usr/local/bin/docker-compose
        success "Docker Compose instalado."
    else
        success "Docker Compose já está instalado."
    fi
    
    # Instalar Node.js
    if ! command -v node &> /dev/null; then
        log "Instalando Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
        apt-get install -y nodejs
        success "Node.js instalado."
    else
        success "Node.js já está instalado."
    fi
    
    # Instalar Git
    if ! command -v git &> /dev/null; then
        log "Instalando Git..."
        apt install -y git
        success "Git instalado."
    else
        success "Git já está instalado."
    fi
    
    # Instalar ferramentas úteis
    apt install -y curl wget unzip htop ufw fail2ban nginx certbot python3-certbot-nginx
    success "Ferramentas adicionais instaladas."
}

# Configurar firewall
setup_firewall() {
    log "Configurando firewall..."
    
    ufw default deny incoming
    ufw default allow outgoing
    ufw allow ssh
    ufw allow 80
    ufw allow 443
    ufw --force enable
    
    success "Firewall configurado."
}

# Configurar fail2ban
setup_fail2ban() {
    log "Configurando fail2ban..."
    
    systemctl enable fail2ban
    systemctl start fail2ban
    
    success "Fail2ban configurado."
}

# Configurar swap
setup_swap() {
    log "Configurando swap..."
    
    if [ ! -f /swapfile ]; then
        fallocate -l 2G /swapfile
        chmod 600 /swapfile
        mkswap /swapfile
        swapon /swapfile
        echo '/swapfile none swap sw 0 0' >> /etc/fstab
        success "Swap configurado (2GB)."
    else
        success "Swap já está configurado."
    fi
}

# Configurar Docker para produção
setup_docker() {
    log "Configurando Docker para produção..."
    
    # Criar diretório para Docker
    mkdir -p /etc/docker
    
    # Configurar daemon do Docker
    cat > /etc/docker/daemon.json <<EOF
{
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "10m",
        "max-file": "3"
    },
    "storage-driver": "overlay2"
}
EOF
    
    # Reiniciar Docker
    systemctl restart docker
    
    success "Docker configurado para produção."
}

# Criar usuário para aplicação
create_app_user() {
    log "Criando usuário para aplicação..."
    
    if ! id "linkmetur" &>/dev/null; then
        useradd -m -s /bin/bash linkmetur
        usermod -aG docker linkmetur
        success "Usuário 'linkmetur' criado."
    else
        success "Usuário 'linkmetur' já existe."
    fi
}

# Configurar diretórios
setup_directories() {
    log "Configurando diretórios..."
    
    mkdir -p $PROJECT_DIR
    mkdir -p $BACKUP_DIR
    mkdir -p $LOG_DIR
    mkdir -p /etc/ssl/certs
    mkdir -p /etc/ssl/private
    
    chown -R linkmetur:linkmetur $PROJECT_DIR
    chown -R linkmetur:linkmetur $BACKUP_DIR
    chown -R linkmetur:linkmetur $LOG_DIR
    chmod 755 /etc/ssl/certs
    chmod 700 /etc/ssl/private
    
    success "Diretórios configurados."
}

# Configurar Nginx
setup_nginx() {
    log "Configurando Nginx..."
    
    # Remover configuração padrão
    rm -f /etc/nginx/sites-enabled/default
    
    # Criar configuração do LinkMeTur
    cat > /etc/nginx/sites-available/linkmetur <<EOF
# Configuração do Nginx para LinkMeTur
upstream backend_api {
    server localhost:3001;
    keepalive 32;
}

upstream frontend_app {
    server localhost:3000;
    keepalive 32;
}

upstream landing_api {
    server localhost:8081;
    keepalive 32;
}

# Redirecionamento HTTP para HTTPS
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN api.$DOMAIN app.$DOMAIN;
    return 301 https://\$server_name\$request_uri;
}

# Configuração HTTPS - Landing Page (domínio principal)
server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;

    # SSL Configuration (será configurado pelo Certbot)
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Proxy para Landing API
    location / {
        proxy_pass http://landing_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }

    # Health check
    location /health {
        proxy_pass http://landing_api/health;
        access_log off;
    }
}

# Configuração HTTPS - API Backend
server {
    listen 443 ssl http2;
    server_name api.$DOMAIN;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # CORS headers
    add_header Access-Control-Allow-Origin "https://app.$DOMAIN" always;
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
    add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization" always;
    add_header Access-Control-Allow-Credentials true always;

    # Handle preflight requests
    if (\$request_method = 'OPTIONS') {
        add_header Access-Control-Allow-Origin "https://app.$DOMAIN";
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
        add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization";
        add_header Access-Control-Allow-Credentials true;
        add_header Access-Control-Max-Age 1728000;
        add_header Content-Type 'text/plain; charset=utf-8';
        add_header Content-Length 0;
        return 204;
    }

    # Proxy para Backend API
    location / {
        proxy_pass http://backend_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }

    # Health check
    location /health {
        proxy_pass http://backend_api/health;
        access_log off;
    }
}

# Configuração HTTPS - Frontend App
server {
    listen 443 ssl http2;
    server_name app.$DOMAIN;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Proxy para Frontend App
    location / {
        proxy_pass http://frontend_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }

    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        proxy_pass http://frontend_app;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

    # Ativar site
    ln -sf /etc/nginx/sites-available/linkmetur /etc/nginx/sites-enabled/
    
    # Testar configuração
    nginx -t
    
    success "Nginx configurado."
}

# Configurar SSL com Let's Encrypt
setup_ssl() {
    log "Configurando SSL com Let's Encrypt..."
    
    # Parar nginx temporariamente
    systemctl stop nginx
    
    # Obter certificado SSL
    certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN -d api.$DOMAIN -d app.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
    
    # Configurar renovação automática
    echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -
    
    # Iniciar nginx
    systemctl start nginx
    systemctl enable nginx
    
    success "SSL configurado com Let's Encrypt."
}

# Configurar backup automático
setup_backup() {
    log "Configurando backup automático..."
    
    # Criar script de backup
    cat > $BACKUP_DIR/backup.sh <<'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups/linkmetur"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup do banco de dados
docker-compose -f /opt/linkmetur/docker-compose.yml exec -T postgres pg_dump -U linkmetur_user linkmetur > $BACKUP_DIR/postgres_$DATE.sql

# Backup dos volumes
docker run --rm -v linkmetur_postgres_data:/data -v $BACKUP_DIR:/backup alpine tar czf /backup/postgres_data_$DATE.tar.gz -C /data .

# Manter apenas os últimos 7 dias de backup
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
EOF
    
    chmod +x $BACKUP_DIR/backup.sh
    
    # Configurar cron para backup diário
    echo "0 2 * * * $BACKUP_DIR/backup.sh" | crontab -u linkmetur -
    
    success "Backup automático configurado."
}

# Configurar monitoramento
setup_monitoring() {
    log "Configurando monitoramento..."
    
    # Criar script de monitoramento
    cat > $PROJECT_DIR/monitor.sh <<'EOF'
#!/bin/bash
echo "=== LinkMeTur System Status ==="
echo "Date: $(date)"
echo "Uptime: $(uptime)"
echo "Memory: $(free -h)"
echo "Disk: $(df -h /)"
echo "Docker Containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo "Docker Stats:"
docker stats --no-stream
EOF
    
    chmod +x $PROJECT_DIR/monitor.sh
    
    success "Monitoramento configurado."
}

# Criar arquivo de configuração de ambiente
create_env_file() {
    log "Criando arquivo de configuração de ambiente..."
    
    cat > $PROJECT_DIR/.env <<EOF
# Configurações de Produção - LinkMeTur
NODE_ENV=production

# Configurações do Banco de Dados
DATABASE_URL=postgresql://linkmetur_user:linkmetur_password@postgres:5432/linkmetur
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=linkmetur_user
DB_PASSWORD=linkmetur_password
DB_DATABASE=linkmetur

# Configurações do Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=

# Configurações de JWT
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRES_IN=24h

# Configurações de Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password

# Configurações dos Serviços
BACKEND_PORT=3001
FRONTEND_PORT=3000
LANDING_PORT=8081

# URLs dos Serviços
BACKEND_URL=https://api.$DOMAIN
FRONTEND_URL=https://app.$DOMAIN
LANDING_URL=https://$DOMAIN

# Configurações de CORS
CORS_ORIGINS=https://app.$DOMAIN,https://$DOMAIN

# Configurações de Rate Limiting
THROTTLE_TTL=60000
THROTTLE_LIMIT=100

# Configurações de Cache
CACHE_TTL=300

# Google Analytics (opcional)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=

# Verificação de sites
GOOGLE_VERIFICATION=
YANDEX_VERIFICATION=
YAHOO_VERIFICATION=
EOF

    chown linkmetur:linkmetur $PROJECT_DIR/.env
    chmod 600 $PROJECT_DIR/.env
    
    success "Arquivo de configuração criado."
}

# Função principal
main() {
    log "Iniciando instalação do LinkMeTur para $DOMAIN..."
    
    check_root
    update_system
    install_dependencies
    setup_firewall
    setup_fail2ban
    setup_swap
    setup_docker
    create_app_user
    setup_directories
    setup_nginx
    setup_ssl
    setup_backup
    setup_monitoring
    create_env_file
    
    success "Instalação concluída com sucesso!"
    log "Próximos passos:"
    log "1. Clone o repositório: git clone <repo-url> $PROJECT_DIR"
    log "2. Configure as variáveis de ambiente em $PROJECT_DIR/.env"
    log "3. Execute: cd $PROJECT_DIR && ./scripts/deploy.sh"
    log "4. Acesse: https://$DOMAIN"
    log "5. API: https://api.$DOMAIN"
    log "6. App: https://app.$DOMAIN"
}

# Executar função principal
main "$@"
