import { Injectable, Inject } from '@nestjs/common';
import { IPermission } from './interfaces/permission.interface';
import { PermissionInput } from './dto/input-permission.input';
import { PermissionRepository } from './model/permission.repository';
import { IPermissionRepository } from './interfaces/permission-repository.interface';

@Injectable()
export class PermissionService {
  constructor(
    @Inject(PermissionRepository)
    private readonly repository: IPermissionRepository,
  ) {}

  async createPermission(
    createPermissionDto: PermissionInput,
  ): Promise<IPermission> {
    return await this.repository.createPermission(createPermissionDto);
  }

  async findAllPermission(): Promise<IPermission[]> {
    return await this.repository.findAllPermission();
  }

  async getPermissionById(id: string): Promise<IPermission> {
    return await this.repository.getPermissionById(id);
  }

  async deletePermission(id: string) {
    return await this.repository.deletePermission(id);
  }

  async updatePermission(
    id: string,
    permissionInput: PermissionInput,
  ): Promise<IPermission> {
    return await this.repository.updatePermission(id, permissionInput);
  }
}
