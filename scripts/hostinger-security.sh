#!/bin/bash

# ====================================================================
# SCRIPT DE SEGURANÇA E HARDENING - VPS HOSTINGER UBUNTU 22.04
# ====================================================================

set -euo pipefail

LOG_FILE="/var/log/linkmetur-security.log"

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

# Configurar firewall UFW
setup_firewall() {
    log "Configurando firewall UFW..."
    
    # Resetar configurações anteriores
    ufw --force reset
    
    # Políticas padrão
    ufw default deny incoming
    ufw default allow outgoing
    
    # Permitir SSH (IMPORTANTE - não bloquear acesso!)
    ufw allow ssh
    ufw allow 22/tcp
    
    # Permitir HTTP/HTTPS
    ufw allow 80/tcp
    ufw allow 443/tcp
    
    # Permitir Docker (para comunicação entre containers)
    ufw allow from 172.20.0.0/16
    
    # Rate limiting para SSH (proteção contra brute force)
    ufw limit ssh
    
    # Habilitar UFW
    ufw --force enable
    
    # Verificar status
    ufw status verbose
    
    log "✅ Firewall UFW configurado com sucesso"
}

# Configurar Fail2ban
setup_fail2ban() {
    log "Configurando Fail2ban..."
    
    # Instalar se não estiver instalado
    if ! command -v fail2ban-server &> /dev/null; then
        apt-get update
        apt-get install -y fail2ban
    fi
    
    # Backup da configuração original
    [[ -f /etc/fail2ban/jail.conf ]] && cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.conf.backup
    
    # Criar configuração customizada para LinkMeTur
    cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
# Configurações globais
bantime = 1800          # 30 minutos de ban
findtime = 600          # Janela de 10 minutos
maxretry = 3            # Máximo 3 tentativas
ignoreip = 127.0.0.1/8 ::1 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16
backend = systemd

# Notificações por email (configure se necessário)
# destemail = admin@seudominio.com
# sender = fail2ban@seudominio.com
# mta = sendmail

# SSH Protection
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600

# Nginx HTTP Auth
[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 3

# Nginx Rate Limiting
[nginx-limit-req]
enabled = true
filter = nginx-limit-req
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 10
bantime = 600

# Nginx Bad Bots
[nginx-badbots]
enabled = true
filter = nginx-badbots
port = http,https
logpath = /var/log/nginx/access.log
maxretry = 2
bantime = 86400

# Docker/Application specific
[linkmetur-app]
enabled = true
filter = linkmetur-app
port = http,https
logpath = /opt/linkmetur/logs/app/error.log
maxretry = 5
bantime = 1800
EOF

    # Criar filtros customizados
    mkdir -p /etc/fail2ban/filter.d
    
    # Filtro para aplicação LinkMeTur
    cat > /etc/fail2ban/filter.d/linkmetur-app.conf << 'EOF'
[Definition]
failregex = ^.*\[ERROR\].*Failed login attempt from <HOST>.*$
            ^.*\[ERROR\].*Invalid API request from <HOST>.*$
            ^.*\[ERROR\].*Brute force detected from <HOST>.*$
ignoreregex = ^.*\[INFO\].*$
EOF

    # Filtro para bad bots
    cat > /etc/fail2ban/filter.d/nginx-badbots.conf << 'EOF'
[Definition]
failregex = ^<HOST> -.*"(GET|POST).*" (404|403) .*".*bot.*"$
            ^<HOST> -.*"(GET|POST).*" (404|403) .*".*crawler.*"$
            ^<HOST> -.*"(GET|POST).*" (404|403) .*".*spider.*"$
ignoreregex = ^.*".*Googlebot.*"$
              ^.*".*Bingbot.*"$
EOF

    # Reiniciar Fail2ban
    systemctl restart fail2ban
    systemctl enable fail2ban
    
    # Verificar status
    fail2ban-client status
    
    log "✅ Fail2ban configurado com sucesso"
}

# Configurar SSH Security
harden_ssh() {
    log "Aplicando hardening no SSH..."
    
    # Backup da configuração SSH
    cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup
    
    # Configurações de segurança SSH
    cat > /etc/ssh/sshd_config.d/99-linkmetur-security.conf << 'EOF'
# LinkMeTur SSH Security Configuration

# Disable root login
PermitRootLogin no

# Use only SSH protocol 2
Protocol 2

# Change default port (uncomment and change if needed)
# Port 2222

# Authentication
MaxAuthTries 3
MaxStartups 2:30:10
LoginGraceTime 30

# Disable empty passwords
PermitEmptyPasswords no

# Disable password authentication (use keys only)
# PasswordAuthentication no
# PubkeyAuthentication yes

# Disable X11 forwarding
X11Forwarding no

# Disable agent forwarding
AllowAgentForwarding no

# Disable TCP forwarding
AllowTcpForwarding no

# Use strong ciphers
Ciphers aes256-ctr,aes192-ctr,aes128-ctr
MACs hmac-sha2-256,hmac-sha2-512

# Only allow specific users (uncomment and configure)
# AllowUsers username

# Banner
Banner /etc/ssh/banner.txt
EOF

    # Criar banner de aviso
    cat > /etc/ssh/banner.txt << 'EOF'
***************************************************************************
                    SISTEMA AUTORIZADO APENAS
                       
   Este sistema é monitorado. Uso não autorizado é proibido.
   Todas as atividades são registradas e podem ser reportadas.
   
                     LinkMeTur Production Server
***************************************************************************
EOF

    # Testar configuração SSH antes de aplicar
    if sshd -t; then
        systemctl reload sshd
        log "✅ SSH hardening aplicado com sucesso"
    else
        error "❌ Erro na configuração SSH - revertendo mudanças"
        cp /etc/ssh/sshd_config.backup /etc/ssh/sshd_config
        return 1
    fi
}

# Configurar sistema de updates automáticos
setup_auto_updates() {
    log "Configurando atualizações automáticas de segurança..."
    
    # Instalar unattended-upgrades
    apt-get update
    apt-get install -y unattended-upgrades apt-listchanges
    
    # Configurar atualizações automáticas
    cat > /etc/apt/apt.conf.d/50unattended-upgrades << 'EOF'
// Automatically upgrade packages from these (origin:archive) pairs
Unattended-Upgrade::Allowed-Origins {
    "${distro_id}:${distro_codename}-security";
    "${distro_id}ESMApps:${distro_codename}-apps-security";
    "${distro_id}ESM:${distro_codename}-infra-security";
};

// Remove unused automatically installed kernel-related packages
Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";

// Remove unused dependencies
Unattended-Upgrade::Remove-Unused-Dependencies "true";

// Automatically remove new unused dependencies after the upgrade
Unattended-Upgrade::Remove-New-Unused-Dependencies "true";

// Automatically reboot if required
Unattended-Upgrade::Automatic-Reboot "false";

// Email notifications
// Unattended-Upgrade::Mail "admin@seudominio.com";
Unattended-Upgrade::MailReport "on-change";
EOF

    # Habilitar atualizações automáticas
    cat > /etc/apt/apt.conf.d/20auto-upgrades << 'EOF'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
EOF

    # Habilitar serviço
    systemctl enable unattended-upgrades
    systemctl start unattended-upgrades
    
    log "✅ Atualizações automáticas configuradas"
}

# Configurar monitoramento de intrusão
setup_intrusion_detection() {
    log "Configurando detecção de intrusão..."
    
    # Instalar AIDE (Advanced Intrusion Detection Environment)
    apt-get install -y aide
    
    # Inicializar banco de dados AIDE
    aide --init
    mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db
    
    # Configurar verificação diária
    cat > /etc/cron.daily/aide-check << 'EOF'
#!/bin/bash
# AIDE daily check script

LOG_FILE="/var/log/aide/aide-check.log"
mkdir -p "$(dirname "$LOG_FILE")"

echo "AIDE Check - $(date)" >> "$LOG_FILE"

# Run AIDE check
aide --check >> "$LOG_FILE" 2>&1

if [[ $? -ne 0 ]]; then
    echo "ALERT: AIDE detected file system changes!" >> "$LOG_FILE"
    # Send alert (configure email if needed)
    # mail -s "AIDE Alert" admin@seudominio.com < "$LOG_FILE"
fi

# Update database weekly (on Sundays)
if [[ $(date +%u) -eq 7 ]]; then
    aide --update >> "$LOG_FILE" 2>&1
    mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db 2>/dev/null || true
fi
EOF

    chmod +x /etc/cron.daily/aide-check
    
    log "✅ Sistema de detecção de intrusão configurado"
}

# Configurar auditoria do sistema
setup_system_audit() {
    log "Configurando auditoria do sistema..."
    
    # Instalar auditd
    apt-get install -y auditd audispd-plugins
    
    # Configurar regras de auditoria
    cat > /etc/audit/rules.d/audit.rules << 'EOF'
# Delete all existing rules
-D

# Buffer Size
-b 8192

# Failure Mode (0=silent, 1=printk, 2=panic)
-f 1

# Monitor authentication files
-w /etc/passwd -p wa -k identity
-w /etc/group -p wa -k identity
-w /etc/gshadow -p wa -k identity
-w /etc/shadow -p wa -k identity
-w /etc/security/opasswd -p wa -k identity

# Monitor sudoers
-w /etc/sudoers -p wa -k scope
-w /etc/sudoers.d/ -p wa -k scope

# Monitor login/logout events
-w /var/log/faillog -p wa -k logins
-w /var/log/lastlog -p wa -k logins
-w /var/log/tallylog -p wa -k logins

# Monitor network environment
-a always,exit -F arch=b64 -S sethostname -S setdomainname -k system-locale
-a always,exit -F arch=b32 -S sethostname -S setdomainname -k system-locale
-w /etc/issue -p wa -k system-locale
-w /etc/issue.net -p wa -k system-locale
-w /etc/hosts -p wa -k system-locale
-w /etc/hostname -p wa -k system-locale

# Monitor system calls
-a always,exit -F arch=b64 -S adjtimex -S settimeofday -k time-change
-a always,exit -F arch=b32 -S adjtimex -S settimeofday -S stime -k time-change

# Monitor file deletions
-a always,exit -F arch=b64 -S unlink -S unlinkat -S rename -S renameat -F auid>=1000 -F auid!=4294967295 -k delete
-a always,exit -F arch=b32 -S unlink -S unlinkat -S rename -S renameat -F auid>=1000 -F auid!=4294967295 -k delete

# Lock the audit configuration
-e 2
EOF

    # Reiniciar auditd
    service auditd restart
    systemctl enable auditd
    
    log "✅ Sistema de auditoria configurado"
}

# Configurar proteção contra DDoS básica
setup_ddos_protection() {
    log "Configurando proteção básica contra DDoS..."
    
    # Configurações do kernel para proteção de rede
    cat > /etc/sysctl.d/99-ddos-protection.conf << 'EOF'
# DDoS Protection Settings

# IP Spoofing protection
net.ipv4.conf.default.rp_filter = 1
net.ipv4.conf.all.rp_filter = 1

# Ignore ICMP redirects
net.ipv4.conf.all.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv6.conf.default.accept_redirects = 0

# Ignore send redirects
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0

# Disable source packet routing
net.ipv4.conf.all.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0
net.ipv6.conf.default.accept_source_route = 0

# Log Martians
net.ipv4.conf.all.log_martians = 1
net.ipv4.conf.default.log_martians = 1

# Ignore ICMP ping requests
net.ipv4.icmp_echo_ignore_all = 1

# Ignore broadcast requests
net.ipv4.icmp_echo_ignore_broadcasts = 1

# Bad error message protection
net.ipv4.icmp_ignore_bogus_error_responses = 1

# SYN flood protection
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_syn_backlog = 2048
net.ipv4.tcp_synack_retries = 3

# Connection tracking
net.netfilter.nf_conntrack_max = 65536

# TCP settings
net.ipv4.tcp_keepalive_time = 1800
net.ipv4.tcp_keepalive_probes = 7
net.ipv4.tcp_keepalive_intvl = 30
EOF

    # Aplicar configurações
    sysctl -p /etc/sysctl.d/99-ddos-protection.conf
    
    log "✅ Proteção básica contra DDoS configurada"
}

# Script de verificação de segurança
create_security_check_script() {
    log "Criando script de verificação de segurança..."
    
    cat > /opt/linkmetur/scripts/security-check.sh << 'EOF'
#!/bin/bash

# Script de verificação de segurança do LinkMeTur

echo "=== VERIFICAÇÃO DE SEGURANÇA ==="
echo "Data: $(date)"
echo ""

# Verificar UFW
echo "🔥 Status do Firewall:"
ufw status | head -20

echo ""
echo "🚫 Status do Fail2ban:"
fail2ban-client status | head -10

echo ""
echo "🔐 Últimas tentativas de login SSH:"
tail -10 /var/log/auth.log | grep -i "failed"

echo ""
echo "📊 Processos suspeitos (high CPU):"
ps aux --sort=-%cpu | head -10

echo ""
echo "🌐 Conexões de rede ativas:"
netstat -tuln | grep -E ":80|:443|:22|:5432|:6379"

echo ""
echo "💾 Uso de disco:"
df -h | grep -E "/$|/opt"

echo ""
echo "🔍 Verificar portas abertas:"
nmap -sT -O localhost 2>/dev/null | grep -E "open|closed"

echo ""
echo "⚡ Últimos logins bem-sucedidos:"
last | head -5

echo ""
echo "✅ Verificação concluída!"
EOF

    chmod +x /opt/linkmetur/scripts/security-check.sh
    
    # Adicionar ao cron para executar diariamente
    echo "0 6 * * * /opt/linkmetur/scripts/security-check.sh > /var/log/daily-security-check.log 2>&1" | crontab -
    
    log "✅ Script de verificação de segurança criado"
}

# Função principal
main() {
    log "=== INICIANDO CONFIGURAÇÃO DE SEGURANÇA ==="
    
    # Verificar se é root
    if [[ $EUID -ne 0 ]]; then
        error "Este script deve ser executado como root"
        exit 1
    fi
    
    setup_firewall
    setup_fail2ban
    harden_ssh
    setup_auto_updates
    setup_intrusion_detection
    setup_system_audit
    setup_ddos_protection
    create_security_check_script
    
    log "=== CONFIGURAÇÃO DE SEGURANÇA CONCLUÍDA ==="
    
    echo -e "\n${GREEN}🔒 SISTEMA SEGURO CONFIGURADO!${NC}"
    echo -e "\n${YELLOW}📋 Verificações de segurança ativadas:${NC}"
    echo "• Firewall UFW ativo"
    echo "• Fail2ban monitorando tentativas de intrusão"
    echo "• SSH endurecido"
    echo "• Atualizações automáticas de segurança"
    echo "• Detecção de intrusão (AIDE)"
    echo "• Auditoria do sistema (auditd)"
    echo "• Proteção básica contra DDoS"
    echo "• Verificação diária automatizada"
    echo ""
    echo -e "${YELLOW}🔧 Comandos úteis:${NC}"
    echo "• Verificar firewall: ufw status verbose"
    echo "• Status Fail2ban: fail2ban-client status"
    echo "• Verificação de segurança: /opt/linkmetur/scripts/security-check.sh"
    echo "• Logs de auditoria: tail -f /var/log/audit/audit.log"
}

# Executar se chamado diretamente
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi