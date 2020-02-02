import { PermissionRuleRepository } from './model/permission-rule-repository';
import { IPermissionRuleRepository } from './interfaces/permission-rule-repository.interface';
import { Injectable, Inject } from '@nestjs/common';
import { IUser } from 'src/user/interfaces/user.interface';
import { IPermissionRule } from './interfaces/permission-rule.interface';
import { PermissionRuleInput } from './dto/permission.input';

@Injectable()
export class PermissionService {
  constructor(
    @Inject(PermissionRuleRepository) private readonly repository: IPermissionRuleRepository,
  ) {}

  private filterByRoles(entityPermissions: IPermissionRule[], roles) {
    return entityPermissions.filter(permission => {
      return roles.lastIndexOf(permission.roleName) >= 0;
    });
  }

  async canAccess(user: IUser, entityID: string, permission: string): Promise<boolean> {
    const entityPermissions = await this.repository.getAllRulesByEntityID(entityID);
    if (user.roles) {
      if (user.roles.indexOf('root') >= 0) {
        return true;
      }
      const filteredPermission = this.filterByRoles(entityPermissions, user.roles);
      const access = filteredPermission.reduce( (result, value) => {
        return result || value.permission === permission;
      }, false);
      return access;
    }
    return false;
  }

  async createRule(entityID: string, roleName: string, permission: string): Promise<IPermissionRule> {
    const ruleData = {
      entityID,
      roleName,
      permission,
    } as PermissionRuleInput;
    const rule = await this.repository.createRule(ruleData);
    return rule;
  }

  async deleteRule(entityID: string) {
    return await this.repository.deleteRule(entityID);
  }

  async deleteEntityRules(entityID: string) {
    const entityPermissions = await this.repository.getAllRulesByEntityID(entityID);
    const promises = entityPermissions.map(async rule => {
      return await this.deleteRule(rule.id);
    });
    return await Promise.all(promises);
  }

}
