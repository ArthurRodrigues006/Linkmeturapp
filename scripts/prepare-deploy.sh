#!/bin/bash

# Script para preparar deploy no Render
echo "🚀 Preparando deploy para o Render..."

# Verificar se estamos na branch main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Você não está na branch main. Mudando para main..."
    git checkout main
    git pull origin main
fi

# Verificar se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Há mudanças não commitadas. Por favor, commit ou stash suas mudanças primeiro."
    exit 1
fi

# Build local para verificar se está tudo funcionando
echo "🔧 Testando build local..."
cd "landing page"
npm install
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build local bem-sucedido!"
    cd ..
else
    echo "❌ Build local falhou. Corrija os erros antes de fazer deploy."
    exit 1
fi

# Verificar se o render.yaml está configurado
if [ ! -f "render.yaml" ]; then
    echo "❌ Arquivo render.yaml não encontrado!"
    exit 1
fi

echo "✅ Verificações concluídas!"
echo ""
echo "📋 Próximos passos para deploy no Render:"
echo "1. Faça push das suas mudanças: git push origin main"
echo "2. No dashboard do Render, conecte este repositório"
echo "3. O Render detectará automaticamente o render.yaml"
echo "4. Configure as variáveis de ambiente necessárias"
echo ""
echo "🔑 Variáveis de ambiente obrigatórias no Render:"
echo "   - NEXTAUTH_SECRET (gerado automaticamente)"
echo "   - JWT_SECRET (gerado automaticamente)"
echo "   - DATABASE_URL (configurado automaticamente)"
echo ""
echo "🔑 Variáveis opcionais:"
echo "   - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"
echo "   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
echo "   - NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"
echo "   - MAIL_HOST, MAIL_USER, MAIL_PASS (para email)"
echo ""
echo "🌐 URLs após deploy:"
echo "   Frontend: https://linkmetur-frontend.onrender.com"
echo "   Database: Configurado automaticamente"