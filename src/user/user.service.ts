import { Injectable, Inject, Logger } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { UserInput } from './dto/input-user.input';
import { UserRepository } from './model/user.repository';
import { IUserRepository } from './interfaces/user-repository.interface';
import * as argon2 from 'argon2';
import { UserRoleRepository } from './model/user-role.repository';
import { IPaginate } from '../common/pagination/paginate.interface';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @Inject(UserRepository) private readonly repository: IUserRepository,
    @Inject(UserRoleRepository)
    private readonly roleRepository: UserRoleRepository,
  ) {}

  async create(createUserDto: UserInput): Promise<IUser> {
    createUserDto.passwordHash = await this.getHash(createUserDto.password);

    // clear  password as we don't persist passwords
    createUserDto.password = undefined;

    const user = await this.repository.create(createUserDto);

    if (createUserDto.roles && createUserDto.roles.length > 0) {
      for (const role of createUserDto.roles) {
        await this.addUserRole(user, role);
      }
    }

    return user;
  }

  async findAll(paginate?: IPaginate): Promise<IUser[]> {
    const users = await this.repository.findAll(paginate);
    users.map(user => delete user.passwordHash);
    return users;
  }

  async findOne(id: string): Promise<IUser> {
    const user = await this.repository.findOne(id);
    delete user.passwordHash;
    return user;
  }

  async getByEmail(email: string): Promise<IUser> {
    const user = await this.repository.getByEmail(email);
    delete user.passwordHash;
    return user;
  }

  async delete(id: string) {
    const user = await this.repository.delete(id);
    delete user.passwordHash;
    return user;
  }

  async update(id: string, userInput: UserInput): Promise<IUser> {
    const user = await this.repository.update(id, userInput);
    delete user.passwordHash;
    return user;
  }

  private async getHash(password: string | undefined): Promise<string> {
    return argon2.hash(password);
  }

  async getUserPasswordHash(userId: string): Promise<string> {
    const userModel = await this.repository.findOne(userId);
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
