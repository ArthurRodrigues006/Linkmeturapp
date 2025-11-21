# Quick Implementation Guide - Fleet Landing to Tourism Platform

## Installation Commands

### Step 1: Install shadcn/ui Core Components
```bash
# Navigate to project root
cd /Users/paulosouza/Development/linkme-tur-test

# Install required shadcn/ui components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add accordion

# Install icon library
npm install lucide-react
```

### Step 2: Optional Components (for enhanced features)
```bash
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add tooltip
```

---

## Component Usage Examples

### 1. Navigation Header
```tsx
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <Image src="/logo.png" alt="LinkMe Tur" width={160} height={45} priority />

        <nav className="hidden md:flex gap-8">
          <Link href="#features" className="text-gray-600 hover:text-gray-900">
            Funcionalidades
          </Link>
          <Link href="#about" className="text-gray-600 hover:text-gray-900">
            Sobre
          </Link>
          <Link href="#help" className="text-gray-600 hover:text-gray-900">
            Ajuda
          </Link>
        </nav>

        <Button className="bg-gray-900 hover:bg-gray-800">
          Fale com Vendas
        </Button>
      </div>
    </header>
  )
}
```

### 2. Hero Section
```tsx
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Conecte seu negócio turístico com os melhores fornecedores.
          </h1>
          <p className="text-lg text-gray-600">
            Busca especializada, conexão direta e gestão simplificada
            em uma plataforma poderosa.
          </p>
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden">
          <Image
            src="/hero-tourism.jpg"
            alt="Tourism business connection"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}
```

