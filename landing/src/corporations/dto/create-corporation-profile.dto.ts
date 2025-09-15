// dto/create-corporation-profile.dto.ts
import { IsString, IsUrl, IsOptional, IsArray, IsJSON } from 'class-validator';

export class CreateCorporationProfileDto {
  @IsUrl({ protocols: ['http', 'https'] })
  @IsOptional()
  logo_url?= '';

  @IsUrl({ protocols: ['http', 'https'] })
  @IsOptional()
  banner_url?= '';

  @IsUrl({ protocols: ['http', 'https'] })
  @IsOptional()
  site?= '';

  @IsString()
  @IsOptional()
  descricao?= '';

  @IsString()
  @IsOptional()
  sobre?= '';

  @IsJSON({ each: true })
  @IsOptional()
  horario?: Record<string, string>;

  @IsArray({ each: true })
  @IsUrl({ protocols: ['http', 'https'] })
  @IsOptional()
  galeria?= [];

  @IsUrl()
  @IsOptional()
  instagram?= '';

  @IsUrl()
  @IsOptional()
  facebook?= '';

  @IsUrl()
  linkedin?= '';

  @IsUrl()
  @IsOptional()
  youtube?= '';

  @IsUrl()
  @IsOptional()
  twitter?= '';

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  certificacoes?= [];
}
