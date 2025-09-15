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
docker-compose up -d postgres redis

# Aguardar os serviços ficarem prontos
echo "⏳ Aguardando serviços ficarem prontos..."
sleep 10

# Instalar dependências do frontend
echo "📦 Instalando dependências do frontend..."
cd frontend
npm install
cd ..

# Instalar dependências do backend
echo "📦 Instalando dependências do backend..."
cd backend
npm install
cd ..

# Instalar dependências do landing
echo "📦 Instalando dependências do landing..."
cd landing
npm install
cd ..

# Iniciar todos os serviços
echo "🚀 Iniciando todos os serviços..."

# Iniciar backend em background
echo "🔧 Iniciando backend..."
cd backend
npm run start:dev &
BACKEND_PID=$!
cd ..

# Iniciar landing em background
echo "🌐 Iniciando landing API..."
cd landing
npm run start:dev &
LANDING_PID=$!
cd ..

# Aguardar APIs ficarem prontas
echo "⏳ Aguardando APIs ficarem prontas..."
sleep 15

# Iniciar frontend
echo "🎨 Iniciando frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Ambiente de desenvolvimento iniciado!"
echo ""
echo "📱 Serviços disponíveis:"
echo "   Frontend:     http://localhost:3000"
echo "   Backend API:  http://localhost:3001"
echo "   Landing API:  http://localhost:8081"
echo "   Swagger:      http://localhost:3001/docs"
echo "   Landing Docs: http://localhost:8081/api"
echo ""
echo "🛑 Para parar todos os serviços, pressione Ctrl+C"

# Função para limpar processos ao sair
cleanup() {
    echo ""
    echo "🛑 Parando serviços..."
    kill $BACKEND_PID $LANDING_PID $FRONTEND_PID 2>/dev/null
    echo "✅ Serviços parados."
    exit 0
}

# Capturar sinal de interrupção
trap cleanup SIGINT SIGTERM

# Manter script rodando
wait
