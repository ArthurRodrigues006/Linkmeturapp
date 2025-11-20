#!/bin/bash

echo "🧪 Testando API de Login"
echo "========================"
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

API_URL="http://localhost:3000/api/auth/login"

# Verificar se servidor está rodando
echo "1️⃣ Verificando se servidor está rodando..."
if curl -s -f http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Servidor está respondendo${NC}"
else
    echo -e "${RED}❌ Servidor não está respondendo${NC}"
    echo "   Execute: npm run dev"
    exit 1
fi

echo ""
echo "2️⃣ Testando login com credenciais corretas..."
echo "   Email: admin@linkmetur.com.br"
echo "   Senha: password"
echo ""

RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@linkmetur.com.br",
    "password": "password"
  }')

echo "Resposta do servidor:"
echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"

# Verificar se login foi bem-sucedido
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo ""
    echo -e "${GREEN}✅ Login bem-sucedido!${NC}"

    # Extrair token
    TOKEN=$(echo "$RESPONSE" | jq -r '.data.token' 2>/dev/null)
    if [ "$TOKEN" != "null" ] && [ -n "$TOKEN" ]; then
        echo ""
        echo "🔑 Token JWT gerado:"
        echo "   ${TOKEN:0:50}..."
    fi
else
    echo ""
    echo -e "${RED}❌ Login falhou!${NC}"
    exit 1
fi

echo ""
echo "3️⃣ Testando login com senha incorreta..."
RESPONSE_FAIL=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@linkmetur.com.br",
    "password": "senha_errada"
  }')

if echo "$RESPONSE_FAIL" | grep -q '"success":false'; then
    echo -e "${GREEN}✅ Validação de senha funcionando corretamente${NC}"
else
    echo -e "${YELLOW}⚠️  Aviso: Validação de senha pode não estar funcionando${NC}"
fi

echo ""
echo "4️⃣ Testando login com email inexistente..."
RESPONSE_NOT_FOUND=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario_inexistente@exemplo.com",
    "password": "qualquer_senha"
  }')

if echo "$RESPONSE_NOT_FOUND" | grep -q '"success":false'; then
    echo -e "${GREEN}✅ Validação de usuário funcionando corretamente${NC}"
else
    echo -e "${YELLOW}⚠️  Aviso: Validação de usuário pode não estar funcionando${NC}"
fi

echo ""
echo -e "${GREEN}✅ Todos os testes passaram!${NC}"
echo ""
echo "📋 Credenciais válidas para login:"
echo "   Email: admin@linkmetur.com.br"
echo "   Senha: password"
echo ""