### 3. Stats Cards
```tsx
import { Card } from "@/components/ui/card"

const stats = [
  { label: "Eficiência", value: "20%", description: "Mais eficiência operacional" },
  { label: "Economia", value: "50%", description: "Economia em serviços" },
  { label: "Reservas", value: "30%", description: "Aumento em reservas" },
]

export function StatsSection() {
  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Útil para seu negócio.</h2>
          <p className="text-gray-600">
            Nossas tecnologias aumentam produtividade e reduzem custos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-8 rounded-xl border border-gray-200">
              <span className="text-xs uppercase text-gray-500">{stat.label}</span>
              <h3 className="text-5xl font-bold my-4">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 4. Features List with Icons
```tsx
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const features = [
  {
    title: "Busca especializada",
    description: "Encontre fornecedores qualificados para o setor turístico com filtros avançados"
  },
  {
    title: "Conexão direta",
    description: "Comunique-se diretamente com prestadores de serviço sem intermediários"
  },
  {
    title: "Gestão simplificada",
    description: "Gerencie todos seus fornecedores em um único lugar"
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Badge className="bg-gray-900 text-white mb-4">
            TUDO QUE VOCÊ PRECISA
          </Badge>

          <h2 className="text-4xl font-bold mb-8">
            Nossas soluções de gestão turística incluem
          </h2>

          <ul className="space-y-4">
            {features.map((feature) => (
              <li key={feature.title} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-square rounded-2xl overflow-hidden">
          <Image
            src="/features-dashboard.jpg"
            alt="Platform features"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}
```

### 5. Testimonial with Avatar
```tsx
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function TestimonialSection() {
  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Resultados que falam por si.
          </h2>
          <p className="text-gray-600">
            Histórias de sucesso de clientes satisfeitos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Card className="p-8 rounded-xl border border-gray-200">
            <blockquote className="text-xl font-medium leading-relaxed mb-6">
              "Com a LinkMe Tur, nossa equipe alcançou um nível totalmente
              novo de eficiência. Em apenas 6 meses, aumentamos nossas
              reservas em 30%."
            </blockquote>

            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/testimonial-avatar.jpg" />
                <AvatarFallback>JA</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-semibold">João Armando</p>
                <p className="text-sm text-gray-600">Gerente, Hotel Costa Verde</p>
              </div>

              <Badge variant="outline" className="ml-auto">
                Hotel Costa Verde
              </Badge>
            </div>
          </Card>

          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <Image
              src="/growth-chart.png"
              alt="Growth chart"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
```

### 6. News/Blog Cards
```tsx
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const articles = [
  {
    image: "/article-1.jpg",
    title: "Integração de IA na gestão turística",
    description: "Nossa solução inovadora de IA está transformando...",
    date: "16 Set"
  },
  {
    image: "/article-2.jpg",
    title: "Maximizando eficiência operacional",
    description: "Descubra como nossos clientes estão reduzindo custos...",
    date: "16 Set"
  },
  {
    image: "/article-3.jpg",
    title: "Futuro das oportunidades turísticas",
    description: "Explorando tendências emergentes no setor...",
    date: "16 Set"
  },
]

export function NewsSection() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Novidades e atualizações.</h2>
          <p className="text-gray-600">
            Fique por dentro dos últimos desenvolvimentos e novidades do turismo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {articles.map((article) => (
            <Card key={article.title} className="overflow-hidden rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {article.description}
                </p>
                <span className="text-xs text-gray-500">{article.date}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="default">Carregar mais</Button>
          <Button variant="ghost">Pular</Button>
        </div>
      </div>
    </section>
  )
}
```

### 7. FAQ Accordion
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Com que rapidez posso começar a usar suas soluções?",
    answer: "Você pode começar imediatamente após o cadastro. Nossa equipe oferece suporte completo durante a integração."
  },
  {
    question: "Quais tipos de empresas são compatíveis com a plataforma?",
    answer: "Trabalhamos com hotéis, agências de turismo, restaurantes, operadoras e todos os tipos de negócios turísticos."
  },
  {
    question: "Os meus sistemas atuais são compatíveis?",
    answer: "Sim, nossa plataforma se integra com os principais sistemas de gestão e reservas do mercado."
  },
  {
    question: "Como vocês garantem o suporte técnico?",
    answer: "Oferecemos suporte 24/7 via chat, email e telefone para todos os nossos clientes."
  },
  {
    question: "Onde posso encontrar seus parceiros?",
    answer: "Nossa rede abrange todo o Rio Grande do Sul, com expansão planejada para outros estados."
  },
]

export function FAQSection() {
  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl font-bold mb-4">
            Perguntas Frequentes.
          </h2>
          <p className="text-gray-600 text-lg">
            Tudo o que você precisa saber sobre a LinkMe Tur.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
```

### 8. CTA Footer with Email Input
```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CTAFooter() {
  return (
    <section className="bg-gray-900 text-white py-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 max-w-3xl mx-auto">
          Aumente a eficiência, reduza custos e melhore a segurança
          com a LinkMe Tur hoje mesmo.
        </h2>

        <form className="flex gap-4 max-w-md mx-auto mb-4">
          <Input
            type="email"
            placeholder="seuemail@exemplo.com"
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            required
          />
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-black font-semibold"
          >
            Inscrever-se
          </Button>
        </form>

        <p className="text-xs text-white/60">
          Digite seu email para começar sua jornada com a LinkMe Tur.
        </p>
      </div>
    </section>
  )
}
```

### 9. Footer Navigation
```tsx
import Image from "next/image"
import Link from "next/link"

const footerLinks = {
  resources: {
    title: "Recursos",
    links: [
      { label: "Integrações", href: "#integrations" },
      { label: "Ajuda", href: "#help" },
      { label: "Status", href: "#status" },
    ]
  },
  about: {
    title: "Sobre nós",
    links: [
      { label: "Carreiras", href: "#careers" },
      { label: "Contato", href: "#contact" },
    ]
  },
  customers: {
    title: "Clientes",
    links: [
      { label: "Sobre", href: "#about" },
      { label: "Press kit", href: "#press" },
    ]
  },
  legal: {
    title: "Termos e privacidade",
    links: [
      { label: "Política de privacidade", href: "#privacy" },
      { label: "Termos de serviço", href: "#terms" },
      { label: "Política de cookies", href: "#cookies" },
    ]
  },
}

export function Footer() {
  return (
    <footer className="bg-gray-50 py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Image src="/logo.png" alt="LinkMe Tur" width={160} height={45} className="mb-4" />
            <p className="text-sm text-gray-600">© LinkMe Tur 2025</p>
          </div>

          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            © 2025 LinkMe Tur. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

---

## Complete Page Assembly

### app/page.tsx
```tsx
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { IntegrationSection } from "@/components/integration-section"
import { NewsSection } from "@/components/news-section"
import { FAQSection } from "@/components/faq-section"
import { CTAFooter } from "@/components/cta-footer"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <TestimonialSection />
        <IntegrationSection />
        <NewsSection />
        <FAQSection />
        <CTAFooter />
      </main>
      <Footer />
    </>
  )
}
```

---

## Tailwind Configuration

### tailwind.config.js
```js
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

### app/globals.css
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
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
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
    --ring: 222.2 84% 4.9%;
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

---

## Next Steps

1. **Run installation commands** to add shadcn/ui components
2. **Copy component examples** into your `/components` directory
3. **Create new images** for tourism theme in `/public` directory
4. **Update content** to match LinkMe Tur brand and messaging
5. **Test responsive behavior** at all breakpoints
6. **Validate accessibility** with keyboard and screen readers
7. **Optimize images** using Next.js Image component
8. **Deploy to Vercel** for production hosting

---

## File Structure
```
linkme-tur-test/
├── app/
│   ├── page.tsx                    # Main landing page
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles with CSS variables
├── components/
│   ├── ui/                         # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   └── accordion.tsx
│   ├── header.tsx                  # Navigation header
│   ├── hero-section.tsx            # Hero section
│   ├── stats-section.tsx           # Stats cards
│   ├── features-section.tsx        # Features list
│   ├── testimonial-section.tsx     # Testimonial
│   ├── integration-section.tsx     # Integration features
│   ├── news-section.tsx            # News cards
│   ├── faq-section.tsx             # FAQ accordion
│   ├── cta-footer.tsx              # CTA footer
│   └── footer.tsx                  # Footer navigation
├── public/
│   ├── logo.png
│   ├── hero-tourism.jpg
│   ├── features-dashboard.jpg
│   ├── testimonial-avatar.jpg
│   ├── growth-chart.png
│   ├── integration-photo.jpg
│   ├── article-1.jpg
│   ├── article-2.jpg
│   └── article-3.jpg
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

This guide provides ready-to-use code examples for every section of the landing page!
