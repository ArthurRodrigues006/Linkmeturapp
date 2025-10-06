# 🌐 CONFIGURAÇÃO DNS - HOSTINGER VPS + DOMÍNIO

## 📋 Pré-requisitos
- VPS Hostinger configurado com IP fixo
- Domínio registrado (Hostinger, GoDaddy, etc.)
- Acesso ao painel DNS do domínio

## 🔧 Configuração DNS

### 1. **Obter IP do Servidor**
```bash
# No seu VPS Hostinger, execute:
curl -s ipinfo.io/ip

# Exemplo de retorno: 203.0.113.123
```

### 2. **Configurar Registros DNS**

#### **Para domínio na Hostinger:**

Acesse: [Hostinger Control Panel](https://hpanel.hostinger.com) → Domínios → Gerenciar → DNS Zone

**Registros obrigatórios:**
```dns
Tipo    Nome        Valor               TTL
A       @           203.0.113.123       3600
A       www         203.0.113.123       3600
CNAME   www         seudominio.com      3600
```

#### **Para outros provedores (GoDaddy, Registro.br, etc.):**

**GoDaddy:**
- Acesse: Minha Conta → Domínios → Gerenciar DNS
- Adicione os mesmos registros acima

**Registro.br:**
- Acesse: Registro.br → Meus Domínios → DNS
- Configure os registros DNS

**Cloudflare (Recomendado para performance):**
```dns
Tipo    Nome    Valor               Proxy    TTL
A       @       203.0.113.123       ✅        Auto
A       www     203.0.113.123       ✅        Auto
```

### 3. **Configurações Opcionais**

#### **Email (se usar serviço de email):**
```dns
Tipo    Nome    Valor                   Prioridade    TTL
MX      @       mail.seudominio.com     10            3600
A       mail    203.0.113.123           -             3600
```

#### **Subdomínios úteis:**
```dns
Tipo    Nome      Valor               TTL
A       admin     203.0.113.123       3600
A       api       203.0.113.123       3600
A       app       203.0.113.123       3600
CNAME   blog      seudominio.com      3600
```

## ⚡ Configuração com Cloudflare (Recomendado)

### **Vantagens:**
- ✅ CDN global gratuito
- ✅ DDoS Protection
- ✅ SSL automático
- ✅ Cache inteligente
- ✅ Analytics detalhados

### **Configuração:**
1. Crie conta no [Cloudflare](https://cloudflare.com)
2. Adicione seu domínio
3. Aponte os nameservers no seu provedor:
   ```
   keira.ns.cloudflare.com
   wade.ns.cloudflare.com
   ```
4. Configure os registros DNS no painel Cloudflare

### **Configurações recomendadas no Cloudflare:**
```bash
# SSL/TLS: Full (Strict)
# Always Use HTTPS: On
# Automatic HTTPS Rewrites: On
# Min TLS Version: 1.2
# Cache Level: Standard
# Browser Cache TTL: 4 hours
```

## 🚀 Teste da Configuração

### **Verificar propagação DNS:**
```bash
# Verificar registro A
nslookup seudominio.com

# Verificar de diferentes localizações
dig @8.8.8.8 seudominio.com A
dig @1.1.1.1 seudominio.com A

# Verificar www
dig www.seudominio.com
```

### **Ferramentas online:**
- [DNSChecker](https://dnschecker.org)
- [WhatsmyDNS](https://whatsmydns.net)
- [DNS Propagation Checker](https://www.dnswatch.info)

## ⏱️ Tempo de Propagação

| Provedor    | Tempo Típico | TTL Mínimo |
|-------------|--------------|------------|
| Hostinger   | 1-4 horas    | 3600s      |
| Cloudflare  | 1-5 minutos  | 300s       |
| GoDaddy     | 1-6 horas    | 3600s      |
| Registro.br | 4-24 horas   | 86400s     |

## 🔧 Script de Teste Automático

Crie este script no seu VPS para testar a configuração:

```bash
#!/bin/bash
# Salve como: /opt/linkmetur/scripts/test-dns.sh

DOMAIN="$1"

if [[ -z "$DOMAIN" ]]; then
    echo "Uso: $0 seudominio.com"
    exit 1
fi

echo "🔍 Testando configuração DNS para: $DOMAIN"
echo ""

# Teste básico de resolução
echo "📍 Resolvendo domínio principal:"
dig +short "$DOMAIN" A

echo ""
echo "📍 Resolvendo www:"
dig +short "www.$DOMAIN" A

echo ""
echo "🌍 Testando conectividade HTTP:"
curl -I "http://$DOMAIN" 2>/dev/null | head -n 1

echo ""
echo "🔒 Testando conectividade HTTPS:"
curl -I "https://$DOMAIN" 2>/dev/null | head -n 1

echo ""
echo "⚡ Testando velocidade de resposta:"
curl -o /dev/null -s -w "Tempo total: %{time_total}s\n" "https://$DOMAIN"

echo ""
echo "✅ Teste concluído!"
```

## 🚨 Solução de Problemas

### **Domínio não resolve:**
```bash
# 1. Verificar NS records
dig NS seudominio.com

# 2. Verificar com diferentes DNS
nslookup seudominio.com 8.8.8.8
nslookup seudominio.com 1.1.1.1

# 3. Limpar cache DNS local
sudo systemctl restart systemd-resolved
```

### **Site não carrega:**
```bash
# 1. Verificar se Nginx está rodando
sudo systemctl status nginx

# 2. Verificar logs do Nginx
tail -f /var/log/nginx/error.log

# 3. Testar diretamente pelo IP
curl -H "Host: seudominio.com" http://SEU_IP_VPS
```

### **SSL não funciona:**
```bash
# 1. Verificar certificado
openssl s_client -connect seudominio.com:443 -servername seudominio.com

# 2. Renovar certificado Let's Encrypt
sudo certbot renew --dry-run

# 3. Verificar configuração Nginx
nginx -t
```

## 📋 Checklist Final

- [ ] **IP do VPS anotado**
- [ ] **Registros DNS configurados:**
  - [ ] Registro A para @ (raiz)
  - [ ] Registro A para www  
  - [ ] CNAME para www (opcional)
- [ ] **Propagação DNS verificada**
- [ ] **HTTP funcionando** (http://seudominio.com)
- [ ] **HTTPS funcionando** (https://seudominio.com)
- [ ] **Redirecionamento www → não-www (ou vice-versa)**
- [ ] **Certificado SSL válido**
- [ ] **Performance testada**

## 📞 Suporte por Provedor

### **Hostinger:**
- 📧 Email: success@hostinger.com
- 💬 Chat: 24/7 no painel
- 📚 Docs: [Hostinger Tutoriais](https://support.hostinger.com)

### **Cloudflare:**
- 📧 Community: [community.cloudflare.com](https://community.cloudflare.com)
- 📚 Docs: [developers.cloudflare.com](https://developers.cloudflare.com)

---

## ✅ Exemplo Completo

**Para domínio:** `linkmetur.com.br`
**IP VPS:** `203.0.113.123`

```dns
# Configuração DNS mínima
A       @           203.0.113.123       3600
A       www         203.0.113.123       3600
CNAME   www         linkmetur.com.br    3600

# Resultado esperado:
# http://linkmetur.com.br → redireciona para https://linkmetur.com.br
# http://www.linkmetur.com.br → redireciona para https://linkmetur.com.br
# https://linkmetur.com.br → funciona perfeitamente
# https://www.linkmetur.com.br → funciona perfeitamente
```

🎉 **Após seguir este guia, seu domínio estará configurado perfeitamente!**