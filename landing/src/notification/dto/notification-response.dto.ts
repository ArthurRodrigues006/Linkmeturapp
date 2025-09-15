export class NotificationResponseDto {
  id: string = '';
  titulo: string = '';
  mensagem: string = '';
  tipo: string = '';
  lida: boolean = false;
  metadata?: Record<string, any>;
  corp_id: string = '';
  created_at: Date = new Date();
  updated_at: Date = new Date();
}
