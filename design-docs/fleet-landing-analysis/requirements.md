# Fleet Management Landing Page - shadcn/ui Component Analysis

## Feature Name
Complete landing page implementation using shadcn/ui components, adapted from fleet management design for LinkMe Tur tourism platform.

---

## Executive Summary

This document provides a comprehensive breakdown of ALL UI components needed to rebuild the fleet management landing page design using shadcn/ui. The analysis covers 8 main sections with detailed component mapping, layout patterns, and implementation guidelines.

### Page Sections Overview
1. **Navigation Header** - Logo, menu links, CTA button
2. **Hero Section** - Large heading, subtext, full-width image
3. **Stats Cards** - Three metric cards with percentages
4. **Features List** - Bullet points with checkmarks and icons
5. **Testimonial Section** - Quote, author info, chart graphic
6. **Integration Section** - Feature list with checkmarks, side image
7. **News/Blog Cards** - Three article cards with images
8. **FAQ Section** - Accordion-style expandable questions
9. **CTA Footer** - Email input, submit button, dark background
10. **Footer Navigation** - Multi-column link layout

---

## Section 1: Navigation Header

### Components Required

#### Primary Components
- **Container** - Max-width wrapper (custom div)
- **Logo Image** - Brand identity (Next.js Image)
- **Navigation Menu** - Horizontal link list
- **Button** - CTA button (shadcn/ui)

#### Component Hierarchy
```
<header>
  └── <Container maxWidth="7xl">
      ├── <Logo />
      ├── <nav>
      │   ├── <Link>Features</Link>
      │   ├── <Link>About</Link>
      │   └── <Link>Help</Link>
      └── <Button variant="default">Contact Sales</Button>
```

#### Implementation Notes
- **Fixed/Sticky Header**: Use `position: sticky` with `top-0` and `z-50`
- **Background**: White with subtle bottom border
- **Logo**: SVG or PNG with height ~40px
- **Navigation Links**: Horizontal flexbox with hover states
- **CTA Button**: Dark background, rounded corners

#### shadcn/ui Components Needed
```bash
npx shadcn-ui@latest add button
```

#### Layout Specifications
- **Container**: `max-w-7xl mx-auto px-8`
- **Height**: `h-20` (80px)
- **Spacing**: `justify-between items-center`
- **Nav Gap**: `gap-8` between links

#### Design Tokens
```css
--nav-height: 80px;
--nav-bg: white;
--nav-border: #e5e7eb;
--link-color: #6b7280;
--link-hover: #111827;
--cta-bg: #111827;
--cta-hover: #1f2937;
```

---

## Section 2: Hero Section

### Components Required

#### Primary Components
- **Container** - Max-width wrapper
- **Typography** - Heading (h1) and subtext (p)
- **Image** - Hero truck image (Next.js Image)
- **Layout Grid** - Two-column layout

#### Component Hierarchy
```
<section id="hero">
  └── <Container>
      ├── <div className="text-content">
      │   ├── <h1>Control your fleet like never before.</h1>
      │   └── <p>Real-time tracking, advanced analytics...</p>
      └── <div className="image-wrapper">
          └── <Image src="/hero-truck.jpg" />
```

#### Implementation Notes
- **Two-Column Layout**: Text left, image right (desktop)
- **Responsive**: Stack vertically on mobile
- **Typography Scale**: Heading ~60px, subtext ~18px
- **Image Treatment**: Full-width with border radius
- **Vertical Spacing**: Large padding (py-20 or py-24)

#### shadcn/ui Components Needed
None - uses native HTML and Next.js Image

#### Layout Specifications
- **Container**: `max-w-7xl mx-auto px-8`
- **Grid**: `grid md:grid-cols-2 gap-12 items-center`
- **Heading**: `text-5xl md:text-6xl font-bold leading-tight`
- **Subtext**: `text-lg text-gray-600 mt-6`
- **Image**: `rounded-2xl overflow-hidden`

#### Design Tokens
```css
--hero-heading: 60px;
--hero-subtext: 18px;
--hero-gap: 48px;
--hero-padding: 96px 0;
--text-primary: #111827;
--text-secondary: #6b7280;
```

---

## Section 3: Stats Cards

### Components Required

#### Primary Components
- **Card** - Container for each metric (shadcn/ui)
- **Typography** - Percentage and description
- **Grid Layout** - Three-column responsive grid

