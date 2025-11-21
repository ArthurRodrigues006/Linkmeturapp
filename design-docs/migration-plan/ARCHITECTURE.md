# LinkMe Tur: Material-UI to shadcn/ui Migration Architecture

## Executive Summary

Comprehensive architectural plan for migrating the LinkMe Tur tourism landing page from Material-UI to shadcn/ui, transforming a 576-line monolithic component into a modern, maintainable component-based architecture.

**Project Context:**
- **Current State:** Single-file Next.js 15 landing page using Material-UI + Tailwind CSS
- **Target State:** Component-based architecture using shadcn/ui + Tailwind CSS
- **Design Reference:** Fleet management landing page pattern
- **Language:** Portuguese (Brazil)
- **Target Users:** Tourism companies and service providers in Rio Grande do Sul

---

## 1. Architecture Overview

### 1.1 Component Hierarchy

```
app/
├── page.tsx (Landing Page Container)
│
components/
├── layout/
│   ├── header.tsx                    # Navigation header with logo + menu + CTA
│   └── footer.tsx                    # Footer with social links
│
├── sections/
│   ├── hero-section.tsx              # Hero banner with title + image
│   ├── what-is-section.tsx           # Platform presentation (O que é)
│   ├── target-audience-section.tsx   # For whom (Para quem)
│   ├── benefits-section.tsx          # Benefits/advantages (Vantagens)
│   ├── strong-tourism-section.tsx    # Vision statement (Turismo Forte)
│   ├── event-section.tsx             # Turismo Talks event
│   ├── faq-section.tsx               # FAQ accordion
│   └── contact-section.tsx           # Contact CTA (merged into footer)
│
├── ui/ (shadcn/ui components)
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   ├── accordion.tsx
│   ├── input.tsx
│   └── avatar.tsx
│
└── shared/
    ├── section-header.tsx            # Reusable section title + green underline
    ├── benefit-card.tsx              # Benefit card with icon + text
    ├── feature-card.tsx              # Feature card with image + content
    └── container.tsx                 # Max-width container wrapper
```

### 1.2 File Structure

```
/Users/paulosouza/Development/linkme-tur-test/
├── app/
│   ├── page.tsx                      # Landing page assembly
│   ├── layout.tsx                    # Root layout (metadata)
│   └── globals.css                   # Global styles + CSS variables
│
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── sections/
│   │   ├── hero-section.tsx
│   │   ├── what-is-section.tsx
│   │   ├── target-audience-section.tsx
│   │   ├── benefits-section.tsx
│   │   ├── strong-tourism-section.tsx
│   │   ├── event-section.tsx
│   │   └── faq-section.tsx
│   ├── ui/ (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── accordion.tsx
│   │   ├── input.tsx
│   │   └── avatar.tsx
│   └── shared/
│       ├── section-header.tsx
│       ├── benefit-card.tsx
│       ├── feature-card.tsx
│       └── container.tsx
│
├── lib/
│   └── utils.ts                      # shadcn/ui cn() utility
│
├── public/
│   ├── hero.jpg
│   ├── evento-foto.jpg
│   ├── turismo-talks-logo.png
│   ├── 141.svg (Tourism companies icon)
│   ├── 142.svg (Service providers icon)
│   ├── 143.svg (Market/tourists icon)
│   └── 144.svg (Service providers alt icon)
│
├── tailwind.config.js                # Extended with shadcn/ui tokens
├── components.json                   # shadcn/ui configuration
├── package.json
└── tsconfig.json
```

### 1.3 State Management Approach

**Simple Client-Side State (No Global State Needed):**
- **FAQ Accordion:** shadcn/ui Accordion manages open/close state internally
- **Mobile Menu (Future):** React useState for hamburger menu toggle
- **Form Inputs (Future):** React Hook Form for email capture
- **No Redux/Zustand Required:** Landing page has no complex state

### 1.4 Styling Strategy

**Tailwind-First with CSS Variables:**

1. **CSS Variables (globals.css):**
   - shadcn/ui color tokens (HSL format)
   - Brand colors as CSS variables
   - Typography scale
   - Spacing scale
   - Border radius values

2. **Tailwind Utilities:**
   - Layout (flexbox, grid)
   - Spacing (padding, margin)
   - Typography (font-size, weight)
   - Colors (background, text, border)

3. **Component-Specific Styles:**
   - shadcn/ui components use `className` composition
   - Custom styles in `globals.css` only for global patterns

**Color System:**
```css
:root {
  /* Brand Colors */
  --linkme-green: #2BE58F;
  --linkme-green-hover: #27CC7A;

  /* shadcn/ui Tokens */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 158 79% 51%;        /* LinkMe Green */
  --primary-foreground: 0 0% 0%; /* Black text on green */
  /* ... (full token system in Phase 1) */
}
```

---

## 2. Component Mapping

### 2.1 Current Page Structure Analysis

**Current:** 576-line single file (`app/page.tsx`)

