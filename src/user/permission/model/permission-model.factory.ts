import { PermissionModel } from './permission.entity';
import { Injectable } from '@nestjs/common';
import { IPermission } from '../interfaces/permission.interface';

@Injectable()
export class PermissionModelFactory {
  create(data ?: Partial < IPermission>): IPermission {
    const now =  new Date();
    const createData = {
      ...data,
      creationDate: now,
      updateDate: now,
    };
    const model = new PermissionModel();
    return Object.assign(model, createData);
  }
}
