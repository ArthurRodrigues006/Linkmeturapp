import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LinkMe Tur - Conectamos quem precisa com quem resolve',
  description: 'Transformamos a forma como as empresas fazem negócios com o turismo. Conectamos empresas do turismo com prestadores de serviços especializados.',
  keywords: 'turismo, linkme tur, prestadores de serviços, empresas de turismo, Rio Grande do Sul',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
