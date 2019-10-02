import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { IUserRole } from '../interfaces/user-role.interface';

@Entity({name: 'user_roles'})
export class UserRoleModel implements IUserRole {
  @ObjectIdColumn()
  id?: string;

  @ObjectIdColumn()
  userId?: string;

  @Column()
  roleName: string;

  @Column()
  creationDate: Date;
}
