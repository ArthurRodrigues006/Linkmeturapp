# Continução do install-hostinger.sh

# Criar arquivos de configuração
create_configs() {
    log "Criando arquivos de configuração..."
    
    # Docker Compose para produção
    cat > "$PROJECT_DIR/docker-compose.prod.yml" << EOF
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: linkmetur_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: linkmetur
      POSTGRES_USER: linkmetur_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/postgres-init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - linkmetur_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U linkmetur_user -d linkmetur"]
      interval: 30s
      timeout: 10s
      retries: 3
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: linkmetur_redis
    restart: unless-stopped
    command: redis-server --appendonly yes --requirepass ${DB_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - linkmetur_network
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 30s
      timeout: 3s
      retries: 3
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # Next.js Application
  app:
    build:
      context: ./landing page
      dockerfile: Dockerfile
    container_name: linkmetur_app
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
      - DATABASE_URL=postgresql://linkmetur_user:${DB_PASSWORD}@postgres:5432/linkmetur
      - NEXTAUTH_URL=https://${DOMAIN}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - JWT_SECRET=${JWT_SECRET}
      - REDIS_URL=redis://:${DB_PASSWORD}@redis:6379
      - NEXT_PUBLIC_API_URL=https://${DOMAIN}/api
      - NEXT_PUBLIC_FRONTEND_URL=https://${DOMAIN}
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - linkmetur_network
    volumes:
      - app_uploads:/app/public/uploads
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: linkmetur_nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.prod.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/sites-available:/etc/nginx/sites-available:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
      - /var/www/certbot:/var/www/certbot:ro
      - nginx_logs:/var/log/nginx
    depends_on:
      - app
    networks:
      - linkmetur_network
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  app_uploads:
    driver: local
  nginx_logs:
    driver: local

networks:
  linkmetur_network:
    driver: bridge
EOF

    # Arquivo .env para produção
    cat > "$PROJECT_DIR/.env.production" << EOF
# LinkMeTur Production Environment
NODE_ENV=production
DOMAIN=${DOMAIN}

# Database
DATABASE_URL=postgresql://linkmetur_user:${DB_PASSWORD}@postgres:5432/linkmetur
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=linkmetur_user
DB_PASSWORD=${DB_PASSWORD}
DB_DATABASE=linkmetur

# Redis
REDIS_URL=redis://:${DB_PASSWORD}@redis:6379
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=${DB_PASSWORD}

# Authentication
NEXTAUTH_URL=https://${DOMAIN}
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
JWT_SECRET=${JWT_SECRET}

# Application URLs
NEXT_PUBLIC_API_URL=https://${DOMAIN}/api
NEXT_PUBLIC_FRONTEND_URL=https://${DOMAIN}

# SSL Email
SSL_EMAIL=${EMAIL}

# Security
BCRYPT_ROUNDS=12

# Logging
LOG_LEVEL=info
EOF

    log "✅ Arquivos de configuração criados"
}

# Configurar Nginx
setup_nginx() {
    log "Configurando Nginx..."
    
    mkdir -p "$PROJECT_DIR/nginx/sites-available"
    
    # Configuração principal do Nginx
    cat > "$PROJECT_DIR/nginx/nginx.prod.conf" << 'EOF'
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                   '$status $body_bytes_sent "$http_referer" '
                   '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    # Performance
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 20M;

    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private must-revalidate no_last_modified no_etag auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/x-javascript
        application/xml+rss
        application/javascript
        application/json
        image/svg+xml;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;

    # Include sites
    include /etc/nginx/sites-available/*;
}
EOF

    # Configuração do site
    cat > "$PROJECT_DIR/nginx/sites-available/linkmetur.conf" << EOF
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    # Let's Encrypt challenge
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Redirect all other traffic to HTTPS
    location / {
        return 301 https://${DOMAIN}\$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name ${DOMAIN} www.${DOMAIN};

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    
    # SSL Security
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Security Headers
    add_header Strict-Transport-Security "max-age=63072000" always;
    
    # Proxy to Next.js app
    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # API rate limiting
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Login rate limiting
    location /api/auth/ {
        limit_req zone=login burst=5 nodelay;
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)\$ {
        proxy_pass http://app:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_set_header Host \$host;
    }

    # Health check
    location /health {
        access_log off;
        proxy_pass http://app:3000/api/health;
        proxy_set_header Host \$host;
    }
}
EOF

    log "✅ Nginx configurado"
}

# Continua...
EOF