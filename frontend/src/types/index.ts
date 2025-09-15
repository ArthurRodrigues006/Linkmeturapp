export interface User {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  avatar_url?: string;
  nivel: number;
  corp_id: string;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  nome_servico: string;
  categoria: string;
  sub_categoria: string;
  descricao: string;
  min_valor: number;
  max_valor: number;
  views: number;
  total_views: number;
  video_url?: string;
  certificacoes: string[];
  disponibilidade: string[];
  publicado: boolean;
  fotos: JobPhoto[];
  corp_id: string;
  created_at: string;
  updated_at: string;
}

export interface JobPhoto {
  id: string;
  photo_url: string;
  photo_alt: string;
  created_at: string;
}

export interface Contact {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  cargo?: string;
  observacoes?: string;
  favorited_contact: boolean;
  corp_id: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'info' | 'success' | 'warning' | 'error';
  lida: boolean;
  metadata?: any;
  corp_id: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  success: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
