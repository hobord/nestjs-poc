import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from '../interfaces/user.interface';
import { UserRoleModel } from './user-role.entity';
import { IUserRole } from '../interfaces/user-role.interface';
import { IUserRoleRepository } from '../interfaces/user-role-repository.interface';

@Injectable()
export class UserRoleRepository implements IUserRoleRepository {
  constructor(
    @InjectRepository(UserRoleModel)
    private readonly repository: Repository<UserRoleModel>,
  ) {}

  async addRoleToUser(roleName: string, user: IUser): Promise<IUserRole> {
    const currentRoles = await this.getByUser(user);

    if (currentRoles) {
      const exists = currentRoles.findIndex(item => item.roleName === roleName);
      if (exists !== -1) {
        return currentRoles[exists];
      }
    }

    const userRole = this.createUserRoleModel({
      userId: user.id,
      roleName,
    });
    await this.repository.save(userRole);
    return userRole;
  }

  createUserRoleModel(data?: Partial<UserRoleModel>): UserRoleModel {
    const now = new Date();
    const createData = {
      userId: data.userId,
      roleName: data.roleName,
      createAt: now,
    };
    const model = new UserRoleModel();
    return Object.assign(model, createData);
  }

  async getByUser(user: IUser): Promise<IUserRole[]> {
    try {
      return (await this.repository.find({
        where: {
          userId: user.id,
        },
      })) as UserRoleModel[];
    } catch (error) {
      return [];
    }
  }

  async removeRoleFromUser(roleName: string, user: IUser): Promise<IUserRole> {
    const model = await this.repository.findOne({
      userId: user.id,
      roleName,
    });
    this.repository.delete(model);
    return model;
  }
}
