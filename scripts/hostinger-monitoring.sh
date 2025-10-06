#!/bin/bash

# ====================================================================
# SISTEMA DE MONITORAMENTO E LOGS - VPS HOSTINGER
# ====================================================================

set -euo pipefail

PROJECT_DIR="/opt/linkmetur"
LOG_DIR="/opt/linkmetur/logs"
MONITOR_LOG="/var/log/linkmetur-monitoring.log"

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$MONITOR_LOG"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$MONITOR_LOG"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$MONITOR_LOG"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$MONITOR_LOG"
}

# Configurar estrutura de logs
setup_logging_structure() {
    log "Configurando estrutura de logs..."
    
    # Criar diretórios de logs
    mkdir -p "$LOG_DIR"/{app,nginx,system,monitoring,alerts}
    mkdir -p /opt/linkmetur/data/{postgres,redis,uploads}
    mkdir -p /opt/linkmetur/cache/nginx
    
    # Configurar permissões
    chown -R root:root "$LOG_DIR"
    chmod -R 755 "$LOG_DIR"
    
    log "✅ Estrutura de logs criada"
}

# Configurar logrotate
setup_logrotate() {
    log "Configurando rotação de logs..."
    
    # Configuração para logs da aplicação
    cat > /etc/logrotate.d/linkmetur << 'EOF'
/opt/linkmetur/logs/app/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
    postrotate
        docker kill -s USR1 linkmetur_app_prod || true
    endscript
}

/opt/linkmetur/logs/nginx/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
    postrotate
        docker kill -s USR1 linkmetur_nginx_prod || true
    endscript
}