#### Component Hierarchy
```
<section id="stats">
  └── <Container>
      ├── <h2>Useful for business.</h2>
      ├── <p>Our technologies enhance productivity...</p>
      └── <div className="grid">
          ├── <Card>
          │   ├── <span className="label">Time saved</span>
          │   ├── <h3>20%</h3>
          │   └── <p>Real-time tracking</p>
          ├── <Card>
          │   ├── <span>Costs</span>
          │   ├── <h3>50%</h3>
          │   └── <p>Fleet-wide analytics</p>
          └── <Card>
              ├── <span>Downtime reduction</span>
              ├── <h3>30%</h3>
              └── <p>Automated alerts</p>
```

#### Implementation Notes
- **Card Styling**: White background, subtle border, rounded corners
- **Percentage Size**: Very large (~48px-60px)
- **Label Position**: Top-left, small uppercase text
- **Description**: Below percentage, gray text
- **Hover State**: Subtle shadow increase

#### shadcn/ui Components Needed
```bash
npx shadcn-ui@latest add card
```

#### Layout Specifications
- **Grid**: `grid md:grid-cols-3 gap-6`
- **Card Padding**: `p-8`
- **Card Border**: `border border-gray-200`
- **Card Radius**: `rounded-xl`
- **Percentage**: `text-5xl font-bold`
- **Label**: `text-xs uppercase text-gray-500`
- **Description**: `text-sm text-gray-600 mt-2`

#### Design Tokens
```css
--card-bg: white;
--card-border: #e5e7eb;
--card-radius: 12px;
--card-padding: 32px;
--card-shadow: 0 1px 3px rgba(0,0,0,0.1);
--card-shadow-hover: 0 4px 6px rgba(0,0,0,0.1);
--stat-percentage: 56px;
--stat-label: 12px;
--stat-description: 14px;
```

#### Responsive Breakpoints
- **Mobile**: Single column stack
- **Tablet**: 2 columns (md:grid-cols-2)
- **Desktop**: 3 columns (lg:grid-cols-3)

---

## Section 4: Features List

### Components Required

#### Primary Components
- **Container** - Section wrapper
- **Heading** - Section title (h2)
- **List** - Unordered list with custom styling
- **Icons** - Check icons or custom icons
- **Grid Layout** - Two-column text + image

#### Component Hierarchy
```
<section id="features">
  └── <Container>
      └── <div className="grid md:grid-cols-2">
          ├── <div className="content">
          │   ├── <Badge>EVERYTHING YOU NEED</Badge>
          │   ├── <h2>Our fleet management solutions include</h2>
          │   └── <ul className="feature-list">
          │       ├── <li>
          │       │   ├── <CheckIcon />
          │       │   └── <span>Real-time updates...</span>
          │       ├── <li>...
          │       └── <li>...
          └── <div className="image">
              └── <Image src="/fleet-dashboard.jpg" />
```

#### Implementation Notes
- **Badge Component**: Small pill-shaped label above heading
- **Custom List Styling**: Remove default bullets, add check icons
- **Icon Alignment**: Align top with first line of text
- **Text Hierarchy**: Bold feature names, regular descriptions
- **Image Overlay**: Optional dark overlay on feature image

#### shadcn/ui Components Needed
```bash
npx shadcn-ui@latest add badge
```

#### Layout Specifications
- **Grid**: `grid md:grid-cols-2 gap-12 items-center`
- **Badge**: `inline-flex items-center px-3 py-1 rounded-full bg-gray-900 text-white text-xs font-semibold`
- **Heading**: `text-4xl font-bold mt-4 mb-8`
- **List Gap**: `space-y-4`
- **List Item**: `flex items-start gap-3`
- **Icon Size**: `w-6 h-6 text-green-500`
- **Feature Text**: `text-base text-gray-700`

#### Design Tokens
```css
--badge-bg: #111827;
--badge-text: white;
--badge-padding: 4px 12px;
--badge-radius: 9999px;
--feature-heading: 36px;
--feature-text: 16px;
--icon-size: 24px;
--icon-color: #10b981;
--list-gap: 16px;
```

#### Accessibility Requirements
- **List Semantics**: Use `<ul>` and `<li>` tags
- **Icon Alt Text**: Provide sr-only text for check icons
- **Heading Hierarchy**: Proper h2 usage

---

## Section 5: Testimonial Section

### Components Required

#### Primary Components
- **Card** - Testimonial container (shadcn/ui)
- **Avatar** - Customer photo (shadcn/ui)
- **Typography** - Quote text, author name, company
- **Chart/Image** - Results visualization
- **Badge** - Company logo or tag

