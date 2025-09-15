// src/proposal/dto/create-proposal.dto.ts
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProposalPhotoDto } from './create-proposal-photo.dto';

export class CreateProposalDto {
  @IsString()
  rfp_id= '';

  @IsString()
  @IsOptional()
  resumo_proposta?= '';

  @IsNumber()
  valor_proposta= 0;

  @IsString()
  @IsOptional()
  observacoes?= '';

  @IsOptional()
  @IsDate()
  prazo?= new Date();

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProposalPhotoDto)
  @IsOptional()
  fotos?: CreateProposalPhotoDto[];
}
