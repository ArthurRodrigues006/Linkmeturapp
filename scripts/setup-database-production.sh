#!/bin/bash

# Script para configurar o banco de dados em produção
# Este script cria todas as tabelas, índices e dados iniciais

set -e

echo "🗄️ Configurando banco de dados para produção..."

# Verificar se as variáveis de ambiente estão definidas
if [ -z "$DB_HOST" ] || [ -z "$DB_PORT" ] || [ -z "$DB_USERNAME" ] || [ -z "$DB_PASSWORD" ] || [ -z "$DB_DATABASE" ]; then
    echo "❌ Variáveis de ambiente do banco não definidas"
    echo "Defina: DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE"
    exit 1
fi

# Verificar se o PostgreSQL está acessível
echo "🔍 Verificando conexão com PostgreSQL..."
if ! pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME"; then
    echo "❌ Não foi possível conectar ao PostgreSQL"
    echo "Verifique se o servidor está rodando e as credenciais estão corretas"
    exit 1
fi

echo "✅ Conexão com PostgreSQL estabelecida"

# Executar migration
echo "📝 Executando migration inicial..."
PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME" -d "$DB_DATABASE" -f "landing/src/database/migrations/001-initial-schema.sql"

if [ $? -eq 0 ]; then
    echo "✅ Migration executada com sucesso"
else
    echo "❌ Erro ao executar migration"
    exit 1
fi

# Verificar se as tabelas foram criadas
echo "🔍 Verificando estrutura do banco..."
TABLE_COUNT=$(PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME" -d "$DB_DATABASE" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")

if [ "$TABLE_COUNT" -gt 10 ]; then
    echo "✅ Banco de dados configurado com sucesso"
    echo "📊 $TABLE_COUNT tabelas criadas"
else
    echo "❌ Estrutura do banco incompleta"
    exit 1
fi

# Criar usuário de aplicação se não existir
echo "👤 Configurando usuário de aplicação..."
PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME" -d "$DB_DATABASE" -c "
DO \$\$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'linkmetur_app') THEN
        CREATE ROLE linkmetur_app WITH LOGIN PASSWORD 'linkmetur_app_password';
        GRANT CONNECT ON DATABASE $DB_DATABASE TO linkmetur_app;
        GRANT USAGE ON SCHEMA public TO linkmetur_app;
        GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO linkmetur_app;
        GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO linkmetur_app;
    END IF;
END
\$\$;
"

echo "✅ Usuário de aplicação configurado"

# Configurar backup automático
echo "💾 Configurando backup automático..."
cat > /etc/cron.d/linkmetur-backup << EOF
# Backup diário do banco LinkMeTur
0 2 * * * postgres pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USERNAME $DB_DATABASE > /var/backups/linkmetur_\$(date +\%Y\%m\%d).sql
EOF

echo "✅ Backup automático configurado"

echo ""
echo "🎉 Banco de dados configurado com sucesso!"
echo ""
echo "📋 Informações de conexão:"
echo "   Host: $DB_HOST"
echo "   Porta: $DB_PORT"
echo "   Banco: $DB_DATABASE"
echo "   Usuário App: linkmetur_app"
echo ""
echo "🔧 Próximos passos:"
echo "   1. Configure as variáveis de ambiente da aplicação"
echo "   2. Inicie os serviços da aplicação"
echo "   3. Teste a conexão com a aplicação"
