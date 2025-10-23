#!/bin/bash

# Script para configurar banco de dados PostgreSQL no Render
echo "🗄️ Configurando banco de dados PostgreSQL para produção..."

# Informações sobre configuração do banco no Render
cat << 'EOF'
📋 CONFIGURAÇÃO DO BANCO DE DADOS NO RENDER

1. 🎯 No dashboard do Render:
   - Vá para "Databases" no menu lateral
   - Clique em "New PostgreSQL"
   - Configure o banco com as seguintes informações:

2. ⚙️ Configurações recomendadas:
   - Name: linkmetur-postgres
   - Database Name: linkmetur
   - User: linkmetur_user
   - Region: Oregon (mesmo da aplicação)
   - Plan: Starter (gratuito para desenvolvimento)

3. 🔗 Conexão automática:
   - O Render irá gerar automaticamente a DATABASE_URL
   - Essa URL será injetada na aplicação automaticamente
   - Não é necessário configurar manualmente

4. 🛠️ Após criar o banco:
   - A DATABASE_URL estará disponível em Environment Variables
   - Formato: postgresql://user:password@host:port/database
   - A aplicação Next.js conectará automaticamente

5. 📊 Monitoramento:
   - Use o dashboard do Render para monitorar conexões
   - Logs disponíveis na aba "Logs" do serviço
   - Métricas de performance na aba "Metrics"

6. 🔧 Para desenvolvimento local:
   - Continue usando docker-compose.dev.yml
   - O ambiente local não será afetado

7. 📈 Para escalar:
   - Upgrade do plano Starter para Standard conforme necessário
   - Backup automático disponível em planos pagos
   - Read replicas disponíveis em planos superiores

EOF

echo ""
echo "✅ Configuração do banco documentada!"
echo ""
echo "📝 Próximos passos:"
echo "1. Acesse dashboard.render.com"
echo "2. Crie novo banco PostgreSQL"
echo "3. Use as configurações acima"
echo "4. O Render conectará automaticamente com sua aplicação"
echo ""
echo "🔍 Para verificar a conexão após deploy:"
echo "   - Acesse os logs da aplicação no Render"
echo "   - Procure por mensagens de conexão com o banco"
echo "   - Use 'Database connected successfully' como referência"