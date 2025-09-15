import { Corporation } from 'src/corporations/entities/corporation.entity';

export type ReadChatDTO = {
  conteudo= '';
  remetenteId= '';
  remetenteNome= '';
  destinatarioId= '';
  remetente!: Corporation;
  destinatario!: Corporation;
  id= '';
  created_at= new Date();
  updated_at= new Date();
};