#### Component Hierarchy
```
<section id="testimonial">
  └── <Container>
      ├── <h2>Results that speak for themselves.</h2>
      ├── <p>Success stories from satisfied customers.</p>
      └── <div className="grid md:grid-cols-2">
          ├── <Card className="quote-card">
          │   ├── <blockquote>
          │   │   └── <p>"Our team reached an entirely new level..."</p>
          │   └── <div className="author">
          │       ├── <Avatar src="/author.jpg" />
          │       ├── <div>
          │       │   ├── <p className="name">Jerome Armstead</p>
          │       │   └── <p className="role">Fleet Manager, Cooksey</p>
          │       └── <Badge>Cooksey</Badge>
          └── <div className="chart">
              └── <Image src="/growth-chart.png" />
```

#### Implementation Notes
- **Quote Styling**: Large text, quotation marks optional
- **Author Layout**: Horizontal flex with avatar left
- **Badge Positioning**: Company badge/logo near author
- **Chart Treatment**: Line chart showing growth trend
- **Card Elevation**: Subtle shadow for depth
- **Background**: Light gray or white

#### shadcn/ui Components Needed
```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
```

#### Layout Specifications
- **Grid**: `grid md:grid-cols-2 gap-8 items-center`
- **Quote Card**: `p-8 rounded-xl border border-gray-200`
- **Quote Text**: `text-xl font-medium leading-relaxed`
- **Author Container**: `flex items-center gap-4 mt-6`
- **Avatar**: `w-12 h-12 rounded-full`
- **Name**: `font-semibold text-gray-900`
- **Role**: `text-sm text-gray-600`
- **Chart**: `w-full h-auto`

#### Design Tokens
```css
--quote-text: 20px;
--quote-line-height: 1.6;
--quote-color: #111827;
--author-name: 16px;
--author-role: 14px;
--avatar-size: 48px;
--badge-size: 14px;
--card-padding: 32px;
```

#### Data Flow Patterns
- **Testimonial Data**: Props-based testimonial object
- **Author Info**: Nested object with name, role, company, avatar
- **Chart Data**: Static image or dynamic chart library

---

## Section 6: Integration Section

### Components Required

#### Primary Components
- **Container** - Section wrapper
- **Heading** - "Compatible with your business"
- **List** - Feature list with check icons
- **Image** - Side image (building/van)
- **Icons** - Checkmark icons (Lucide React)

#### Component Hierarchy
```
<section id="integrations">
  └── <Container>
      └── <div className="grid md:grid-cols-2 gap-12">
          ├── <div className="content">
          │   ├── <h2>Compatible with your business.</h2>
          │   └── <ul className="integration-list">
          │       ├── <li>
          │       │   ├── <CheckCircleIcon />
          │       │   ├── <h4>Wide range of integrations</h4>
          │       │   └── <p>Connect with tools you already use...</p>
          │       ├── <li>...
          │       ├── <li>...
          │       └── <li>...
          └── <div className="image">
              └── <Image src="/integration-photo.jpg" />
```

#### Implementation Notes
- **Feature Items**: Each with icon, heading, and description
- **Icon Styling**: Circular check icons with brand color
- **Hierarchical Text**: Bold heading (h4), gray description
- **Image Position**: Right side on desktop, below on mobile
- **Vertical Spacing**: Consistent gap between list items

#### shadcn/ui Components Needed
```bash
npm install lucide-react  # For check icons
```

#### Layout Specifications
- **Grid**: `grid md:grid-cols-2 gap-12 items-start`
- **Section Heading**: `text-4xl font-bold mb-12`
- **List Gap**: `space-y-6`
- **List Item**: `flex gap-4`
- **Icon**: `w-6 h-6 text-green-500 flex-shrink-0 mt-1`
- **Feature Heading**: `text-lg font-semibold mb-2`
- **Feature Description**: `text-gray-600 text-sm leading-relaxed`

#### Design Tokens
```css
--section-heading: 36px;
--feature-heading: 18px;
--feature-description: 14px;
--icon-size: 24px;
--icon-color: #10b981;
--list-gap: 24px;
--text-primary: #111827;
--text-secondary: #6b7280;
```

---

## Section 7: News/Blog Cards

### Components Required

#### Primary Components
- **Card** - Article card container (shadcn/ui)
- **Image** - Article thumbnail (Next.js Image)
- **Typography** - Heading, description, date
- **Grid Layout** - Three-column responsive grid
- **Button** - "Load more" button

