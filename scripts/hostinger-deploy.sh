#!/bin/bash

# ====================================================================
# DEPLOY AUTOMÁTICO PARA VPS HOSTINGER - LinkMeTur
# ====================================================================

set -euo pipefail

# Configurações
PROJECT_DIR="/opt/linkmetur"
LOG_FILE="/var/log/linkmetur-deploy.log"
BACKUP_DIR="/opt/linkmetur/backups"

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

# Backup antes do deploy
backup_before_deploy() {
    log "Criando backup antes do deploy..."
    
    mkdir -p "$BACKUP_DIR"
    DATE=$(date +"%Y%m%d_%H%M%S")
    
    # Backup do banco de dados
    if docker ps | grep -q "linkmetur_postgres_prod"; then
        docker exec linkmetur_postgres_prod pg_dump -U linkmetur_user -d linkmetur > "$BACKUP_DIR/pre_deploy_db_$DATE.sql"
        log "✅ Backup do banco criado: pre_deploy_db_$DATE.sql"
    fi
    
    # Backup dos uploads
    if [[ -d "/opt/linkmetur/data/uploads" ]]; then
        tar -czf "$BACKUP_DIR/uploads_backup_$DATE.tar.gz" -C /opt/linkmetur/data uploads/
        log "✅ Backup dos uploads criado: uploads_backup_$DATE.tar.gz"
    fi
    
    # Manter apenas os últimos 5 backups
    find "$BACKUP_DIR" -name "pre_deploy_*" -type f -mtime +5 -delete
}

# Deploy da aplicação
deploy_application() {
    log "Iniciando deploy da aplicação..."
    
    cd "$PROJECT_DIR"
    
    # Pull das últimas mudanças
    git pull origin main
    
    # Build da nova versão
    log "Fazendo build da aplicação..."
    docker compose -f docker-compose.prod.yml build --no-cache app
    
    # Parar serviços (exceto banco)
    log "Parando aplicação..."
    docker compose -f docker-compose.prod.yml stop app nginx
    
    # Iniciar serviços atualizados
    log "Iniciando nova versão..."
    docker compose -f docker-compose.prod.yml up -d
    
    # Aguardar serviços ficarem prontos
    log "Aguardando serviços ficarem prontos..."
    sleep 30
    
    # Verificar se está tudo funcionando
    if ! docker compose -f docker-compose.prod.yml ps | grep -q "Up.*healthy"; then
        error "Falha no deploy - serviços não estão saudáveis"
    fi
    
    log "✅ Deploy concluído com sucesso!"
}

# Verificar status dos serviços
check_services() {
    log "Verificando status dos serviços..."
    
    cd "$PROJECT_DIR"
    
    echo "=== STATUS DOS CONTAINERS ==="
    docker compose -f docker-compose.prod.yml ps
    
    echo ""
    echo "=== HEALTH CHECKS ==="
    docker compose -f docker-compose.prod.yml ps --format "table {{.Service}}\t{{.Status}}\t{{.Health}}"
    
    echo ""
    echo "=== USO DE RECURSOS ==="
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
}

# Rollback em caso de problema
rollback_deploy() {
    log "Iniciando rollback..."
    
    cd "$PROJECT_DIR"
    
    # Voltar para commit anterior
    git reset --hard HEAD~1
    
    # Rebuild e restart
    docker compose -f docker-compose.prod.yml build --no-cache app
    docker compose -f docker-compose.prod.yml up -d
    
    log "✅ Rollback concluído"
}

# Função principal
main() {
    case "${1:-}" in
        "deploy")
            backup_before_deploy
            deploy_application
            check_services
            ;;
        "status")
            check_services
            ;;
        "rollback")
            rollback_deploy
            ;;
        "backup")
            backup_before_deploy
            ;;
        *)
            echo "Uso: $0 {deploy|status|rollback|backup}"
            echo ""
            echo "Comandos:"
            echo "  deploy   - Faz deploy da última versão"
            echo "  status   - Mostra status dos serviços"
            echo "  rollback - Volta para versão anterior"
            echo "  backup   - Cria backup manual"
            exit 1
            ;;
    esac
}

main "$@"