'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import SEOHead from '@/components/SEO/SEOHead';
import SchemaMarkup from '@/components/SEO/SchemaMarkup';
import { useAuth } from '@/hooks/useAuth';

interface Contact {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
  observacoes: string;
  favorited_contact: boolean;
}

export default function EditContactPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    cargo: '',
    observacoes: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const { requireAuth } = useAuth();
  const router = useRouter();
  const params = useParams();
  const contactId = params.id as string;

  useEffect(() => {
    requireAuth();
    loadContact();
  }, [requireAuth, contactId]);

  const loadContact = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/contacts/${contactId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const contact: Contact = await response.json();
        setFormData({
          nome: contact.nome,
          email: contact.email,
          telefone: contact.telefone,
          empresa: contact.empresa || '',
          cargo: contact.cargo || '',
          observacoes: contact.observacoes || '',
        });
      } else {
        setError('Erro ao carregar contato');
      }
    } catch (error) {
      console.error('Erro ao carregar contato:', error);
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
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/contacts');
      } else {
        const data = await response.json();
        setError(data.message || 'Erro ao atualizar contato');
      }
    } catch (error) {
      console.error('Erro ao atualizar contato:', error);
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        title="Editar Contato - LinkMeTur"
        description="Edite seu contato na plataforma LinkMeTur"
        keywords={['editar contato', 'atualizar', 'turismo', 'plataforma']}
      />
      <SchemaMarkup
        type="WebPage"
        data={{
          name: "Editar Contato LinkMeTur",
          description: "Página para edição de contatos",
          url: "https://app.linkmetur.com.br/contacts/edit",
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Editar Contato</h1>
                <p className="text-gray-600">Atualize as informações do seu contato</p>
              </div>
              <button
                onClick={() => router.push('/contacts')}
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
              <h2 className="text-lg font-medium text-gray-900 mb-6">Informações do Contato</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    id="nome"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      name="telefone"
                      id="telefone"
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.telefone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="empresa"
                      id="empresa"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.empresa}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="cargo" className="block text-sm font-medium text-gray-700">
                      Cargo
                    </label>
                    <input
                      type="text"
                      name="cargo"
                      id="cargo"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.cargo}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700">
                    Observações
                  </label>
                  <textarea
                    name="observacoes"
                    id="observacoes"
                    rows={4}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.observacoes}
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
                onClick={() => router.push('/contacts')}
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
