#!/bin/bash

# Script de teste final para produção
# Verifica se todos os componentes estão funcionando corretamente

set -e

echo "🧪 Executando testes finais de produção..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para imprimir status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
        return 1
    fi
}

# Função para testar URL
test_url() {
    local url=$1
    local name=$2
    local expected_status=${3:-200}
    
    echo -n "🔍 Testando $name... "
    
    if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "$expected_status"; then
        print_status 0 "$name está funcionando"
    else
        print_status 1 "$name falhou (HTTP $(curl -s -o /dev/null -w "%{http_code}" "$url"))"
        return 1
    fi
}

# Função para testar serviço
test_service() {
    local service_name=$1
    local port=$2
    local path=${3:-/}
    
    echo -n "🔍 Testando $service_name... "
    
    if curl -s "http://localhost:$port$path" > /dev/null 2>&1; then
        print_status 0 "$service_name está rodando na porta $port"
    else
        print_status 1 "$service_name não está respondendo na porta $port"
        return 1
    fi
}

echo "🚀 Iniciando testes de produção..."
echo ""

# 1. Testar se os serviços estão rodando
echo "📋 1. Verificando serviços..."

# Verificar se PM2 está rodando
if command -v pm2 &> /dev/null; then
    if pm2 list | grep -q "online"; then
        print_status 0 "PM2 está rodando"
    else
        print_status 1 "PM2 não está rodando ou não há processos online"
    fi
else
    echo -e "${YELLOW}⚠️ PM2 não encontrado, testando serviços diretamente${NC}"
fi

# 2. Testar conectividade dos serviços
echo ""
echo "📋 2. Testando conectividade..."

# Frontend
test_service "Frontend" 3000

# Backend API
test_service "Backend API" 3001 "/health"

# Landing API
test_service "Landing API" 8081 "/health"

# 3. Testar endpoints específicos
echo ""
echo "📋 3. Testando endpoints específicos..."

# Health checks
test_url "http://localhost:3001/health" "Backend Health Check"
test_url "http://localhost:8081/health" "Landing Health Check"

# APIs principais
test_url "http://localhost:8081/api" "Swagger Documentation" 200

# 4. Testar banco de dados
echo ""
echo "📋 4. Testando banco de dados..."

if command -v psql &> /dev/null; then
    echo -n "🔍 Testando conexão com PostgreSQL... "
    if PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U "$DB_USERNAME" -d "$DB_DATABASE" -c "SELECT 1;" > /dev/null 2>&1; then
        print_status 0 "Conexão com PostgreSQL OK"
    else
        print_status 1 "Falha na conexão com PostgreSQL"
    fi
else
    echo -e "${YELLOW}⚠️ PostgreSQL client não encontrado${NC}"
fi

# 5. Testar Redis
echo ""
echo "📋 5. Testando Redis..."

if command -v redis-cli &> /dev/null; then
    echo -n "🔍 Testando conexão com Redis... "
    if redis-cli -h "$REDIS_HOST" ping | grep -q "PONG"; then
        print_status 0 "Conexão com Redis OK"
    else
        print_status 1 "Falha na conexão com Redis"
    fi
else
    echo -e "${YELLOW}⚠️ Redis client não encontrado${NC}"
fi

# 6. Testar SSL (se configurado)
echo ""
echo "📋 6. Testando SSL..."

if [ -n "$NEXT_PUBLIC_FRONTEND_URL" ] && [[ "$NEXT_PUBLIC_FRONTEND_URL" == https* ]]; then
    echo -n "🔍 Testando SSL... "
    if curl -s -I "$NEXT_PUBLIC_FRONTEND_URL" | grep -q "HTTP/2 200"; then
        print_status 0 "SSL está funcionando"
    else
        print_status 1 "SSL não está funcionando ou site não está acessível"
    fi
else
    echo -e "${YELLOW}⚠️ SSL não configurado (ambiente local)${NC}"
fi

