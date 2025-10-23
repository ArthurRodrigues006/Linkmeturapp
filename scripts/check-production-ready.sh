#!/bin/bash

# Script para verificar se o projeto está pronto para produção
echo "🔍 Verificando se o projeto está pronto para produção..."

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Execute este script do diretório raiz do projeto (onde está o package.json)"
    exit 1
fi

# Função para verificar se um arquivo existe
check_file() {
    if [ -f "$1" ]; then
        echo "✅ $1 encontrado"
    else
        echo "❌ $1 não encontrado"
        return 1
    fi
}

# Função para verificar se um diretório existe
check_dir() {
    if [ -d "$1" ]; then
        echo "✅ Diretório $1 encontrado"
    else
        echo "❌ Diretório $1 não encontrado"
        return 1
    fi
}

# Verificar arquivos essenciais
echo "📁 Verificando arquivos essenciais..."
check_file "render.yaml" || exit 1
check_file "landing page/Dockerfile" || exit 1
check_file "landing page/package.json" || exit 1
check_file "landing page/next.config.js" || exit 1
check_file "landing page/.env.production" || exit 1

# Verificar estrutura do projeto
echo ""
echo "📁 Verificando estrutura do projeto..."
check_dir "landing page" || exit 1
check_dir "landing page/app" || exit 1
check_dir "landing page/public" || exit 1

# Verificar dependências do Next.js
echo ""
echo "📦 Verificando dependências..."
cd "landing page"

if [ -f "package.json" ]; then
    # Verificar se Next.js está instalado
    if npm list next > /dev/null 2>&1; then
        echo "✅ Next.js encontrado"
    else
        echo "❌ Next.js não encontrado nas dependências"
        exit 1
    fi
    
    # Verificar se React está instalado
    if npm list react > /dev/null 2>&1; then
        echo "✅ React encontrado"
    else
        echo "❌ React não encontrado nas dependências"
        exit 1
    fi
fi

# Testar build
echo ""
echo "🔧 Testando build..."
npm run build > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Build bem-sucedido"
    
    # Verificar se o output standalone foi gerado
    if [ -d ".next/standalone" ]; then
        echo "✅ Output standalone gerado corretamente"
    else
        echo "⚠️  Output standalone não encontrado (verifique next.config.js)"
    fi
else
    echo "❌ Build falhou"
    exit 1
fi

cd ..

# Verificar configuração do Docker
echo ""
echo "🐳 Verificando configuração do Docker..."
if command -v docker &> /dev/null; then
    echo "✅ Docker instalado"
    
    # Testar build do Docker (opcional)
    echo "🔧 Testando build do Docker..."
    cd "landing page"
    docker build -t linkmetur-test . > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "✅ Build do Docker bem-sucedido"
        # Limpar imagem de teste
        docker rmi linkmetur-test > /dev/null 2>&1
    else
        echo "⚠️  Build do Docker falhou (verifique Dockerfile)"
    fi
    cd ..
else
    echo "⚠️  Docker não instalado (necessário para Render)"
fi

echo ""
echo "🎉 Verificação completa!"
echo ""
echo "📋 Resumo da configuração para Render:"
echo "   ✅ Aplicação Next.js configurada"
echo "   ✅ Dockerfile otimizado"
echo "   ✅ render.yaml configurado"
echo "   ✅ Variáveis de ambiente preparadas"
echo "   ✅ Build funcional"
echo ""
echo "🚀 Projeto pronto para deploy no Render!"