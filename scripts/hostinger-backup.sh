#!/bin/bash

# ====================================================================
# SISTEMA DE BACKUP AUTOMÁTICO - LinkMeTur VPS Hostinger
# ====================================================================

set -euo pipefail

PROJECT_DIR="/opt/linkmetur"
BACKUP_DIR="/opt/linkmetur/backups"
LOG_FILE="/var/log/linkmetur-backup.log"
DATE=$(date +"%Y%m%d_%H%M%S")

# Configurações de retenção
DAILY_RETENTION=7    # Manter backups diários por 7 dias
WEEKLY_RETENTION=4   # Manter backups semanais por 4 semanas
MONTHLY_RETENTION=6  # Manter backups mensais por 6 meses

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
}

# Criar estrutura de diretórios de backup
setup_backup_dirs() {
    mkdir -p "$BACKUP_DIR"/{daily,weekly,monthly,emergency}
    log "✅ Diretórios de backup criados"
}

# Backup do banco PostgreSQL
backup_database() {
    log "Iniciando backup do banco de dados..."
    
    local backup_file="$BACKUP_DIR/daily/db_backup_$DATE.sql"
    
    if docker ps | grep -q "linkmetur_postgres_prod"; then
        # Backup completo
        docker exec linkmetur_postgres_prod pg_dump \
            -U linkmetur_user \
            -d linkmetur \
            --verbose \
            --no-owner \
            --no-privileges \
            > "$backup_file"
        
        if [[ $? -eq 0 ]]; then
            # Comprimir backup
            gzip "$backup_file"
            log "✅ Backup do banco criado: $(basename "$backup_file.gz")"
            
            # Verificar integridade
            if zcat "$backup_file.gz" | head -n 10 | grep -q "PostgreSQL database dump"; then
                log "✅ Backup verificado com sucesso"
            else
                error "❌ Backup corrompido!"
                return 1
            fi
        else
            error "❌ Falha no backup do banco"
            return 1
        fi
    else
        error "❌ Container PostgreSQL não está rodando"
        return 1
    fi
}

# Backup dos arquivos de upload
backup_uploads() {
    log "Iniciando backup dos arquivos de upload..."
    
    local uploads_dir="/opt/linkmetur/data/uploads"
    local backup_file="$BACKUP_DIR/daily/uploads_backup_$DATE.tar.gz"
    
    if [[ -d "$uploads_dir" ]] && [[ -n "$(ls -A "$uploads_dir" 2>/dev/null)" ]]; then
        tar -czf "$backup_file" \
            -C "$(dirname "$uploads_dir")" \
            "$(basename "$uploads_dir")" \
            2>/dev/null
        
        if [[ $? -eq 0 ]]; then
            log "✅ Backup dos uploads criado: $(basename "$backup_file")"
        else
            error "❌ Falha no backup dos uploads"
        fi
    else
        log "ℹ️ Diretório de uploads vazio ou inexistente"
    fi
}

# Backup das configurações
backup_configs() {
    log "Iniciando backup das configurações..."
    
    local config_backup="$BACKUP_DIR/daily/configs_backup_$DATE.tar.gz"
    
    cd "$PROJECT_DIR"
    
    tar -czf "$config_backup" \
        docker-compose.prod.yml \
        .env.production \
        nginx/ \
        scripts/ \
        2>/dev/null
    
    if [[ $? -eq 0 ]]; then
        log "✅ Backup das configurações criado: $(basename "$config_backup")"
    else
        error "❌ Falha no backup das configurações"
    fi
}

# Backup completo do sistema
full_backup() {
    log "=== INICIANDO BACKUP COMPLETO ==="
    
    setup_backup_dirs
    
    # Verificar espaço em disco
    local available_space=$(df "$BACKUP_DIR" | awk 'NR==2 {print $4}')
    if [[ $available_space -lt 1048576 ]]; then  # Menos de 1GB
        error "❌ Espaço em disco insuficiente (< 1GB disponível)"
        return 1
    fi
    
    # Executar backups
    backup_database
    backup_uploads  
    backup_configs
    
    # Calcular tamanho total do backup
    local backup_size=$(du -sh "$BACKUP_DIR/daily" | cut -f1)
    log "📊 Tamanho total do backup: $backup_size"
    
    log "=== BACKUP COMPLETO FINALIZADO ==="
}

# Promover backup diário para semanal
promote_to_weekly() {
    log "Promovendo backup para semanal..."
    
    # Usar o backup mais recente do dia
    local latest_daily=$(ls -t "$BACKUP_DIR/daily"/db_backup_*.sql.gz 2>/dev/null | head -n1)
    
    if [[ -n "$latest_daily" ]]; then
        local weekly_name="weekly_backup_$(date +"%Y_week_%U").tar.gz"
        
        # Criar arquivo semanal com todos os backups do dia
        tar -czf "$BACKUP_DIR/weekly/$weekly_name" \
            -C "$BACKUP_DIR/daily" \
            --transform="s|^|weekly_$DATE/|" \
            .
        
        log "✅ Backup semanal criado: $weekly_name"
    fi
}

