import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPermissionRule } from '../interfaces/permission-rule.interface';

@Entity({ name: 'permissions' })
export class PermissionRuleModel implements IPermissionRule {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  readonly entityID: string;

  @Column()
  readonly roleName: string;

  @Column()
  permission: string;
}
