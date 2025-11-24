# Guia de Resolução: Erro DEPLOYMENT_NOT_FOUND no Vercel

## 📋 Resumo do Problema

O erro `DEPLOYMENT_NOT_FOUND` ocorre quando o Vercel não consegue encontrar ou acessar um deployment. Este guia explica a causa raiz, como resolver e como prevenir no futuro.

---

## 🔧 1. SUGESTÃO DE CORREÇÃO

### Passo 1: Verificar e Linkar o Projeto ao Vercel

```bash
# Instalar Vercel CLI (se ainda não tiver)
bun add -g vercel

# Linkar o projeto ao Vercel
vercel link

# Ou criar um novo projeto
vercel
```

**O que fazer:**
- Se o projeto já existe no Vercel, escolha "Link to existing project"
- Se não existe, escolha "Create new project"
- Siga as instruções para conectar ao repositório Git (se aplicável)

### Passo 2: Verificar Configuração do Bun

O projeto usa **Bun** como package manager, e o Vercel precisa ser configurado explicitamente:

✅ **Já configurado:**
- `vercel.json` criado com comandos Bun
- `package.json` atualizado com `packageManager` field

### Passo 3: Fazer Deploy

```bash
# Deploy para preview
vercel

# Deploy para produção
vercel --prod
```

### Passo 4: Verificar no Dashboard

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Verifique se o projeto aparece na lista
3. Clique no projeto e verifique os deployments
4. Se houver deployments falhados, verifique os logs

### Passo 5: Se o Problema Persistir

**Opção A: Deletar e Recriar o Projeto**
```bash
# No dashboard do Vercel, delete o projeto
# Depois recrie:
vercel
```

**Opção B: Usar Integração GitHub (Recomendado)**
1. No dashboard do Vercel, vá em "Add New Project"
2. Conecte seu repositório GitHub
3. Configure:
   - **Framework Preset:** Next.js
   - **Build Command:** `bun run build`
   - **Output Directory:** `.next`
   - **Install Command:** `bun install`
4. Deploy automático será feito a cada push

---

## 🔍 2. EXPLICAÇÃO DA CAUSA RAIZ

### O que estava acontecendo vs. o que deveria acontecer:

**O que estava acontecendo:**
- Você tentou acessar um deployment que não existe ou foi deletado
- O projeto pode não estar linkado ao Vercel
- O Vercel pode não ter detectado o Bun corretamente
- O build pode ter falhado silenciosamente

**O que deveria acontecer:**
- O projeto deveria estar linkado ao Vercel (via CLI ou GitHub)
- O Vercel deveria detectar Next.js e Bun automaticamente
- Cada push deveria gerar um deployment válido
- O deployment deveria estar acessível via URL

### Condições que disparam este erro:

1. **Projeto não linkado:**
   - Você nunca rodou `vercel link` ou `vercel`
   - O `.vercel` folder não existe ou está corrompido

2. **Build falhou:**
   - Erros de compilação TypeScript
   - Dependências faltando
   - Variáveis de ambiente não configuradas

3. **Deployment deletado:**
   - Você deletou o deployment no dashboard
   - O deployment expirou (deployments de preview expiram após inatividade)

4. **URL incorreta:**
   - Tentando acessar um deployment que nunca existiu
   - URL com typo ou deployment ID incorreto

5. **Bun não detectado:**
   - Vercel tentou usar `npm install` ao invés de `bun install`
   - Build falhou por incompatibilidade de package manager

### O que levou a este problema:

**Possíveis causas:**
- **Assumiu que o Vercel detectaria Bun automaticamente** - Nem sempre funciona
- **Não linkou o projeto após criar no dashboard** - Precisa conectar via CLI
- **Deployment foi deletado acidentalmente** - Deployments podem ser removidos
- **Tentou acessar URL de deployment que não existe** - URLs de preview mudam

---

## 🎓 3. ENTENDENDO O CONCEITO

### Por que este erro existe?

O erro `DEPLOYMENT_NOT_FOUND` existe para proteger você de:

1. **Acessar recursos inexistentes:**
   - Previne 404s confusos
   - Dá feedback claro sobre o estado do deployment

