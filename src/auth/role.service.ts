import { Injectable, Scope } from '@nestjs/common';
import { Role } from './dto/role.dto';

@Injectable({ scope: Scope.DEFAULT })
export class RoleService {
  private roles: Role[] = [];

  addRole(role: Role) {
    this.roles.push(role);
  }

  getRoles(): Role[] {
    return this.roles;
  }
}
