import { PermissionModel } from './permission.entity';
import { Injectable } from '@nestjs/common';
import { IPermissionRole } from '../interfaces/permission-role.interface';

@Injectable()
export class PermissionRoleModelFactory {
  create(data?: Partial<IPermissionRole>): IPermissionRole {
    const now = new Date();
    const createData = {
      ...data,
      creationDate: now,
      updateDate: now,
    };
    const model = new PermissionModel();
    return Object.assign(model, createData);
  }
}