2. **Gastos desnecessários:**
   - Evita tentar fazer deploy de algo que não existe
   - Previne loops infinitos de retry

3. **Segurança:**
   - Não permite acessar deployments de outros projetos
   - Valida permissões antes de servir conteúdo

### Modelo mental correto:

```
┌─────────────────┐
│  Seu Código     │
│  (GitHub/Local) │
└────────┬────────┘
         │
         │ Push / vercel deploy
         ▼
┌─────────────────┐
│  Vercel Build   │
│  (bun install)  │
│  (bun run build)│
└────────┬────────┘
         │
         │ Sucesso
         ▼
┌─────────────────┐
│  Deployment     │
│  (URL única)    │
└─────────────────┘
```

**Conceitos importantes:**

1. **Link vs. Deploy:**
   - `vercel link` = Conecta projeto local ao projeto Vercel
   - `vercel` = Cria um novo deployment
   - Sem link, cada deploy cria um projeto novo

2. **Deployments são imutáveis:**
   - Cada deployment tem uma URL única
   - Deployments não mudam após criados
   - Novos deployments = novas URLs

3. **Preview vs. Production:**
   - Preview: Cada branch/PR gera um deployment
   - Production: Apenas `main` ou branch configurada
   - Preview deployments expiram após inatividade

4. **Build vs. Deployment:**
   - Build = Processo de compilação
   - Deployment = Build + Deploy + URL ativa
   - Build pode falhar, deployment não existe se build falhar

### Como isso se encaixa no framework:

**Vercel Architecture:**
```
Git Repository
    │
    ├─► Vercel Integration (GitHub/GitLab/Bitbucket)
    │       │
    │       ├─► Detect Framework (Next.js)
    │       ├─► Detect Package Manager (Bun/npm/yarn)
    │       ├─► Run Build Command
    │       └─► Deploy to Edge Network
    │
    └─► Vercel CLI
            │
            ├─► vercel link (conecta projeto)
            ├─► vercel (deploy preview)
            └─► vercel --prod (deploy production)
```

**Next.js no Vercel:**
- Vercel otimiza Next.js automaticamente
- Usa Edge Functions para API routes
- Static generation acontece no build time
- ISR (Incremental Static Regeneration) suportado

---

## ⚠️ 4. SINAIS DE ALERTA

### O que observar para evitar este erro:

#### 🔴 Sinais de que o projeto não está linkado:

```bash
# Se você rodar vercel e aparecer:
? Set up and deploy? [Y/n]
# E você nunca linkou antes, significa que não está linkado
```

**Solução:** Sempre rode `vercel link` primeiro

#### 🔴 Sinais de que o Bun não foi detectado:

Nos logs do Vercel, você verá:
```
npm install
# Ao invés de:
bun install
```

**Solução:** Adicione `vercel.json` com `installCommand: "bun install"`

#### 🔴 Sinais de que o deployment não existe:

- URL retorna 404
- Dashboard mostra "No deployments"
- Erro ao acessar preview URL

**Solução:** Verifique se o build passou e se o deployment foi criado

#### 🔴 Sinais de que o build vai falhar:

- Build local falha: `bun run build` retorna erro
- TypeScript errors não resolvidos
- Dependências faltando no `package.json`

**Solução:** Sempre teste build local antes de fazer deploy

### Padrões similares que podem causar problemas:

1. **Deployment expirado:**
   - Preview deployments expiram após 30 dias de inatividade
   - **Solução:** Fazer novo deploy ou usar production URL

2. **Branch deletada:**
   - Deployments de branches deletadas podem ser removidos
   - **Solução:** Fazer deploy da branch `main` para produção

3. **Projeto renomeado:**
   - URLs mudam se você renomear o projeto
   - **Solução:** Atualizar bookmarks/links

4. **Permissões insuficientes:**
   - Você não tem acesso ao projeto no Vercel
   - **Solução:** Pedir acesso ao owner do projeto

### Code smells relacionados:

