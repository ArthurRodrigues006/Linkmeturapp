#!/bin/bash

# Script de Deploy para VPS - LinkMeTur
# Uso: ./scripts/deploy.sh [environment]

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
ENVIRONMENT=${1:-production}
PROJECT_NAME="linkmetur"
DOCKER_COMPOSE_FILE="docker-compose.yml"
BACKUP_DIR="/opt/backups/linkmetur"

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
    if [[ $EUID -eq 0 ]]; then
        error "Este script não deve ser executado como root. Use um usuário com sudo."
    fi
}

# Verificar dependências
check_dependencies() {
    log "Verificando dependências..."
    
    if ! command -v docker &> /dev/null; then
        error "Docker não está instalado. Instale o Docker primeiro."
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose não está instalado. Instale o Docker Compose primeiro."
    fi
    
    if ! command -v git &> /dev/null; then
        error "Git não está instalado. Instale o Git primeiro."
    fi
    
    success "Todas as dependências estão instaladas."
}

# Criar backup do banco de dados
backup_database() {
    log "Criando backup do banco de dados..."
    
    # Criar diretório de backup se não existir
    sudo mkdir -p $BACKUP_DIR
    
    # Backup do PostgreSQL
    BACKUP_FILE="$BACKUP_DIR/postgres_$(date +%Y%m%d_%H%M%S).sql"
    
    if docker-compose -f $DOCKER_COMPOSE_FILE exec -T postgres pg_dump -U linkmetur_user linkmetur > $BACKUP_FILE; then
        success "Backup do banco criado: $BACKUP_FILE"
    else
        warning "Falha ao criar backup do banco. Continuando sem backup."
    fi
}

# Parar serviços
stop_services() {
    log "Parando serviços..."
    
    if docker-compose -f $DOCKER_COMPOSE_FILE down; then
        success "Serviços parados com sucesso."
    else
        warning "Alguns serviços podem não ter parado corretamente."
    fi
}

# Atualizar código
update_code() {
    log "Atualizando código do repositório..."
    
    if git pull origin main; then
        success "Código atualizado com sucesso."
    else
        error "Falha ao atualizar código. Verifique a conexão e permissões."
    fi
}

# Instalar dependências
install_dependencies() {
    log "Instalando dependências..."
    
    if npm run install:all; then
        success "Dependências instaladas com sucesso."
    else
        error "Falha ao instalar dependências."
    fi
}

# Construir imagens Docker
build_images() {
    log "Construindo imagens Docker..."
    
    if docker-compose -f $DOCKER_COMPOSE_FILE build --no-cache; then
        success "Imagens construídas com sucesso."
    else
        error "Falha ao construir imagens Docker."
    fi
}

# Iniciar serviços
start_services() {
    log "Iniciando serviços..."
    
    if docker-compose -f $DOCKER_COMPOSE_FILE up -d; then
        success "Serviços iniciados com sucesso."
    else
        error "Falha ao iniciar serviços."
    fi
}

# Verificar saúde dos serviços
check_health() {
    log "Verificando saúde dos serviços..."
    
    # Aguardar serviços iniciarem
    sleep 30
    
    # Verificar nginx
    if curl -f http://localhost/health > /dev/null 2>&1; then
        success "Nginx está funcionando."
    else
        warning "Nginx pode não estar funcionando corretamente."
    fi
    
    # Verificar backend
    if curl -f http://localhost:3001/health > /dev/null 2>&1; then
        success "Backend API está funcionando."
    else
        warning "Backend API pode não estar funcionando corretamente."
    fi
    
    # Verificar landing
    if curl -f http://localhost:8081/health > /dev/null 2>&1; then
        success "Landing API está funcionando."
    else
        warning "Landing API pode não estar funcionando corretamente."
    fi
}

# Limpar recursos não utilizados
cleanup() {
    log "Limpando recursos não utilizados..."
    
    # Remover imagens não utilizadas
    docker image prune -f
    
    # Remover containers parados
    docker container prune -f
    
    # Remover volumes não utilizados
    docker volume prune -f
    
    success "Limpeza concluída."
}

# Configurar SSL (se necessário)
setup_ssl() {
    log "Verificando configuração SSL..."
    
    if [ ! -f "./ssl/linkmetur.crt" ] || [ ! -f "./ssl/linkmetur.key" ]; then
        warning "Certificados SSL não encontrados. Configure SSL manualmente."
        warning "Coloque os certificados em: ./ssl/linkmetur.crt e ./ssl/linkmetur.key"
    else
        success "Certificados SSL encontrados."
    fi
}

# Função principal
main() {
    log "Iniciando deploy do LinkMeTur para $ENVIRONMENT..."
    
    check_root
    check_dependencies
    setup_ssl
    backup_database
    stop_services
    update_code
    install_dependencies
    build_images
    start_services
    check_health
    cleanup
    
    success "Deploy concluído com sucesso!"
    log "Acesse: https://linkmetur.com.br"
    log "API: https://api.linkmetur.com.br"
    log "App: https://app.linkmetur.com.br"
}

# Executar função principal
main "$@"
