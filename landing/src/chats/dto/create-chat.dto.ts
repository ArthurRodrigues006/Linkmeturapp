import { IsString, IsUUID } from 'class-validator';

export class CreateChatDto {
  @IsUUID()
  remetenteId= '';
  @IsUUID()
  destinatarioId= '';
  @IsString()
  conteudo= '';
  @IsString()
  remetenteNome= '';
}
