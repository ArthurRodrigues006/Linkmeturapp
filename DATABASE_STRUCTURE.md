# 🗄️ ESTRUTURA DO BANCO DE DADOS - LinkMe Tur

## 📊 **DIAGRAMA DE RELACIONAMENTOS**

```
┌─────────────────────┐
│   corporations      │
│  (Empresas)         │
├─────────────────────┤
│ id (PK)             │
│ name                │
│ email (unique)      │
│ phone               │
│ cnpj (unique)       │
│ address             │
│ website             │
│ description         │
│ logo                │
│ active              │
│ createdAt           │
│ updatedAt           │
└──────┬──────────────┘
       │
       │ 1:N (Uma empresa tem muitos)
       ├──────────────────────────────┐
       │                              │
       ▼                              ▼
┌─────────────────────┐      ┌─────────────────────┐
│      users          │      │       jobs          │
│   (Usuários)        │      │    (Serviços)       │
├─────────────────────┤      ├─────────────────────┤
│ id (PK)             │      │ id (PK)             │
│ email (unique)      │      │ title               │
│ name                │      │ description         │
│ password (hash)     │      │ category            │
│ phone               │      │ minValue            │
│ level (1,2,3)       │      │ maxValue            │
│ avatar              │      │ duration            │
│ bio                 │      │ location            │
│ active              │      │ requirements        │
│ emailVerified       │      │ benefits            │
│ corporationId (FK)  │      │ views               │
│ createdAt           │      │ published           │
│ updatedAt           │      │ featured            │
└──────┬──────────────┘      │ corporationId (FK)  │
       │                     │ createdAt           │
       │                     │ updatedAt           │
       │                     └──────┬──────────────┘
       │                            │
       │                            │ 1:N
       │                            ├──────────────┐
       │                            ▼              ▼
       │                     ┌─────────────┐  ┌─────────────────┐
       │                     │ job_photos  │  │ job_applications│
       │                     ├─────────────┤  ├─────────────────┤
       │                     │ id (PK)     │  │ id (PK)         │
       │                     │ url         │  │ message         │
       │                     │ alt         │  │ status          │
       │                     │ order       │  │ jobId (FK)      │
       │                     │ jobId (FK)  │  │ applicantName   │
       │                     │ createdAt   │  │ applicantEmail  │
       │                     └─────────────┘  │ applicantPhone  │
       │                                      │ createdAt       │
       │                                      │ updatedAt       │
       │                                      └─────────────────┘
       │
       │ 1:N
       ▼
┌─────────────────────┐
│     contacts        │
│    (Contatos)       │
├─────────────────────┤
│ id (PK)             │
│ name                │
│ email               │
│ phone               │
│ company             │
│ message             │
│ favorited           │
│ status              │
│ corporationId (FK)  │
│ userId (FK)         │
│ createdAt           │
│ updatedAt           │
└─────────────────────┘
```

---

## 📋 **TABELAS E SUAS FUNÇÕES**

### **1. corporations (Empresas/Corporações)**
**Propósito:** Armazena informações das empresas cadastradas

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String | ID único (CUID) |
| `name` | String | Nome da empresa |
| `email` | String | Email (único) |
| `phone` | String | Telefone |
| `cnpj` | String | CNPJ (único) |
| `address` | String | Endereço |
| `website` | String | Site |
| `description` | String | Descrição da empresa |
| `logo` | String | URL do logo |
| `active` | Boolean | Ativa/Inativa (padrão: true) |
| `createdAt` | DateTime | Data de criação |
| `updatedAt` | DateTime | Última atualização |

**Relacionamentos:**
- ✅ Tem muitos `users` (usuários)
- ✅ Tem muitos `jobs` (serviços)
- ✅ Tem muitos `contacts` (contatos)

---

### **2. users (Usuários)**
**Propósito:** Usuários do sistema (prestadores e admins de empresas)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String | ID único (CUID) |
| `email` | String | Email (único) |
| `name` | String | Nome completo |
| `password` | String | Senha (hash bcrypt) |
| `phone` | String | Telefone |
| `level` | Int | Nível: 1=Prestador, 2=Admin Empresa, 3=Super Admin |
| `avatar` | String | URL foto perfil |
| `bio` | String | Biografia |
| `active` | Boolean | Ativo/Inativo (padrão: true) |
| `emailVerified` | DateTime | Data verificação email |
| `corporationId` | String | FK para corporation (opcional) |
| `createdAt` | DateTime | Data de criação |
| `updatedAt` | DateTime | Última atualização |

