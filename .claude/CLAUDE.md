# LinkMeTur Platform - Claude Development Guide

## Project Overview

**LinkMeTur** is a tourism platform connecting tourism companies with specialized service providers in Rio Grande do Sul, Brazil. Built with modern web technologies for scalability, performance, and ease of maintenance.

**Version**: 2.0.0  
**Architecture**: Monolithic Modern with Next.js 15  
**Status**: ✅ Production Ready

---

## Commands Reference

### Development Commands

```bash
# Start application in development mode
npm run dev                    # Starts Next.js dev server at http://localhost:3000

# Start development with database
npm run dev:full              # Starts database + application
npm run dev:db                # Only starts PostgreSQL + Redis (Docker)
npm run dev:db:down           # Stops database services

# Build & Production
npm run build                 # Production build
npm run start                 # Start production server
npm run build:production      # Build with NODE_ENV=production
npm run start:production      # Start with NODE_ENV=production
```

### Database Commands

```bash
# Prisma operations
npm run db:generate           # Generate Prisma Client types
npm run db:push               # Push schema changes to database
npm run db:seed               # Seed database with initial data
npm run db:studio             # Open Prisma Studio UI
npm run db:reset              # Reset database and re-seed
```

### Code Quality Commands

```bash
# Linting & Type checking
npm run lint                  # Run ESLint
npm run lint:fix              # Auto-fix ESLint issues
npm run type-check            # TypeScript type checking (tsc --noEmit)

# Build analysis
npm run analyze               # Analyze bundle size (ANALYZE=true)
npm run clean                 # Clean .next and out directories
```

### Docker Commands

```bash
# Production deployment
npm run docker:up             # Start all services (frontend, postgres, redis, nginx)
npm run docker:down           # Stop all services
npm run docker:build          # Build Docker images
npm run docker:logs           # View logs from all services
```

### Installation Commands

```bash
# Install dependencies
npm run install:all           # Install root + landing page dependencies

# Quick setup (recommended)
./start-dev.sh                # Automated setup and start
chmod +x start-dev.sh         # Make script executable (first time)
```

---

## High-Level Architecture

### Technology Stack

**Frontend & Backend (Unified)**
- **Next.js 15**: App Router, Server Components, API Routes
- **React 19**: Latest React features
- **TypeScript 5.9**: Full type safety
- **Tailwind CSS 3.4**: Utility-first styling
- **Material-UI 7**: Component library (@mui/material, @emotion)

**Data Layer**
- **Prisma ORM 6.18**: Type-safe database client
- **SQLite**: Development database (file-based)
- **PostgreSQL 15**: Production database
- **Redis 7**: Cache and session storage

**Authentication**
- **JWT**: Token-based authentication
- **bcryptjs**: Password hashing
- **jsonwebtoken**: Token generation/verification

**Infrastructure**
- **Docker & Docker Compose**: Containerization
- **Nginx**: Reverse proxy and load balancer
- **Node.js 18+**: Runtime environment

### Architecture Pattern

**Monolithic Modern Architecture**: Single Next.js application containing:
- Frontend (React components with App Router)
- Backend (API Routes)
- Database access (Prisma ORM)
- Authentication & Authorization

```
┌─────────────────────────────────────────────────┐
│          Next.js Application (Port 3000)        │
├─────────────────────────────────────────────────┤
│  ┌──────────────┐      ┌──────────────┐        │
│  │   Frontend   │◄────►│  API Routes  │        │
│  │  App Router  │      │   /api/*     │        │
│  └──────────────┘      └──────┬───────┘        │
│                               │                 │
│  ┌────────────────────────────▼───────────┐    │
│  │        Prisma ORM Client               │    │
│  └────────────────────────────┬───────────┘    │
└────────────────────────────────┼────────────────┘
                                 │
         ┌───────────────────────┼───────────────┐
         │                       │               │
    ┌────▼────┐            ┌────▼────┐    ┌────▼────┐
    │ SQLite  │            │ Postgres│    │  Redis  │
    │  (dev)  │            │ (prod)  │    │ (cache) │
    └─────────┘            └─────────┘    └─────────┘
```

---

## Project Structure