```json
// ❌ RUIM: Sem packageManager field
{
  "name": "my-app",
  "scripts": { ... }
}

// ✅ BOM: Com packageManager field
{
  "name": "my-app",
  "packageManager": "bun@1.1.0",
  "scripts": { ... }
}
```

```json
// ❌ RUIM: Sem vercel.json para Bun
// Vercel pode tentar usar npm

// ✅ BOM: Com vercel.json explícito
{
  "installCommand": "bun install",
  "buildCommand": "bun run build"
}
```

---

## 🔄 5. ALTERNATIVAS E TRADE-OFFS

### Abordagem 1: Vercel CLI (Atual)

**Prós:**
- ✅ Controle total sobre quando fazer deploy
- ✅ Pode fazer deploy de qualquer branch
- ✅ Não precisa commit/push
- ✅ Bom para testes rápidos

**Contras:**
- ❌ Manual (precisa rodar comando)
- ❌ Fácil esquecer de fazer deploy
- ❌ Não integrado com Git workflow

**Quando usar:**
- Desenvolvimento local
- Testes rápidos
- Deploy de hotfixes urgentes

### Abordagem 2: Integração GitHub (Recomendado)

**Prós:**
- ✅ Deploy automático a cada push
- ✅ Preview deployments para cada PR
- ✅ Histórico completo no dashboard
- ✅ Rollback fácil
- ✅ Integração com CI/CD

**Contras:**
- ❌ Precisa fazer commit/push
- ❌ Menos controle sobre timing

**Quando usar:**
- Projetos em produção
- Trabalho em equipe
- Quando quer automatização completa

**Como configurar:**
1. Dashboard Vercel → Add New Project
2. Conectar repositório GitHub
3. Configurar build settings
4. Deploy automático ativado!

### Abordagem 3: GitHub Actions + Vercel

**Prós:**
- ✅ Controle total do pipeline
- ✅ Pode adicionar testes antes do deploy
- ✅ Deploy condicional (ex: apenas se tests passam)

**Contras:**
- ❌ Mais complexo de configurar
- ❌ Precisa manter workflow YAML

**Quando usar:**
- Quando precisa de CI/CD customizado
- Quando quer testes antes de deploy
- Projetos enterprise

### Abordagem 4: Outras Plataformas

**Netlify:**
- Similar ao Vercel
- Boa para sites estáticos
- Menos otimizado para Next.js

**Railway:**
- Foco em aplicações full-stack
- Suporta qualquer runtime
- Pricing diferente

**Render:**
- Similar ao Railway
- Boa alternativa ao Vercel
- Suporta Docker

**Trade-off geral:**
- **Vercel:** Melhor para Next.js, zero-config, edge functions
- **Netlify:** Melhor para JAMstack, sites estáticos
- **Railway/Render:** Melhor para apps com banco de dados, mais flexível

---

## ✅ CHECKLIST DE RESOLUÇÃO

Use este checklist para garantir que tudo está configurado:

- [ ] Projeto linkado ao Vercel (`vercel link` ou integração GitHub)
- [ ] `vercel.json` criado com comandos Bun
- [ ] `package.json` tem `packageManager` field
- [ ] Build local funciona (`bun run build`)
- [ ] Sem erros TypeScript (`bun run lint`)
- [ ] Variáveis de ambiente configuradas no Vercel (se necessário)
- [ ] Deploy testado (`vercel` ou push para GitHub)
- [ ] Deployment aparece no dashboard
- [ ] URL de produção funciona

---

## 🚀 PRÓXIMOS PASSOS

1. **Imediato:**
   ```bash
   vercel link
   vercel --prod
   ```

2. **Configurar Integração GitHub:**
   - Conectar repositório no dashboard
   - Ativar deploy automático

3. **Monitorar:**
   - Verificar logs de build
   - Configurar notificações de deploy
   - Adicionar status checks no GitHub

4. **Otimizar:**
   - Configurar domínio customizado
   - Ativar Analytics
   - Configurar Edge Functions (se necessário)

---

## 📚 RECURSOS ADICIONAIS

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Bun on Vercel](https://vercel.com/docs/build-output-api/v3#bun)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

---

**Última atualização:** Baseado na análise do seu projeto atual