**Sections Breakdown:**
1. **Navbar** (Lines 12-60) → `components/layout/header.tsx`
2. **Hero** (Lines 63-101) → `components/sections/hero-section.tsx`
3. **O que é** (Lines 104-189) → `components/sections/what-is-section.tsx`
4. **Para quem** (Lines 192-255) → `components/sections/target-audience-section.tsx`
5. **Vantagens** (Lines 258-343) → `components/sections/benefits-section.tsx`
6. **Turismo Forte** (Lines 346-359) → `components/sections/strong-tourism-section.tsx`
7. **Turismo Talks** (Lines 362-430) → `components/sections/event-section.tsx`
8. **FAQ** (Lines 433-513) → `components/sections/faq-section.tsx`
9. **Footer** (Lines 516-572) → `components/layout/footer.tsx`

### 2.2 Material-UI to shadcn/ui Component Mapping

| Current (MUI) | Target (shadcn/ui) | Migration Complexity |
|--------------|-------------------|---------------------|
| `Button` (MUI) | `Button` (shadcn/ui) | Low - Similar API |
| `<details>` (native HTML) | `Accordion` (shadcn/ui) | Medium - Better UX |
| Custom cards (divs) | `Card` (shadcn/ui) | Low - Cleaner markup |
| Custom badges (divs) | `Badge` (shadcn/ui) | Low - Semantic improvement |
| N/A | `Input` (for future forms) | N/A - Not used yet |
| N/A | `Avatar` (for testimonials) | N/A - Future feature |

### 2.3 Detailed Component Specifications

#### Header Component
```typescript
// components/layout/header.tsx
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const navItems = [
    { label: "O que é", href: "#o-que-é" },
    { label: "Para quem", href: "#para-quem" },
    { label: "Vantagens", href: "#vantagens" },
    { label: "Perguntas Frequentes", href: "#perguntas-frequentes" },
    { label: "Turismo Talks", href: "#turismo-talks" },
    { label: "Contato", href: "#contato" },
  ]

  return (
    <header className={cn(
      "fixed inset-x-0 top-0 z-50 bg-white shadow",
      className
    )}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-6">
        {/* Logo */}
        <div className="text-xl font-bold">
          LinkMe<span className="text-primary">Tur</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-10 text-gray-800 text-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-black transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 text-black font-semibold px-6 rounded-full"
        >
          <a
            href="https://wa.me/555599623685?text=Quero%20fazer%20parte%20da%20LinkMe%20Tur"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fazer parte
          </a>
        </Button>
      </div>
    </header>
  )
}

// Props Interface
interface HeaderProps {
  className?: string // Optional Tailwind classes
}

// Key Features
- Sticky positioning (fixed top-0)
- Responsive navigation (hidden on mobile)
- WhatsApp CTA integration
- shadcn/ui Button with asChild pattern
```

#### Hero Section
```typescript
// components/sections/hero-section.tsx
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="hero" className="relative h-screen w-full pt-24 bg-gradient-to-r from-blue-600 to-green-600">
      {/* Background Image */}
      <Image
        src="/hero.jpg"
        alt="Banner Hero"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center px-8 lg:px-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            Transformamos a forma como as empresas fazem negócios com o turismo
          </h1>
          <p className="text-lg md:text-xl text-white mb-8">
            Conectamos quem precisa com quem resolve
          </p>

          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-6 text-base rounded-full"
          >
            <a
              href="https://wa.me/555599623685?text=Quero%20fazer%20parte%20da%20LinkMe%20Tur"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quero fazer parte dessa transformação
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

// Key Features
- Full viewport height (h-screen)
- Next.js Image optimization with priority loading
- Dark overlay for text readability
- Responsive typography (3xl → 6xl)
- WhatsApp CTA button
```

#### FAQ Section with Accordion
```typescript
// components/sections/faq-section.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = {
  platform: [
    {
      question: "O que é a LinkMe Tur?",
      answer: "Somos uma plataforma digital inteligente que conecta empresas de turismo a prestadores de serviços qualificados..."
    },
    // ... more questions
  ],
  forYou: [
    {
      question: "A LinkMe Tur é pra mim?",
      answer: "Se você possui uma agência de viagens, hotel, pousada..."
    },
    // ... more questions
  ],
  benefits: [
    {
      question: "Como a LinkMe Tur ajuda a reduzir custos?",
      answer: "Oferecemos uma experiência simples e eficiente..."
    },
    // ... more questions
  ]
}

export function FAQSection() {
  return (
    <section
      id="perguntas-frequentes"
      className="py-16 bg-gray-800 text-white px-8"
    >
      <h2 className="text-3xl font-bold text-center mb-8">
        Perguntas Frequentes
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Column 1: A Plataforma */}
        <div>
          <h4 className="font-semibold mb-4">A Plataforma</h4>
          <Accordion type="single" collapsible className="w-full">
            {faqData.platform.map((faq, index) => (
              <AccordionItem key={index} value={`platform-${index}`}>
                <AccordionTrigger className="text-left text-white hover:text-white/80">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Column 2: Para Você */}
        <div>
          <h4 className="font-semibold mb-4">Para Você</h4>
          <Accordion type="single" collapsible className="w-full">
            {faqData.forYou.map((faq, index) => (
              <AccordionItem key={index} value={`for-you-${index}`}>
                <AccordionTrigger className="text-left text-white hover:text-white/80">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Column 3: Benefícios */}
        <div>
          <h4 className="font-semibold mb-4">Benefícios</h4>
          <Accordion type="single" collapsible className="w-full">
            {faqData.benefits.map((faq, index) => (
              <AccordionItem key={index} value={`benefits-${index}`}>
                <AccordionTrigger className="text-left text-white hover:text-white/80">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

// Key Improvements
- Replace native <details> with shadcn/ui Accordion
- Smooth animations (accordion-down, accordion-up)
- Better keyboard navigation (Arrow keys, Enter, Space)
- ARIA attributes for accessibility
- Single expansion mode (type="single")
```

