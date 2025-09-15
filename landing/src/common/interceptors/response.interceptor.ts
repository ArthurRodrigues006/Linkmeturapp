import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseDto } from '../dto/api-response.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponseDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponseDto<T>> {
    const request = context.switchToHttp().getRequest();
    
    return next.handle().pipe(
      map(data => {
        // Se já é uma resposta formatada, retorna como está
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        // Se é um array, pode ser uma lista paginada
        if (Array.isArray(data)) {
          return ApiResponseDto.success(data, 'Dados recuperados com sucesso');
        }

        // Se tem dados, retorna sucesso
        if (data !== null && data !== undefined) {
          return ApiResponseDto.success(data, 'Operação realizada com sucesso');
        }

        // Resposta vazia
        return ApiResponseDto.success(undefined, 'Operação realizada com sucesso');
      })
    );
  }
}
