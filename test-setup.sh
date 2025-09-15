#!/bin/bash

echo "🧪 Testando configuração do LinkMeTur..."

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker primeiro."
    exit 1
fi

# Verificar se as dependências estão instaladas
echo "📦 Verificando dependências..."

# Frontend
if [ ! -d "frontend/node_modules" ]; then
    echo "❌ Dependências do frontend não instaladas. Execute: cd frontend && npm install"
    exit 1
fi

# Backend
if [ ! -d "backend/node_modules" ]; then
    echo "❌ Dependências do backend não instaladas. Execute: cd backend && npm install"
    exit 1
fi

# Landing
if [ ! -d "landing/node_modules" ]; then
    echo "❌ Dependências do landing não instaladas. Execute: cd landing && npm install"
    exit 1
fi

echo "✅ Dependências verificadas"

# Verificar se os arquivos de configuração existem
echo "🔧 Verificando configurações..."

if [ ! -f "frontend/.eslintrc.json" ]; then
    echo "❌ Arquivo de configuração do ESLint não encontrado"
    exit 1
fi

if [ ! -f "frontend/next.config.ts" ]; then
    echo "❌ Arquivo de configuração do Next.js não encontrado"
    exit 1
fi

echo "✅ Configurações verificadas"

# Verificar se os hooks personalizados existem
echo "🎣 Verificando hooks personalizados..."

if [ ! -f "frontend/src/hooks/useAuth.ts" ]; then
    echo "❌ Hook useAuth não encontrado"
    exit 1
fi

if [ ! -f "frontend/src/hooks/useApi.ts" ]; then
    echo "❌ Hook useApi não encontrado"
    exit 1
fi

echo "✅ Hooks verificados"

# Verificar se os componentes existem
echo "🧩 Verificando componentes..."

if [ ! -f "frontend/src/components/Loading.tsx" ]; then
    echo "❌ Componente Loading não encontrado"
    exit 1
fi

if [ ! -f "frontend/src/components/ErrorAlert.tsx" ]; then
    echo "❌ Componente ErrorAlert não encontrado"
    exit 1
fi

echo "✅ Componentes verificados"

# Verificar se as páginas existem
echo "📄 Verificando páginas..."

pages=(
    "frontend/src/app/dashboard/page.tsx"
    "frontend/src/app/login/page.tsx"
    "frontend/src/app/signup/page.tsx"
    "frontend/src/app/jobs/page.tsx"
    "frontend/src/app/jobs/new/page.tsx"
    "frontend/src/app/contacts/page.tsx"
    "frontend/src/app/contacts/new/page.tsx"
    "frontend/src/app/notifications/page.tsx"
    "frontend/src/app/settings/page.tsx"
)

for page in "${pages[@]}"; do
    if [ ! -f "$page" ]; then
        echo "❌ Página $page não encontrada"
        exit 1
    fi
done

echo "✅ Páginas verificadas"

# Verificar se os tipos existem
echo "📝 Verificando tipos..."

if [ ! -f "frontend/src/types/index.ts" ]; then
    echo "❌ Arquivo de tipos não encontrado"
    exit 1
fi

echo "✅ Tipos verificados"

# Verificar se o script de inicialização existe
echo "🚀 Verificando scripts..."

if [ ! -f "start-dev.sh" ]; then
    echo "❌ Script de inicialização não encontrado"
    exit 1
fi

if [ ! -x "start-dev.sh" ]; then
    echo "❌ Script de inicialização não é executável"
    exit 1
fi

echo "✅ Scripts verificados"

echo ""
echo "🎉 Todos os testes passaram! O projeto está configurado corretamente."
echo ""
echo "Para iniciar o ambiente de desenvolvimento, execute:"
echo "  ./start-dev.sh"
echo ""
echo "Ou manualmente:"
echo "  1. docker-compose up -d postgres redis"
echo "  2. cd backend && npm run start:dev"
echo "  3. cd landing && npm run start:dev"
echo "  4. cd frontend && npm run dev"
