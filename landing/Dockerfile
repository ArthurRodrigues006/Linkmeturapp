# Multi-stage build para otimização
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala todas as dependências (incluindo dev)
RUN npm ci

# Copia o código fonte
COPY . .

# Compila o TypeScript
RUN npm run build

# Stage de produção
FROM node:18-alpine AS production

# Instala dumb-init para gerenciamento de processos
RUN apk add --no-cache dumb-init

# Cria usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

WORKDIR /app

# Copia apenas os arquivos necessários
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Muda para usuário não-root
USER nestjs

# Expõe a porta
EXPOSE 8081

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8081/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Comando para iniciar a aplicação
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
