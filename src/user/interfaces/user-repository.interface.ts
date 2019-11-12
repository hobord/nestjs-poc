import { IUser } from './user.interface';
import { UserInput } from '../dto/input-user.input';
import { IPaginate } from '../../common/pagination/paginate.interface';
import { IOrderByInput } from '../../common/order/order-by.input.interface';
import { UserUpdateInput } from '../dto/user-update.input';

export interface IUserRepository {
  create(createUserDto: UserInput): Promise<IUser>;
  getByID(id: string): Promise<IUser>;
  getByEmail(email: string): Promise<IUser>;
  getAll(paginate?: IPaginate, orderBy?: IOrderByInput[]): Promise<IUser[]>;
  delete(id: string): Promise<IUser>;
  update(id: string, data: UserUpdateInput): Promise<IUser>;
}
