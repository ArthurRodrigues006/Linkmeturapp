# LinkMe Tur: shadcn/ui Migration Implementation Roadmap

## Quick Reference Guide

**Estimated Timeline:** 10 days
**Team Size:** 1-2 developers
**Risk Level:** Low (incremental migration with rollback points)

---

## Day-by-Day Implementation Plan

### Day 1: Environment Setup

**Morning (4 hours):**

1. **Backup Current State**
   ```bash
   cd /Users/paulosouza/Development/linkme-tur-test
   git checkout -b feature/shadcn-migration
   git tag pre-migration
   cp app/page.tsx app/page.backup.tsx
   ```

2. **Install shadcn/ui**
   ```bash
   npx shadcn-ui@latest init
   ```

   Configuration prompts:
   ```
   ✔ Would you like to use TypeScript (recommended)? yes
   ✔ Which style would you like to use? › Default
   ✔ Which color would you like to use as base color? › Neutral
   ✔ Where is your global CSS file? › app/globals.css
   ✔ Would you like to use CSS variables for colors? › yes
   ✔ Are you using a custom tailwind prefix? › no
   ✔ Where is your tailwind.config.js located? › tailwind.config.js
   ✔ Configure the import alias for components? › @/components
   ✔ Configure the import alias for utils? › @/lib/utils
   ✔ Are you using React Server Components? › yes
   ```

3. **Install Core Dependencies**
   ```bash
   npm install lucide-react class-variance-authority clsx tailwind-merge
   npm install tailwindcss-animate
   ```

4. **Install shadcn/ui Components**
   ```bash
   npx shadcn-ui@latest add button
   npx shadcn-ui@latest add card
   npx shadcn-ui@latest add badge
   npx shadcn-ui@latest add accordion
   ```

**Afternoon (4 hours):**

5. **Update `tailwind.config.js`**
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
           secondary: {
             DEFAULT: "hsl(var(--secondary))",
             foreground: "hsl(var(--secondary-foreground))",
           },
           destructive: {
             DEFAULT: "hsl(var(--destructive))",
             foreground: "hsl(var(--destructive-foreground))",
           },
           muted: {
             DEFAULT: "hsl(var(--muted))",
             foreground: "hsl(var(--muted-foreground))",
           },
           accent: {
             DEFAULT: "hsl(var(--accent))",
             foreground: "hsl(var(--accent-foreground))",
           },
           popover: {
             DEFAULT: "hsl(var(--popover))",
             foreground: "hsl(var(--popover-foreground))",
           },
           card: {
             DEFAULT: "hsl(var(--card))",
             foreground: "hsl(var(--card-foreground))",
           },
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

