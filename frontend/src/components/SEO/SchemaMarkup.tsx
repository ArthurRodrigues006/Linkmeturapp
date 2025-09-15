import Script from 'next/script'

interface SchemaMarkupProps {
  type: 'Organization' | 'WebSite' | 'WebPage' | 'BreadcrumbList' | 'FAQPage'
  data: any
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  const getSchema = () => {
    switch (type) {
      case 'Organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "LinkMeTur",
          "description": "Plataforma completa para conectar empresas do setor de turismo com prestadores de serviços.",
          "url": "https://linkmetur.com.br",
          "logo": "https://linkmetur.com.br/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+55-11-99999-9999",
            "contactType": "customer service",
            "areaServed": "BR",
            "availableLanguage": "Portuguese"
          },
          "sameAs": [
            "https://www.facebook.com/linkmetur",
            "https://www.instagram.com/linkmetur",
            "https://www.linkedin.com/company/linkmetur",
            "https://twitter.com/linkmetur"
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rua das Empresas, 123",
            "addressLocality": "São Paulo",
            "addressRegion": "SP",
            "postalCode": "01234-567",
            "addressCountry": "BR"
          }
        }

      case 'WebSite':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "LinkMeTur",
          "description": "Plataforma completa para conectar empresas do setor de turismo com prestadores de serviços.",
          "url": "https://linkmetur.com.br",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://linkmetur.com.br/busca?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }

      case 'WebPage':
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": data.title,
          "description": data.description,
          "url": data.url,
          "isPartOf": {
            "@type": "WebSite",
            "name": "LinkMeTur",
            "url": "https://linkmetur.com.br"
          },
          "datePublished": data.datePublished,
          "dateModified": data.dateModified,
          "author": {
            "@type": "Organization",
            "name": "LinkMeTur"
          }
        }

      case 'BreadcrumbList':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.breadcrumbs.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        }

      case 'FAQPage':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.faqs.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }

      default:
        return {}
    }
  }

  return (
    <Script
      id={`schema-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getSchema())
      }}
    />
  )
}
