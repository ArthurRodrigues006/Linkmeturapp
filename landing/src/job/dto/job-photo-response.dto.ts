// src/jobs/dto/job-photo-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class JobPhotoResponseDto {
  @ApiProperty()
  id= '';

  @ApiProperty()
  photo_url= '';

  @ApiProperty()
  photo_alt= '';

  @ApiProperty()
  created_at= new Date();
}
