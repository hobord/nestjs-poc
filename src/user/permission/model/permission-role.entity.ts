import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IPermissionRole } from '../interfaces/permission-role.interface';

@Entity({ name: 'permissionRole' })
export class PermissionRoleModel implements IPermissionRole {
  @ObjectIdColumn()
  id?: string;

  @Column()
  readonly name: string;

  @Column()
  readonly description: string;

  @Column()
  readonly creationDate: Date;

  @Column()
  readonly updateDate: Date;
}