#### Component Hierarchy
```
<section id="news">
  └── <Container>
      ├── <div className="header">
      │   ├── <h2>News and updates.</h2>
      │   └── <p>Stay up to date with latest developments...</p>
      ├── <div className="grid grid-cols-3">
      │   ├── <Card className="article-card">
      │   │   ├── <Image src="/article-1.jpg" />
      │   │   ├── <h3>Integration of AI in fleet management...</h3>
      │   │   ├── <p>Our innovative AI solution...</p>
      │   │   └── <span className="date">Sep 16</span>
      │   ├── <Card>...
      │   └── <Card>...
      └── <div className="actions">
          ├── <Button variant="outline">Load more</Button>
          └── <Button variant="ghost">Skip</Button>
```

#### Implementation Notes
- **Card Structure**: Image top, content below
- **Image Aspect Ratio**: 16:9 or 4:3
- **Hover Effect**: Subtle scale and shadow increase
- **Date Badge**: Bottom-left corner positioning
- **CTA Buttons**: Center-aligned below cards
- **Truncation**: Title and description text truncation

#### shadcn/ui Components Needed
```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
```

#### Layout Specifications
- **Grid**: `grid md:grid-cols-2 lg:grid-cols-3 gap-6`
- **Card**: `overflow-hidden rounded-xl border border-gray-200`
- **Image Container**: `aspect-video overflow-hidden`
- **Content Padding**: `p-6`
- **Heading**: `text-xl font-semibold mb-2 line-clamp-2`
- **Description**: `text-sm text-gray-600 line-clamp-3`
- **Date**: `text-xs text-gray-500 mt-4`
- **Buttons Container**: `flex justify-center gap-4 mt-8`

#### Design Tokens
```css
--card-radius: 12px;
--card-border: #e5e7eb;
--image-aspect: 16/9;
--card-padding: 24px;
--heading-size: 20px;
--description-size: 14px;
--date-size: 12px;
--card-hover-shadow: 0 8px 16px rgba(0,0,0,0.1);
--card-transition: all 0.3s ease;
```

#### Responsive Breakpoints
- **Mobile**: Single column
- **Tablet**: 2 columns (md:grid-cols-2)
- **Desktop**: 3 columns (lg:grid-cols-3)

#### Accessibility Requirements
- **Image Alt Text**: Descriptive alt for each article image
- **Link Wrapping**: Entire card should be clickable
- **Focus States**: Visible focus indicators on cards

---

## Section 8: FAQ Section

### Components Required

#### Primary Components
- **Accordion** - Expandable question items (shadcn/ui)
- **AccordionItem** - Individual FAQ entry
- **AccordionTrigger** - Question button
- **AccordionContent** - Answer content
- **Container** - Section wrapper
- **Typography** - Heading and questions

#### Component Hierarchy
```
<section id="faq">
  └── <Container>
      ├── <div className="grid md:grid-cols-2 gap-12">
      │   ├── <div className="intro">
      │   │   ├── <h2>Frequently Asked Questions.</h2>
      │   │   └── <p>Everything you need to know...</p>
      │   └── <Accordion type="single" collapsible>
      │       ├── <AccordionItem value="1">
      │       │   ├── <AccordionTrigger>
      │       │   │   └── How quickly can I start using your solutions?
      │       │   └── <AccordionContent>
      │       │       └── You can start immediately after...
      │       ├── <AccordionItem value="2">...
      │       ├── <AccordionItem value="3">...
      │       ├── <AccordionItem value="4">...
      │       └── <AccordionItem value="5">...
```

#### Implementation Notes
- **Single Expansion**: Only one item open at a time
- **Icon Animation**: Chevron rotates on expand/collapse
- **Smooth Transitions**: Accordion content animates smoothly
- **Divider Lines**: Between accordion items
- **Two-Column Layout**: Intro left, accordion right (desktop)

#### shadcn/ui Components Needed
```bash
npx shadcn-ui@latest add accordion
```

#### Layout Specifications
- **Grid**: `grid md:grid-cols-2 gap-12`
- **Intro Heading**: `text-4xl font-bold mb-4`
- **Intro Text**: `text-gray-600 text-lg`
- **Accordion Item**: `border-b border-gray-200 py-4`
- **Trigger**: `flex justify-between items-center w-full text-left font-medium hover:text-gray-900`
- **Content**: `pt-2 pb-4 text-gray-600 text-sm leading-relaxed`
- **Icon**: `w-5 h-5 transition-transform`

