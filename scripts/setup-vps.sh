#!/bin/bash

# Script de Configuração Inicial para VPS - LinkMeTur
# Uso: ./scripts/setup-vps.sh

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Atualizar sistema
update_system() {
    log "Atualizando sistema..."
    
    sudo apt update && sudo apt upgrade -y
    success "Sistema atualizado."
}

# Instalar dependências
install_dependencies() {
    log "Instalando dependências..."
    
    # Instalar Docker
    if ! command -v docker &> /dev/null; then
        log "Instalando Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker $USER
        rm get-docker.sh
        success "Docker instalado."
    else
        success "Docker já está instalado."
    fi
    
    # Instalar Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        log "Instalando Docker Compose..."
        sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
        success "Docker Compose instalado."
    else
        success "Docker Compose já está instalado."
    fi
    
    # Instalar Node.js
    if ! command -v node &> /dev/null; then
        log "Instalando Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
        success "Node.js instalado."
    else
        success "Node.js já está instalado."
    fi
    
    # Instalar Git
    if ! command -v git &> /dev/null; then
        log "Instalando Git..."
        sudo apt install -y git
        success "Git instalado."
    else
        success "Git já está instalado."
    fi
    
    # Instalar ferramentas úteis
    sudo apt install -y curl wget unzip htop ufw fail2ban
    success "Ferramentas adicionais instaladas."
}

# Configurar firewall
setup_firewall() {
    log "Configurando firewall..."
    
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    sudo ufw allow ssh
    sudo ufw allow 80
    sudo ufw allow 443
    sudo ufw --force enable
    
    success "Firewall configurado."
}

# Configurar fail2ban
setup_fail2ban() {
    log "Configurando fail2ban..."
    
    sudo systemctl enable fail2ban
    sudo systemctl start fail2ban
    
    success "Fail2ban configurado."
}

# Configurar swap
setup_swap() {
    log "Configurando swap..."
    
    if [ ! -f /swapfile ]; then
        sudo fallocate -l 2G /swapfile
        sudo chmod 600 /swapfile
        sudo mkswap /swapfile
        sudo swapon /swapfile
        echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
        success "Swap configurado (2GB)."
    else
        success "Swap já está configurado."
    fi
}

# Configurar Docker para produção
setup_docker() {
    log "Configurando Docker para produção..."
    
    # Criar diretório para Docker
    sudo mkdir -p /etc/docker
    
    # Configurar daemon do Docker
    sudo tee /etc/docker/daemon.json > /dev/null <<EOF
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
    sudo systemctl restart docker
    
    success "Docker configurado para produção."
}

# Criar usuário para aplicação
create_app_user() {
    log "Criando usuário para aplicação..."
    
    if ! id "linkmetur" &>/dev/null; then
        sudo useradd -m -s /bin/bash linkmetur
        sudo usermod -aG docker linkmetur
        success "Usuário 'linkmetur' criado."
    else
        success "Usuário 'linkmetur' já existe."
    fi
}

# Configurar diretórios
setup_directories() {
    log "Configurando diretórios..."
    
    sudo mkdir -p /opt/linkmetur
    sudo mkdir -p /opt/backups/linkmetur
    sudo mkdir -p /var/log/linkmetur
    sudo chown -R linkmetur:linkmetur /opt/linkmetur
    sudo chown -R linkmetur:linkmetur /opt/backups/linkmetur
    sudo chown -R linkmetur:linkmetur /var/log/linkmetur
    
    success "Diretórios configurados."
}

# Configurar SSL
setup_ssl() {
    log "Configurando SSL..."
    
    sudo mkdir -p /etc/ssl/certs /etc/ssl/private
    sudo chmod 755 /etc/ssl/certs
    sudo chmod 700 /etc/ssl/private
    
    warning "Configure seus certificados SSL em:"
    warning "  /etc/ssl/certs/linkmetur.crt"
    warning "  /etc/ssl/private/linkmetur.key"
    
    success "Diretórios SSL configurados."
}

# Configurar backup automático
setup_backup() {
    log "Configurando backup automático..."
    
    # Criar script de backup
    sudo tee /opt/backups/linkmetur/backup.sh > /dev/null <<'EOF'
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
    
    sudo chmod +x /opt/backups/linkmetur/backup.sh
    
    # Configurar cron para backup diário
    echo "0 2 * * * /opt/backups/linkmetur/backup.sh" | sudo crontab -u linkmetur -
    
    success "Backup automático configurado."
}

# Configurar monitoramento
setup_monitoring() {
    log "Configurando monitoramento..."
    
    # Instalar htop e iotop
    sudo apt install -y htop iotop
    
    # Criar script de monitoramento
    sudo tee /opt/linkmetur/monitor.sh > /dev/null <<'EOF'
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
    
    sudo chmod +x /opt/linkmetur/monitor.sh
    
    success "Monitoramento configurado."
}

# Função principal
main() {
    log "Iniciando configuração da VPS para LinkMeTur..."
    
    update_system
    install_dependencies
    setup_firewall
    setup_fail2ban
    setup_swap
    setup_docker
    create_app_user
    setup_directories
    setup_ssl
    setup_backup
    setup_monitoring
    
    success "Configuração da VPS concluída!"
    log "Próximos passos:"
    log "1. Clone o repositório: git clone <repo-url> /opt/linkmetur"
    log "2. Configure os certificados SSL"
    log "3. Configure as variáveis de ambiente"
    log "4. Execute: ./scripts/deploy.sh"
    log "5. Reinicie o servidor para aplicar todas as configurações"
}

# Executar função principal
main "$@"
