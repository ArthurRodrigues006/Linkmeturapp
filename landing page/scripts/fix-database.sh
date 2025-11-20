#!/bin/bash

echo "🔍 Verificando problemas no banco de dados..."
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Diretório do projeto
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PRISMA_DIR="$PROJECT_DIR/prisma"
DB_FILE="$PRISMA_DIR/dev.db"

cd "$PROJECT_DIR"

echo "📁 Diretório do projeto: $PROJECT_DIR"
echo "📁 Diretório Prisma: $PRISMA_DIR"
echo ""

# 1. Verificar se o diretório prisma existe
if [ ! -d "$PRISMA_DIR" ]; then
    echo -e "${RED}❌ Diretório prisma/ não encontrado${NC}"
    echo "Criando diretório prisma/"
    mkdir -p "$PRISMA_DIR"
else
    echo -e "${GREEN}✅ Diretório prisma/ existe${NC}"
fi

# 2. Verificar permissões do diretório
echo ""
echo "🔐 Verificando permissões..."
if [ -w "$PRISMA_DIR" ]; then
    echo -e "${GREEN}✅ Diretório prisma/ tem permissão de escrita${NC}"
else
    echo -e "${RED}❌ Sem permissão de escrita no diretório prisma/${NC}"
    echo "Corrigindo permissões..."
    chmod 755 "$PRISMA_DIR"
fi

# 3. Verificar se o arquivo de banco existe
echo ""
echo "🗄️ Verificando arquivo de banco..."
if [ -f "$DB_FILE" ]; then
    echo -e "${YELLOW}⚠️  Arquivo dev.db já existe${NC}"
    echo "Tamanho: $(du -h "$DB_FILE" | cut -f1)"
    echo "Permissões: $(ls -lh "$DB_FILE" | awk '{print $1, $3, $4}')"

    # Verificar se tem permissão de escrita
    if [ -w "$DB_FILE" ]; then
        echo -e "${GREEN}✅ Arquivo dev.db tem permissão de escrita${NC}"
    else
        echo -e "${RED}❌ Arquivo dev.db sem permissão de escrita${NC}"
        echo "Corrigindo permissões..."
        chmod 644 "$DB_FILE"
    fi

    # Perguntar se quer recriar
    echo ""
    read -p "Deseja recriar o banco de dados? (s/N): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        echo "🗑️ Removendo banco antigo..."
        rm -f "$DB_FILE" "$DB_FILE-journal"
        echo -e "${GREEN}✅ Banco removido${NC}"
    else
        echo "Mantendo banco existente..."
    fi
else
    echo -e "${YELLOW}⚠️  Arquivo dev.db não existe (será criado)${NC}"
fi

# 4. Verificar schema.prisma
echo ""
echo "📋 Verificando schema.prisma..."
SCHEMA_FILE="$PRISMA_DIR/schema.prisma"
if [ -f "$SCHEMA_FILE" ]; then
    echo -e "${GREEN}✅ Schema existe${NC}"

    # Verificar provider
    PROVIDER=$(grep "provider" "$SCHEMA_FILE" | grep -v "//" | head -1)
    echo "Provider configurado: $PROVIDER"

    if echo "$PROVIDER" | grep -q "sqlite"; then
        echo -e "${GREEN}✅ Provider configurado para SQLite${NC}"
    else
        echo -e "${RED}❌ Provider não está configurado para SQLite${NC}"
        echo "Por favor, altere o provider no schema.prisma para 'sqlite'"
        exit 1
    fi
else
    echo -e "${RED}❌ Schema não encontrado${NC}"
    exit 1
fi

# 5. Verificar .env
echo ""
echo "🔧 Verificando .env..."
ENV_FILE="$PROJECT_DIR/.env"
if [ -f "$ENV_FILE" ]; then
    echo -e "${GREEN}✅ Arquivo .env existe${NC}"

    if grep -q "DATABASE_URL.*file:./dev.db" "$ENV_FILE"; then
        echo -e "${GREEN}✅ DATABASE_URL configurada para SQLite${NC}"
    else
        echo -e "${RED}❌ DATABASE_URL não está configurada corretamente${NC}"
        echo "DATABASE_URL atual:"
        grep "DATABASE_URL" "$ENV_FILE" || echo "  (não encontrada)"
        echo ""
        echo "Adicionando DATABASE_URL correta..."
        if grep -q "DATABASE_URL" "$ENV_FILE"; then
            # Comentar linha existente e adicionar nova
            sed -i.bak 's/^DATABASE_URL=/#DATABASE_URL=/' "$ENV_FILE"
        fi
        echo 'DATABASE_URL="file:./dev.db"' >> "$ENV_FILE"
        echo -e "${GREEN}✅ DATABASE_URL adicionada${NC}"
    fi
else
    echo -e "${RED}❌ Arquivo .env não existe${NC}"
    echo "Criando .env..."
    cat > "$ENV_FILE" << 'EOF'
# Database (Development - SQLite)
DATABASE_URL="file:./dev.db"

# JWT Authentication
JWT_SECRET=dev-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-nextauth-secret-change-in-production
NODE_ENV=development

# Application URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3000
EOF
    echo -e "${GREEN}✅ Arquivo .env criado${NC}"
fi

# 6. Gerar Prisma Client
echo ""
echo "🔨 Gerando Prisma Client..."
npm run db:generate

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Prisma Client gerado com sucesso${NC}"
else
    echo -e "${RED}❌ Erro ao gerar Prisma Client${NC}"
    exit 1
fi

# 7. Criar/Atualizar banco de dados
echo ""
echo "📊 Criando tabelas no banco..."
npm run db:push

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Banco de dados criado/atualizado${NC}"
else
    echo -e "${RED}❌ Erro ao criar banco de dados${NC}"
    exit 1
fi

# 8. Verificar se o banco foi criado
echo ""
echo "🔍 Verificando resultado..."
if [ -f "$DB_FILE" ]; then
    echo -e "${GREEN}✅ Arquivo dev.db criado com sucesso${NC}"
    echo "Tamanho: $(du -h "$DB_FILE" | cut -f1)"
    echo "Permissões: $(ls -lh "$DB_FILE" | awk '{print $1, $3, $4}')"

    # 9. Popular com dados iniciais
    echo ""
    read -p "Deseja popular o banco com dados iniciais? (S/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        echo "🌱 Populando banco de dados..."
        npm run db:seed

        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Dados iniciais inseridos${NC}"
            echo ""
            echo "📝 Credenciais de teste:"
            echo "   Email: admin@linkmetur.com.br"
            echo "   Senha: password"
        else
            echo -e "${YELLOW}⚠️  Aviso: Erro ao popular banco (não crítico)${NC}"
        fi
    fi
else
    echo -e "${RED}❌ Arquivo dev.db não foi criado${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Configuração concluída!${NC}"
echo ""
echo "📋 Próximos passos:"
echo "   1. Reinicie o servidor de desenvolvimento (npm run dev)"
echo "   2. Tente fazer login novamente"
echo ""
echo "🔍 Para verificar o banco de dados:"
echo "   npm run db:studio"
echo ""