/opt/linkmetur/logs/system/*.log {
    weekly
    rotate 12
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
}

/var/log/linkmetur-*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
}
EOF

    # Testar configuração
    logrotate -d /etc/logrotate.d/linkmetur
    
    log "✅ Logrotate configurado"
}

# Sistema de monitoramento de recursos
create_resource_monitor() {
    log "Criando monitor de recursos..."
    
    cat > /opt/linkmetur/scripts/resource-monitor.sh << 'EOF'
#!/bin/bash

# Monitor de recursos do LinkMeTur
TIMESTAMP=$(date +'%Y-%m-%d %H:%M:%S')
LOG_FILE="/opt/linkmetur/logs/monitoring/resources.log"

# Função para logging
log_metric() {
    echo "[$TIMESTAMP] $1" >> "$LOG_FILE"
}

# CPU Usage
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
log_metric "CPU_USAGE:$CPU_USAGE"

# Memory Usage
MEM_TOTAL=$(free -m | awk 'NR==2{print $2}')
MEM_USED=$(free -m | awk 'NR==2{print $3}')
MEM_PERCENT=$(( MEM_USED * 100 / MEM_TOTAL ))
log_metric "MEMORY_USAGE:$MEM_PERCENT"

# Disk Usage
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
log_metric "DISK_USAGE:$DISK_USAGE"

# Load Average
LOAD_AVG=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')
log_metric "LOAD_AVERAGE:$LOAD_AVG"

# Docker containers status
CONTAINERS_RUNNING=$(docker ps -q | wc -l)
CONTAINERS_TOTAL=$(docker ps -aq | wc -l)
log_metric "CONTAINERS_RUNNING:$CONTAINERS_RUNNING"
log_metric "CONTAINERS_TOTAL:$CONTAINERS_TOTAL"

# Network connections
NETWORK_CONNECTIONS=$(netstat -an | grep ESTABLISHED | wc -l)
log_metric "NETWORK_CONNECTIONS:$NETWORK_CONNECTIONS"

# Application specific metrics
if docker ps | grep -q "linkmetur_app_prod"; then
    APP_MEMORY=$(docker stats --no-stream --format "table {{.MemUsage}}" linkmetur_app_prod | tail -n1 | cut -d'/' -f1)
    APP_CPU=$(docker stats --no-stream --format "table {{.CPUPerc}}" linkmetur_app_prod | tail -n1)
    log_metric "APP_MEMORY:$APP_MEMORY"
    log_metric "APP_CPU:$APP_CPU"
fi

# Database connections
if docker ps | grep -q "linkmetur_postgres_prod"; then
    DB_CONNECTIONS=$(docker exec linkmetur_postgres_prod psql -U linkmetur_user -d linkmetur -t -c "SELECT count(*) FROM pg_stat_activity;" 2>/dev/null | xargs || echo "0")
    log_metric "DB_CONNECTIONS:$DB_CONNECTIONS"
fi

# Check critical thresholds and alert
if (( $(echo "$CPU_USAGE > 80" | bc -l) )); then
    echo "[$TIMESTAMP] ALERT: High CPU usage: $CPU_USAGE%" >> /opt/linkmetur/logs/alerts/cpu.log
fi

if [[ $MEM_PERCENT -gt 85 ]]; then
    echo "[$TIMESTAMP] ALERT: High memory usage: $MEM_PERCENT%" >> /opt/linkmetur/logs/alerts/memory.log
fi

if [[ $DISK_USAGE -gt 90 ]]; then
    echo "[$TIMESTAMP] ALERT: High disk usage: $DISK_USAGE%" >> /opt/linkmetur/logs/alerts/disk.log
fi
EOF

    chmod +x /opt/linkmetur/scripts/resource-monitor.sh
    
    log "✅ Monitor de recursos criado"
}

# Health check automático
create_health_monitor() {
    log "Criando monitor de saúde..."
    
    cat > /opt/linkmetur/scripts/health-monitor.sh << 'EOF'
#!/bin/bash

# Health Monitor para LinkMeTur
TIMESTAMP=$(date +'%Y-%m-%d %H:%M:%S')
LOG_FILE="/opt/linkmetur/logs/monitoring/health.log"
ALERT_LOG="/opt/linkmetur/logs/alerts/health.log"

# Carregar configurações
cd /opt/linkmetur
source .env.production 2>/dev/null || true
DOMAIN=${DOMAIN:-localhost}

# Função para logging
log_health() {
    echo "[$TIMESTAMP] $1" >> "$LOG_FILE"
}

alert() {
    echo "[$TIMESTAMP] ALERT: $1" | tee -a "$ALERT_LOG" "$LOG_FILE"
}

# Verificar containers Docker
check_containers() {
    local containers=("linkmetur_postgres_prod" "linkmetur_redis_prod" "linkmetur_app_prod" "linkmetur_nginx_prod")
    
    for container in "${containers[@]}"; do
        if docker ps | grep -q "$container.*Up"; then
            log_health "Container $container: RUNNING"
        else
            alert "Container $container: NOT RUNNING"
            # Tentar reiniciar
            docker compose -f docker-compose.prod.yml restart "$container" &
        fi
        
        # Verificar health status
        health=$(docker inspect --format='{{.State.Health.Status}}' "$container" 2>/dev/null || echo "no-health-check")
        if [[ "$health" == "unhealthy" ]]; then
            alert "Container $container: UNHEALTHY"
        fi
    done
}

# Verificar conectividade web
check_web_connectivity() {
    # HTTP Check
    if curl -f -s -m 10 "http://$DOMAIN" > /dev/null; then
        log_health "HTTP connectivity: OK"
    else
        alert "HTTP connectivity: FAILED"
    fi
    
    # HTTPS Check
    if curl -f -s -m 10 "https://$DOMAIN" > /dev/null; then
        log_health "HTTPS connectivity: OK"
    else
        alert "HTTPS connectivity: FAILED"
    fi
    
    # Response time
    RESPONSE_TIME=$(curl -o /dev/null -s -w '%{time_total}' "https://$DOMAIN" 2>/dev/null || echo "999")
    log_health "Response time: ${RESPONSE_TIME}s"
    
    if (( $(echo "$RESPONSE_TIME > 5" | bc -l) )); then
        alert "High response time: ${RESPONSE_TIME}s"
    fi
}

# Verificar banco de dados
check_database() {
    if docker exec linkmetur_postgres_prod pg_isready -U linkmetur_user -d linkmetur >/dev/null 2>&1; then
        log_health "PostgreSQL: READY"
        
        # Verificar conexões ativas
        connections=$(docker exec linkmetur_postgres_prod psql -U linkmetur_user -d linkmetur -t -c "SELECT count(*) FROM pg_stat_activity;" 2>/dev/null | xargs || echo "0")
        log_health "DB connections: $connections"
        
        if [[ $connections -gt 50 ]]; then
            alert "High database connections: $connections"
        fi
    else
        alert "PostgreSQL: NOT READY"
    fi
}

# Verificar Redis
check_redis() {
    if docker exec linkmetur_redis_prod redis-cli ping >/dev/null 2>&1; then
        log_health "Redis: READY"
        
        # Verificar uso de memória
        memory=$(docker exec linkmetur_redis_prod redis-cli info memory | grep used_memory_human | cut -d: -f2 | tr -d '\r')
        log_health "Redis memory: $memory"
    else
        alert "Redis: NOT READY"
    fi
}

# Verificar certificado SSL
check_ssl_certificate() {
    local expiry_date=$(echo | openssl s_client -servername "$DOMAIN" -connect "$DOMAIN:443" 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2)
    local expiry_epoch=$(date -d "$expiry_date" +%s)
    local current_epoch=$(date +%s)
    local days_until_expiry=$(( (expiry_epoch - current_epoch) / 86400 ))
    
    log_health "SSL cert expires in: $days_until_expiry days"
    
    if [[ $days_until_expiry -lt 30 ]]; then
        alert "SSL certificate expires soon: $days_until_expiry days"
    fi
}

# Verificar espaço em disco
check_disk_space() {
    local usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    log_health "Disk usage: ${usage}%"
    
    if [[ $usage -gt 85 ]]; then
        alert "High disk usage: ${usage}%"
        
        # Limpeza automática
        docker system prune -f &
        apt-get autoremove -y &
        apt-get autoclean &
    fi
}

# Executar todas as verificações
main() {
    log_health "=== Health Check Started ==="
    
    check_containers
    check_web_connectivity
    check_database
    check_redis
    check_ssl_certificate
    check_disk_space
    
    log_health "=== Health Check Completed ==="
}

main
EOF

    chmod +x /opt/linkmetur/scripts/health-monitor.sh
    
    log "✅ Monitor de saúde criado"
}

# Sistema de alertas por email (opcional)
create_alert_system() {
    log "Configurando sistema de alertas..."
    
    cat > /opt/linkmetur/scripts/alert-processor.sh << 'EOF'
#!/bin/bash

# Processador de alertas do LinkMeTur
ALERT_DIR="/opt/linkmetur/logs/alerts"
PROCESSED_DIR="/opt/linkmetur/logs/alerts/processed"
EMAIL_ALERTS=${EMAIL_ALERTS:-false}
ADMIN_EMAIL=${ADMIN_EMAIL:-admin@localhost}

mkdir -p "$PROCESSED_DIR"

# Processar alertas novos
for alert_file in "$ALERT_DIR"/*.log; do
    [[ ! -f "$alert_file" ]] && continue
    
    filename=$(basename "$alert_file")
    
    # Verificar se há alertas novos (modificados nos últimos 5 minutos)
    if [[ $(find "$alert_file" -mmin -5) ]]; then
        echo "Processing alerts from: $filename"
        
        # Ler apenas alertas novos
        tail -n 100 "$alert_file" | while read -r line; do
            echo "ALERT: $line"
            
            # Enviar email se configurado
            if [[ "$EMAIL_ALERTS" == "true" ]]; then
                echo "$line" | mail -s "LinkMeTur Alert: $filename" "$ADMIN_EMAIL" 2>/dev/null || true
            fi
        done
        
        # Marcar como processado
        cp "$alert_file" "$PROCESSED_DIR/${filename}.$(date +%s)"
        > "$alert_file"  # Limpar arquivo original
    fi
done
EOF

    chmod +x /opt/linkmetur/scripts/alert-processor.sh
    
    log "✅ Sistema de alertas configurado"
}

# Dashboard de monitoramento simples
create_monitoring_dashboard() {
    log "Criando dashboard de monitoramento..."
    
    cat > /opt/linkmetur/scripts/dashboard.sh << 'EOF'
#!/bin/bash

# Dashboard de Monitoramento LinkMeTur
clear

echo "===================================================================================="
echo "                           LINKME TUR - DASHBOARD DE MONITORAMENTO"
echo "===================================================================================="
echo "Data/Hora: $(date)"
echo "Uptime: $(uptime -p)"
echo ""

# Seção: Status dos Serviços
echo "🐳 STATUS DOS CONTAINERS:"
echo "----------------------------"
cd /opt/linkmetur
docker compose -f docker-compose.prod.yml ps --format "table {{.Service}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null || echo "Erro ao obter status dos containers"

echo ""
echo "💻 RECURSOS DO SISTEMA:"
echo "----------------------------"
echo "CPU: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)% utilização"
echo "RAM: $(free -h | awk 'NR==2{printf "%.1f%%", $3*100/$2 }')"
echo "Disco: $(df -h / | awk 'NR==2 {print $5}') usado"
echo "Load: $(uptime | awk -F'load average:' '{print $2}')"

echo ""
echo "🌐 CONECTIVIDADE:"
echo "----------------------------"
DOMAIN=$(grep DOMAIN /opt/linkmetur/.env.production 2>/dev/null | cut -d'=' -f2 || echo "localhost")
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://$DOMAIN" --max-time 5 || echo "TIMEOUT")
HTTPS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" --max-time 5 || echo "TIMEOUT")
echo "HTTP ($DOMAIN): $HTTP_STATUS"
echo "HTTPS ($DOMAIN): $HTTPS_STATUS"

echo ""
echo "💾 DATABASE:"
echo "----------------------------"
if docker exec linkmetur_postgres_prod pg_isready -U linkmetur_user -d linkmetur >/dev/null 2>&1; then
    DB_CONNECTIONS=$(docker exec linkmetur_postgres_prod psql -U linkmetur_user -d linkmetur -t -c "SELECT count(*) FROM pg_stat_activity;" 2>/dev/null | xargs || echo "N/A")
    DB_SIZE=$(docker exec linkmetur_postgres_prod psql -U linkmetur_user -d linkmetur -t -c "SELECT pg_size_pretty(pg_database_size('linkmetur'));" 2>/dev/null | xargs || echo "N/A")
    echo "Status: ✅ ONLINE"
    echo "Conexões ativas: $DB_CONNECTIONS"
    echo "Tamanho do banco: $DB_SIZE"
else
    echo "Status: ❌ OFFLINE"
fi

echo ""
echo "🔄 CACHE (Redis):"
echo "----------------------------"
if docker exec linkmetur_redis_prod redis-cli ping >/dev/null 2>&1; then
    REDIS_MEMORY=$(docker exec linkmetur_redis_prod redis-cli info memory | grep used_memory_human | cut -d: -f2 | tr -d '\r')
    REDIS_KEYS=$(docker exec linkmetur_redis_prod redis-cli dbsize 2>/dev/null || echo "N/A")
    echo "Status: ✅ ONLINE"
    echo "Memória utilizada: $REDIS_MEMORY"
    echo "Chaves armazenadas: $REDIS_KEYS"
else
    echo "Status: ❌ OFFLINE"
fi

echo ""
echo "🔒 SEGURANÇA:"
echo "----------------------------"
UFW_STATUS=$(ufw status | grep -o "Status: [a-zA-Z]*" | cut -d' ' -f2)
FAIL2BAN_JAILS=$(fail2ban-client status 2>/dev/null | grep "Jail list" | cut -d: -f2 | tr -d ' \t' || echo "N/A")
echo "Firewall (UFW): $UFW_STATUS"
echo "Fail2ban: $FAIL2BAN_JAILS"

echo ""
echo "📊 ÚLTIMOS ALERTAS:"
echo "----------------------------"
if [[ -d "/opt/linkmetur/logs/alerts" ]]; then
    find /opt/linkmetur/logs/alerts -name "*.log" -mtime -1 -exec tail -n 3 {} \; 2>/dev/null | head -n 5 || echo "Nenhum alerta recente"
else
    echo "Sistema de alertas não configurado"
fi

echo ""
echo "🔧 COMANDOS ÚTEIS:"
echo "----------------------------"
echo "• Ver logs: tail -f /opt/linkmetur/logs/app/*.log"
echo "• Reiniciar app: docker compose -f /opt/linkmetur/docker-compose.prod.yml restart app"
echo "• Backup: /opt/linkmetur/scripts/hostinger-backup.sh full"
echo "• Deploy: /opt/linkmetur/scripts/hostinger-deploy.sh deploy"
echo "• Segurança: /opt/linkmetur/scripts/hostinger-security.sh"
echo ""
echo "===================================================================================="
EOF

    chmod +x /opt/linkmetur/scripts/dashboard.sh
    
    log "✅ Dashboard de monitoramento criado"
}

# Configurar cron jobs para monitoramento
setup_monitoring_cron() {
    log "Configurando tarefas de monitoramento..."
    
    # Backup do crontab atual
    crontab -l > /tmp/crontab.backup 2>/dev/null || true
    
    # Adicionar tarefas de monitoramento
    cat > /tmp/monitoring-cron << 'EOF'
# LinkMeTur Monitoring Tasks

# Resource monitoring every 5 minutes
*/5 * * * * /opt/linkmetur/scripts/resource-monitor.sh

