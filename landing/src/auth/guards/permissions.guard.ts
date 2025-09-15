import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (!user) {
      throw new ForbiddenException('Usuário não autenticado');
    }

    // Verificar se o usuário tem as permissões necessárias
    const hasPermission = requiredPermissions.every(permission => 
      this.userHasPermission(user, permission)
    );
    
    if (!hasPermission) {
      throw new ForbiddenException('Acesso negado. Permissão insuficiente.');
    }

    return true;
  }

  private userHasPermission(user: any, permission: string): boolean {
    // Lógica para verificar permissões baseada no nível do usuário
    const permissionLevels = {
      'read:users': 1,
      'write:users': 2,
      'delete:users': 3,
      'read:jobs': 1,
      'write:jobs': 1,
      'delete:jobs': 2,
      'read:contacts': 1,
      'write:contacts': 1,
      'delete:contacts': 2,
      'read:notifications': 1,
      'write:notifications': 2,
      'delete:notifications': 3,
      'read:corporations': 1,
      'write:corporations': 2,
      'delete:corporations': 3,
      'admin:system': 4,
    };

    const requiredLevel = permissionLevels[permission] || 0;
    return user.nivel >= requiredLevel;
  }
}