# Promover backup semanal para mensal
promote_to_monthly() {
    log "Promovendo backup para mensal..."
    
    # Usar o backup semanal mais recente
    local latest_weekly=$(ls -t "$BACKUP_DIR/weekly"/*.tar.gz 2>/dev/null | head -n1)
    
    if [[ -n "$latest_weekly" ]]; then
        local monthly_name="monthly_backup_$(date +"%Y_%m").tar.gz"
        
        cp "$latest_weekly" "$BACKUP_DIR/monthly/$monthly_name"
        
        log "✅ Backup mensal criado: $monthly_name"
    fi
}

# Limpeza de backups antigos
cleanup_old_backups() {
    log "Limpando backups antigos..."
    
    # Backups diários (manter últimos 7 dias)
    find "$BACKUP_DIR/daily" -name "*.gz" -type f -mtime +$DAILY_RETENTION -delete
    
    # Backups semanais (manter últimas 4 semanas)
    find "$BACKUP_DIR/weekly" -name "*.tar.gz" -type f -mtime +$((WEEKLY_RETENTION * 7)) -delete
    
    # Backups mensais (manter últimos 6 meses)
    find "$BACKUP_DIR/monthly" -name "*.tar.gz" -type f -mtime +$((MONTHLY_RETENTION * 30)) -delete
    
    log "✅ Limpeza de backups concluída"
}

# Restaurar backup
restore_backup() {
    local backup_file="$1"
    
    if [[ ! -f "$backup_file" ]]; then
        error "❌ Arquivo de backup não encontrado: $backup_file"
        return 1
    fi
    
    log "⚠️ RESTAURANDO BACKUP: $backup_file"
    
    # Parar aplicação
    cd "$PROJECT_DIR"
    docker compose -f docker-compose.prod.yml stop app
    
    # Restaurar banco
    if [[ "$backup_file" == *.sql.gz ]]; then
        zcat "$backup_file" | docker exec -i linkmetur_postgres_prod psql -U linkmetur_user -d linkmetur
    elif [[ "$backup_file" == *.sql ]]; then
        cat "$backup_file" | docker exec -i linkmetur_postgres_prod psql -U linkmetur_user -d linkmetur
    fi
    
    # Reiniciar aplicação
    docker compose -f docker-compose.prod.yml start app
    
    log "✅ Restauração concluída"
}

# Verificar integridade dos backups
verify_backups() {
    log "Verificando integridade dos backups..."
    
    local errors=0
    
    # Verificar backups SQL
    for backup in "$BACKUP_DIR"/daily/*.sql.gz; do
        if [[ -f "$backup" ]]; then
            if ! zcat "$backup" | head -n 1 | grep -q "PostgreSQL database dump"; then
                error "❌ Backup corrompido: $(basename "$backup")"
                ((errors++))
            fi
        fi
    done
    
    # Verificar arquivos tar.gz
    for backup in "$BACKUP_DIR"/*/*.tar.gz; do
        if [[ -f "$backup" ]]; then
            if ! tar -tzf "$backup" >/dev/null 2>&1; then
                error "❌ Arquivo corrompido: $(basename "$backup")"
                ((errors++))
            fi
        fi
    done
    
    if [[ $errors -eq 0 ]]; then
        log "✅ Todos os backups estão íntegros"
    else
        error "❌ Encontrados $errors backups corrompidos"
    fi
    
    return $errors
}

# Listar backups disponíveis
list_backups() {
    echo "=== BACKUPS DISPONÍVEIS ==="
    echo ""
    
    echo "📅 BACKUPS DIÁRIOS:"
    ls -lah "$BACKUP_DIR/daily"/ 2>/dev/null | grep -v "^d" | awk '{print $9, $5, $6, $7, $8}' || echo "Nenhum backup diário encontrado"
    
    echo ""
    echo "📆 BACKUPS SEMANAIS:"
    ls -lah "$BACKUP_DIR/weekly"/ 2>/dev/null | grep -v "^d" | awk '{print $9, $5, $6, $7, $8}' || echo "Nenhum backup semanal encontrado"
    
    echo ""
    echo "📊 BACKUPS MENSAIS:"
    ls -lah "$BACKUP_DIR/monthly"/ 2>/dev/null | grep -v "^d" | awk '{print $9, $5, $6, $7, $8}' || echo "Nenhum backup mensal encontrado"
    
    echo ""
    echo "📈 ESTATÍSTICAS:"
    echo "Espaço usado: $(du -sh "$BACKUP_DIR" | cut -f1)"
    echo "Total de arquivos: $(find "$BACKUP_DIR" -type f | wc -l)"
}

# Menu principal
main() {
    case "${1:-}" in
        "full")
            full_backup
            ;;
        "database")
            setup_backup_dirs
            backup_database
            ;;
        "uploads")
            setup_backup_dirs
            backup_uploads
            ;;
        "configs")
            setup_backup_dirs
            backup_configs
            ;;
        "weekly")
            promote_to_weekly
            ;;
        "monthly")
            promote_to_monthly
            ;;
        "cleanup")
            cleanup_old_backups
            ;;
        "verify")
            verify_backups
            ;;
        "list")
            list_backups
            ;;
        "restore")
            if [[ -z "${2:-}" ]]; then
                echo "Uso: $0 restore <caminho_do_backup>"
                exit 1
            fi
            restore_backup "$2"
            ;;
        *)
            echo "Sistema de Backup LinkMeTur - VPS Hostinger"
            echo ""
            echo "Uso: $0 {comando}"
            echo ""
            echo "Comandos disponíveis:"
            echo "  full      - Backup completo (banco + uploads + configs)"
            echo "  database  - Backup apenas do banco de dados"
            echo "  uploads   - Backup apenas dos arquivos de upload"
            echo "  configs   - Backup apenas das configurações"
            echo "  weekly    - Promover backup diário para semanal"
            echo "  monthly   - Promover backup semanal para mensal"
            echo "  cleanup   - Limpar backups antigos"
            echo "  verify    - Verificar integridade dos backups"
            echo "  list      - Listar backups disponíveis"
            echo "  restore   - Restaurar backup específico"
            echo ""
            echo "Exemplos:"
            echo "  $0 full                    # Backup completo"
            echo "  $0 list                    # Ver backups"
            echo "  $0 restore backup.sql.gz   # Restaurar backup"
            exit 1
            ;;
    esac
}

main "$@"