#### Design Tokens
```css
--faq-heading: 36px;
--faq-question: 16px;
--faq-answer: 14px;
--faq-border: #e5e7eb;
--faq-icon-size: 20px;
--faq-transition: 0.2s ease;
--text-primary: #111827;
--text-secondary: #6b7280;
```

#### Data Flow Patterns
- **FAQ Data**: Array of question-answer objects
- **Active State**: Single item value tracked in state
- **Collapsible**: Allow closing currently open item

#### Accessibility Requirements
- **Keyboard Navigation**: Arrow keys, Enter, Space support
- **ARIA Attributes**: aria-expanded, aria-controls
- **Focus Management**: Visible focus indicators
- **Screen Readers**: Proper role and state announcements

---

## Section 9: CTA Footer

### Components Required

#### Primary Components
- **Container** - Section wrapper
- **Input** - Email input field (shadcn/ui)
- **Button** - Submit button (shadcn/ui)
- **Typography** - Heading and subtext
- **Form** - Email capture form

#### Component Hierarchy
```
<section id="cta-footer">
  └── <Container>
      └── <div className="cta-content">
          ├── <h2>Increase efficiency, reduce costs, and enhance safety...</h2>
          └── <form className="email-form">
              ├── <Input
              │   type="email"
              │   placeholder="email@example.com"
              ├── <Button type="submit">
              │   └── Subscribe
              └── <p className="disclaimer">
                  └── Enter your email to start...
```