# Health check every 2 minutes  
*/2 * * * * /opt/linkmetur/scripts/health-monitor.sh

# Alert processing every minute
* * * * * /opt/linkmetur/scripts/alert-processor.sh

# Daily cleanup at 2 AM
0 2 * * * /opt/linkmetur/scripts/hostinger-backup.sh cleanup

# Weekly backup promotion (Sundays at 3 AM)
0 3 * * 0 /opt/linkmetur/scripts/hostinger-backup.sh weekly

# Monthly backup promotion (1st day of month at 4 AM)
0 4 1 * * /opt/linkmetur/scripts/hostinger-backup.sh monthly

# Daily security check at 6 AM
0 6 * * * /opt/linkmetur/scripts/security-check.sh
EOF

    # Combinar com crontab existente
    (crontab -l 2>/dev/null; cat /tmp/monitoring-cron) | crontab -
    
    # Limpar arquivos temporários
    rm -f /tmp/monitoring-cron /tmp/crontab.backup
    
    log "✅ Tarefas de monitoramento configuradas"
}

# Função principal
main() {
    log "=== CONFIGURANDO SISTEMA DE MONITORAMENTO ==="
    
    setup_logging_structure
    setup_logrotate
    create_resource_monitor
    create_health_monitor
    create_alert_system
    create_monitoring_dashboard
    setup_monitoring_cron
    
    log "=== MONITORAMENTO CONFIGURADO COM SUCESSO ==="
    
    echo -e "\n${GREEN}📊 SISTEMA DE MONITORAMENTO ATIVO!${NC}"
    echo -e "\n${YELLOW}📋 Funcionalidades ativadas:${NC}"
    echo "• Monitor de recursos (CPU, RAM, Disco) a cada 5min"
    echo "• Health checks automáticos a cada 2min"
    echo "• Sistema de alertas em tempo real"
    echo "• Rotação automática de logs"
    echo "• Dashboard de monitoramento"
    echo "• Backups e limpeza automatizados"
    echo ""
    echo -e "${YELLOW}🔧 Como usar:${NC}"
    echo "• Dashboard: /opt/linkmetur/scripts/dashboard.sh"
    echo "• Ver logs: tail -f /opt/linkmetur/logs/monitoring/*.log"
    echo "• Ver alertas: cat /opt/linkmetur/logs/alerts/*.log"
    echo "• Monitor manual: /opt/linkmetur/scripts/health-monitor.sh"
    echo ""
    echo -e "${BLUE}📈 Logs são salvos em: /opt/linkmetur/logs/${NC}"
    echo -e "${BLUE}🚨 Alertas são salvos em: /opt/linkmetur/logs/alerts/${NC}"
}

# Executar se chamado diretamente
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi