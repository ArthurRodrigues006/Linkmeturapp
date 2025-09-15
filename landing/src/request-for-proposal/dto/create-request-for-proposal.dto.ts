// src/request-for-proposal/dto/create-rfp.dto.ts
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  IsEnum,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRequestPhotoDto } from './create-request-photo.dto';

export class CreateRfpDto {
  @IsString()
  titulo: string = '';

  @IsString()
  descricao: string = '';

  @IsString()
  detalhes: string = '';

  @IsNumber()
  valor_medio: number = 0;

  @IsString()
  @IsEnum(['aberto', 'fechado', 'direcionado'])
  tipo: string = '';

  @IsOptional()
  @IsDate()
  prazo?= new Date();

  @IsOptional()
  @IsString()
  job_id?= '';

  @IsOptional()
  @IsString()
  prestador_id?= '';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRequestPhotoDto)
  @IsOptional()
  fotos?: CreateRequestPhotoDto[];
}
