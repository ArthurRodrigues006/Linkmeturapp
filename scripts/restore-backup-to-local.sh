#!/bin/bash

# Script de Restauração - Backup → PostgreSQL Local
# Uso: ./scripts/restore-backup-to-local.sh [arquivo_backup.sql]

set -e

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Restaurar Backup → PostgreSQL Local     ║${NC}"
echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo ""

# Verificar se o arquivo de backup foi fornecido
if [ -z "$1" ]; then
    echo -e "${RED}❌ Erro: Forneça o arquivo de backup${NC}"
    echo ""
    echo "Uso: $0 <arquivo_backup.sql>"
    echo ""
    echo "Backups disponíveis:"
    ls -lh backups/*.sql 2>/dev/null || echo "   Nenhum backup encontrado"
    exit 1
fi

BACKUP_FILE=$1

# Verificar se o arquivo existe
if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}❌ Erro: Arquivo não encontrado: $BACKUP_FILE${NC}"
    exit 1
fi

# Configurações do PostgreSQL Local
LOCAL_DB_HOST="localhost"
LOCAL_DB_PORT="5432"
LOCAL_DB_NAME="linkmetur_local"
LOCAL_DB_USER="linkmetur_user"
LOCAL_DB_PASSWORD="linkmetur_password"

echo -e "${YELLOW}📊 Configurações:${NC}"
echo -e "   Backup: ${BLUE}$BACKUP_FILE${NC}"
echo -e "   Destino: ${GREEN}PostgreSQL Local${NC}"
echo -e "   Host: ${BLUE}$LOCAL_DB_HOST:$LOCAL_DB_PORT${NC}"
echo -e "   Database: ${BLUE}$LOCAL_DB_NAME${NC}"
echo ""

# Verificar se PostgreSQL local está rodando
echo -e "${BLUE}🔍 Verificando PostgreSQL local...${NC}"
if ! pg_isready -h "$LOCAL_DB_HOST" -p "$LOCAL_DB_PORT" > /dev/null 2>&1; then
    echo -e "${RED}❌ PostgreSQL local não está rodando${NC}"
    echo ""
    echo -e "${YELLOW}💡 Inicie o PostgreSQL local primeiro:${NC}"
    echo "   - Windows: Start-Service postgresql-x64-17"
    echo "   - Docker: docker-compose -f docker-compose.dev.yml up -d postgres"
    exit 1
fi

echo -e "${GREEN}✅ PostgreSQL local está rodando${NC}"
echo ""

# Criar banco de dados se não existir
echo -e "${BLUE}📦 Criando banco de dados local...${NC}"
export PGPASSWORD="$LOCAL_DB_PASSWORD"

psql -h "$LOCAL_DB_HOST" -p "$LOCAL_DB_PORT" -U "$LOCAL_DB_USER" -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$LOCAL_DB_NAME'" | grep -q 1 || \
    psql -h "$LOCAL_DB_HOST" -p "$LOCAL_DB_PORT" -U "$LOCAL_DB_USER" -d postgres -c "CREATE DATABASE $LOCAL_DB_NAME"

echo -e "${GREEN}✅ Banco de dados pronto${NC}"
echo ""

# Restaurar backup
echo -e "${BLUE}⏳ Restaurando backup...${NC}"
psql -h "$LOCAL_DB_HOST" -p "$LOCAL_DB_PORT" -U "$LOCAL_DB_USER" -d "$LOCAL_DB_NAME" < "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backup restaurado com sucesso!${NC}"
else
    echo -e "${RED}❌ Erro ao restaurar backup${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 Restauração Concluída!${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}📝 String de conexão local:${NC}"
echo "   DATABASE_URL=\"postgresql://$LOCAL_DB_USER:$LOCAL_DB_PASSWORD@$LOCAL_DB_HOST:$LOCAL_DB_PORT/$LOCAL_DB_NAME\""
echo ""
echo -e "${YELLOW}💡 Para usar o banco local:${NC}"
echo "   1. Atualize o .env com a string acima"
echo "   2. Reinicie sua aplicação"
echo ""

