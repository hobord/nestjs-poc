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
    return await this.repository.findAll(paginate);
  }

  async findOne(id: string): Promise<IUser> {
    return await this.repository.findOne(id);
  }

  async getByEmail(email: string): Promise<IUser> {
    return await this.repository.getByEmail(email);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }

  async update(id: string, userInput: UserInput): Promise<IUser> {
    return await this.repository.update(id, userInput);
  }

  private async getHash(password: string | undefined): Promise<string> {
    return argon2.hash(password);
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
