import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @Length(2, 100)
  nome= '';

  @IsEmail({}, { message: 'Email inválido' })
  email= '';

  @IsPhoneNumber('BR', { message: 'Telefone inválido (formato BR)' })
  telefone= '';

  @IsString()
  @IsOptional()
  @Length(2, 100)
  empresa?= '';

  @IsString()
  @IsOptional()
  @Length(2, 50)
  cargo?= '';

  @IsString()
  @IsOptional()
  @Length(0, 500)
  observacoes?= '';
}