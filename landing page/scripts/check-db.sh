#!/bin/bash

# Script rápido para verificar status do banco de dados

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DB_FILE="$PROJECT_DIR/prisma/dev.db"

echo "🔍 Verificação Rápida do Banco de Dados"
echo "======================================="
echo ""

# Verificar arquivo
if [ -f "$DB_FILE" ]; then
    echo "✅ Banco de dados existe"
    echo "   📁 Localização: $DB_FILE"
    echo "   📊 Tamanho: $(du -h "$DB_FILE" | cut -f1)"
    echo "   🔐 Permissões: $(ls -lh "$DB_FILE" | awk '{print $1}')"
    echo ""
else
    echo "❌ Banco de dados NÃO existe!"
    echo "   Execute: npm run db:push && npm run db:seed"
    echo ""
    exit 1
fi

# Verificar .env
if grep -q "file:./prisma/dev.db" "$PROJECT_DIR/.env" 2>/dev/null; then
    echo "✅ DATABASE_URL configurada corretamente"
else
    echo "⚠️  Aviso: DATABASE_URL pode estar incorreta"
    echo "   Verifique o arquivo .env"
fi

echo ""
echo "Para abrir o Prisma Studio: npm run db:studio"
echo ""
