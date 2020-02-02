import { PermissionRuleInput } from '../dto/permission.input';
import { IPermissionRule } from './permission-rule.interface';

export interface IPermissionRuleRepository {
  createRule(createPermissionDto: PermissionRuleInput): Promise<IPermissionRule>;
  getAllRulesByEntityID(entityID: string): Promise<IPermissionRule[]>;
  deleteRule(id: string): Promise<IPermissionRule>;
}
