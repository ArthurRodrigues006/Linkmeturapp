'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'

interface Job {
  id: string
  name: string
  category: string
  subCategory?: string
  description: string
  minValue: number
  maxValue: number
  published: boolean
  corporation: {
    name: string
  }
  photos: {
    url: string
    alt?: string
  }[]
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/jobs?published=true')
      setJobs(response.data)
    } catch (err) {
      setError('Erro ao carregar jobs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-blue-600">LinkMeTur</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#jobs" className="text-gray-700 hover:text-blue-600">
                Jobs
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-blue-600">
                Sobre
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600">
                Contato
              </Link>
            </nav>
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Conectando Empresas de Turismo
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              A plataforma completa para conectar empresas do setor de turismo com prestadores de serviços. 
              Gerencie reservas, propostas e contatos de forma eficiente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Começar Agora
              </Link>
              <Link
                href="/login"
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Fazer Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section id="jobs" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Jobs Disponíveis
            </h3>
            <p className="text-lg text-gray-600">
              Encontre os melhores serviços para sua empresa de turismo
            </p>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Carregando jobs...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {!loading && !error && jobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">Nenhum job encontrado no momento.</p>
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {job.photos.length > 0 && (
                  <img
                    src={job.photos[0].url}
                    alt={job.photos[0].alt || job.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {job.category} {job.subCategory && `- ${job.subCategory}`}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {job.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">
                      R$ {job.minValue.toLocaleString()} - R$ {job.maxValue.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {job.corporation.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher o LinkMeTur?
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Conexões Inteligentes</h4>
              <p className="text-gray-600">
                Conecte-se com os melhores prestadores de serviços do setor de turismo.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Gestão Eficiente</h4>
              <p className="text-gray-600">
                Gerencie reservas, propostas e contatos em uma única plataforma.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Resultados Rápidos</h4>
              <p className="text-gray-600">
                Aumente suas vendas e melhore a experiência dos seus clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h4 className="text-2xl font-bold mb-4">LinkMeTur</h4>
            <p className="text-gray-400 mb-4">
              Conectando empresas de turismo com prestadores de serviços
            </p>
            <p className="text-gray-500">
              © 2024 LinkMeTur. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}