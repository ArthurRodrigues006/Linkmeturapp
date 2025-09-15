import { useState, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends ApiState<T> {
  execute: (url: string, options?: RequestInit) => Promise<T | null>;
  reset: () => void;
}

export const useApi = <T = any>(): UseApiReturn<T> => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (url: string, options: RequestInit = {}): Promise<T | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erro na requisição' }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setState({ data: null, loading: false, error: errorMessage });
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};

// Hook específico para operações CRUD
export const useCrud = <T = any>(baseUrl: string) => {
  const api = useApi<T[]>();
  const [item, setItem] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const list = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.execute(baseUrl);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      return null;
    } finally {
      setLoading(false);
    }
  }, [api, baseUrl]);

  const get = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.execute(`${baseUrl}/${id}`);
      setItem(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar item');
      return null;
    } finally {
      setLoading(false);
    }
  }, [api, baseUrl]);

  const create = useCallback(async (data: Partial<T>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.execute(baseUrl, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar item');
      return null;
    } finally {
      setLoading(false);
    }
  }, [api, baseUrl]);

  const update = useCallback(async (id: string, data: Partial<T>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.execute(`${baseUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar item');
      return null;
    } finally {
      setLoading(false);
    }
  }, [api, baseUrl]);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.execute(`${baseUrl}/${id}`, {
        method: 'DELETE',
      });
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir item');
      return false;
    } finally {
      setLoading(false);
    }
  }, [api, baseUrl]);

  return {
    data: api.data,
    item,
    loading: api.loading || loading,
    error: api.error || error,
    list,
    get,
    create,
    update,
    remove,
    reset: api.reset,
  };
};
