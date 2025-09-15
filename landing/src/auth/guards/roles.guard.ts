import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (!user) {
      throw new ForbiddenException('Usuário não autenticado');
    }

    const hasRole = requiredRoles.some((role) => user.nivel >= this.getRoleLevel(role));
    
    if (!hasRole) {
      throw new ForbiddenException('Acesso negado. Nível de permissão insuficiente.');
    }

    return true;
  }

  private getRoleLevel(role: string): number {
    const roleLevels = {
      'user': 1,
      'moderator': 2,
      'admin': 3,
      'super_admin': 4,
    };
    
    return roleLevels[role] || 0;
  }
}
