#!/bin/bash

# Script de deploy para VPS
# Este script automatiza todo o processo de deploy em produção

set -e

echo "🚀 Iniciando deploy para VPS..."

# Verificar se estamos no ambiente correto
if [ ! -f ".env.production" ]; then
    echo "❌ Arquivo .env.production não encontrado"
    echo "Execute primeiro: ./scripts/switch-environment.sh vps"
    exit 1
fi

# Carregar variáveis de ambiente
source .env.production

echo "🌐 Deploy para: $NEXT_PUBLIC_FRONTEND_URL"

# 1. Instalar dependências do sistema
echo "📦 Instalando dependências do sistema..."
sudo apt update
sudo apt install -y nginx postgresql-client redis-tools nodejs npm docker.io docker-compose

# 2. Configurar PostgreSQL
echo "🗄️ Configurando PostgreSQL..."
sudo -u postgres psql -c "CREATE USER linkmetur_user WITH PASSWORD '$DB_PASSWORD';" || true
sudo -u postgres psql -c "CREATE DATABASE linkmetur OWNER linkmetur_user;" || true
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE linkmetur TO linkmetur_user;"

# 3. Configurar Redis
echo "🔴 Configurando Redis..."
sudo systemctl enable redis-server
sudo systemctl start redis-server

# 4. Instalar PM2 globalmente
echo "⚙️ Instalando PM2..."
sudo npm install -g pm2

# 5. Build das aplicações
echo "🔨 Fazendo build das aplicações..."

# Frontend
echo "📱 Build do Frontend..."
cd frontend
npm ci
npm run build
cd ..

# Backend
echo "🔧 Build do Backend..."
cd backend
npm ci
npm run build
cd ..

# Landing
echo "🌐 Build do Landing..."
cd landing
npm ci
npm run build
cd ..

# 6. Configurar Nginx
echo "🌐 Configurando Nginx..."
sudo cp nginx/nginx.production.conf /etc/nginx/sites-available/linkmetur
sudo ln -sf /etc/nginx/sites-available/linkmetur /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# 7. Configurar SSL (Let's Encrypt)
echo "🔒 Configurando SSL..."
if command -v certbot &> /dev/null; then
    sudo certbot --nginx -d $(echo $NEXT_PUBLIC_FRONTEND_URL | sed 's|https://||')
    echo "✅ SSL configurado com Let's Encrypt"
else
    echo "⚠️ Certbot não encontrado. Configure SSL manualmente."
fi

# 8. Executar migrations do banco
echo "🗄️ Executando migrations..."
./scripts/setup-database-production.sh

# 9. Configurar PM2
echo "⚙️ Configurando PM2..."
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup

# 10. Configurar firewall
echo "🔥 Configurando firewall..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# 11. Configurar backup automático
echo "💾 Configurando backup automático..."
sudo mkdir -p /var/backups/linkmetur
cat > /etc/cron.d/linkmetur-backup << EOF
# Backup diário do banco LinkMeTur
0 2 * * * postgres pg_dump -h $DB_HOST -U linkmetur_user linkmetur > /var/backups/linkmetur/linkmetur_\$(date +\%Y\%m\%d).sql
EOF

# 12. Configurar monitoramento
echo "📊 Configurando monitoramento..."
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30

# 13. Testar aplicação
echo "🧪 Testando aplicação..."
sleep 10

# Testar health checks
echo "🔍 Testando health checks..."
curl -f http://localhost:3001/health || echo "❌ Backend health check falhou"
curl -f http://localhost:8081/health || echo "❌ Landing health check falhou"

# 14. Configurar logrotate
echo "📝 Configurando logrotate..."
sudo cat > /etc/logrotate.d/linkmetur << EOF
/var/log/linkmetur/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 root root
    postrotate
        pm2 reloadLogs
    endscript
}
EOF

echo ""
echo "🎉 Deploy concluído com sucesso!"
echo ""
echo "📋 Informações do deploy:"
echo "🌐 URL: $NEXT_PUBLIC_FRONTEND_URL"
echo "🔧 Backend: http://localhost:3001"
echo "🌐 Landing: http://localhost:8081"
echo "📊 PM2 Status: pm2 status"
echo "📝 Logs: pm2 logs"
echo ""
echo "🔧 Comandos úteis:"
echo "  pm2 status          # Status dos processos"
echo "  pm2 logs            # Ver logs"
echo "  pm2 restart all     # Reiniciar todos"
echo "  pm2 stop all        # Parar todos"
echo "  pm2 start all       # Iniciar todos"
echo ""
echo "📞 Suporte: dev@linkmetur.com.br"
echo ""
