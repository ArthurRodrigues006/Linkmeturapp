'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SEOHead from '@/components/SEO/SEOHead';
import SchemaMarkup from '@/components/SEO/SchemaMarkup';

interface Contact {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
  observacoes: string;
  favorited_contact: boolean;
  created_at: string;
  updated_at: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        setError('Erro ao carregar contatos');
      }
    } catch (error) {
      console.error('Erro ao carregar contatos:', error);
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadContacts();
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/contacts/search/query?q=${encodeURIComponent(searchQuery)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        setError('Erro ao buscar contatos');
      }
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
      setError('Erro de conexão');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este contato?')) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setContacts(contacts.filter(contact => contact.id !== id));
      } else {
        alert('Erro ao excluir contato');
      }
    } catch (error) {
      console.error('Erro ao excluir contato:', error);
      alert('Erro de conexão');
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/contacts/${id}/favorite`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setContacts(contacts.map(contact => 
          contact.id === id ? { ...contact, favorited_contact: !contact.favorited_contact } : contact
        ));
      } else {
        alert('Erro ao atualizar favorito');
      }
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
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
        title="Meus Contatos - LinkMeTur"
        description="Gerencie seus contatos na plataforma LinkMeTur"
        keywords={['contatos', 'gestão', 'turismo', 'plataforma']}
      />
      <SchemaMarkup
        type="WebPage"
        data={{
          name: "Meus Contatos LinkMeTur",
          description: "Página de gerenciamento de contatos",
          url: "https://app.linkmetur.com.br/contacts",
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Meus Contatos</h1>
                <p className="text-gray-600">Gerencie seus contatos de turismo</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/contacts/new')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Novo Contato
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
          {/* Search */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Buscar contatos por nome ou email..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Buscar
              </button>
              <button
                onClick={() => {
                  setSearchQuery('');
                  loadContacts();
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Limpar
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {contacts.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum contato encontrado</h3>
              <p className="mt-1 text-sm text-gray-500">Comece adicionando seu primeiro contato.</p>
              <div className="mt-6">
                <button
                  onClick={() => router.push('/contacts/new')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Adicionar Contato
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <div key={contact.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{contact.nome}</h3>
                    <button
                      onClick={() => toggleFavorite(contact.id)}
                      title={contact.favorited_contact ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                      className={`p-1 rounded-full ${
                        contact.favorited_contact 
                          ? 'text-yellow-500 hover:text-yellow-600' 
                          : 'text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <svg className="h-5 w-5" fill={contact.favorited_contact ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {contact.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Telefone:</span> {contact.telefone}
                    </p>
                    {contact.empresa && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Empresa:</span> {contact.empresa}
                      </p>
                    )}
                    {contact.cargo && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Cargo:</span> {contact.cargo}
                      </p>
                    )}
                    {contact.observacoes && (
                      <p className="text-sm text-gray-700 line-clamp-2">{contact.observacoes}</p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => router.push(`/contacts/${contact.id}/edit`)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
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
