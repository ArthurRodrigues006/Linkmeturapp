import { Metadata } from 'next'
import SEOHead from '@/components/SEO/SEOHead'
import SchemaMarkup from '@/components/SEO/SchemaMarkup'

export const metadata: Metadata = {
  title: "LinkMeTur - Conectando Empresas de Turismo",
  description: "Plataforma completa para conectar empresas do setor de turismo com prestadores de serviços. Gerencie reservas, propostas e contatos de forma eficiente.",
  keywords: [
    "turismo",
    "empresas de turismo", 
    "prestadores de serviços",
    "reservas",
    "propostas",
    "gestão de turismo",
    "Brasil",
    "turismo nacional",
    "agência de viagens",
    "hospedagem",
    "transporte turístico"
  ],
  openGraph: {
    title: "LinkMeTur - Conectando Empresas de Turismo",
    description: "Plataforma completa para conectar empresas do setor de turismo com prestadores de serviços.",
    type: "website",
    locale: "pt_BR",
  },
}

async function getHealth() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const r = await fetch(`${apiUrl}/health`, { cache: 'no-store' });
    return await r.json();
  } catch (e) {
    return { error: 'Falha ao conectar', detail: String(e) };
  }
}

export default async function Home() {
  const data = await getHealth();
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "LinkMeTur - Conectando Empresas de Turismo",
    "description": "Plataforma completa para conectar empresas do setor de turismo com prestadores de serviços.",
    "url": "https://app.linkmetur.com.br",
    "isPartOf": {
      "@type": "WebSite",
      "name": "LinkMeTur",
      "url": "https://linkmetur.com.br"
    },
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "LinkMeTur",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "Plataforma para conectar empresas de turismo com prestadores de serviços",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "BRL"
      }
    }
  }

  return (
    <>
      <SEOHead
        title="LinkMeTur - Conectando Empresas de Turismo"
        description="Plataforma completa para conectar empresas do setor de turismo com prestadores de serviços. Gerencie reservas, propostas e contatos de forma eficiente."
        keywords={[
          "turismo",
          "empresas de turismo", 
          "prestadores de serviços",
          "reservas",
          "propostas",
          "gestão de turismo",
          "Brasil",
          "turismo nacional"
        ]}
        structuredData={structuredData}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Conectando Empresas de <span className="text-blue-600">Turismo</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Plataforma completa para conectar empresas do setor de turismo com prestadores de serviços. 
              Gerencie reservas, propostas e contatos de forma eficiente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Começar Agora
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Saiba Mais
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Por que escolher o LinkMeTur?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Conexões Inteligentes</h3>
              <p className="text-gray-600">
                Conecte-se com os melhores prestadores de serviços do setor de turismo.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestão Eficiente</h3>
              <p className="text-gray-600">
                Gerencie reservas, propostas e contatos em uma única plataforma.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Resultados Rápidos</h3>
              <p className="text-gray-600">
                Aumente suas vendas e melhore a experiência dos seus clientes.
              </p>
            </div>
          </div>
        </section>

        {/* Status Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Status do Sistema
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Backend API</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </section>
      </main>
    </>
  );
}