```
linkme-tur-test/
├── landing page/                    # Main Next.js application
│   ├── app/                         # Next.js App Router
│   │   ├── api/                     # API Routes (Backend)
│   │   │   ├── auth/                # Authentication endpoints
│   │   │   │   ├── login/           # POST /api/auth/login
│   │   │   │   └── register/        # POST /api/auth/register
│   │   │   ├── jobs/                # Service/Job management
│   │   │   │   ├── route.ts         # GET, POST /api/jobs
│   │   │   │   └── [id]/route.ts    # GET, PUT, DELETE /api/jobs/:id
│   │   │   ├── contacts/            # Contact management
│   │   │   ├── corporations/        # Company management
│   │   │   ├── users/               # User management
│   │   │   └── categories/          # Category management
│   │   ├── dashboard/               # Service Provider dashboard
│   │   ├── dashboard-empresa/       # Tourism Company dashboard
│   │   ├── login/                   # Login page
│   │   ├── cadastro/                # Registration page
│   │   ├── configuracoes/           # Settings page
│   │   ├── perfil/                  # User profile
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Homepage (25K+ lines - comprehensive)
│   │   └── globals.css              # Global styles
│   ├── lib/                         # Utility functions
│   │   ├── prisma.ts                # Prisma client singleton
│   │   └── db.ts                    # Database utilities
│   ├── prisma/                      # Database layer
│   │   ├── schema.prisma            # Database schema (SQLite/PostgreSQL)
│   │   ├── seed.ts                  # Initial data seeding
│   │   └── dev.db                   # SQLite database (development)
│   ├── public/                      # Static assets
│   ├── package.json                 # Frontend dependencies
│   ├── next.config.js               # Next.js configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── tsconfig.json                # TypeScript configuration
│   └── Dockerfile                   # Production container
├── nginx/                           # Reverse proxy configuration
│   ├── Dockerfile
│   └── nginx.conf
├── scripts/                         # Deployment & management scripts
│   ├── setup-database.sh
│   ├── hostinger-deploy.sh
│   ├── hostinger-monitoring.sh
│   └── hostinger-security.sh
├── docker-compose.yml               # Production services
├── docker-compose.dev.yml           # Development services (DB only)
├── docker-compose.prod.yml          # Full production stack
├── package.json                     # Root workspace configuration
├── ARCHITECTURE.md                  # Detailed architecture docs
├── README.md                        # Project documentation
└── .env                             # Environment variables (local)
```

---

## Key Architectural Patterns

### 1. App Router Pattern (Next.js 15)

**File-system based routing** - Each folder under `app/` represents a route:
- `app/page.tsx` → `/` (homepage)
- `app/login/page.tsx` → `/login`
- `app/dashboard/page.tsx` → `/dashboard`
- `app/api/jobs/route.ts` → `/api/jobs` (API endpoint)

**Server Components by default** - Components render on server unless marked with `'use client'`

### 2. API Routes Pattern

All API endpoints follow REST conventions in `app/api/`:

```typescript
// app/api/jobs/route.ts - Collection endpoints
export async function GET(request: NextRequest) { /* List jobs */ }
export async function POST(request: NextRequest) { /* Create job */ }

// app/api/jobs/[id]/route.ts - Resource endpoints  
export async function GET(request: NextRequest, { params }) { /* Get job */ }
export async function PUT(request: NextRequest, { params }) { /* Update job */ }
export async function DELETE(request: NextRequest, { params }) { /* Delete job */ }
```

**Standard Response Format**:
```typescript
{
  success: boolean,
  data?: any,
  error?: string,
  message?: string
}
```

### 3. Prisma ORM Pattern

**Singleton Client** (`lib/prisma.ts`):
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ log: ['query'] })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**Usage in API Routes**:
```typescript
import { prisma } from '../../../lib/prisma'

const users = await prisma.user.findMany()
const user = await prisma.user.create({ data: { email, password } })
```

### 4. Authentication Pattern

**JWT-based authentication**:
1. User logs in via `/api/auth/login`
2. Server validates credentials against database
3. Server generates JWT token with user data
4. Client stores token (localStorage/cookie)
5. Client includes token in subsequent requests
6. Server validates token before processing

**Protected Routes**: Middleware checks authentication status

### 5. Database Schema Pattern

**Multi-tenant design** with Corporation as root entity:

```
Corporation (Tourism Companies)
├── Users (Company employees)
├── Jobs (Services offered)
│   └── JobPhotos
│   └── JobApplications
└── Contacts (Leads/Customers)

Categories (Shared resource)
Settings (System configuration)
```

---

## Database Models

### Core Entities

**Corporation** - Tourism companies
- Owns users, jobs, contacts
- Unique: email, cnpj
- Fields: name, phone, address, website, description, logo

**User** - System users (linked to corporations)
- Level-based access: 1=user, 2=admin, 3=super_admin
- JWT authentication with bcrypt password hashing
- Fields: email, name, password, phone, level, avatar, bio

**Job** - Services/offerings
- Linked to corporation
- Fields: title, description, category, minValue, maxValue, duration, location, published, featured
- Related: JobPhoto[], JobApplication[]

**Contact** - Customer leads
- Linked to corporation and user
- Status flow: new → contacted → converted → archived
- Fields: name, email, phone, company, message, favorited

**Category** - Service categorization
- Shared resource with icons and colors
- Fields: name, description, icon, color, active, order

### Authentication Models

