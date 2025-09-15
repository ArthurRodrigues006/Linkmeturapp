# LinkMeTur - Arquitetura do Sistema

## 📋 Índice
- [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Backend (NestJS)](#backend-nestjs)
- [Frontend (Next.js)](#frontend-nextjs)
- [Fluxo de Dados](#fluxo-de-dados)
- [Padrões de Design](#padrões-de-design)
- [Testes](#testes)
- [Deployment](#deployment)

## 🏗️ Visão Geral da Arquitetura

O LinkMeTur segue uma arquitetura **monorepo** com separação clara entre frontend e backend, utilizando tecnologias modernas para garantir escalabilidade, manutenibilidade e performance.

### Arquitetura de Alto Nível

```mermaid
graph TB
    subgraph "Cliente"
        Browser[Navegador Web]
        Mobile[App Mobile]
    end
    
    subgraph "Frontend Layer"
        NextJS[Next.js App<br/>Port: 3000]
    end
    
    subgraph "Backend Layer"
        NestAPI[NestJS API<br/>Port: 5001]
        Swagger[Swagger Docs<br/>/docs]
    end
    
    subgraph "Dados"
        Memory[(Em Memória)]
        Future[(Futuro: Database)]
    end
    
    Browser --> NextJS
    Mobile --> NextJS
    NextJS --> NestAPI
    NestAPI --> Memory
    NestAPI --> Swagger
    
    style NextJS fill:#0070f3
    style NestAPI fill:#e0234e
    style Swagger fill:#85ea2d
```

### Características Arquiteturais

- ✅ **Monorepo**: Gerenciamento centralizado com workspaces
- ✅ **Microservices Ready**: Estrutura preparada para evolução
- ✅ **API-First**: Backend independente com documentação OpenAPI
- ✅ **Type Safety**: TypeScript em todo o stack
- ✅ **Modern Stack**: Tecnologias atuais e bem suportadas
- ✅ **Testing**: Cobertura completa de testes
- ✅ **Documentation**: Documentação automática e manual

## 📁 Estrutura do Projeto

```
linkmetur-api/
├── 📁 backend/                 # API NestJS
│   ├── 📁 src/
│   │   ├── 📄 main.ts          # Entry point
│   │   ├── 📄 app.module.ts    # Módulo raiz
│   │   ├── 📄 app.controller.ts # Controller principal
│   │   ├── 📄 app.service.ts   # Service principal
│   │   └── 📁 health/          # Módulo de health check
│   │       ├── 📄 health.controller.ts
│   │       └── 📄 health.module.ts
│   ├── 📁 test/                # Testes E2E
│   ├── 📁 dist/                # Build output
│   ├── 📄 package.json         # Dependências backend
│   └── 📄 tsconfig.json        # Config TypeScript
├── 📁 frontend/                # App Next.js
│   ├── 📁 src/app/
│   │   ├── 📄 layout.tsx       # Layout raiz
│   │   ├── 📄 page.tsx         # Página inicial
│   │   └── 📄 globals.css      # Estilos globais
│   ├── 📁 public/              # Assets estáticos
│   ├── 📄 package.json         # Dependências frontend
│   ├── 📄 next.config.ts       # Config Next.js
│   └── 📄 tailwind.config.js   # Config Tailwind
├── 📄 package.json             # Workspace root
└── 📄 README.md                # Documentação principal
```

## 🔧 Backend (NestJS)

### Arquitetura do Backend

```mermaid
graph TB
    subgraph "NestJS Application"
        subgraph "Core Layer"
            Main[main.ts<br/>Bootstrap]
            AppModule[AppModule<br/>Root Module]
        end
        
        subgraph "Feature Modules"
            AppController[AppController<br/>Root Endpoints]
            AppService[AppService<br/>Business Logic]
            HealthModule[HealthModule<br/>Health Check]
            HealthController[HealthController<br/>Health Endpoints]
        end
        
        subgraph "Cross-cutting"
            Validation[Global Validation]
            CORS[CORS Configuration]
            Swagger[Swagger Documentation]
        end
    end
    
    Main --> AppModule
    AppModule --> AppController
    AppModule --> HealthModule
    AppController --> AppService
    HealthModule --> HealthController
    Main --> Validation
    Main --> CORS
    Main --> Swagger
    
    style Main fill:#e0234e
    style AppModule fill:#ff6b6b
    style Swagger fill:#85ea2d
```

### Componentes do Backend

#### 1. **main.ts** - Bootstrap da Aplicação
```typescript
// Configurações globais
- ValidationPipe (whitelist, transform)
- CORS (localhost:3000)
- Swagger Documentation
- Port configuration (5001)
```

#### 2. **AppModule** - Módulo Raiz
```typescript
// Imports
- ConfigModule (global)
- HealthModule

// Características
- Configuração global de ambiente
- Registro de módulos features
```

#### 3. **Controllers**
- **AppController**: Endpoint raiz (`/`)
- **HealthController**: Health check (`/health`)

#### 4. **Services**
- **AppService**: Lógica de negócio básica

#### 5. **Middlewares e Guards**
- **ValidationPipe**: Validação automática de DTOs
- **CORS**: Configuração de cross-origin
- **Global Exception Filter**: Tratamento de erros (implícito)

### Padrões Implementados

1. **Module Pattern**: Organização em módulos
2. **Dependency Injection**: Injeção de dependências nativa
3. **Decorator Pattern**: Uso extensivo de decorators
4. **Service Layer Pattern**: Separação de lógica de negócio
5. **API Documentation**: Auto-geração com Swagger

## 🎨 Frontend (Next.js)

### Arquitetura do Frontend

```mermaid
graph TB
    subgraph "Next.js Application"
        subgraph "App Router"
            Layout[layout.tsx<br/>Root Layout]
            Page[page.tsx<br/>Home Page]
        end
        
        subgraph "Styling"
            GlobalCSS[globals.css<br/>Global Styles]
            Tailwind[Tailwind CSS<br/>Utility Classes]
        end
        
        subgraph "Assets"
            Public[public/<br/>Static Assets]
            Fonts[Geist Fonts<br/>Typography]
        end
        
        subgraph "API Integration"
            HealthAPI[Health Check<br/>API Call]
        end
    end
    
    Layout --> Page
    Page --> HealthAPI
    Layout --> GlobalCSS
    GlobalCSS --> Tailwind
    Layout --> Fonts
    Page --> Public
    
    style Layout fill:#0070f3
    style Page fill:#00d8ff
    style Tailwind fill:#06b6d4
```

### Componentes do Frontend

#### 1. **layout.tsx** - Layout Raiz
```typescript
// Funcionalidades
- Configuração de fontes (Geist)
- Metadata da aplicação
- Estrutura HTML base
- Variáveis CSS customizadas
```

#### 2. **page.tsx** - Página Inicial
```typescript
// Funcionalidades
- Server-side API call
- Health check display
- Error handling
- Responsive design
```

#### 3. **globals.css** - Estilos Globais
```css
/* Recursos */
- Tailwind imports
- CSS Variables (light/dark)
- Reset CSS
- Typography base
```

### Padrões Implementados

1. **App Router**: Roteamento baseado em arquivos
2. **Server Components**: Renderização no servidor
3. **CSS-in-JS**: Tailwind CSS utilities
4. **Responsive Design**: Mobile-first approach
5. **Dark Mode**: Suporte automático

## 🔄 Fluxo de Dados

### Fluxo de Requisição Completo

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend<br/>(Next.js)
    participant B as Backend<br/>(NestJS)
    
    U->>F: Acessa aplicação
    F->>F: Server-side rendering
    F->>B: GET /health
    B->>B: HealthController.get()
    B-->>F: {status: "ok", service: "linkmetur-api"}
    F->>F: Renderiza página
    F-->>U: HTML + dados
    
    Note over F,B: CORS: localhost:3000 → localhost:5001
    Note over B: Validation, Error Handling
    Note over F: SSR, Hydration
```

### Fluxo de Desenvolvimento

```mermaid
graph LR
    subgraph "Development Flow"
        Code[Código] --> Test[Testes]
        Test --> Build[Build]
        Build --> Deploy[Deploy]
    end
    
    subgraph "Backend Flow"
        NestDev[npm run start:dev] --> NestTest[npm run test:e2e]
        NestTest --> NestBuild[npm run build]
    end
    
    subgraph "Frontend Flow"
        NextDev[npm run dev] --> NextBuild[npm run build]
        NextBuild --> NextStart[npm run start]
    end
    
    Code --> NestDev
    Code --> NextDev
    
    style Code fill:#f9f
    style Test fill:#9f9
    style Build fill:#99f
    style Deploy fill:#f99
```

## 🎯 Padrões de Design

### Backend Patterns

1. **Module Pattern**
   - Organização por features
   - Encapsulamento de funcionalidades
   - Injeção de dependências

2. **Controller-Service Pattern**
   - Separação de responsabilidades
   - Controllers: HTTP handling
   - Services: Business logic

3. **Middleware Pattern**
   - ValidationPipe
   - CORS middleware
   - Exception filters

4. **Decorator Pattern**
   - Route decorators (@Get, @Post)
   - Validation decorators
   - Module decorators

### Frontend Patterns

1. **Server Components**
   - Server-side rendering
   - Data fetching no servidor
   - Melhor SEO e performance

2. **Composition Pattern**
   - Layout composition
   - Component reusability
   - Props drilling prevention

3. **CSS Utility Pattern**
   - Tailwind CSS utilities
   - Atomic CSS approach
   - Design system consistency

## 🧪 Testes

### Estratégia de Testes

```mermaid
graph TB
    subgraph "Test Pyramid"
        E2E[E2E Tests<br/>Integration]
        Unit[Unit Tests<br/>Components/Services]
        Static[Static Tests<br/>Linting/Types]
    end
    
    subgraph "Backend Testing"
        Jest[Jest Framework]
        Supertest[Supertest HTTP]
        Coverage[Coverage Reports]
    end
    
    subgraph "Frontend Testing"
        NextTest[Next.js Testing]
        ESLint[ESLint Rules]
        TypeCheck[Type Checking]
    end
    
    E2E --> Jest
    E2E --> Supertest
    Unit --> Jest
    Unit --> Coverage
    Static --> ESLint
    Static --> TypeCheck
    
    style E2E fill:#ff6b6b
    style Unit fill:#4ecdc4
    style Static fill:#45b7d1
```

### Cobertura de Testes Atual

#### Backend
- ✅ **Unit Tests**: Controllers, Services
- ✅ **Integration Tests**: API endpoints
- ✅ **E2E Tests**: Full application flow
- ✅ **Performance Tests**: Load testing
- ✅ **Error Handling Tests**: 404, validation

#### Frontend
- ⏳ **Planejado**: Component tests
- ⏳ **Planejado**: Integration tests
- ✅ **Static Analysis**: ESLint, TypeScript

## 🚀 Deployment

### Arquitetura de Deploy

```mermaid
graph TB
    subgraph "Development"
        DevFE[Frontend Dev<br/>:3000]
        DevBE[Backend Dev<br/>:5001]
    end
    
    subgraph "Production"
        ProdFE[Frontend Prod<br/>Static/SSR]
        ProdBE[Backend Prod<br/>Node.js]
        LB[Load Balancer]
        DB[(Database)]
    end
    
    subgraph "Infrastructure"
        Docker[Docker Containers]
        K8s[Kubernetes]
        CI[CI/CD Pipeline]
    end
    
    DevFE --> ProdFE
    DevBE --> ProdBE
    LB --> ProdFE
    LB --> ProdBE
    ProdBE --> DB
    
    Docker --> K8s
    CI --> Docker
    
    style ProdFE fill:#0070f3
    style ProdBE fill:#e0234e
    style LB fill:#85ea2d
```

### Estratégias de Deploy

1. **Containerização**
   - Docker para backend
   - Docker para frontend
   - Multi-stage builds

2. **Orquestração**
   - Kubernetes deployment
   - Auto-scaling
   - Health checks

3. **CI/CD**
   - GitHub Actions
   - Automated testing
   - Blue-green deployment

## 🔮 Evolução da Arquitetura

### Roadmap Arquitetural

#### Fase 1 (Atual) - MVP
- ✅ Monorepo setup
- ✅ Basic API endpoints
- ✅ Frontend integration
- ✅ Testing framework

#### Fase 2 - Features Core
- [ ] Database integration
- [ ] Authentication system
- [ ] CRUD operations
- [ ] State management

#### Fase 3 - Scale & Performance
- [ ] Caching layer (Redis)
- [ ] Database optimization
- [ ] CDN integration
- [ ] Monitoring & observability

#### Fase 4 - Advanced Features
- [ ] Microservices migration
- [ ] Real-time features (WebSocket)
- [ ] Advanced analytics
- [ ] ML/AI integration

### Considerações de Escalabilidade

1. **Horizontal Scaling**
   - Stateless backend design
   - Database read replicas
   - CDN for static assets

2. **Vertical Scaling**
   - Resource optimization
   - Memory management
   - CPU utilization

3. **Caching Strategy**
   - Application-level cache
   - Database query cache
   - Static asset cache

---

**Última atualização**: Setembro 2025
**Versão da Arquitetura**: 1.0.0
**Status**: ✅ Implementado e Documentado