#### Implementation Notes
- **Dark Background**: Black or very dark gray (#111827)
- **Centered Layout**: Text and form centered
- **Inline Form**: Input and button in same row
- **Button Styling**: Bright CTA color (green or brand)
- **Disclaimer Text**: Small gray text below form
- **Padding**: Large vertical padding (py-20)

#### shadcn/ui Components Needed
```bash
npx shadcn-ui@latest add input
npx shadcn-ui@latest add button
```

#### Layout Specifications
- **Background**: `bg-gray-900 text-white`
- **Container**: `max-w-4xl mx-auto text-center px-8 py-20`
- **Heading**: `text-3xl md:text-4xl font-bold mb-8 max-w-3xl mx-auto`
- **Form**: `flex gap-4 max-w-md mx-auto`
- **Input**: `flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50`
- **Button**: `px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg`
- **Disclaimer**: `text-xs text-white/60 mt-4`

#### Design Tokens
```css
--cta-bg: #111827;
--cta-text: white;
--cta-heading: 36px;
--input-bg: rgba(255,255,255,0.1);
--input-border: rgba(255,255,255,0.2);
--input-text: white;
--input-placeholder: rgba(255,255,255,0.5);
--button-bg: #10b981;
--button-hover: #059669;
--button-text: #111827;
--disclaimer-text: rgba(255,255,255,0.6);
--disclaimer-size: 12px;
```

#### Form Validation
- **Email Validation**: HTML5 email type validation
- **Required Field**: Mark email as required
- **Error States**: Show validation errors inline
- **Success State**: Show confirmation message

#### Accessibility Requirements
- **Form Labels**: Use aria-label or sr-only labels
- **Input Association**: Proper label-input association
- **Error Announcements**: aria-live regions for errors
- **Button State**: Disabled state during submission

---

## Section 10: Footer Navigation

### Components Required

#### Primary Components
- **Container** - Footer wrapper
- **Grid Layout** - Multi-column link sections
- **Logo** - Brand logo
- **Link Lists** - Categorized navigation links
- **Typography** - Section headings and links
- **Social Icons** - Optional social media links

#### Component Hierarchy
```
<footer>
  └── <Container>
      ├── <div className="grid grid-cols-5">
      │   ├── <div className="brand">
      │   │   ├── <Logo />
      │   │   └── <p>© LinkMe Tur 2025</p>
      │   ├── <div className="column">
      │   │   ├── <h4>Resources</h4>
      │   │   ├── <Link>Integrations</Link>
      │   │   ├── <Link>Help</Link>
      │   │   └── <Link>Status</Link>
      │   ├── <div className="column">
      │   │   ├── <h4>About us</h4>
      │   │   ├── <Link>Careers</Link>
      │   │   └── <Link>Contact us</Link>
      │   ├── <div className="column">
      │   │   ├── <h4>Customers</h4>
      │   │   ├── <Link>About</Link>
      │   │   └── <Link>Press kit</Link>
      │   └── <div className="column">
      │       ├── <h4>Terms and privacy</h4>
      │       ├── <Link>Privacy policy</Link>
      │       ├── <Link>Terms of service</Link>
      │       └── <Link>Cookies policy</Link>
      └── <div className="bottom">
          └── <p className="copyright">© 2025 LinkMe Tur. All rights reserved.</p>
```

#### Implementation Notes
- **Background**: Light gray or white
- **Column Count**: 5 columns (desktop), stack on mobile
- **Link Styling**: Gray text, hover to black
- **Heading Styling**: Bold, uppercase or small caps
- **Vertical Spacing**: Consistent gap between links
- **Bottom Border**: Optional top border on copyright

#### shadcn/ui Components Needed
None - uses native HTML and styling

#### Layout Specifications
- **Grid**: `grid grid-cols-2 md:grid-cols-5 gap-8`
- **Container**: `max-w-7xl mx-auto px-8 py-12`
- **Column Heading**: `text-sm font-semibold text-gray-900 mb-4`
- **Links**: `text-sm text-gray-600 hover:text-gray-900 block mb-2`
- **Brand Column**: `col-span-2 md:col-span-1`
- **Logo**: `mb-4`
- **Copyright**: `text-xs text-gray-500 mt-8 pt-8 border-t border-gray-200`

#### Design Tokens
```css
--footer-bg: #f9fafb;
--footer-padding: 48px 0;
--footer-heading: 14px;
--footer-link: 14px;
--footer-border: #e5e7eb;
--text-heading: #111827;
--text-link: #6b7280;
--text-link-hover: #111827;
--text-copyright: #9ca3af;
--column-gap: 32px;
```

#### Responsive Breakpoints
- **Mobile**: 2 columns, brand spans full width
- **Tablet**: 3 columns (md:grid-cols-3)
- **Desktop**: 5 columns (lg:grid-cols-5)

#### Accessibility Requirements
- **Semantic Footer**: Use `<footer>` element
- **Navigation Landmark**: Use `<nav>` for link sections
- **Link Purpose**: Clear link text, avoid "click here"
- **Keyboard Navigation**: All links keyboard accessible

---

## Complete shadcn/ui Component Installation

### Required Components
```bash
# Core UI Components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add accordion

# Icon Library
npm install lucide-react
```

### Optional Components (for enhanced functionality)
```bash
npx shadcn-ui@latest add dialog          # For modals
npx shadcn-ui@latest add dropdown-menu   # For navigation menus
npx shadcn-ui@latest add separator       # For visual dividers
npx shadcn-ui@latest add skeleton        # For loading states
npx shadcn-ui@latest add tooltip         # For helpful hints
```

---

## Global Design Tokens

### Color Palette
```css
/* Primary Colors */
--primary: #10b981;           /* Green for CTAs */
--primary-hover: #059669;     /* Darker green */
--primary-light: #d1fae5;     /* Light green */

/* Neutral Colors */
--gray-50: #f9fafb;           /* Background light */
--gray-100: #f3f4f6;          /* Background */
--gray-200: #e5e7eb;          /* Borders */
--gray-300: #d1d5db;          /* Borders dark */
--gray-500: #6b7280;          /* Text secondary */
--gray-600: #4b5563;          /* Text muted */
--gray-900: #111827;          /* Text primary */

/* Semantic Colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;

/* Background Colors */
--bg-primary: white;
--bg-secondary: #f9fafb;
--bg-dark: #111827;
```

### Typography Scale
```css
/* Font Families */
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-mono: "SF Mono", Monaco, "Cascadia Code", monospace;

/* Font Sizes */
--text-xs: 12px;      /* 0.75rem */
--text-sm: 14px;      /* 0.875rem */
--text-base: 16px;    /* 1rem */
--text-lg: 18px;      /* 1.125rem */
--text-xl: 20px;      /* 1.25rem */
--text-2xl: 24px;     /* 1.5rem */
--text-3xl: 30px;     /* 1.875rem */
--text-4xl: 36px;     /* 2.25rem */
--text-5xl: 48px;     /* 3rem */
--text-6xl: 60px;     /* 3.75rem */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

### Spacing Scale
```css
/* Spacing (based on 4px grid) */
--space-0: 0px;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.07);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
--shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
```

### Transitions
```css
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
```

---

## Layout Specifications

### Container Widths
```css
/* Max Width Containers */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;

