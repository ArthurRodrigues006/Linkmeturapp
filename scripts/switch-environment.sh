#!/bin/bash

# Script para alternar entre ambientes (localhost e VPS)
# Uso: ./scripts/switch-environment.sh [local|vps]

set -e

ENVIRONMENT=${1:-local}

echo "🔄 Alternando para ambiente: $ENVIRONMENT"

case $ENVIRONMENT in
  "local")
    echo "🏠 Configurando ambiente LOCAL..."
    
    # Configurar variáveis para localhost
    cat > .env.local << EOF
# Ambiente Local
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:8081
NEXT_PUBLIC_LANDING_URL=http://localhost:8081
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
BACKEND_PORT=3001
LANDING_PORT=8081
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=linkmetur_user
DB_PASSWORD=linkmetur_password
DB_DATABASE=linkmetur
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=local-development-secret-key
EOF

    # Configurar frontend
    cat > frontend/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8081
NEXT_PUBLIC_LANDING_URL=http://localhost:8081
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
EOF

    # Configurar backend
    cat > backend/.env << EOF
NODE_ENV=development
BACKEND_PORT=3001
EOF

    # Configurar landing
    cat > landing/.env << EOF
NODE_ENV=development
LANDING_PORT=8081
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=linkmetur_user
DB_PASSWORD=linkmetur_password
DB_DATABASE=linkmetur
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=local-development-secret-key
EOF

    echo "✅ Ambiente LOCAL configurado!"
    echo "🚀 Para iniciar: ./start-dev.sh"
    ;;
    
  "vps")
    echo "🌐 Configurando ambiente VPS..."
    
    # Solicitar informações do VPS
    read -p "🌐 Domínio do VPS (ex: app.linkmetur.com.br): " VPS_DOMAIN
    read -p "🗄️ Host do banco de dados: " VPS_DB_HOST
    read -p "🔑 Senha do banco de dados: " VPS_DB_PASSWORD
    read -p "🔐 JWT Secret (deixe vazio para gerar): " VPS_JWT_SECRET
    
    # Gerar JWT secret se não fornecido
    if [ -z "$VPS_JWT_SECRET" ]; then
      VPS_JWT_SECRET=$(openssl rand -base64 32)
      echo "🔐 JWT Secret gerado: $VPS_JWT_SECRET"
    fi
    
    # Configurar variáveis para VPS
    cat > .env.production << EOF
# Ambiente VPS/Produção
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://$VPS_DOMAIN/api
NEXT_PUBLIC_LANDING_URL=https://$VPS_DOMAIN
NEXT_PUBLIC_FRONTEND_URL=https://$VPS_DOMAIN
BACKEND_PORT=3001
LANDING_PORT=8081
DB_HOST=$VPS_DB_HOST
DB_PORT=5432
DB_USERNAME=linkmetur_user
DB_PASSWORD=$VPS_DB_PASSWORD
DB_DATABASE=linkmetur
REDIS_HOST=$VPS_DB_HOST
REDIS_PORT=6379
JWT_SECRET=$VPS_JWT_SECRET
EOF

    # Configurar frontend
    cat > frontend/.env.production << EOF
NEXT_PUBLIC_API_URL=https://$VPS_DOMAIN/api
NEXT_PUBLIC_LANDING_URL=https://$VPS_DOMAIN
NEXT_PUBLIC_FRONTEND_URL=https://$VPS_DOMAIN
EOF

    # Configurar backend
    cat > backend/.env.production << EOF
NODE_ENV=production
BACKEND_PORT=3001
EOF

    # Configurar landing
    cat > landing/.env.production << EOF
NODE_ENV=production
LANDING_PORT=8081
DB_HOST=$VPS_DOMAIN
DB_PORT=5432
DB_USERNAME=linkmetur_user
DB_PASSWORD=$VPS_DB_PASSWORD
DB_DATABASE=linkmetur
REDIS_HOST=$VPS_DOMAIN
REDIS_PORT=6379
JWT_SECRET=$VPS_JWT_SECRET
EOF

    # Configurar Nginx para VPS
    cat > nginx/nginx.production.conf << EOF
server {
    listen 80;
    server_name $VPS_DOMAIN;
    
    # Redirect HTTP to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $VPS_DOMAIN;
    
    # SSL Configuration
    ssl_certificate /etc/ssl/certs/linkmetur.crt;
    ssl_certificate_key /etc/ssl/private/linkmetur.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # Landing API
    location /landing/ {
        proxy_pass http://localhost:8081/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # WebSocket support
    location /socket.io/ {
        proxy_pass http://localhost:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

    echo "✅ Ambiente VPS configurado!"
    echo "🌐 Domínio: https://$VPS_DOMAIN"
    echo "🚀 Para deploy: ./scripts/deploy-vps.sh"
    ;;
    
  *)
    echo "❌ Ambiente inválido. Use: local ou vps"
    echo "Uso: $0 [local|vps]"
    exit 1
    ;;
esac

echo ""
echo "📋 Próximos passos:"
echo "1. Verifique as configurações nos arquivos .env"
echo "2. Execute os testes: ./test-setup.sh"
echo "3. Inicie os serviços conforme o ambiente"
echo ""
