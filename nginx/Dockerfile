FROM nginx:alpine

# Remove configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuração customizada
COPY nginx.conf /etc/nginx/nginx.conf

# Cria diretórios para SSL
RUN mkdir -p /etc/ssl/certs /etc/ssl/private

# Expõe portas
EXPOSE 80 443

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