/* Content Max Widths */
--content-narrow: 640px;   /* For reading content */
--content-medium: 896px;   /* For forms and cards */
--content-wide: 1280px;    /* For main layouts */
--content-full: 1536px;    /* For wide sections */
```

### Grid Systems
```css
/* Grid Columns */
.grid-1 { grid-template-columns: repeat(1, 1fr); }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }
.grid-5 { grid-template-columns: repeat(5, 1fr); }

/* Grid Gaps */
--gap-sm: 16px;
--gap-md: 24px;
--gap-lg: 32px;
--gap-xl: 48px;
```

### Breakpoints
```css
/* Responsive Breakpoints */
--screen-sm: 640px;    /* Mobile landscape */
--screen-md: 768px;    /* Tablet */
--screen-lg: 1024px;   /* Desktop */
--screen-xl: 1280px;   /* Large desktop */
--screen-2xl: 1536px;  /* Extra large desktop */
```

---

## Implementation Priority Order

### Phase 1: Foundation (Week 1)
1. **Install shadcn/ui components** - All required components
2. **Setup global design tokens** - CSS variables, Tailwind config
3. **Create layout components** - Container, Section, Grid wrappers
4. **Build navigation header** - Logo, links, CTA button
5. **Build footer** - Multi-column links, copyright

### Phase 2: Hero & Stats (Week 1)
6. **Hero section** - Heading, subtext, image
7. **Stats cards** - Three metric cards with responsive grid
8. **Basic responsive behavior** - Mobile, tablet, desktop breakpoints

### Phase 3: Content Sections (Week 2)
9. **Features list** - Badge, heading, checkmark list, image
10. **Testimonial section** - Quote card, avatar, badge, chart
11. **Integration section** - Feature list with icons, side image
12. **News/blog cards** - Three article cards with images

### Phase 4: Interactive Elements (Week 2)
13. **FAQ accordion** - Collapsible questions with smooth animations
14. **CTA footer** - Email form with validation
15. **Hover states** - All interactive elements
16. **Focus states** - Keyboard accessibility

### Phase 5: Polish & Optimization (Week 3)
17. **Animation refinement** - Smooth transitions and micro-interactions
18. **Performance optimization** - Image optimization, lazy loading
19. **Accessibility audit** - WCAG 2.1 AA compliance
20. **Cross-browser testing** - Chrome, Firefox, Safari, Edge
21. **Mobile optimization** - Touch targets, scrolling, gestures
22. **Content adaptation** - Tourism-specific copy and images

---

## Responsive Design Strategy

### Mobile-First Approach
```css
/* Base (Mobile) */
.section { padding: 40px 16px; }
.heading { font-size: 32px; }
.grid { grid-template-columns: 1fr; }