6. **Update `app/globals.css`**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   @layer base {
     :root {
       --background: 0 0% 100%;
       --foreground: 222.2 84% 4.9%;

       --card: 0 0% 100%;
       --card-foreground: 222.2 84% 4.9%;

       --popover: 0 0% 100%;
       --popover-foreground: 222.2 84% 4.9%;

       --primary: 158 79% 51%;        /* #2BE58F - LinkMe Green */
       --primary-foreground: 0 0% 0%; /* Black */

       --secondary: 210 40% 96.1%;
       --secondary-foreground: 222.2 47.4% 11.2%;

       --muted: 210 40% 96.1%;
       --muted-foreground: 215.4 16.3% 46.9%;

       --accent: 210 40% 96.1%;
       --accent-foreground: 222.2 47.4% 11.2%;

       --destructive: 0 84.2% 60.2%;
       --destructive-foreground: 210 40% 98%;

       --border: 214.3 31.8% 91.4%;
       --input: 214.3 31.8% 91.4%;
       --ring: 158 79% 51%; /* LinkMe Green focus ring */

       --radius: 0.5rem;
     }

     .dark {
       --background: 222.2 84% 4.9%;
       --foreground: 210 40% 98%;

       --card: 222.2 84% 4.9%;
       --card-foreground: 210 40% 98%;

       --popover: 222.2 84% 4.9%;
       --popover-foreground: 210 40% 98%;

       --primary: 210 40% 98%;
       --primary-foreground: 222.2 47.4% 11.2%;

       --secondary: 217.2 32.6% 17.5%;
       --secondary-foreground: 210 40% 98%;

       --muted: 217.2 32.6% 17.5%;
       --muted-foreground: 215 20.2% 65.1%;

       --accent: 217.2 32.6% 17.5%;
       --accent-foreground: 210 40% 98%;

       --destructive: 0 62.8% 30.6%;
       --destructive-foreground: 210 40% 98%;

       --border: 217.2 32.6% 17.5%;
       --input: 217.2 32.6% 17.5%;
       --ring: 212.7 26.8% 83.9%;
     }
   }

   @layer base {
     * {
       @apply border-border;
     }
     body {
       @apply bg-background text-foreground;
     }
   }
   ```

7. **Create Folder Structure**
   ```bash
   mkdir -p components/layout
   mkdir -p components/sections
   mkdir -p components/shared
   mkdir -p lib
   ```

8. **Test Build**
   ```bash
   npm run dev
   # Open http://localhost:3000
   # Verify no errors in console

   npm run build
   # Verify build succeeds
   ```

**End of Day 1 Checkpoint:**
```bash
git add .
git commit -m "feat: Setup shadcn/ui foundation with Tailwind config and CSS variables"
git tag day-1-complete
```

---

### Day 2: Shared Components

**Morning (4 hours):**

1. **Create `lib/utils.ts`**
   ```typescript
   import { type ClassValue, clsx } from "clsx"
   import { twMerge } from "tailwind-merge"

   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs))
   }
   ```

2. **Create `components/shared/container.tsx`**
   ```typescript
   import { cn } from "@/lib/utils"

   interface ContainerProps {
     children: React.ReactNode
     className?: string
     maxWidth?: "4xl" | "5xl" | "6xl" | "7xl"
   }

   const maxWidthClasses = {
     "4xl": "max-w-4xl",
     "5xl": "max-w-5xl",
     "6xl": "max-w-6xl",
     "7xl": "max-w-7xl",
   }

   export function Container({
     children,
     className,
     maxWidth = "6xl",
   }: ContainerProps) {
     return (
       <div className={cn(maxWidthClasses[maxWidth], "mx-auto px-8", className)}>
         {children}
       </div>
     )
   }
   ```

3. **Create `components/shared/section-header.tsx`**
   ```typescript
   import { cn } from "@/lib/utils"

   interface SectionHeaderProps {
     title: string | React.ReactNode
     subtitle?: string
     className?: string
   }

   export function SectionHeader({
     title,
     subtitle,
     className,
   }: SectionHeaderProps) {
     return (
       <div className={cn("text-center mb-8", className)}>
         <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
           {title}
         </h2>
         <div className="h-1 w-24 bg-primary mx-auto rounded" />
         {subtitle && (
           <p className="mt-6 max-w-3xl mx-auto text-gray-700">{subtitle}</p>
         )}
       </div>
     )
   }
   ```

4. **Create `components/shared/benefit-card.tsx`**
   ```typescript
   import { Card } from "@/components/ui/card"
   import { cn } from "@/lib/utils"

   interface BenefitCardProps {
     icon: React.ReactNode
     title: string
     className?: string
   }

   export function BenefitCard({ icon, title, className }: BenefitCardProps) {
     return (
       <Card
         className={cn(
           "bg-white rounded-xl p-4 shadow-lg text-center w-full h-72 flex flex-col",
           className
         )}
       >
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
   ```

**Afternoon (4 hours):**

5. **Create `components/shared/feature-card.tsx`**
   ```typescript
   import Image from "next/image"
   import { Card } from "@/components/ui/card"
   import { cn } from "@/lib/utils"

   interface FeatureCardProps {
     icon: string
     title: string
     description: string
     className?: string
   }

   export function FeatureCard({
     icon,
     title,
     description,
     className,
   }: FeatureCardProps) {
     return (
       <Card
         className={cn(
           "p-6 bg-gray-50 rounded-2xl shadow text-center",
           className
         )}
       >
         <Image
           src={icon}
           alt={title}
           width={70}
           height={70}
           className="mx-auto mb-4"
         />
         <h4 className="font-semibold mb-2 text-black">{title}</h4>
         <p className="text-gray-600">{description}</p>
       </Card>
     )
   }
   ```

6. **Test Shared Components**

   Create `app/test-components/page.tsx`:
   ```typescript
   import { Container } from "@/components/shared/container"
   import { SectionHeader } from "@/components/shared/section-header"
   import { BenefitCard } from "@/components/shared/benefit-card"
   import { FeatureCard } from "@/components/shared/feature-card"
   import { Lock } from "lucide-react"

   export default function TestComponents() {
     return (
       <main className="py-16">
         <Container>
           <SectionHeader
             title="Test Section"
             subtitle="Testing shared components"
           />

           <div className="grid md:grid-cols-3 gap-6 mt-8">
             <BenefitCard
               icon={<Lock className="w-6 h-6 text-primary" />}
               title="Test benefit card"
             />

             <FeatureCard
               icon="/141.svg"
               title="Test Feature"
               description="This is a test feature card"
             />
           </div>
         </Container>
       </main>
     )
   }
   ```

   Test at http://localhost:3000/test-components

**End of Day 2 Checkpoint:**
```bash
git add .
git commit -m "feat: Create shared components (Container, SectionHeader, BenefitCard, FeatureCard)"
git tag day-2-complete
```

---

### Day 3-4: Layout Components

**Day 3 Morning:**

1. **Create `components/layout/header.tsx`**
   ```typescript
   import { Button } from "@/components/ui/button"
   import Link from "next/link"
   import { cn } from "@/lib/utils"

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
       <header
         className={cn(
           "fixed inset-x-0 top-0 z-50 bg-white shadow",
           className
         )}
       >
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
   ```

**Day 3 Afternoon:**

2. **Create `components/layout/footer.tsx`**
   ```typescript
   import { cn } from "@/lib/utils"

   interface FooterProps {
     className?: string
   }

   export function Footer({ className }: FooterProps) {
     return (
       <footer
         id="contato"
         className={cn("py-8 bg-gray-900 px-8", className)}
       >
         <div className="max-w-6xl mx-auto flex items-center justify-between">
           {/* Brand */}
           <div className="text-white font-bold text-xl">
             LinkMe<span className="text-primary">Tur</span>
           </div>

           {/* Social Links */}
           <div className="flex space-x-4">
             {/* Instagram */}
             <a
               href="https://www.instagram.com/linkmetur/"
               target="_blank"
               rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors"
               aria-label="Instagram"
             >
               <svg
                 className="w-6 h-6 fill-current"
                 viewBox="0 0 24 24"
                 aria-hidden="true"
               >
                 <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.2a.8.8 0 1 1-.8.8.8.8 0 0 1 .8-.8z" />
               </svg>
             </a>

             {/* LinkedIn */}
             <a
               href="https://www.linkedin.com/company/linkmetur/"
               target="_blank"
               rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors"
               aria-label="LinkedIn"
             >
               <svg
                 className="w-6 h-6 fill-current"
                 viewBox="0 0 24 24"
                 aria-hidden="true"
               >
                 <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM14.5 9c-2.04 0-3.5 1.21-3.5 3.4V21h-4V9h4v1.7C11.6 9.64 12.86 9 14.5 9c2.6 0 4.5 1.73 4.5 5.2V21h-4v-6.2c0-1.55-.6-2.3-1.9-2.3z" />
               </svg>
             </a>

             {/* WhatsApp */}
             <a
               href="https://wa.me/555599623685"
               target="_blank"
               rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors"
               aria-label="WhatsApp"
             >
               <svg
                 className="w-6 h-6 fill-current"
                 viewBox="0 0 24 24"
                 aria-hidden="true"
               >
                 <path d="M20.5 3.5A11 11 0 0 0 2.7 18.7L2 22l3.4-.7A11 11 0 1 0 20.5 3.5zM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-2.4.5.5-2.3-.2-.3A8 8 0 1 1 12 20zm4.4-5.7c-.2-.1-1.3-.7-1.5-.8s-.4-.1-.6.1-.7.8-.9 1c-.2.2-.3.2-.6.1s-1.1-.4-2.1-1.3c-.8-.7-1.3-1.6-1.5-1.8-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5a2 2 0 0 0 .3-.5.6.6 0 0 0 0-.6c0-.1-.6-1.5-.8-2s-.4-.4-.6-.4h-.5c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 3 1.2 3.4 1.3 3.6s2.4 3.7 5.8 5 3.5 1 4.1 1 .9-.2 1.1-.6a4.6 4.6 0 0 0 .3-1.3c0-.6 0-1.1-.1-1.2s-.2-.2-.4-.3z" />
               </svg>
             </a>
           </div>
         </div>
       </footer>
     )
   }
   ```

**Day 4:**

3. **Test Layout Components**

   Update `app/test-components/page.tsx`:
   ```typescript
   import { Header } from "@/components/layout/header"
   import { Footer } from "@/components/layout/footer"
   import { Container } from "@/components/shared/container"

   export default function TestComponents() {
     return (
       <>
         <Header />
         <main className="pt-24 min-h-screen">
           <Container>
             <h1 className="text-4xl font-bold mb-8">Testing Layout</h1>
             <p className="mb-4">
               Scroll down to test sticky header and footer links.
             </p>
             <div className="h-screen bg-gray-100 flex items-center justify-center">
               <p>Scroll content</p>
             </div>
           </Container>
         </main>
         <Footer />
       </>
     )
   }
   ```

   Test:
   - Scroll to verify sticky header
   - Click nav links to test anchors
   - Click WhatsApp button (should open WhatsApp)
   - Click social links in footer

**End of Day 3-4 Checkpoint:**
```bash
git add .
git commit -m "feat: Create layout components (Header, Footer) with navigation and social links"
git tag day-4-complete
```

---

### Day 5-8: Section Components

**Day 5: Hero + What Is**

1. **Create `components/sections/hero-section.tsx`**
   ```typescript
   import Image from "next/image"
   import { Button } from "@/components/ui/button"

   export function HeroSection() {
     return (
       <section
         id="hero"
         className="relative h-screen w-full pt-24 bg-gradient-to-r from-blue-600 to-green-600"
       >
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
               Transformamos a forma como as empresas fazem negócios com o
               turismo
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
   ```

2. **Create `components/sections/what-is-section.tsx`**
   ```typescript
   import { Container } from "@/components/shared/container"
   import { SectionHeader } from "@/components/shared/section-header"
   import { FeatureCard } from "@/components/shared/feature-card"

   export function WhatIsSection() {
     const features = [
       {
         icon: "/141.svg",
         title: "Empresas do Trade Turístico",
         description:
           "Encontre prestadores de serviços confiáveis com agilidade, reduza custos e modernize seu negócio com soluções sob medida.",
       },
       {
         icon: "/142.svg",
         title: "Prestadores de Serviços",
         description:
           "Ganhe visibilidade, acesse clientes qualificados do turismo e aumente suas oportunidades de negócio com menos esforço.",
       },
       {
         icon: "/143.svg",
         title: "Para o Mercado e os Turistas",
         description:
           "Fortalecemos os bastidores do turismo para que os destinos ofereçam experiências mais autênticas, sustentáveis e encantadoras.",
       },
     ]

     return (
       <section id="o-que-é" className="py-16 bg-white px-8">
         <Container>
           <SectionHeader
             title={
               <>
                 Conecte-se com quem
                 <br />
                 realmente importa
               </>
             }
           />

           <div className="max-w-3xl mx-auto space-y-4 text-gray-700 mb-8">
             <p>
               Não somos apenas uma plataforma, somos um ecossistema, que
               conecta empresas de turismo a prestadores de serviços
               especializados e qualificados.
             </p>
             <p>
               Unimos quem vive o turismo na prática com quem tem as soluções
               certas para impulsionar esse setor: profissionais de marketing,
               tecnologia, jurídico, contabilidade, sustentabilidade, inovação e
               muito mais.
             </p>
             <p>
               Valorizamos os prestadores de serviço como peças-chave da
               engrenagem do turismo. Eles não são apenas fornecedores, são
               parceiros estratégicos para o desenvolvimento dos destinos. E nós
               acreditamos que fortalecer os bastidores do turismo é essencial
               para que os destinos brilhem.
             </p>
           </div>

           <h3 className="text-2xl font-bold mb-8 text-black text-center">
             Na LinkMe Tur você encontra os parceiros certos, de forma rápida,
             simples e eficiente
           </h3>

           <div className="grid md:grid-cols-3 gap-8">
             {features.map((feature) => (
               <FeatureCard key={feature.title} {...feature} />
             ))}
           </div>
         </Container>
       </section>
     )
   }
   ```

**Day 6: Target Audience + Benefits**

3. **Create `components/sections/target-audience-section.tsx`**
   (Full code in separate file)

4. **Create `components/sections/benefits-section.tsx`**
   (Full code in separate file)

**Day 7: Strong Tourism + Event**

5. **Create `components/sections/strong-tourism-section.tsx`**
6. **Create `components/sections/event-section.tsx`**

**Day 8: FAQ Section**

7. **Create `components/sections/faq-section.tsx`**
   ```typescript
   import {
     Accordion,
     AccordionContent,
     AccordionItem,
     AccordionTrigger,
   } from "@/components/ui/accordion"
   import { Container } from "@/components/shared/container"

   const faqData = {
     platform: [
       {
         question: "O que é a LinkMe Tur?",
         answer:
           "Somos uma plataforma digital inteligente que conecta empresas de turismo a prestadores de serviços qualificados, promovendo eficiência, agilidade e segurança na contratação...",
       },
       // ... more questions
     ],
     forYou: [
       {
         question: "A LinkMe Tur é pra mim?",
         answer:
           "Se você possui uma agência de viagens, hotel, pousada, atrativo turístico...",
       },
       // ... more questions
     ],
     benefits: [
       {
         question: "Como a LinkMe Tur ajuda a reduzir custos?",
         answer:
           "Oferecemos uma experiência simples e eficiente, com curadoria de profissionais...",
       },
       // ... more questions
     ],
   }

   export function FAQSection() {
     return (
       <section
         id="perguntas-frequentes"
         className="py-16 bg-gray-800 text-white px-8"
       >
         <Container>
           <h2 className="text-3xl font-bold text-center mb-8">
             Perguntas Frequentes
           </h2>

           <div className="grid md:grid-cols-3 gap-8">
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
         </Container>
       </section>
     )
   }
   ```

**End of Day 5-8 Checkpoint:**
```bash
git add .
git commit -m "feat: Create all section components (Hero, WhatIs, TargetAudience, Benefits, Event, FAQ)"
git tag day-8-complete
```

---

### Day 9: Page Assembly

1. **Update `app/page.tsx` to use new components**
   ```typescript
   import { Header } from "@/components/layout/header"
   import { Footer } from "@/components/layout/footer"
   import { HeroSection } from "@/components/sections/hero-section"
   import { WhatIsSection } from "@/components/sections/what-is-section"
   import { TargetAudienceSection } from "@/components/sections/target-audience-section"
   import { BenefitsSection } from "@/components/sections/benefits-section"
   import { StrongTourismSection } from "@/components/sections/strong-tourism-section"
   import { EventSection } from "@/components/sections/event-section"
   import { FAQSection } from "@/components/sections/faq-section"

   export default function Landing() {
     return (
       <>
         <Header />
         <main className="font-sans">
           <HeroSection />
           <WhatIsSection />
           <TargetAudienceSection />
           <BenefitsSection />
           <StrongTourismSection />
           <EventSection />
           <FAQSection />
         </main>
         <Footer />
       </>
     )
   }
   ```

2. **Delete `app/page.backup.tsx`** (if all tests pass)

3. **Remove Material-UI dependencies**
   ```bash
   npm uninstall @mui/material @emotion/react @emotion/styled
   ```

4. **Update `package.json` scripts** (if needed)

**End of Day 9 Checkpoint:**
```bash
git add .
git commit -m "feat: Assemble complete landing page with all shadcn/ui components"
git tag day-9-complete
```

---

### Day 10: Polish & Testing

**Morning:**

1. **Accessibility Testing**
   ```bash
   # Install axe DevTools Chrome extension
   # Open http://localhost:3000
   # Run Axe accessibility audit
   # Fix any critical/serious issues
   ```

2. **Performance Audit**
   ```bash
   # Run Lighthouse
   npx lighthouse http://localhost:3000 --view

   # Target scores:
   # Performance: ≥90
   # Accessibility: ≥95
   # SEO: ≥100
   ```

3. **Cross-Browser Testing**
   - Test in Chrome (primary)
   - Test in Safari (macOS/iOS)
   - Test in Firefox
   - Test in Edge

**Afternoon:**

4. **Responsive Testing**
   - Mobile: 375px (iPhone SE)
   - Mobile landscape: 667px
   - Tablet: 768px (iPad)
   - Desktop: 1440px (MacBook Pro)
   - Large desktop: 1920px

5. **Image Optimization**
   ```bash
   # Convert JPEG to WebP (if not already)
   # Use online tools or:
   brew install webp
   cwebp -q 85 public/hero.jpg -o public/hero.webp
   cwebp -q 85 public/evento-foto.jpg -o public/evento-foto.webp
   ```

   Update Image components:
   ```typescript
   <Image
     src="/hero.webp"
     alt="Banner Hero"
     fill
     className="object-cover"
     priority
     quality={85}
   />
   ```

6. **Final Code Review**
   - Remove console.log statements
   - Remove unused imports
   - Check for TypeScript errors: `npm run build`
   - Run linter: `npm run lint:fix`

**End of Day 10:**
```bash
git add .
git commit -m "chore: Final polish - accessibility, performance, cross-browser testing"
git tag migration-complete
```

---

## Post-Migration Tasks

1. **Bundle Size Comparison**
   ```bash
   # Install bundle analyzer
   npm install --save-dev @next/bundle-analyzer

   # Update next.config.js
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   })

   module.exports = withBundleAnalyzer({
     // existing config
   })

   # Analyze bundle
   ANALYZE=true npm run build
   ```

2. **Performance Benchmarking**
   ```bash
   # Before (MUI version) - from git tag pre-migration
   git checkout pre-migration
   npm run build
   npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-before.json

   # After (shadcn/ui version)
   git checkout migration-complete
   npm run build
   npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-after.json

   # Compare results
   ```

3. **Update Documentation**
   - Update README.md with new tech stack
   - Document component usage
   - Add migration notes for future reference

4. **Deploy to Staging**
   ```bash
   # Vercel deployment
   npx vercel

   # Or GitHub Pages, Netlify, etc.
   ```

5. **Final QA Review**
   - [ ] All sections render correctly
   - [ ] Navigation links work
   - [ ] WhatsApp CTAs functional
   - [ ] FAQ accordion expands/collapses
   - [ ] Images load correctly
   - [ ] Social links work
   - [ ] Mobile menu functional (if implemented)
   - [ ] No console errors
   - [ ] Lighthouse scores meet targets

6. **Production Deployment**
   ```bash
   # Tag production release
   git tag v2.0.0-shadcn

   # Push to main
   git checkout main
   git merge feature/shadcn-migration
   git push origin main --tags

   # Deploy to production
   npx vercel --prod
   ```

---

## Rollback Plan

**If critical issues arise:**

1. **Immediate Rollback**
   ```bash
   git checkout main
   git reset --hard pre-migration
   git push origin main --force
   ```

2. **Partial Rollback (to specific phase)**
   ```bash
   # Rollback to Day 4 (layout components)
   git reset --hard day-4-complete
   ```

3. **Cherry-Pick Fixes**
   ```bash
   # If only one section has issues, cherry-pick working commits
   git cherry-pick <commit-hash>
   ```

---

## Troubleshooting

### Issue: shadcn/ui components not found

**Solution:**
```bash
# Verify components.json exists
cat components.json

# Re-install components
npx shadcn-ui@latest add button card badge accordion
```

### Issue: Tailwind classes not applying

**Solution:**
1. Check `tailwind.config.js` content paths include all files
2. Restart dev server: `npm run dev`
3. Clear Next.js cache: `rm -rf .next`

### Issue: Button styling different from MUI

**Solution:**
```typescript
// Customize Button variant in components/ui/button.tsx
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        linkme: "bg-primary hover:bg-primary/90 text-black font-semibold",
        // ... other variants
      },
    },
  }
)
```

### Issue: Accordion not animating smoothly

**Solution:**
```bash
# Ensure tailwindcss-animate is installed
npm install tailwindcss-animate

# Check tailwind.config.js includes plugin
plugins: [require("tailwindcss-animate")],
```

---

## Success Metrics

**Final Validation:**

- [ ] Bundle size reduced by ≥50%
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility ≥95
- [ ] Lighthouse SEO ≥100
- [ ] All sections visually identical to original
- [ ] No TypeScript errors
- [ ] No console errors/warnings
- [ ] Cross-browser compatible
- [ ] Mobile responsive
- [ ] WCAG 2.1 AA compliant

**Congratulations! Migration complete.**

---

**End of Implementation Roadmap**
