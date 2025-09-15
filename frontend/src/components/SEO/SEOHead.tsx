import Head from 'next/head'
import SchemaMarkup from './SchemaMarkup'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  noindex?: boolean
  structuredData?: any
  breadcrumbs?: Array<{ name: string; url: string }>
}

export default function SEOHead({
  title = "LinkMeTur - Conectando Empresas de Turismo",
  description = "Plataforma completa para conectar empresas do setor de turismo com prestadores de serviços. Gerencie reservas, propostas e contatos de forma eficiente.",
  keywords = ["turismo", "empresas de turismo", "prestadores de serviços", "reservas", "propostas", "gestão de turismo"],
  canonical,
  ogImage = "/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  noindex = false,
  structuredData,
  breadcrumbs
}: SEOHeadProps) {
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://app.linkmetur.com.br'
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="LinkMeTur" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
      <meta name="twitter:creator" content="@linkmetur" />
      <meta name="twitter:site" content="@linkmetur" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="LinkMeTur Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="pt-BR" />
      
      {/* Schema.org Structured Data */}
      <SchemaMarkup type="Organization" data={{}} />
      <SchemaMarkup type="WebSite" data={{}} />
      
      {breadcrumbs && (
        <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs }} />
      )}
      
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </Head>
  )
}
