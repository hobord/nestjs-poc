import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IPermission } from '../interfaces/permission.interface';

@Entity({ name: 'permission' })
export class PermissionModel implements IPermission {
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
