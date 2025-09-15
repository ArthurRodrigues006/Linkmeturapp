export class NotificationResponseDto {
  id!: string;
  titulo!: string;
  mensagem!: string;
  tipo!: string;
  lida!: boolean;
  metadata?: Record<string, any>;
  corp_id!: string;
  created_at!: Date;
  updated_at!: Date;
}
