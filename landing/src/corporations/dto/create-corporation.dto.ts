// dto/create-corporation.dto.ts
import {
  IsString,
  Length,
  IsOptional,
  IsArray,
  ValidateNested,
  IsPostalCode,
  IsEmail,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCorporationProfileDto } from './create-corporation-profile.dto';

export class CreateCorporationDto {
  @IsString()
  @Length(14, 14)
  cnpj= '';

  @IsString()
  @Length(2, 255)
  razao_social= '';

  @IsString()
  @Length(2, 255)
  @IsOptional()
  nome_fantasia?= '';

  @IsString()
  data_inicio_atividade= '';

  @IsString()
  @Length(7, 7)
  cnae_fiscal_principal= '';

  @IsString()
  @Length(2, 50)
  tipo= '';

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  tags?= [];

  @IsString()
  @Length(10, 20)
  telefone= '';

  @IsEmail()
  email= '';

  @IsPostalCode('BR')
  cep= '';

  @IsString()
  @Length(5, 255)
  endereco= '';

  @IsString()
  @IsOptional()
  numero?= '';

  @IsString()
  @IsOptional()
  bairro?= '';

  @IsString()
  @Length(2, 100)
  cidade= '';

  @IsString()
  @Length(2, 2)
  estado= '';

  @IsString()
  @IsOptional()
  pais?= '';

  @IsObject()
  @IsOptional()
  localizacao?: {
    x: number; // longitude
    y: number; // latitude
  };
  @ValidateNested()
  @Type(() => CreateCorporationProfileDto)
  @IsOptional()
  profile?: CreateCorporationProfileDto;
}
