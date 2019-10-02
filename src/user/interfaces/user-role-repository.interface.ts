import { IUser } from './user.interface';
import { IUserRole } from './user-role.interface';

export interface IUserRoleRepository  {
  addRoleToUser(roleName: string, user: IUser): Promise<IUserRole>;
  getByUser(user: IUser): Promise<IUserRole[]>;
  removeRoleFromUser(roleName: string, user: IUser): Promise<IUserRole>;
}
