import {
  IsString,
  IsEnum,
  IsOptional,
  IsObject,
  Length,
} from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @Length(1, 100)
  titulo!: string;

  @IsString()
  @Length(1, 500)
  mensagem!: string;

  @IsString()
  @IsEnum(['info', 'success', 'warning', 'error', 'system'])
  tipo!: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}