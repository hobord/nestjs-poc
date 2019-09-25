import { UserModel } from './user.entity';
import { Injectable } from '@nestjs/common';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserModelFactory {
  create(data ?: Partial < IUser>): IUser {
    const now =  new Date();
    const createData = {
      ...data,
      creationDate: now,
      updateDate: now,
    };
    const model = new UserModel();
    return Object.assign(model, createData);
  }
}
