export class ContactResponseDto {
  id= '';
  nome= '';
  email= '';
  telefone= '';
  empresa?= '';
  cargo?= '';
  observacoes?= '';
  favorited_contact= false;
  corp_id= '';
  created_at= new Date();
  updated_at= new Date();
}
