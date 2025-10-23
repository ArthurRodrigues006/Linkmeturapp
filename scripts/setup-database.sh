#!/bin/bash

# Script de Configuração do Banco de Dados - LinkMeTur
# Uso: ./scripts/setup-database.sh

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
DB_NAME="linkmetur"
DB_USER="linkmetur_user"
DB_PASSWORD="linkmetur_password"
DB_HOST="localhost"
DB_PORT="5432"

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

# Verificar se PostgreSQL está instalado
check_postgresql() {
    log "Verificando PostgreSQL..."
    
    if ! command -v psql &> /dev/null; then
        error "PostgreSQL não está instalado. Instale primeiro: sudo apt install postgresql postgresql-contrib"
    fi
    
    success "PostgreSQL encontrado."
}

# Configurar PostgreSQL
setup_postgresql() {
    log "Configurando PostgreSQL..."
    
    # Iniciar PostgreSQL
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
    
    # Criar usuário e banco
    sudo -u postgres psql <<EOF
-- Criar usuário
CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';

-- Criar banco de dados
CREATE DATABASE $DB_NAME OWNER $DB_USER;

-- Conceder privilégios
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;

-- Conectar ao banco e conceder privilégios no schema public
\c $DB_NAME
GRANT ALL ON SCHEMA public TO $DB_USER;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DB_USER;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DB_USER;

-- Configurar para futuras tabelas
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO $DB_USER;

\q
EOF

    success "PostgreSQL configurado."
}

# Configurar Redis
setup_redis() {
    log "Configurando Redis..."
    
    if ! command -v redis-server &> /dev/null; then
        log "Instalando Redis..."
        sudo apt update
        sudo apt install -y redis-server
    fi
    
    # Configurar Redis
    sudo systemctl start redis-server
    sudo systemctl enable redis-server
    
    # Configurar Redis para produção
    sudo sed -i 's/^# maxmemory <bytes>/maxmemory 256mb/' /etc/redis/redis.conf
    sudo sed -i 's/^# maxmemory-policy noeviction/maxmemory-policy allkeys-lru/' /etc/redis/redis.conf
    
    sudo systemctl restart redis-server
    
    success "Redis configurado."
}

# Testar conexões
test_connections() {
    log "Testando conexões..."
    
    # Testar PostgreSQL
    if PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT 1;" > /dev/null 2>&1; then
        success "Conexão com PostgreSQL OK."
    else
        error "Falha na conexão com PostgreSQL."
    fi
    
    # Testar Redis
    if redis-cli ping | grep -q "PONG"; then
        success "Conexão com Redis OK."
    else
        error "Falha na conexão com Redis."
    fi
}

# Criar arquivo de configuração
create_config() {
    log "Criando arquivo de configuração..."
    
    cat > .env.local <<EOF
# Configurações do Banco de Dados Local
DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME
DB_HOST=$DB_HOST
DB_PORT=$DB_PORT
DB_USERNAME=$DB_USER
DB_PASSWORD=$DB_PASSWORD
DB_DATABASE=$DB_NAME

# Configurações do Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Configurações de JWT
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRES_IN=24h

# Configurações dos Serviços
BACKEND_PORT=3001
FRONTEND_PORT=3000
LANDING_PORT=8081

# URLs dos Serviços
BACKEND_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
LANDING_URL=http://localhost:8081

# Configurações de CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:8081

# Configurações de Rate Limiting
THROTTLE_TTL=60000
THROTTLE_LIMIT=100

# Configurações de Cache
CACHE_TTL=300

# Configurações de Email (configure conforme necessário)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
EOF

    success "Arquivo de configuração criado: .env.local"
}

# Função principal
main() {
    log "Iniciando configuração do banco de dados..."
    
    check_postgresql
    setup_postgresql
    setup_redis
    test_connections
    create_config
    
    success "Configuração do banco de dados concluída!"
    log "Próximos passos:"
    log "1. Configure as variáveis de email em .env.local"
    log "2. Execute: npm run dev:all"
    log "3. Acesse: http://localhost:3000"
}

# Executar função principal
main "$@"
