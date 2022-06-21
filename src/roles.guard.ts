import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
const matchRoles = (roles: string[], userRoles: string[]) => {
  console.log('roles === userRoles', roles === userRoles);

  return roles === userRoles;
};
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('roles', roles);

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request?.user;
    console.log('user==============', user);
    if (matchRoles(roles, user?.roles)) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
