import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { IUser } from '../interfaces/user.interface';
import { UserInput } from '../dto/input-user.input';
import { UserModel } from './user.entity';
import { UserModelFactory } from './user-model.factory';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
      @InjectRepository(UserModel)
      private readonly repository: Repository<UserModel>,
      private readonly modelFactory: UserModelFactory,
      ) {
  }
  async create(createUserDto: UserInput): Promise<IUser> {
    const model = this.modelFactory.create(createUserDto);
    return this.repository.save(model);
  }

  async findOne(id: string): Promise<IUser> {
    const model = await this.repository.findOne(id);
    return model;
  }

  async getByEmail(email: string): Promise<IUser> {
    const model = await this.repository.findOne({
      where: {
        email,
      },
    });
    return model;
  }

  async findAll(): Promise<IUser[]> {
    const models = await this.repository.find();
    return models;
  }
  async delete(id: string): Promise<IUser> {
    const model =  await this.repository.findOne(id);
    this.repository.delete(model);
    return model;
  }
  async update(id: string, data: IUser): Promise<IUser> {
    const updateData = {
      ...data,
      updateDate: new Date(),
    };
    let model =  await this.repository.findOne(id);
    model = Object.assign(model, updateData);
    return this.repository.save(model);
  }
}
