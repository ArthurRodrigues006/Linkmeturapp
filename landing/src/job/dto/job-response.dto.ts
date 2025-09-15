// src/jobs/dto/job-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { JobPhotoResponseDto } from './job-photo-response.dto';

export class JobResponseDto {
  @ApiProperty()
  id= '';

  @ApiProperty()
  nome_servico= '';

  @ApiProperty()
  categoria= '';

  @ApiProperty()
  sub_categoria= '';

  @ApiProperty()
  descricao= '';

  @ApiProperty()
  min_valor= 0;

  @ApiProperty()
  max_valor= 0;

  @ApiProperty()
  views= 0;

  @ApiProperty()
  total_views= 0;

  @ApiProperty()
  video_url= '';

  @ApiProperty({ type: [String] })
  certificacoes= [];

  @ApiProperty({ type: [String] })
  disponibilidade: string[] = [];

  @ApiProperty()
  publicado= false;

  @ApiProperty({ type: [JobPhotoResponseDto] })
  fotos= [];

  @ApiProperty({ type: String })
  corp_id= '';

  @ApiProperty()
  created_at= new Date();

  @ApiProperty()
  updated_at= new Date();
}
