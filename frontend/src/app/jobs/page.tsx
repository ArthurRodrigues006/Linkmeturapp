'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SEOHead from '@/components/SEO/SEOHead';
import SchemaMarkup from '@/components/SEO/SchemaMarkup';

interface Job {
  id: string;
  nome_servico: string;
  categoria: string;
  sub_categoria: string;
  descricao: string;
  min_valor: number;
  max_valor: number;
  views: number;
  total_views: number;
  publicado: boolean;
  created_at: string;
  updated_at: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/jobs/mine', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        setError('Erro ao carregar serviços');
      }
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setJobs(jobs.filter(job => job.id !== id));
      } else {
        alert('Erro ao excluir serviço');
      }
    } catch (error) {
      console.error('Erro ao excluir serviço:', error);
      alert('Erro de conexão');
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicado: !currentStatus }),
      });

      if (response.ok) {
        setJobs(jobs.map(job => 
          job.id === id ? { ...job, publicado: !currentStatus } : job
        ));
      } else {
        alert('Erro ao atualizar serviço');
      }
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      alert('Erro de conexão');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Meus Serviços - LinkMeTur"
        description="Gerencie seus serviços na plataforma LinkMeTur"
        keywords={['serviços', 'gestão', 'turismo', 'plataforma']}
      />
      <SchemaMarkup
        type="WebPage"
        data={{
          name: "Meus Serviços LinkMeTur",
          description: "Página de gerenciamento de serviços",
          url: "https://app.linkmetur.com.br/jobs",
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Meus Serviços</h1>
                <p className="text-gray-600">Gerencie seus serviços de turismo</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/jobs/new')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Novo Serviço
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  Voltar
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum serviço encontrado</h3>
              <p className="mt-1 text-sm text-gray-500">Comece criando seu primeiro serviço.</p>
              <div className="mt-6">
                <button
                  onClick={() => router.push('/jobs/new')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Criar Serviço
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{job.nome_servico}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      job.publicado 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {job.publicado ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Categoria:</span> {job.categoria}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Subcategoria:</span> {job.sub_categoria}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Valor:</span> R$ {job.min_valor} - R$ {job.max_valor}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Visualizações:</span> {job.total_views}
                    </p>
                  </div>

                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">{job.descricao}</p>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => router.push(`/jobs/${job.id}/edit`)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => togglePublished(job.id, job.publicado)}
                      className={`flex-1 px-3 py-2 rounded text-sm ${
                        job.publicado
                          ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {job.publicado ? 'Despublicar' : 'Publicar'}
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
