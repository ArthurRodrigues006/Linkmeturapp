# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**LinkMe Tur** is a static landing page for a tourism platform connecting tourism companies with specialized service providers in Rio Grande do Sul, Brazil. Built with Next.js 15 App Router.

**Version**: 1.0.0
**Architecture**: Static Next.js landing page
**Language**: Portuguese (Brazil)

---

## Development Commands

### Essential Commands

```bash
# Install dependencies
npm install                # Install all project dependencies

# Development
npm run dev                # Start Next.js dev server at http://localhost:3000

# Production build
npm run build              # Build for production
npm run start              # Start production server

# Code quality
npm run lint               # Run ESLint
npm run lint:fix           # Auto-fix ESLint issues

```

### Working Directory Context

The project uses a **simplified structure** with all Next.js files in the root directory:
- **Root**: `/linkme-tur-test/` - Contains all Next.js application files and configuration

All development commands run directly from the root directory.

---

## Architecture

### Technology Stack

- **Next.js 15**: App Router with Server Components
- **React 19**: Latest React features
- **TypeScript 5.9**: Type safety (strict mode: false)
- **Tailwind CSS 3.4**: Utility-first styling
- **Material-UI 7**: Component library (@mui/material, @emotion)

### Project Structure

```
linkme-tur-test/
├── app/
│   ├── page.tsx           # Homepage (~572 lines)
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles
├── public/                # Static assets
│   ├── hero.jpg           # Hero section background
│   ├── evento-foto.jpg    # Event photo
│   └── *.png              # Section icons
├── package.json           # Next.js dependencies
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind configuration
└── tsconfig.json          # TypeScript config

Landing Page Sections (in page.tsx):
1. Hero - Main banner with CTA
2. O que é - Platform presentation
3. Para quem - Target audience (companies & providers)
4. Vantagens - Benefits
5. Turismo Talks - Launch event
6. Perguntas Frequentes - FAQ
7. Contato - Contact & social media
```

### File-System Routing (Next.js App Router)

- `app/page.tsx` → `/` (homepage)
- `app/layout.tsx` → Root layout applied to all pages
- All routing uses Next.js 15 App Router conventions

### TypeScript Configuration

**Path Alias**: `@/*` maps to project root
```typescript
// Usage example
import Component from '@/components/MyComponent'
```

**Strict Mode**: Disabled (`"strict": false`)
- Type annotations are optional but recommended
- Focus on functionality over strict typing

---

## Styling Conventions

### Tailwind CSS

Primary styling approach using utility classes directly in JSX:

```tsx
<div className="max-w-6xl mx-auto px-8 py-6">
  <h1 className="text-3xl md:text-5xl font-bold">Title</h1>
</div>
```

**Responsive breakpoints**:
- `sm:` - Small devices (640px+)
- `md:` - Medium devices (768px+)
- `lg:` - Large devices (1024px+)
- `xl:` - Extra large devices (1280px+)

### Material-UI Integration

Used for interactive components (buttons, modals, forms):

```tsx
import { Button } from "@mui/material";

<Button
  component="a"
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  variant="contained"
  size="large"
  sx={{
    backgroundColor: "#2BE58F",
    color: "black",
    "&:hover": { backgroundColor: "#27CC7A" },
    px: 6,
    py: 1.5,
    borderRadius: "9999px",
    textTransform: "none",
  }}
>
  Click me
</Button>
```

**Important**: When using `href` with MUI Button, always include `component="a"` to render as an anchor tag.

**Brand Colors**:
- Primary CTA: `#2BE58F` (bright green)
- Hover state: `#27CC7A` (darker green)

### Custom Styles

Only add to `app/globals.css` when Tailwind utilities are insufficient.

---

## Content Guidelines

### Language & Localization

- **Primary language**: Portuguese (Brazil)
- **Locale**: `pt-BR`
- All user-facing content should be in Portuguese
- Maintain Brazilian Portuguese grammar and expressions

### WhatsApp Integration

The landing page uses WhatsApp as the primary call-to-action:

```tsx
href="https://wa.me/555599623685?text=Quero%20fazer%20parte%20da%20LinkMe%20Tur"
```

Phone number: +55 55 9962-3685

---

## Image Optimization

### Next.js Image Component

Always use `next/image` for image optimization:

```tsx
import Image from "next/image";

// Hero background
<Image
  src="/hero.jpg"
  alt="Banner Hero"
  fill
  className="object-cover"
  priority
/>

// Fixed dimensions
<Image
  src="/logo.png"
  alt="Logo"
  width={160}
  height={45}
  priority
/>
```

**Key attributes**:
- `priority`: For above-the-fold images (hero)
- `fill`: For responsive backgrounds
- `alt`: Always provide descriptive alt text

---

## Deployment

### Recommended Platform: Vercel

Optimized for Next.js deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect GitHub repository to Vercel for automatic deployments.

### Alternative Platforms

- **Netlify**: Static export with `next export`
- **AWS Amplify**: Full Next.js support
- **VPS**: Node.js server required

---

## Development Workflow

### Initial Setup

```bash
# 1. Clone repository
git clone <repository-url>
cd linkme-tur-test

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# Access at http://localhost:3000
```

### Making Changes

1. **Component updates**: Edit `app/page.tsx`
2. **Styling changes**: Use Tailwind utilities first, then MUI `sx` prop
3. **Images**: Place in `public/` directory
4. **Metadata**: Update in `app/layout.tsx`

### Before Committing

```bash
npm run lint              # Check for linting errors
npm run build             # Verify production build works
```

---

## Common Patterns

### Section Structure

Each section in `page.tsx` follows this pattern:

```tsx
<section id="section-name" className="py-20 px-8 bg-white">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-12">
      Section Title
    </h2>
    {/* Section content */}
  </div>
</section>
```

### Navigation Links

Internal navigation uses anchor links:

```tsx
<a
  href="#section-name"
  className="hover:text-black transition"
>
  Section Name
</a>
```

### Call-to-Action Buttons

Consistent CTA styling across the page:

```tsx
<Button
  component="a"
  href="https://wa.me/555599623685?text=Message"
  target="_blank"
  rel="noopener noreferrer"
  variant="contained"
  size="large"
  sx={{
    backgroundColor: CTA_BG,    // #2BE58F
    color: "black",
    "&:hover": { backgroundColor: CTA_HOVER },  // #27CC7A
    px: 8,
    py: 2,
    borderRadius: "9999px",
    textTransform: "none",
  }}
>
  CTA Text
</Button>
```

---

## Notes for AI Assistants

### Project Context

This is a **tourism platform landing page** for Rio Grande do Sul, Brazil, connecting:
- **Tourism Companies** (hotels, agencies, restaurants) - seeking service providers
- **Service Providers** (marketing, tech, consulting) - offering specialized services

### Code Style Preferences

- **Language**: Portuguese for user-facing content, English for code comments
- **Naming**: camelCase for variables/functions, PascalCase for components
- **TypeScript**: Type annotations encouraged but not strict
- **Formatting**: Follow existing Prettier/ESLint conventions

### When Making Changes

1. **Maintain brand consistency**: Use brand colors (#2BE58F, #27CC7A)
2. **Responsive design**: Always test mobile, tablet, desktop breakpoints
3. **Image optimization**: Use Next.js Image component exclusively
4. **WhatsApp integration**: Primary CTA links to WhatsApp with pre-filled message
5. **Portuguese content**: All user-facing text in Brazilian Portuguese

---

**Last Updated**: November 2025
**Maintained By**: LinkMe Tur Development Team
