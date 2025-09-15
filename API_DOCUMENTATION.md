# LinkMeTur API - Documentação Técnica

## 📋 Índice
- [Visão Geral](#visão-geral)
- [Autenticação](#autenticação)
- [Endpoints](#endpoints)
- [Modelos de Dados](#modelos-de-dados)
- [Códigos de Status](#códigos-de-status)
- [Exemplos de Uso](#exemplos-de-uso)
- [Rate Limiting](#rate-limiting)
- [Versionamento](#versionamento)

## 🎯 Visão Geral

A LinkMeTur API é uma RESTful API construída com NestJS que fornece endpoints para gerenciamento de serviços de turismo e links.

**Base URL**: `http://localhost:5001` (desenvolvimento)
**Documentação Interativa**: `http://localhost:5001/docs`
**Especificação OpenAPI**: `http://localhost:5001/docs-json`

### Características
- ✅ RESTful Design
- ✅ Documentação Swagger/OpenAPI
- ✅ Validação de dados automática
- ✅ CORS habilitado
- ✅ Tratamento de erros padronizado
- ✅ Health check endpoint
- ✅ Testes E2E completos

## 🔐 Autenticação

**Status Atual**: Não implementada
**Planejado**: JWT Bearer Token

```http
Authorization: Bearer <token>
```

## 📡 Endpoints

### 1. Root Endpoint

Endpoint básico para verificação da API.

```http
GET /
```

**Resposta**:
```
Hello World!
```

**Códigos de Status**:
- `200 OK` - Sucesso
- `404 Not Found` - Método não suportado

**Exemplo cURL**:
```bash
curl -X GET http://localhost:5001/
```

---

### 2. Health Check

Endpoint para monitoramento da saúde da API.

```http
GET /health
```

**Resposta**:
```json
{
  "status": "ok",
  "service": "linkmetur-api"
}
```

**Códigos de Status**:
- `200 OK` - Serviço funcionando
- `404 Not Found` - Método não suportado

**Exemplo cURL**:
```bash
curl -X GET http://localhost:5001/health
```

**Exemplo JavaScript**:
```javascript
const response = await fetch('http://localhost:5001/health');
const data = await response.json();
console.log(data); // { status: 'ok', service: 'linkmetur-api' }
```

---

### 3. Documentação Swagger

Interface de documentação interativa.

```http
GET /docs
```

**Resposta**: Interface HTML do Swagger UI

**Códigos de Status**:
- `200 OK` - Documentação carregada

---

### 4. Especificação OpenAPI

Documento JSON da especificação da API.

```http
GET /docs-json
```

**Resposta**: Documento OpenAPI 3.0 em JSON

**Exemplo de Resposta**:
```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "LinkMeTur API",
    "version": "1.0"
  },
  "paths": {
    "/": {
      "get": {
        "operationId": "AppController_getHello",
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    },
    "/health": {
      "get": {
        "operationId": "HealthController_get",
        "responses": {
          "200": {
            "description": "Health check response"
          }
        }
      }
    }
  }
}
```

## 📊 Modelos de Dados

### HealthResponse

```typescript
interface HealthResponse {
  status: string;    // Status do serviço ('ok' | 'error')
  service: string;   // Nome do serviço
}
```

**Exemplo**:
```json
{
  "status": "ok",
  "service": "linkmetur-api"
}
```

### ErrorResponse

```typescript
interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
  timestamp?: string;
  path?: string;
}
```

**Exemplo**:
```json
{
  "statusCode": 404,
  "message": "Cannot GET /nonexistent",
  "error": "Not Found",
  "timestamp": "2025-09-15T10:30:00.000Z",
  "path": "/nonexistent"
}
```

## 🚦 Códigos de Status

| Código | Descrição | Uso |
|--------|-----------|-----|
| `200` | OK | Requisição bem-sucedida |
| `400` | Bad Request | Dados de entrada inválidos |
| `404` | Not Found | Recurso não encontrado ou método não suportado |
| `500` | Internal Server Error | Erro interno do servidor |

## 💡 Exemplos de Uso

### JavaScript/TypeScript

```typescript
// Health check
async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch('http://localhost:5001/health');
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Uso
try {
  const health = await checkHealth();
  console.log('API Status:', health.status);
} catch (error) {
  console.error('API Error:', error);
}
```

### Python

```python
import requests

def check_health():
    try:
        response = requests.get('http://localhost:5001/health')
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Uso
health_data = check_health()
if health_data:
    print(f"API Status: {health_data['status']}")
```

### cURL

```bash
# Health check
curl -X GET http://localhost:5001/health \
  -H "Accept: application/json"

# Com tratamento de erro
curl -X GET http://localhost:5001/health \
  -H "Accept: application/json" \
  -w "HTTP Status: %{http_code}\n" \
  -s
```

## ⚡ Rate Limiting

**Status Atual**: Não implementado
**Planejado**: 
- 1000 requisições por hora por IP
- 100 requisições por minuto por IP

## 📝 Versionamento

**Versão Atual**: v1.0
**Estratégia**: Semantic Versioning (SemVer)

### Changelog

#### v1.0.0 (2025-09-15)
- ✅ Endpoint raiz (`/`)
- ✅ Health check endpoint (`/health`)
- ✅ Documentação Swagger (`/docs`)
- ✅ Especificação OpenAPI (`/docs-json`)
- ✅ Configuração CORS
- ✅ Validação global de dados
- ✅ Testes E2E completos

## 🔧 Configuração

### Variáveis de Ambiente

| Variável | Descrição | Padrão | Obrigatória |
|----------|-----------|---------|-------------|
| `PORT` | Porta da API | `5001` | Não |
| `NODE_ENV` | Ambiente | `development` | Não |

### CORS

**Origens Permitidas**:
- `http://localhost:3000` (desenvolvimento)

**Headers Permitidos**:
- `Content-Type`
- `Authorization`
- `Accept`

## 🧪 Testes

### Health Check Test

```bash
# Teste simples
curl -f http://localhost:5001/health || echo "Health check failed"

# Teste com validação JSON
curl -s http://localhost:5001/health | jq -e '.status == "ok"' > /dev/null && echo "✅ Health check passed" || echo "❌ Health check failed"
```

### Teste de Performance

```bash
# Teste de carga básico com Apache Bench
ab -n 100 -c 10 http://localhost:5001/health
```

## 🚨 Monitoramento

### Métricas Recomendadas

- **Response Time**: Tempo médio de resposta < 100ms
- **Availability**: Uptime > 99.9%
- **Error Rate**: Taxa de erro < 1%
- **Throughput**: Requisições por segundo

### Alertas Sugeridos

- Health check retornando erro
- Tempo de resposta > 1 segundo
- Taxa de erro > 5%
- CPU/Memory usage > 80%

## 🔮 Roadmap da API

### v1.1.0 (Planejado)
- [ ] Autenticação JWT
- [ ] CRUD de usuários
- [ ] Rate limiting
- [ ] Logging estruturado

### v1.2.0 (Planejado)
- [ ] Endpoints de turismo
- [ ] Sistema de reservas
- [ ] Integração com pagamentos
- [ ] Notificações

### v2.0.0 (Futuro)
- [ ] GraphQL support
- [ ] WebSocket real-time
- [ ] Microservices architecture
- [ ] Advanced analytics

## 📞 Suporte

**Documentação Interativa**: http://localhost:5001/docs
**Issues**: GitHub Issues
**Email**: [email de suporte]

---

**Última atualização**: Setembro 2025
**Versão da API**: 1.0.0
**Documentação**: v1.0.0
