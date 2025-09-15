// src/auth/dto/update-authentication.dto.ts
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAuthenticationDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  senha?= '';

  @IsOptional()
  token_recuperacao?= '';

  @IsOptional()
  expiracao_token?= new Date();

  @IsOptional()
  email_verificado?= false;

  @IsOptional()
  codigo_2fa?= '';

  @IsOptional()
  dois_fatores_ativo?= false;
}
