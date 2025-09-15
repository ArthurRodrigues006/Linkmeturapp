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
  nome: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsPhoneNumber('BR', { message: 'Telefone inválido (formato BR)' })
  telefone: string;

  @IsString()
  @IsOptional()
  @Length(2, 100)
  empresa?: string;

  @IsString()
  @IsOptional()
  @Length(2, 50)
  cargo?: string;

  @IsString()
  @IsOptional()
  @Length(0, 500)
  observacoes?: string;
}