#### Shared Components

**Section Header Component:**
```typescript
// components/shared/section-header.tsx
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-8", className)}>
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
        {title}
      </h2>
      <div className="h-1 w-24 bg-primary mx-auto rounded" />
      {subtitle && (
        <p className="mt-6 max-w-3xl mx-auto text-gray-700">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// Usage
<SectionHeader
  title="Conecte-se com quem realmente importa"
  subtitle="Não somos apenas uma plataforma, somos um ecossistema..."
/>
```

**Benefit Card Component:**
```typescript
// components/shared/benefit-card.tsx
import { Card } from "@/components/ui/card"

interface BenefitCardProps {
  icon: React.ReactNode
  title: string
}

export function BenefitCard({ icon, title }: BenefitCardProps) {
  return (
    <Card className="bg-white rounded-xl p-4 shadow-lg text-center w-full h-72 flex flex-col">
      <div className="w-12 h-12 bg-white border-2 border-primary rounded-lg flex items-center justify-center mx-auto mt-2 mb-4">
        {icon}
      </div>
      <div className="flex-1 flex items-center justify-center px-2">
        <h4 className="font-bold text-gray-800 text-sm leading-tight">
          {title}
        </h4>
      </div>
    </Card>
  )
}

// Usage
<BenefitCard
  icon={<LockIcon className="w-6 h-6 text-primary" />}
  title="Prioridade para acessar e testar o MVP gratuitamente"
/>
```

---

## 3. Implementation Phases

### Phase 1: Setup & Foundation (Day 1-2)

**Objective:** Install shadcn/ui, configure Tailwind, setup project structure

**Tasks:**
1. **Install shadcn/ui and dependencies**
   ```bash
   npx shadcn-ui@latest init
   npm install lucide-react class-variance-authority clsx tailwind-merge
   ```

2. **Configure shadcn/ui (`components.json`)**
   ```json
   {
     "style": "default",
     "rsc": true,
     "tsx": true,
     "tailwind": {
       "config": "tailwind.config.js",
       "css": "app/globals.css",
       "baseColor": "neutral",
       "cssVariables": true
     },
     "aliases": {
       "components": "@/components",
       "utils": "@/lib/utils"
     }
   }
   ```

3. **Install required shadcn/ui components**
   ```bash
   npx shadcn-ui@latest add button card badge accordion
   ```

4. **Update `tailwind.config.js`**
   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     darkMode: ["class"],
     content: [
       './pages/**/*.{ts,tsx}',
       './components/**/*.{ts,tsx}',
       './app/**/*.{ts,tsx}',
       './src/**/*.{ts,tsx}',
     ],
     theme: {
       container: {
         center: true,
         padding: "2rem",
         screens: {
           "2xl": "1536px",
         },
       },
       extend: {
         colors: {
           border: "hsl(var(--border))",
           input: "hsl(var(--input))",
           ring: "hsl(var(--ring))",
           background: "hsl(var(--background))",
           foreground: "hsl(var(--foreground))",
           primary: {
             DEFAULT: "hsl(var(--primary))",
             foreground: "hsl(var(--primary-foreground))",
           },
           // ... (full color system)
         },
         borderRadius: {
           lg: "var(--radius)",
           md: "calc(var(--radius) - 2px)",
           sm: "calc(var(--radius) - 4px)",
         },
         keyframes: {
           "accordion-down": {
             from: { height: 0 },
             to: { height: "var(--radix-accordion-content-height)" },
           },
           "accordion-up": {
             from: { height: "var(--radix-accordion-content-height)" },
             to: { height: 0 },
           },
         },
         animation: {
           "accordion-down": "accordion-down 0.2s ease-out",
           "accordion-up": "accordion-up 0.2s ease-out",
         },
       },
     },
     plugins: [require("tailwindcss-animate")],
   }
   ```

5. **Update `app/globals.css`**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   @layer base {
     :root {
       --background: 0 0% 100%;
       --foreground: 222.2 84% 4.9%;
       --primary: 158 79% 51%;        /* #2BE58F - LinkMe Green */
       --primary-foreground: 0 0% 0%; /* Black text */
       --card: 0 0% 100%;
       --card-foreground: 222.2 84% 4.9%;
       /* ... (full token system) */
       --radius: 0.5rem;
     }

     * {
       @apply border-border;
     }

     body {
       @apply bg-background text-foreground;
     }
   }
   ```

