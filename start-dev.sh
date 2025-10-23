#!/bin/bash

# Script para iniciar o ambiente de desenvolvimento do LinkMeTur

echo "🚀 Iniciando ambiente de desenvolvimento do LinkMeTur..."

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker primeiro."
    exit 1
fi

# Iniciar serviços de infraestrutura
echo "📦 Iniciando serviços de infraestrutura (PostgreSQL, Redis)..."
docker-compose -f docker-compose.dev.yml up -d

# Aguardar os serviços ficarem prontos
echo "⏳ Aguardando serviços ficarem prontos..."
sleep 10

# Instalar dependências
echo "📦 Instalando dependências..."
npm run install:all

# Gerar Prisma Client
echo "🔧 Gerando Prisma Client..."
npm run db:generate

# Aplicar migrações do banco
echo "🗄️ Aplicando migrações do banco..."
npm run db:push

# Executar seed do banco (opcional)
echo "🌱 Executando seed do banco..."
npm run db:seed || echo "⚠️ Seed falhou ou não disponível"

# Iniciar aplicação
echo "🎨 Iniciando aplicação Next.js..."
cd "landing page"
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Ambiente de desenvolvimento iniciado!"
echo ""
echo "📱 Serviços disponíveis:"
echo "   Frontend:     http://localhost:3000"
echo "   PostgreSQL:   localhost:5432"
echo "   Redis:        localhost:6379"
echo "   Prisma Studio: npm run db:studio"
echo ""
echo "🛑 Para parar todos os serviços, pressione Ctrl+C"

# Função para limpar processos ao sair
cleanup() {
    echo ""
    echo "🛑 Parando serviços..."
    kill $FRONTEND_PID 2>/dev/null
    docker-compose -f docker-compose.dev.yml down
    echo "✅ Serviços parados."
    exit 0
}

# Capturar sinal de interrupção
trap cleanup SIGINT SIGTERM

# Manter script rodando
wait
