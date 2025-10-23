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
EOF