6. **Create folder structure**
   ```bash
   mkdir -p components/{layout,sections,shared,ui}
   mkdir -p lib
   ```

**Validation Criteria:**
- [ ] shadcn/ui components install without errors
- [ ] `npm run dev` starts successfully
- [ ] Tailwind CSS variables applied correctly
- [ ] Folder structure matches architecture

**Risk Mitigation:**
- Backup current `app/page.tsx` to `app/page.backup.tsx`
- Test build (`npm run build`) after configuration
- Verify no TypeScript errors

---

### Phase 2: Core Components (Day 3-4)

**Objective:** Create shadcn/ui Button, Card, Badge components with LinkMe Tur styling

**Tasks:**
1. **Customize Button component**
   - Add `variant="linkme"` for green CTA buttons
   - Add `rounded-full` for pill-shaped buttons
   - Test with WhatsApp links

2. **Customize Card component**
   - Add shadow variants for different sections
   - Ensure responsive padding

3. **Create shared components**
   - `section-header.tsx` (reusable title + green underline)
   - `benefit-card.tsx` (benefit cards with icons)
   - `feature-card.tsx` (feature cards with images)
   - `container.tsx` (max-width wrapper)

**Validation Criteria:**
- [ ] Button component renders correctly
- [ ] Card component responsive on mobile/desktop
- [ ] Shared components reusable across sections
- [ ] No visual regressions from original design

**Testing Checklist:**
- [ ] Test buttons on mobile (<640px)
- [ ] Test cards on tablet (768px-1024px)
- [ ] Test desktop layout (>1024px)
- [ ] Verify green color (#2BE58F) matches brand

---

### Phase 3: Layout Components (Day 5)

**Objective:** Build Header and Footer components

**Tasks:**
1. **Header Component (`components/layout/header.tsx`)**
   - Logo/brand text
   - Navigation menu (6 links)
   - WhatsApp CTA button
   - Sticky positioning
   - Mobile menu placeholder (hamburger icon for future)

2. **Footer Component (`components/layout/footer.tsx`)**
   - Brand logo/text
   - Social media links (Instagram, LinkedIn, WhatsApp)
   - Copyright text

**Validation Criteria:**
- [ ] Header sticks to top on scroll
- [ ] Navigation links anchor correctly
- [ ] Footer social links open in new tab
- [ ] Responsive on all breakpoints

---

### Phase 4: Section Components (Day 6-8)

**Objective:** Migrate all 7 sections from monolithic page.tsx

**Tasks:**
1. **Hero Section** (`components/sections/hero-section.tsx`)
   - Full-screen background image
   - Title + subtitle
   - WhatsApp CTA button

2. **What Is Section** (`components/sections/what-is-section.tsx`)
   - Section header
   - 3 feature cards (141.svg, 142.svg, 143.svg icons)

3. **Target Audience Section** (`components/sections/target-audience-section.tsx`)
   - Section header
   - 2-column grid (companies vs providers)

4. **Benefits Section** (`components/sections/benefits-section.tsx`)
   - Section header
   - 5 benefit cards with custom SVG icons

5. **Strong Tourism Section** (`components/sections/strong-tourism-section.tsx`)
   - Inspirational text with green accent

6. **Event Section** (`components/sections/event-section.tsx`)
   - Turismo Talks logo
   - Event details (date, location)
   - Event photo
   - Instagram link button

7. **FAQ Section** (`components/sections/faq-section.tsx`)
   - Section header
   - 3-column accordion layout
   - shadcn/ui Accordion component

**Validation Criteria:**
- [ ] All sections render correctly
- [ ] Content matches original Portuguese text
- [ ] Images load with Next.js Image optimization
- [ ] Responsive layout on all devices

---

### Phase 5: Polish & Optimization (Day 9-10)

**Objective:** Final refinements, accessibility, performance optimization

**Tasks:**
1. **Animation refinements**
   - Smooth accordion transitions
   - Hover states on buttons/links
   - Subtle card hover effects

2. **Performance optimization**
   - Image optimization (WebP conversion)
   - Lazy loading for below-fold images
   - Code splitting analysis

3. **Accessibility audit**
   - Keyboard navigation (Tab, Enter, Space)
   - ARIA labels for icon buttons
   - Focus indicators (2px outline)
   - Screen reader testing

4. **Cross-browser testing**
   - Chrome (primary)
   - Safari (macOS/iOS)
   - Firefox
   - Edge

5. **Mobile optimization**
   - Touch targets ≥44x44px
   - Viewport meta tag
   - Mobile menu implementation (if time permits)

**Validation Criteria:**
- [ ] Lighthouse score ≥90 (Performance, Accessibility, SEO)
- [ ] WCAG 2.1 AA compliance
- [ ] No console errors/warnings
- [ ] All images use Next.js Image component
- [ ] Bundle size < 500KB (initial load)

---

## 4. Technical Decisions

### 4.1 TypeScript Configuration

**Recommendation:** Keep strict mode OFF for gradual migration

**Rationale:**
- Current `tsconfig.json` has `"strict": false`
- Enables faster migration without type errors
- Can enable strict mode post-migration for improved type safety

**Future Improvement:**
```json
{
  "compilerOptions": {
    "strict": true,          // Enable after migration
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### 4.2 Component Composition Patterns

**Compound Component Pattern (for complex sections):**
```typescript
// Example: Event Section with sub-components
export function EventSection() {
  return (
    <section className="py-16 bg-gray-100">
      <EventCard>
        <EventCard.Logo src="/turismo-talks-logo.png" />
        <EventCard.Title>
          Participe do Turismo Talks
        </EventCard.Title>
        <EventCard.Description>
          Com a participação de diversos atores do trade turístico...
        </EventCard.Description>
        <EventCard.Details>
          <EventDetail icon="📍" label="FASA - Santo Ângelo" />
          <EventDetail icon="📅" label="19 de Julho" />
          <EventDetail icon="⏰" label="08:00 às 18:00" />
        </EventCard.Details>
        <EventCard.Image src="/evento-foto.jpg" />
      </EventCard>
    </section>
  )
}
```

**Render Props Pattern (for flexible layouts):**
```typescript
interface FeatureGridProps {
  items: Array<{ icon: string; title: string; description: string }>
  renderItem?: (item: FeatureItem) => React.ReactNode
}

export function FeatureGrid({ items, renderItem }: FeatureGridProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map((item) =>
        renderItem ? renderItem(item) : <DefaultFeatureCard {...item} />
      )}
    </div>
  )
}
```

### 4.3 Icon System (Lucide React)

**Rationale:** Replace inline SVG with Lucide React icons

**Installation:**
```bash
npm install lucide-react
```

**Usage Example:**
```typescript
import { Lock, Star, Eye, Lightbulb, Users } from "lucide-react"

