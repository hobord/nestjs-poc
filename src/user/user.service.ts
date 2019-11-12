import { Injectable, Inject, Logger } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { UserInput } from './dto/input-user.input';
import { UserRepository } from './model/user.repository';
import { IUserRepository } from './interfaces/user-repository.interface';
import * as argon2 from 'argon2';
import { UserRoleRepository } from './model/user-role.repository';
import { IPaginate } from '../common/pagination/paginate.interface';
import { IOrderByInput } from '../common/order/order-by.input.interface';
import { UserUpdateInput } from './dto/user-update.input';
import { UserCreateInput } from './dto/user-create.input';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @Inject(UserRepository) private readonly repository: IUserRepository,
    @Inject(UserRoleRepository)
    private readonly roleRepository: UserRoleRepository,
  ) {}

  async create(createUserDto: UserCreateInput): Promise<IUser> {
    const updateData = {
      ...createUserDto,
    } as UserInput;
    updateData.passwordHash = await this.getHash(createUserDto.password);

    // clear  password as we don't persist passwords
    updateData.password = undefined;

    const user = await this.repository.create(updateData);

    if (updateData.roles && updateData.roles.length > 0) {
      for (const role of updateData.roles) {
        await this.addUserRole(user, role);
      }
    }
    user.roles = await this.getUserRoleNames(user);

    return user;
  }

  async getAll(paginate?: IPaginate, orderBy?: IOrderByInput[]): Promise<IUser[]> {
    const users = await this.repository.getAll(paginate, orderBy);
    users.map(async user => {
      delete user.passwordHash;
      user.roles = await this.getUserRoleNames(user);
    });
    return users;
  }

  async getByID(id: string): Promise<IUser> {
    const user = await this.repository.getByID(id);
    if (user) {
      delete user.passwordHash;
      user.roles = await this.getUserRoleNames(user);
    }
    return user;
  }

  async getByEmail(email: string): Promise<IUser> {
    const user = await this.repository.getByEmail(email);
    if (user) {
      delete user.passwordHash;
      user.roles = await this.getUserRoleNames(user);
    }
    return user;
  }

  async delete(id: string) {
    const user = await this.repository.delete(id);
    if (user) {
      delete user.passwordHash;
    }
    return user;
  }

  async update(userInput: UserUpdateInput): Promise<IUser> {
    const updateData = {
      ...userInput,
    } as UserInput;
    if (userInput.password) {
      updateData.passwordHash = await this.getHash(userInput.password);
    }

    const user = await this.repository.update(userInput.id, updateData);
    if (user) {
      delete user.passwordHash;
      user.roles = await this.getUserRoleNames(user);
    }
    return user;
  }

  private async getHash(password: string | undefined): Promise<string> {
    return argon2.hash(password);
  }

  async getUserPasswordHash(userId: string): Promise<string> {
    const userModel = await this.repository.getByID(userId);
    return userModel.passwordHash;
  }

  async compareHash(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    try {
      if (await argon2.verify(hash, password)) {
        this.logger.log('verification of user sucessful');
        return true;
      } else {
        this.logger.log('verification failed');
        return false;
      }
    } catch (err) {
      this.logger.log('argon2 error');
      return false;
    }
  }

  async getUserRoleNames(user: IUser): Promise<string[]> {
    const roles = await this.roleRepository.getByUser(user);
    const roleNames = roles.map(role => role.roleName);
    roleNames.push('authenticated');
    return roleNames;
  }

  async addUserRole(user: IUser, roleName: string): Promise<IUser> {
    await this.roleRepository.addRoleToUser(roleName, user);
    return user;
  }

  async removeUserRole(user: IUser, roleName: string): Promise<IUser> {
    await this.roleRepository.removeRoleFromUser(roleName, user);
    return user;
  }
}
