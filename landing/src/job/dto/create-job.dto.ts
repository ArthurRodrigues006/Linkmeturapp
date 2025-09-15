// src/jobs/dto/create-job.dto.ts
import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
  IsEnum,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateJobPhotosDto } from './create-job-photos.dto';

export class CreateJobDto {
  @IsString()
  nome_servico= '';

  @IsString()
  categoria= '';

  @IsString()
  sub_categoria= '';

  @IsString()
  descricao= '';

  @IsNumber()
  min_valor= 0;

  @IsNumber()
  max_valor= 0;

  @IsUrl()
  video_url= '';

  @IsArray()
  @IsString({ each: true })
  certificacoes= [];

  @IsString()
  @IsEnum(['disponível', 'indisponível', 'sob consulta'])
  disponibilidade= '';

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJobPhotosDto)
  fotos?: CreateJobPhotosDto[];

  // O `corp_id` virá do contexto (JWT ou header), não do body
}