/* Tablet (768px+) */
@media (min-width: 768px) {
  .section { padding: 60px 32px; }
  .heading { font-size: 40px; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .section { padding: 96px 32px; }
  .heading { font-size: 48px; }
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

### Key Breakpoint Behaviors

#### Navigation Header
- **Mobile**: Hamburger menu (optional), vertical links
- **Tablet**: Horizontal navigation, full logo
- **Desktop**: Full navigation with CTA button

#### Hero Section
- **Mobile**: Stacked layout, image below text
- **Tablet**: Two-column grid, equal width
- **Desktop**: Two-column grid, larger text

#### Stats Cards
- **Mobile**: Single column stack
- **Tablet**: 2 columns
- **Desktop**: 3 columns

#### Features List
- **Mobile**: Stacked text and image
- **Tablet**: Two-column grid
- **Desktop**: Two-column grid with larger image

#### News Cards
- **Mobile**: Single column
- **Tablet**: 2 columns
- **Desktop**: 3 columns

#### FAQ Section
- **Mobile**: Stacked intro and accordion
- **Tablet**: Two-column grid
- **Desktop**: Two-column grid with larger text

#### Footer
- **Mobile**: 2 columns, brand full-width
- **Tablet**: 3 columns
- **Desktop**: 5 columns

---

## Accessibility Checklist

### WCAG 2.1 AA Compliance

#### Keyboard Navigation
- [ ] All interactive elements keyboard accessible
- [ ] Visible focus indicators (2px outline)
- [ ] Logical tab order
- [ ] Skip to main content link
- [ ] Accordion keyboard controls (Arrow keys, Enter, Space)

#### Screen Readers
- [ ] Semantic HTML (header, nav, main, section, footer)
- [ ] ARIA labels for icon buttons
- [ ] ARIA live regions for dynamic content
- [ ] Image alt text (descriptive and concise)
- [ ] Form labels and error announcements

#### Color Contrast
- [ ] Text contrast ratio ≥4.5:1 (normal text)
- [ ] Text contrast ratio ≥3:1 (large text 24px+)
- [ ] UI component contrast ≥3:1
- [ ] Focus indicator contrast ≥3:1

#### Visual Design
- [ ] Text resizable up to 200% without loss of content
- [ ] Touch targets ≥44x44px
- [ ] No content flashing more than 3 times per second
- [ ] Clear visual hierarchy

#### Forms
- [ ] Associated labels for all inputs
- [ ] Error identification and suggestions
- [ ] Success confirmations
- [ ] Fieldset and legend for grouped inputs

---

## Performance Optimization

### Image Optimization
```typescript
// Next.js Image Component Best Practices
import Image from "next/image";

// Hero image with priority loading
<Image
  src="/hero-truck.jpg"
  alt="Fleet management truck on highway"
  fill
  priority
  className="object-cover"
  sizes="100vw"
/>

// Lazy-loaded article images
<Image
  src="/article-1.jpg"
  alt="AI integration in fleet management"
  width={400}
  height={300}
  loading="lazy"
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

### Code Splitting
- **Component-based splitting**: Import components dynamically
- **Route-based splitting**: Next.js automatic code splitting
- **Library chunking**: Separate vendor bundles

### Asset Optimization
- **Image formats**: WebP with JPEG fallback
- **Image dimensions**: Serve appropriate sizes for breakpoints
- **Icon sprites**: SVG sprite sheets for icons
- **Font loading**: `font-display: swap` for web fonts

### Performance Metrics Targets
- **First Contentful Paint (FCP)**: <1.8s
- **Largest Contentful Paint (LCP)**: <2.5s
- **Total Blocking Time (TBT)**: <200ms
- **Cumulative Layout Shift (CLS)**: <0.1
- **Time to Interactive (TTI)**: <3.5s

---

## Component Reusability Patterns

### Shared Components
```typescript
// components/ui/section-header.tsx
export function SectionHeader({
  title,
  description
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      {description && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}

// components/ui/feature-item.tsx
export function FeatureItem({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <li className="flex gap-4">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </li>
  );
}
```

---

## Tourism Platform Adaptation Notes

### Content Mapping: Fleet → Tourism

| Fleet Management | LinkMe Tur Tourism |
|-----------------|-------------------|
| Fleet tracking | Service provider matching |
| Vehicle analytics | Tourism analytics |
| Route optimization | Service optimization |
| Driver management | Provider management |
| Fuel efficiency | Cost efficiency |
| Maintenance scheduling | Booking management |
| Real-time updates | Real-time availability |
| Integration with tools | Integration with platforms |

### Industry-Specific Adaptations

#### Hero Section
- **Original**: "Control your fleet like never before"
- **Tourism**: "Conecte seu negócio turístico com os melhores fornecedores"

#### Stats Cards
- **Original**: 20% time saved, 50% costs reduced, 30% downtime
- **Tourism**: 20% mais eficiência, 50% economia em serviços, 30% mais reservas

#### Features List
- **Original**: Real-time tracking, analytics, route optimization
- **Tourism**: Busca especializada, conexão direta, gestão simplificada

#### Testimonial
- **Original**: Fleet Manager quote
- **Tourism**: Hotel owner or tourism company testimonial

#### Integration Section
- **Original**: GPS systems, fuel cards, maintenance software
- **Tourism**: Booking platforms, payment systems, marketing tools

#### News Cards
- **Original**: AI in fleet management, vehicle safety, cost reduction
- **Tourism**: Tourism trends, event updates, success stories

---

## Summary

This comprehensive analysis provides a complete roadmap for rebuilding the fleet management landing page design using shadcn/ui components. The breakdown includes:

- **10 distinct sections** with detailed component mapping
- **6 core shadcn/ui components** required for implementation
- **Complete design token system** for consistent styling
- **Responsive breakpoint strategies** for all sections
- **Accessibility compliance checklist** for WCAG 2.1 AA
- **Performance optimization guidelines** for fast loading
- **Tourism industry adaptation notes** for content mapping

The implementation can be completed in **3 weeks** following the priority order, with Phase 1 establishing foundations, Phases 2-3 building content sections, Phase 4 adding interactivity, and Phase 5 polishing and optimizing the final product.

All components leverage shadcn/ui's consistent API, Tailwind CSS utilities, and Next.js Image optimization for a modern, performant, and accessible landing page experience.