**Relacionamentos:**
- ✅ Pertence a uma `corporation` (opcional)
- ✅ Tem muitos `contacts`
- ✅ Tem muitas `sessions` (NextAuth)
- ✅ Tem muitas `accounts` (NextAuth)

---

### **3. jobs (Serviços/Oportunidades)**
**Propósito:** Serviços oferecidos pelas empresas

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String | ID único (CUID) |
| `title` | String | Título do serviço |
| `description` | String | Descrição detalhada |
| `category` | String | Categoria do serviço |
| `minValue` | Float | Valor mínimo (R$) |
| `maxValue` | Float | Valor máximo (R$) |
| `duration` | String | Duração ("2 horas", "1 dia") |
| `location` | String | Localização |
| `requirements` | String | Requisitos |
| `benefits` | String | Benefícios |
| `views` | Int | Número de visualizações (padrão: 0) |
| `published` | Boolean | Publicado (padrão: false) |
| `featured` | Boolean | Destaque (padrão: false) |
| `corporationId` | String | FK para corporation |
| `createdAt` | DateTime | Data de criação |
| `updatedAt` | DateTime | Última atualização |

**Relacionamentos:**
- ✅ Pertence a uma `corporation`
- ✅ Tem muitas `job_photos` (fotos)
- ✅ Tem muitas `job_applications` (candidaturas)

---

### **4. job_photos (Fotos dos Serviços)**
**Propósito:** Galeria de fotos dos serviços

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String | ID único (CUID) |
| `url` | String | URL da foto |
| `alt` | String | Texto alternativo |
| `order` | Int | Ordem de exibição (padrão: 0) |
| `jobId` | String | FK para job |
| `createdAt` | DateTime | Data de criação |

**Relacionamentos:**
- ✅ Pertence a um `job`

---

### **5. job_applications (Candidaturas)**
**Propósito:** Candidaturas de prestadores para serviços

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String | ID único (CUID) |
| `message` | String | Mensagem do candidato |
| `status` | String | Status: "pending", "accepted", "rejected" (padrão: "pending") |
| `jobId` | String | FK para job |
| `applicantName` | String | Nome do candidato |
| `applicantEmail` | String | Email do candidato |
| `applicantPhone` | String | Telefone do candidato |
| `createdAt` | DateTime | Data de criação |
| `updatedAt` | DateTime | Última atualização |

**Relacionamentos:**
- ✅ Pertence a um `job`

---

### **6. contacts (Contatos)**
**Propósito:** Contatos recebidos de clientes/interessados

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String | ID único (CUID) |
| `name` | String | Nome |
| `email` | String | Email |
| `phone` | String | Telefone |
| `company` | String | Empresa |
| `message` | String | Mensagem |
| `favorited` | Boolean | Favorito (padrão: false) |
| `status` | String | Status: "new", "contacted", "converted", "archived" (padrão: "new") |
| `corporationId` | String | FK para corporation (opcional) |
| `userId` | String | FK para user (opcional) |
| `createdAt` | DateTime | Data de criação |
| `updatedAt` | DateTime | Última atualização |

**Relacionamentos:**
- ✅ Pode pertencer a uma `corporation`
- ✅ Pode pertencer a um `user`

---

