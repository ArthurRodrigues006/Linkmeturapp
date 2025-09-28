#!/bin/bash

# Script de deploy para produção

echo "🚀 Iniciando processo de deploy para produção..."

# Verificar se estamos na branch correta
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Branch atual: $CURRENT_BRANCH"

# Build local para verificar se está tudo funcionando
echo "🔨 Executando build local..."
cd "landing page" || { echo "❌ Pasta 'landing page' não encontrada!"; exit 1; }
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build falhou! Corrija os erros antes de fazer deploy."
    exit 1
fi

echo "✅ Build local concluído com sucesso!"

cd ..

# Verificar se há mudanças não commitadas
if [[ `git status --porcelain` ]]; then
    echo "⚠️  Há mudanças não commitadas. Faça commit antes do deploy."
    git status --short
    echo ""
    echo "Execute:"
    echo "  git add ."
    echo "  git commit -m 'Prepare for production deploy'"
    echo "  git push origin $CURRENT_BRANCH"
    exit 1
fi

echo "✅ Repositório está limpo e pronto para deploy!"

echo ""
echo "🌐 Para fazer deploy no Render:"
echo "1. Conecte seu repositório GitHub ao Render"
echo "2. Use as seguintes configurações:"
echo "   - Build Command: cd \"landing page\" && npm install && npm run build"
echo "   - Start Command: cd \"landing page\" && npm start"
echo "   - Root Directory: /"
echo "   - Environment: Node"
echo ""
echo "3. Configure as variáveis de ambiente no dashboard do Render:"
echo "   - NODE_ENV=production"
echo "   - DATABASE_URL=(será fornecido pelo Render se usar banco do Render)"
echo "   - NEXTAUTH_URL=https://seu-app.onrender.com"
echo "   - NEXTAUTH_SECRET=(gere uma chave secreta)"
echo "   - JWT_SECRET=(gere uma chave secreta)"
echo ""
echo "4. Se usar banco PostgreSQL externo, adicione a DATABASE_URL"
echo ""
echo "✅ Tudo pronto para deploy!"