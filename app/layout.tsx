import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://linkmetur.com.br'),
  title: {
    default: 'LinkMe Tur - Conectamos quem precisa com quem resolve',
    template: '%s | LinkMe Tur',
  },
  description: 'Transformamos a forma como as empresas fazem negócios com o turismo. Conectamos empresas do turismo com prestadores de serviços especializados no Rio Grande do Sul.',
  keywords: ['turismo', 'linkme tur', 'prestadores de serviços', 'empresas de turismo', 'Rio Grande do Sul', 'turismo gaúcho', 'plataforma turismo', 'conexão empresas'],
  authors: [{ name: 'LinkMe Tur' }],
  creator: 'LinkMe Tur',
  publisher: 'LinkMe Tur',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://linkmetur.com.br',
    siteName: 'LinkMe Tur',
    title: 'LinkMe Tur - Conectamos quem precisa com quem resolve',
    description: 'Transformamos a forma como as empresas fazem negócios com o turismo. Conectamos empresas do turismo com prestadores de serviços especializados.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LinkMe Tur - Plataforma de Turismo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkMe Tur - Conectamos quem precisa com quem resolve',
    description: 'Transformamos a forma como as empresas fazem negócios com o turismo.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://linkmetur.com.br',
  },
  category: 'business',
}

export const viewport: Viewport = {
  themeColor: '#2BE58F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2BE58F" />
      </head>
      <body className={poppins.className} suppressHydrationWarning>{children}</body>
    </html>
  )
}
