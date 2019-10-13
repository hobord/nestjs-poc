import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUserRole } from '../interfaces/user-role.interface';

@Entity({ name: 'user_roles' })
export class UserRoleModel implements IUserRole {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  userId: string;

  @Column()
  roleName: string;

  @Column()
  creationDate: Date;
}
