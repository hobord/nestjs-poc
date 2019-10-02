import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const user = req.user;
    // const userRoles = user.roles;
    const userRoles = await this.userService.getUserRoleNames(user);
    const hasRole = () =>
      userRoles.some(role => !!roles.find(item => item === role));
    return userRoles && hasRole();
  }
}
