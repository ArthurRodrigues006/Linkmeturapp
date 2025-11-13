#!/bin/bash

# Script de Backup - PostgreSQL Nuvem → Local
# Uso: ./scripts/backup-cloud-to-local.sh

set -e

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Backup PostgreSQL - Nuvem → Local       ║${NC}"
echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo ""

# Verificar se .env existe
if [ ! -f "landing page/.env" ]; then
    echo -e "${RED}❌ Erro: Arquivo .env não encontrado${NC}"
    exit 1
fi

# Carregar variáveis de ambiente
source "landing page/.env"

if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}❌ Erro: DATABASE_URL não definida no .env${NC}"
    exit 1
fi

# Configurações de backup
BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/linkmetur_backup_$TIMESTAMP.sql"

# Criar diretório de backup se não existir
mkdir -p "$BACKUP_DIR"

echo -e "${YELLOW}📊 Informações do Backup:${NC}"
echo -e "   Origem: ${GREEN}PostgreSQL Nuvem${NC}"
echo -e "   Arquivo: ${BLUE}$BACKUP_FILE${NC}"
echo -e "   Data/Hora: ${BLUE}$(date '+%d/%m/%Y %H:%M:%S')${NC}"
echo ""

# Fazer backup do banco na nuvem
echo -e "${BLUE}⏳ Fazendo backup do banco na nuvem...${NC}"
pg_dump "$DATABASE_URL" > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    FILESIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo -e "${GREEN}✅ Backup criado com sucesso!${NC}"
    echo -e "   Tamanho: ${BLUE}$FILESIZE${NC}"
else
    echo -e "${RED}❌ Erro ao criar backup${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 Backup Concluído!${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}📝 Próximos passos:${NC}"
echo "   1. Para restaurar localmente:"
echo "      ./scripts/restore-backup-to-local.sh $BACKUP_FILE"
echo ""
echo "   2. Para ver backups disponíveis:"
echo "      ls -lh $BACKUP_DIR"
echo ""