- **Account**: OAuth provider accounts (NextAuth)
- **Session**: User sessions
- **VerificationToken**: Email verification tokens

### System Models

- **Setting**: Key-value system configuration

---

## Important Conventions

### TypeScript Configuration

**Strict mode disabled** (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "strict": false,
    "target": "ES2017",
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  }
}
```

**Path alias**: `@/` maps to project root

### Prisma Conventions

**Schema provider switching**:
- Development: `provider = "sqlite"`
- Production: `provider = "postgresql"`

**Migrations**: Use `prisma db push` for development (schema-first)

**Table naming**: All models use `@@map("table_name")` for snake_case tables

### API Conventions

**Error Handling**: Always wrap in try-catch
```typescript
try {
  // Logic
  return NextResponse.json({ success: true, data })
} catch (error) {
  console.error('Error:', error)
  return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
}
```

**Validation**: Check required fields before processing

**Security**: 
- Never return passwords in API responses
- Always hash passwords with bcrypt
- Validate user permissions before operations

### Styling Conventions

**Tailwind CSS**: Utility-first approach
- Use utility classes directly in JSX
- Responsive design: `sm:`, `md:`, `lg:`, `xl:`
- Custom styles in `globals.css` only when necessary

**Material-UI**: Component library for complex UI elements
- Use MUI components for forms, modals, complex interactions
- Emotion for styled components when needed

---

## Environment Configuration

### Required Environment Variables

```bash
# Database (Development - SQLite)
DATABASE_URL="file:./dev.db"

# Database (Production - PostgreSQL)  
DATABASE_URL="postgresql://user:password@localhost:5432/linkmetur"
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=linkmetur_user
DB_PASSWORD=linkmetur_password
DB_DATABASE=linkmetur

# Redis (Cache - Production)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here
NODE_ENV=development|production

# Application URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3000  # Same as frontend (monolithic)
```

### Environment Files

- `.env` - Local development (git-ignored)
- `.env.production` - Production values (git-ignored)
- `env.example` - Template for new developers

---

## Development Workflow

### Initial Setup

```bash
# 1. Clone repository
git clone <repository-url>
cd linkme-tur-test

# 2. Install dependencies
npm run install:all

# 3. Start database (Docker)
npm run dev:db

# 4. Configure database
cd "landing page"
npm run db:generate      # Generate Prisma Client
npm run db:push          # Create tables
npm run db:seed          # Seed initial data

# 5. Start application
npm run dev              # Access at http://localhost:3000
```

### Default Credentials (After Seeding)

```
Email: admin@linkmetur.com.br
Password: password
Level: 3 (super_admin)
```

### Daily Development

```bash
# Start full development environment
npm run dev:full         # Starts DB + App

# Or separately
npm run dev:db           # Terminal 1: Start database
npm run dev              # Terminal 2: Start app

# View database
npm run db:studio        # Opens Prisma Studio at http://localhost:5555
```

### Making Schema Changes

```bash
# 1. Edit prisma/schema.prisma
# 2. Push changes
npm run db:push

# 3. Regenerate Prisma Client
npm run db:generate

# 4. Restart Next.js dev server (automatic)
```

### Code Quality Checks

```bash
npm run lint             # Check linting errors
npm run type-check       # Check TypeScript errors
npm run build            # Test production build
```

---

## Deployment

### Docker Deployment (Recommended)

```bash
# Build and start all services
npm run docker:build
npm run docker:up

# Services:
# - Frontend: http://localhost:3000
# - PostgreSQL: localhost:5432
# - Redis: localhost:6379  
# - Nginx: http://localhost:80

# View logs
npm run docker:logs

# Stop services
npm run docker:down
```

### Manual Deployment

```bash
# 1. Build application
npm run build:production

# 2. Setup production database
# Ensure PostgreSQL is running
# Update DATABASE_URL in .env

# 3. Run migrations
npm run db:push
npm run db:seed

# 4. Start production server
npm run start:production
```

### Deployment Scripts

Located in `scripts/` directory:
- `hostinger-deploy.sh` - Deploy to Hostinger VPS
- `hostinger-monitoring.sh` - Setup monitoring
- `hostinger-security.sh` - Security hardening
- `hostinger-backup.sh` - Backup automation

---

## Testing & Debugging

### Database Inspection

```bash
# Open Prisma Studio
npm run db:studio

# Direct SQL (SQLite dev)
sqlite3 "landing page/prisma/dev.db" ".tables"
sqlite3 "landing page/prisma/dev.db" "SELECT * FROM users;"

# PostgreSQL (production)
psql -h localhost -U linkmetur_user -d linkmetur
```

### API Testing

```bash
# Test authentication
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@linkmetur.com.br","password":"password"}'

# Test job listing
curl http://localhost:3000/api/jobs

