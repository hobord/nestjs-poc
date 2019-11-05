import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUserRole } from '../interfaces/user-role.interface';

@Entity({ name: 'user_roles' })
export class UserRoleModel implements IUserRole {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  userID: string;

  @Column()
  roleName: string;

  @Column()
  createAt: Date;
}
