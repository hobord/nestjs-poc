import { IUser } from './user.interface';
import { UserInput } from '../dto/input-user.input';

export interface IUserRepository {
  create(createUserDto: UserInput): Promise<IUser>;
  findOne(id: string): Promise<IUser>;
  getByEmail(email: string): Promise<IUser>;
  findAll(paginate?): Promise<IUser[]>;
  delete(id: string): Promise<IUser>;
  update(id: string, data: IUser): Promise<IUser>;
}
