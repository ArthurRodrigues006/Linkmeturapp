# Multi-stage build para otimização
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala todas as dependências
RUN npm ci

# Copia o código fonte
COPY . .

# Compila a aplicação
RUN npm run build

# Stage de produção
FROM node:18-alpine AS production

# Instala dumb-init para gerenciamento de processos
RUN apk add --no-cache dumb-init

# Cria usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# Copia apenas os arquivos necessários
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Muda para usuário não-root
USER nextjs

# Expõe a porta
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Comando para iniciar a aplicação
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