// Replace custom SVG
<div className="w-12 h-12 bg-white border-2 border-primary rounded-lg">
  <Lock className="w-6 h-6 text-primary" />
</div>
```

**Icon Mapping:**
- Lock → Priority/security benefit
- Star → Visibility benefit
- Eye → Positioning benefit
- Lightbulb → Business opportunity benefit
- Users → Network benefit

### 4.4 Form Handling Approach (Future)

**Email Capture Form (not in current scope, but planned):**
```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const emailSchema = z.object({
  email: z.string().email("Email inválido"),
})

export function EmailCaptureForm() {
  const form = useForm({
    resolver: zodResolver(emailSchema),
  })

  const onSubmit = (data: z.infer<typeof emailSchema>) => {
    // Send to API
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input {...form.register("email")} placeholder="seu@email.com" />
      <Button type="submit">Inscrever-se</Button>
    </form>
  )
}
```

### 4.5 Responsive Design Strategy

**Mobile-First Approach:**
```css
/* Base (Mobile) - 320px to 767px */
.section { padding: 40px 16px; }
.heading { font-size: 28px; }
.grid { grid-template-columns: 1fr; }

/* Tablet - 768px to 1023px */
@media (min-width: 768px) {
  .section { padding: 60px 32px; }
  .heading { font-size: 36px; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop - 1024px+ */
@media (min-width: 1024px) {
  .section { padding: 80px 32px; }
  .heading { font-size: 48px; }
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

**Breakpoint System (Tailwind):**
- `sm:` 640px (Mobile landscape)
- `md:` 768px (Tablet)
- `lg:` 1024px (Desktop)
- `xl:` 1280px (Large desktop)
- `2xl:` 1536px (Extra large desktop)

---

## 5. Risk Mitigation

### 5.1 Breaking Changes Identification

**High Risk Areas:**
1. **Button Component Styling**
   - MUI `sx` prop → Tailwind `className`
   - Button variant names (contained → default)
   - Size prop values (large → lg)

2. **Accordion Transition**
   - Native `<details>` → shadcn/ui Accordion
   - Different HTML structure
   - Animation timing differences

3. **Card Layouts**
   - Generic `<div>` → shadcn/ui Card
   - Padding/spacing adjustments
   - Shadow values may differ

**Mitigation Strategy:**
- Side-by-side visual comparison before/after
- Screenshot testing at 3 breakpoints (375px, 768px, 1440px)
- Preserve exact padding/spacing values from original

### 5.2 Rollback Strategy

**Git Branching:**
```bash
# Create migration branch
git checkout -b feature/shadcn-migration

# Create backup branch
git checkout -b backup/mui-version

# Work on migration
git checkout feature/shadcn-migration
```

**Incremental Rollback:**
- Each phase committed separately
- Can rollback specific sections without losing entire migration
- Tag stable checkpoints: `git tag phase-1-complete`

**Rollback Command:**
```bash
# Rollback entire migration
git checkout main
git reset --hard origin/main

# Rollback to specific phase
git reset --hard phase-2-complete
```

### 5.3 Testing Checkpoints

**Phase 1 Checkpoint:**
- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes successfully
- [ ] Tailwind classes render correctly
- [ ] shadcn/ui components import successfully

**Phase 2 Checkpoint:**
- [ ] Button component matches MUI visual exactly
- [ ] Card component responsive on all breakpoints
- [ ] Shared components reusable

**Phase 3 Checkpoint:**
- [ ] Header sticky behavior works
- [ ] Navigation anchors scroll correctly
- [ ] Footer social links functional

**Phase 4 Checkpoint:**
- [ ] All 7 sections render identically to original
- [ ] No content missing or truncated
- [ ] Images load with correct aspect ratios

**Phase 5 Checkpoint:**
- [ ] Lighthouse score ≥90 across all metrics
- [ ] WCAG 2.1 AA compliance
- [ ] Cross-browser compatibility verified

### 5.4 Performance Monitoring

**Metrics to Track:**
- **First Contentful Paint (FCP):** Target <1.8s
- **Largest Contentful Paint (LCP):** Target <2.5s
- **Total Blocking Time (TBT):** Target <200ms
- **Cumulative Layout Shift (CLS):** Target <0.1
- **Bundle Size:** Target <500KB initial, <2MB total

**Monitoring Tools:**
```bash
# Lighthouse CLI
npx lighthouse http://localhost:3000 --view

# Bundle analyzer
npm install --save-dev @next/bundle-analyzer
```

**Performance Budget:**
| Metric | Current (MUI) | Target (shadcn/ui) | Max Allowed |
|--------|---------------|-------------------|-------------|
| Initial JS | ~450KB | ~350KB | 500KB |
| Initial CSS | ~80KB | ~60KB | 100KB |
| Images | ~2MB | ~1.5MB (WebP) | 2MB |
| Total Load Time | 3.2s | 2.5s | 3.0s |

---

## 6. Bundle Size Optimization

### 6.1 Current Bundle Analysis (Material-UI)

**Estimated Bundle Sizes:**
- `@mui/material`: ~150KB (gzipped)
- `@emotion/react + @emotion/styled`: ~50KB (gzipped)
- **Total MUI Dependencies:** ~200KB

### 6.2 Target Bundle Sizes (shadcn/ui)

**shadcn/ui Advantages:**
- Components copied to project (no runtime dependency)
- Tree-shaking at component level
- Radix UI primitives: ~20KB per component
- **Estimated Total:** ~80KB (gzipped)

**Bundle Size Savings:** ~60% reduction (200KB → 80KB)

### 6.3 Optimization Techniques

1. **Dynamic Imports (for future modal/dialog components):**
   ```typescript
   const Dialog = dynamic(() => import("@/components/ui/dialog"))
   ```

2. **Image Optimization:**
   ```typescript
   // Convert JPEG to WebP
   <Image
     src="/hero.jpg"
     alt="Hero"
     fill
     priority
     quality={85}
     formats={["image/webp", "image/jpeg"]}
   />
   ```

3. **Font Optimization:**
   ```typescript
   // app/layout.tsx
   import { Inter } from "next/font/google"

   const inter = Inter({
     subsets: ["latin"],
     display: "swap",
     variable: "--font-inter",
   })
   ```

4. **CSS Purging (Tailwind):**
   ```javascript
   // tailwind.config.js
   module.exports = {
     content: [
       "./app/**/*.{js,ts,jsx,tsx}",
       "./components/**/*.{js,ts,jsx,tsx}",
     ],
     // Purges unused styles in production
   }
   ```

---

## 7. Accessibility Improvements

### 7.1 WCAG 2.1 AA Compliance Checklist

**Keyboard Navigation:**
- [ ] All interactive elements keyboard accessible (Tab, Enter, Space)
- [ ] Visible focus indicators (2px outline, 3:1 contrast)
- [ ] Logical tab order (header → sections → footer)
- [ ] Skip to main content link (for screen readers)
- [ ] Accordion keyboard controls (Arrow keys, Enter, Space)

**Screen Readers:**
- [ ] Semantic HTML (header, nav, main, section, footer)
- [ ] ARIA labels for icon buttons
  ```tsx
  <Button aria-label="Abrir WhatsApp">
    <WhatsAppIcon />
  </Button>
  ```
- [ ] ARIA live regions for dynamic content
- [ ] Image alt text (descriptive and concise)
- [ ] Form labels and error announcements

**Color Contrast:**
- [ ] Text contrast ratio ≥4.5:1 (normal text)
  - Black text on white: 21:1 ✓
  - Gray text (#6B7280) on white: 4.55:1 ✓
- [ ] Text contrast ratio ≥3:1 (large text 24px+)
  - White text on hero overlay: 15:1 ✓
- [ ] UI component contrast ≥3:1
  - Green button (#2BE58F) with black text: 4.2:1 ✓
- [ ] Focus indicator contrast ≥3:1
  - Blue focus ring on white: 8.6:1 ✓

**Visual Design:**
- [ ] Text resizable up to 200% without loss of content
- [ ] Touch targets ≥44x44px
  ```tsx
  <Button className="min-h-[44px] min-w-[44px]">
    CTA
  </Button>
  ```
- [ ] No content flashing more than 3 times per second
- [ ] Clear visual hierarchy (headings, spacing)

**Forms (Future Enhancement):**
- [ ] Associated labels for all inputs
  ```tsx
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
  ```
- [ ] Error identification and suggestions
- [ ] Success confirmations
- [ ] Fieldset and legend for grouped inputs

### 7.2 Accessibility Testing Tools

**Automated Testing:**
```bash
# Install axe DevTools
npm install --save-dev @axe-core/react

# Run in development
npm run dev
# Open http://localhost:3000
# Open DevTools → Axe tab → Analyze
```

**Manual Testing:**
- **Keyboard only:** Tab through entire page
- **Screen reader:** VoiceOver (macOS), NVDA (Windows)
- **Zoom test:** 200% zoom in browser settings
- **Color blindness:** Chrome DevTools → Rendering → Emulate vision deficiencies

---

## 8. Testing Strategy

### 8.1 Visual Regression Testing

**Screenshot Comparison (Manual):**
1. Capture screenshots of original MUI version at 3 breakpoints:
   - Mobile: 375px × 812px (iPhone 13)
   - Tablet: 768px × 1024px (iPad)
   - Desktop: 1440px × 900px (MacBook Pro)

2. Capture screenshots of shadcn/ui version at same breakpoints

3. Side-by-side comparison:
   - Layout alignment
   - Spacing consistency
   - Font sizes
   - Color accuracy

**Tools:**
- **Percy (visual testing platform):** Free for open source
- **Chromatic (Storybook integration):** Visual regression CI

### 8.2 Component Testing (Future)

**React Testing Library:**
```typescript
import { render, screen } from "@testing-library/react"
import { Header } from "@/components/layout/header"

describe("Header", () => {
  it("renders navigation links", () => {
    render(<Header />)
    expect(screen.getByText("O que é")).toBeInTheDocument()
    expect(screen.getByText("Para quem")).toBeInTheDocument()
  })

  it("renders CTA button with WhatsApp link", () => {
    render(<Header />)
    const ctaButton = screen.getByText("Fazer parte")
    expect(ctaButton).toHaveAttribute("href", expect.stringContaining("wa.me"))
  })
})
```

### 8.3 Integration Testing

**Playwright E2E Tests:**
```typescript
import { test, expect } from "@playwright/test"

test("landing page navigation", async ({ page }) => {
  await page.goto("http://localhost:3000")

  // Click navigation link
  await page.click('a[href="#para-quem"]')

  // Verify scroll to section
  await expect(page.locator("#para-quem")).toBeInViewport()
})

test("accordion interaction", async ({ page }) => {
  await page.goto("http://localhost:3000")

  // Navigate to FAQ section
  await page.click('a[href="#perguntas-frequentes"]')

  // Click accordion trigger
  await page.click('button:has-text("O que é a LinkMe Tur?")')

  // Verify content expanded
  await expect(page.locator('text="Somos uma plataforma digital"')).toBeVisible()
})
```

### 8.4 Performance Testing

**Lighthouse CI:**
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install && npm run build
      - run: npm install -g @lhci/cli
      - run: lhci autorun
```

**Performance Budget:**
```json
{
  "budgets": [
    {
      "resourceSizes": [
        { "resourceType": "script", "budget": 500 },
        { "resourceType": "stylesheet", "budget": 100 },
        { "resourceType": "image", "budget": 2000 },
        { "resourceType": "total", "budget": 3000 }
      ]
    }
  ]
}
```

---

## 9. Migration Checklist

### Pre-Migration
- [ ] Backup current codebase (`git tag pre-migration`)
- [ ] Document current bundle sizes
- [ ] Capture baseline Lighthouse scores
- [ ] Screenshot all sections at 3 breakpoints

### Phase 1: Setup (Day 1-2)
- [ ] Install shadcn/ui (`npx shadcn-ui@latest init`)
- [ ] Install dependencies (lucide-react, class-variance-authority)
- [ ] Configure `components.json`
- [ ] Update `tailwind.config.js` with shadcn/ui tokens
- [ ] Update `app/globals.css` with CSS variables
- [ ] Create folder structure (layout, sections, shared, ui)
- [ ] Create `lib/utils.ts` with cn() function
- [ ] Install core components (button, card, badge, accordion)
- [ ] Verify build (`npm run build`)

### Phase 2: Core Components (Day 3-4)
- [ ] Customize Button component (variant="linkme")
- [ ] Customize Card component (shadow variants)
- [ ] Create SectionHeader shared component
- [ ] Create BenefitCard shared component
- [ ] Create FeatureCard shared component
- [ ] Create Container wrapper component
- [ ] Test components in isolation

### Phase 3: Layout Components (Day 5)
- [ ] Build Header component
- [ ] Build Footer component
- [ ] Test sticky header behavior
- [ ] Verify navigation anchor links
- [ ] Test social media links

### Phase 4: Section Components (Day 6-8)
- [ ] Migrate Hero Section
- [ ] Migrate What Is Section
- [ ] Migrate Target Audience Section
- [ ] Migrate Benefits Section
- [ ] Migrate Strong Tourism Section
- [ ] Migrate Event Section
- [ ] Migrate FAQ Section (with Accordion)
- [ ] Verify all content matches original
- [ ] Test responsive layouts

### Phase 5: Polish (Day 9-10)
- [ ] Add smooth animations (accordion, hover)
- [ ] Optimize images (WebP conversion)
- [ ] Add lazy loading for below-fold images
- [ ] Keyboard navigation testing
- [ ] Screen reader testing (VoiceOver/NVDA)
- [ ] Focus indicator verification
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile optimization (touch targets, viewport)
- [ ] Lighthouse audit (target ≥90)
- [ ] WCAG 2.1 AA compliance check

### Post-Migration
- [ ] Remove Material-UI dependencies
  ```bash
  npm uninstall @mui/material @emotion/react @emotion/styled
  ```
- [ ] Bundle size comparison (before/after)
- [ ] Performance benchmark (Lighthouse scores)
- [ ] Update README.md with new tech stack
- [ ] Git tag (`git tag post-migration`)
- [ ] Deploy to Vercel staging
- [ ] Final QA review
- [ ] Production deployment

---

## 10. Success Criteria

### Technical Metrics
- [ ] Bundle size reduced by ≥50% (200KB → <100KB)
- [ ] Lighthouse Performance score ≥90
- [ ] Lighthouse Accessibility score ≥95
- [ ] Lighthouse SEO score ≥100
- [ ] First Contentful Paint <1.8s
- [ ] Largest Contentful Paint <2.5s
- [ ] Cumulative Layout Shift <0.1
- [ ] Total Blocking Time <200ms

### Functional Requirements
- [ ] All 7 sections render identically to original
- [ ] Navigation links anchor scroll correctly
- [ ] WhatsApp CTAs functional
- [ ] FAQ accordion expands/collapses smoothly
- [ ] Images load with Next.js optimization
- [ ] Social media links open in new tabs
- [ ] Mobile menu (if implemented) works correctly

### Accessibility Requirements
- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigation fully functional
- [ ] Screen reader compatible
- [ ] Focus indicators visible (2px outline)
- [ ] Color contrast ratios meet standards
- [ ] Touch targets ≥44x44px
- [ ] Text resizable to 200%

### Design Fidelity
- [ ] Green brand color (#2BE58F) preserved
- [ ] Typography hierarchy maintained
- [ ] Spacing and alignment consistent
- [ ] Responsive breakpoints identical
- [ ] Hover states match original
- [ ] Visual polish (shadows, borders) preserved

---

## Appendix A: Design Tokens Reference

### Colors (HSL Format)
```css
:root {
  /* Brand Colors */
  --linkme-green: 158 79% 51%;      /* #2BE58F */
  --linkme-green-hover: 158 79% 46%; /* #27CC7A */

  /* shadcn/ui Tokens */
  --background: 0 0% 100%;          /* White */
  --foreground: 222.2 84% 4.9%;     /* Near black */
  --primary: 158 79% 51%;            /* LinkMe Green */
  --primary-foreground: 0 0% 0%;     /* Black */
  --secondary: 210 40% 96.1%;        /* Light gray */
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 158 79% 51%;               /* LinkMe Green focus ring */
  --radius: 0.5rem;
}
```

### Typography Scale
```css
/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Spacing Scale
```css
/* Based on 4px grid */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
```

---

## Appendix B: Component API Reference

### Button
```typescript
interface ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
  className?: string
}

// Usage
<Button
  variant="default"
  size="lg"
  className="bg-primary hover:bg-primary/90 rounded-full"
  asChild
>
  <a href="https://wa.me/555599623685">Fazer parte</a>
</Button>
```

### Card
```typescript
interface CardProps {
  className?: string
  children: React.ReactNode
}

// Usage
<Card className="p-6 bg-gray-50 rounded-2xl shadow">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

### Accordion
```typescript
interface AccordionProps {
  type: "single" | "multiple"
  collapsible?: boolean
  className?: string
}

// Usage
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>
```

---

**End of Architecture Document**

This comprehensive plan provides everything needed to systematically migrate LinkMe Tur from Material-UI to shadcn/ui while maintaining design fidelity, improving performance, and enhancing accessibility.
