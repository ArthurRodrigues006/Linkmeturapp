export class ContactResponseDto {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  cargo?: string;
  observacoes?: string;
  favorited_contact: boolean;
  corp_id: string;
  created_at: Date;
  updated_at: Date;
}
