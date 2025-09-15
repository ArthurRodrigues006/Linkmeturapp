'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import SEOHead from '@/components/SEO/SEOHead';
import SchemaMarkup from '@/components/SEO/SchemaMarkup';
import { useAuth } from '@/hooks/useAuth';

interface Job {
  id: string;
  nome_servico: string;
  categoria: string;
  sub_categoria: string;
  descricao: string;
  min_valor: number;
  max_valor: number;
  video_url: string;
  certificacoes: string[];
  disponibilidade: string[];
  publicado: boolean;
}

export default function EditJobPage() {
  const [formData, setFormData] = useState({
    nome_servico: '',
    categoria: '',
    sub_categoria: '',
    descricao: '',
    min_valor: '',
    max_valor: '',
    video_url: '',
    certificacoes: '',
    disponibilidade: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const { requireAuth } = useAuth();
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  useEffect(() => {
    requireAuth();
    loadJob();
  }, [requireAuth, jobId]);

  const loadJob = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/jobs/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const job: Job = await response.json();
        setFormData({
          nome_servico: job.nome_servico,
          categoria: job.categoria,
          sub_categoria: job.sub_categoria || '',
          descricao: job.descricao,
          min_valor: job.min_valor.toString(),
          max_valor: job.max_valor.toString(),
          video_url: job.video_url || '',
          certificacoes: job.certificacoes.join(', '),
          disponibilidade: job.disponibilidade.join(', '),
        });
      } else {
        setError('Erro ao carregar serviço');
      }
    } catch (error) {
      console.error('Erro ao carregar serviço:', error);
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          min_valor: parseFloat(formData.min_valor),
          max_valor: parseFloat(formData.max_valor),
          certificacoes: formData.certificacoes ? formData.certificacoes.split(',').map(c => c.trim()) : [],
          disponibilidade: formData.disponibilidade ? formData.disponibilidade.split(',').map(d => d.trim()) : [],
        }),
      });

      if (response.ok) {
        router.push('/jobs');
      } else {
        const data = await response.json();
        setError(data.message || 'Erro ao atualizar serviço');
      }
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const categorias = [
    'Hospedagem',
    'Transporte',
    'Alimentação',
    'Passeios',
    'Eventos',
    'Consultoria',
    'Outros'
  ];

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
        title="Editar Serviço - LinkMeTur"
        description="Edite seu serviço na plataforma LinkMeTur"
        keywords={['editar serviço', 'atualizar', 'turismo', 'plataforma']}
      />
      <SchemaMarkup
        type="WebPage"
        data={{
          name: "Editar Serviço LinkMeTur",
          description: "Página para edição de serviços",
          url: "https://app.linkmetur.com.br/jobs/edit",
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Editar Serviço</h1>
                <p className="text-gray-600">Atualize as informações do seu serviço</p>
              </div>
              <button
                onClick={() => router.push('/jobs')}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Voltar
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Informações Básicas</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="nome_servico" className="block text-sm font-medium text-gray-700">
                    Nome do Serviço *
                  </label>
                  <input
                    type="text"
                    name="nome_servico"
                    id="nome_servico"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.nome_servico}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                      Categoria *
                    </label>
                    <select
                      name="categoria"
                      id="categoria"
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.categoria}
                      onChange={handleChange}
                    >
                      <option value="">Selecione uma categoria</option>
                      {categorias.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="sub_categoria" className="block text-sm font-medium text-gray-700">
                      Subcategoria
                    </label>
                    <input
                      type="text"
                      name="sub_categoria"
                      id="sub_categoria"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.sub_categoria}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                    Descrição *
                  </label>
                  <textarea
                    name="descricao"
                    id="descricao"
                    rows={4}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.descricao}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="min_valor" className="block text-sm font-medium text-gray-700">
                      Valor Mínimo (R$) *
                    </label>
                    <input
                      type="number"
                      name="min_valor"
                      id="min_valor"
                      step="0.01"
                      min="0"
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.min_valor}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="max_valor" className="block text-sm font-medium text-gray-700">
                      Valor Máximo (R$) *
                    </label>
                    <input
                      type="number"
                      name="max_valor"
                      id="max_valor"
                      step="0.01"
                      min="0"
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.max_valor}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="video_url" className="block text-sm font-medium text-gray-700">
                    URL do Vídeo
                  </label>
                  <input
                    type="url"
                    name="video_url"
                    id="video_url"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.video_url}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="certificacoes" className="block text-sm font-medium text-gray-700">
                    Certificações (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    name="certificacoes"
                    id="certificacoes"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Ex: ISO 9001, Certificação de Qualidade"
                    value={formData.certificacoes}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="disponibilidade" className="block text-sm font-medium text-gray-700">
                    Disponibilidade (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    name="disponibilidade"
                    id="disponibilidade"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Ex: Segunda a Sexta, Finais de Semana"
                    value={formData.disponibilidade}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/jobs')}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