# 7. Testar performance
echo ""
echo "📋 7. Testando performance..."

# Testar tempo de resposta do frontend
echo -n "🔍 Testando tempo de resposta do frontend... "
response_time=$(curl -s -o /dev/null -w "%{time_total}" http://localhost:3000)
if (( $(echo "$response_time < 2.0" | bc -l) )); then
    print_status 0 "Frontend responde em ${response_time}s (OK)"
else
    print_status 1 "Frontend lento: ${response_time}s (deveria ser < 2s)"
fi

# Testar tempo de resposta da API
echo -n "🔍 Testando tempo de resposta da API... "
api_response_time=$(curl -s -o /dev/null -w "%{time_total}" http://localhost:8081/health)
if (( $(echo "$api_response_time < 1.0" | bc -l) )); then
    print_status 0 "API responde em ${api_response_time}s (OK)"
else
    print_status 1 "API lenta: ${api_response_time}s (deveria ser < 1s)"
fi

# 8. Testar logs
echo ""
echo "📋 8. Verificando logs..."

if [ -d "/var/log/linkmetur" ]; then
    echo -n "🔍 Verificando diretório de logs... "
    if [ -w "/var/log/linkmetur" ]; then
        print_status 0 "Diretório de logs acessível"
    else
        print_status 1 "Diretório de logs não acessível"
    fi
else
    echo -e "${YELLOW}⚠️ Diretório de logs não encontrado${NC}"
fi

# 9. Testar espaço em disco
echo ""
echo "📋 9. Verificando espaço em disco..."

echo -n "🔍 Verificando espaço em disco... "
available_space=$(df / | awk 'NR==2 {print $4}')
if [ "$available_space" -gt 1048576 ]; then  # 1GB em KB
    print_status 0 "Espaço em disco OK ($(($available_space / 1024))MB disponível)"
else
    print_status 1 "Pouco espaço em disco ($(($available_space / 1024))MB disponível)"
fi

# 10. Testar memória
echo ""
echo "📋 10. Verificando memória..."

echo -n "🔍 Verificando uso de memória... "
memory_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
if [ "$memory_usage" -lt 80 ]; then
    print_status 0 "Uso de memória OK (${memory_usage}%)"
else
    print_status 1 "Alto uso de memória (${memory_usage}%)"
fi

# Resumo final
echo ""
echo "📊 RESUMO DOS TESTES"
echo "===================="

# Contar testes passaram
total_tests=0
passed_tests=0

# Listar status dos serviços
echo ""
echo "🔧 Status dos Serviços:"
if command -v pm2 &> /dev/null; then
    pm2 list
else
    echo "PM2 não disponível"
fi

echo ""
echo "🌐 URLs de Acesso:"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:3001"
echo "Landing API: http://localhost:8081"
echo "Swagger: http://localhost:8081/api"

if [ -n "$NEXT_PUBLIC_FRONTEND_URL" ]; then
    echo "Produção: $NEXT_PUBLIC_FRONTEND_URL"
fi

echo ""
echo "📞 Suporte: dev@linkmetur.com.br"
echo ""

# Verificar se todos os testes críticos passaram
critical_tests=(
    "Frontend"
    "Backend API"
    "Landing API"
)

all_critical_passed=true
for test in "${critical_tests[@]}"; do
    if ! curl -s "http://localhost:3000" > /dev/null 2>&1; then
        all_critical_passed=false
        break
    fi
done

if [ "$all_critical_passed" = true ]; then
    echo -e "${GREEN}🎉 TODOS OS TESTES CRÍTICOS PASSARAM!${NC}"
    echo -e "${GREEN}✅ Sistema pronto para produção!${NC}"
    exit 0
else
    echo -e "${RED}❌ ALGUNS TESTES FALHARAM!${NC}"
    echo -e "${RED}⚠️ Verifique os logs e corrija os problemas antes de prosseguir.${NC}"
    exit 1
fi