### **7. categories (Categorias)**
**Propósito:** Categorias de serviços do sistema

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String | ID único (CUID) |
| `name` | String | Nome (único) |
| `description` | String | Descrição |
| `icon` | String | Emoji do ícone |
| `color` | String | Cor hex (#3B82F6) |
| `active` | Boolean | Ativa (padrão: true) |
| `order` | Int | Ordem de exibição (padrão: 0) |
| `createdAt` | DateTime | Data de criação |
| `updatedAt` | DateTime | Última atualização |

**Categorias Atuais:**
- 📱 Marketing Digital
- 💻 Tecnologia
- 🏨 Hospedagem
- 🌾 Turismo Rural
- 🍽️ Gastronomia
- 🚌 Transporte
- 🏔️ Aventura
- ⚖️ Jurídico

---

### **8. settings (Configurações do Sistema)**
**Propósito:** Configurações gerais da plataforma

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String | ID único (CUID) |
| `key` | String | Chave (único) |
| `value` | String | Valor |
| `description` | String | Descrição |
| `createdAt` | DateTime | Data de criação |
| `updatedAt` | DateTime | Última atualização |

**Configurações Atuais:**
- `site_name`: "LinkMe Tur"
- `site_description`: "Conectando o turismo gaúcho"
- `contact_email`: "contato@linkmetur.com.br"
- `contact_phone`: "(51) 99999-9999"
- `max_upload_size`: "5242880" (5MB)

---

### **9. accounts (Contas - NextAuth)**
**Propósito:** Contas de autenticação externa (Google, GitHub, etc)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String | ID único (CUID) |
| `userId` | String | FK para user |
| `type` | String | Tipo de conta |
| `provider` | String | Provedor (google, github) |
| `providerAccountId` | String | ID da conta no provedor |
| `refresh_token` | String | Token de refresh |
| `access_token` | String | Token de acesso |
| `expires_at` | Int | Timestamp expiração |
| `token_type` | String | Tipo do token |
| `scope` | String | Escopo |
| `id_token` | String | ID token |
| `session_state` | String | Estado da sessão |

**Relacionamentos:**
- ✅ Pertence a um `user`

---

### **10. sessions (Sessões - NextAuth)**
**Propósito:** Sessões ativas de usuários

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String | ID único (CUID) |
| `sessionToken` | String | Token da sessão (único) |
| `userId` | String | FK para user |
| `expires` | DateTime | Data de expiração |

**Relacionamentos:**
- ✅ Pertence a um `user`

---

### **11. verification_tokens (Tokens de Verificação)**
**Propósito:** Tokens para verificação de email, reset de senha, etc

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `identifier` | String | Identificador (email) |
| `token` | String | Token (único) |
| `expires` | DateTime | Data de expiração |

---

## 📊 **DADOS ATUAIS NO SEU BANCO:**

```
┌────────────────────────┬──────────┐
│ Tabela                 │ Registros│
├────────────────────────┼──────────┤
│ categories             │    8     │
│ settings               │    5     │
│ users                  │    2     │
│ corporations           │    1     │
│ jobs                   │    0     │
│ job_photos             │    0     │
│ job_applications       │    0     │
│ contacts               │    0     │
│ accounts               │    0     │
│ sessions               │    0     │
│ verification_tokens    │    0     │
└────────────────────────┴──────────┘
```

---

## 🔍 **QUERIES ÚTEIS PARA EXPLORAR O BANCO:**

### Ver todos os usuários com suas empresas:
```sql
SELECT u.name, u.email, u.level, c.name as empresa
FROM users u
LEFT JOIN corporations c ON u."corporationId" = c.id;
```

### Ver todas as empresas com contagem de usuários e serviços:
```sql
SELECT 
  c.name,
  c.cnpj,
  COUNT(DISTINCT u.id) as total_usuarios,
  COUNT(DISTINCT j.id) as total_servicos
FROM corporations c
LEFT JOIN users u ON u."corporationId" = c.id
LEFT JOIN jobs j ON j."corporationId" = c.id
GROUP BY c.id, c.name, c.cnpj;
```

### Ver todas as categorias:
```sql
SELECT name, icon, color, active
FROM categories
ORDER BY name;
```

---

## 🎯 **ÍNDICES E PERFORMANCE:**

O banco tem índices automáticos em:
- ✅ Todos os campos `@id` (Primary Keys)
- ✅ Campos `@unique` (email, cnpj, etc)
- ✅ Foreign Keys (relacionamentos)

---

## 🔒 **SEGURANÇA:**

- ✅ Senhas com hash bcrypt (12 rounds)
- ✅ Tokens JWT para autenticação
- ✅ Validação de email único
- ✅ Validação de CNPJ único
- ✅ SSL/TLS na conexão (Supabase)

---

## 📈 **CAPACIDADE:**

Com o plano gratuito do Supabase você tem:
- ✅ 500MB de storage
- ✅ Conexões ilimitadas
- ✅ Backup automático (7 dias)
- ✅ SSL incluso

Isso é suficiente para milhares de registros!

