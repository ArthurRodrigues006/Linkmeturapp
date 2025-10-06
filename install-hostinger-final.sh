# Continuação final do install-hostinger.sh

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