# Test with JWT
curl http://localhost:3000/api/jobs \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Logs

```bash
# Next.js dev logs (automatic in terminal)
npm run dev

# Docker logs
docker-compose logs -f frontend
docker-compose logs -f postgres
docker-compose logs -f redis

# Production logs
pm2 logs nextjs
```

---

## Common Issues & Solutions

### Issue: Prisma Client out of sync

```bash
# Solution: Regenerate Prisma Client
npm run db:generate
```

### Issue: Database connection error

```bash
# Check DATABASE_URL in .env
# For dev: "file:./dev.db"
# For prod: "postgresql://user:pass@host:5432/db"

# Test connection
npm run db:studio
```

### Issue: Docker port conflicts

```bash
# Stop conflicting services
npm run docker:down
npm run dev:db:down

# Or change ports in docker-compose.yml
```

### Issue: Type errors after schema changes

```bash
# Regenerate types and restart
npm run db:generate
# Restart Next.js dev server (Ctrl+C and npm run dev)
```

---

## Performance Considerations

### Next.js Optimizations

- **Server Components**: Default rendering strategy (no client-side JS)
- **Code Splitting**: Automatic per-route code splitting
- **Image Optimization**: Use `next/image` for automatic optimization
- **Static Generation**: Use `generateStaticParams` for static pages

### Database Optimizations

- **Prisma Connection Pooling**: Configured in `lib/prisma.ts`
- **Indexes**: Defined in `schema.prisma` (unique constraints create indexes)
- **Query Optimization**: Use Prisma's `include` selectively, avoid N+1 queries

### Caching Strategy

- **Redis**: Available for session storage and API caching (production)
- **Next.js Cache**: Automatic for static and dynamic routes
- **Database Cache**: Prisma query caching (production)

---

## Security Best Practices

### Implemented Security Measures

1. **Password Security**: bcrypt hashing (10 rounds)
2. **JWT Tokens**: Signed with secret, 24h expiration
3. **SQL Injection**: Prevented by Prisma ORM
4. **XSS Protection**: React escapes output by default
5. **CORS**: Configured in production environment
6. **Environment Variables**: Sensitive data in .env (git-ignored)

### Security Checklist

- [ ] Change default JWT_SECRET before production
- [ ] Use strong DATABASE_URL password
- [ ] Enable HTTPS in production (Nginx SSL)
- [ ] Implement rate limiting (API routes)
- [ ] Add CSRF protection (middleware)
- [ ] Regular dependency updates (`npm audit`)
- [ ] Monitor error logs for security issues

---

## Additional Resources

### Documentation Files

- `ARCHITECTURE.md` - Detailed architecture diagrams and patterns
- `README.md` - Complete project documentation with setup instructions
- `INSTALLATION_GUIDE.md` - Step-by-step installation guide
- `PRODUCTION_READY.md` - Production deployment checklist
- `DEPLOY_GUIDE.md` - Deployment procedures

### Key URLs (Development)

- Frontend: http://localhost:3000
- Prisma Studio: http://localhost:5555 (when running `npm run db:studio`)
- PostgreSQL: localhost:5432 (Docker)
- Redis: localhost:6379 (Docker)

### Key URLs (Production)

- Application: https://linkmetur.com.br
- Admin Panel: https://linkmetur.com.br/admin
- API: https://linkmetur.com.br/api/*

---

## Notes for AI Assistants

### Project Context

This is a **tourism platform** for Rio Grande do Sul, Brazil, connecting:
- **Tourism Companies** (hotels, tour operators) - seeking service providers
- **Service Providers** (marketing, tech, legal, etc.) - offering specialized services

### Code Style

- **TypeScript**: Type annotations preferred but not strict (strict: false)
- **Formatting**: Standard Prettier/ESLint configuration
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Comments**: Portuguese comments acceptable (Brazilian project)

### When Making Changes

1. **Database Changes**: Always run `db:generate` and `db:push` after schema edits
2. **API Changes**: Follow existing response format pattern
3. **Type Safety**: Add types to new code even with strict mode off
4. **Error Handling**: Always wrap API routes in try-catch
5. **Testing**: Test locally before suggesting production changes

### Common Tasks

**Adding a new API endpoint**:
1. Create `app/api/resource/route.ts`
2. Export GET, POST, PUT, DELETE as needed
3. Use `prisma` from `lib/prisma.ts`
4. Follow standard response format

**Adding a new page**:
1. Create `app/page-name/page.tsx`
2. Use Server Components when possible
3. Import styles from `globals.css` or use Tailwind

**Adding a database model**:
1. Edit `prisma/schema.prisma`
2. Run `npm run db:push`
3. Run `npm run db:generate`
4. Update seed data if needed

---

**Last Updated**: January 2025  
**Maintained By**: LinkMe Tur Development Team
