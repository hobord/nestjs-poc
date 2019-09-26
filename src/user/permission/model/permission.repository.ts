import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPermissionRepository } from '../interfaces/permission-repository.interface';
import { IPermission } from '../interfaces/permission.interface';
import { PermissionInput } from '../dto/input-permission.input';
import { PermissionModel } from './permission.entity';
import { PermissionModelFactory } from './permission-model.factory';
import { PermissionRoleModel } from './permission-role.entity';
import { PermissionRoleModelFactory } from './permission-role-model.factory';

@Injectable()
export class PermissionRepository implements IPermissionRepository {
  constructor(
    @InjectRepository(PermissionModel)
    private readonly permissionRepository: Repository<PermissionModel>,
    @InjectRepository(PermissionRoleModel)
    private readonly roleRepository: Repository<PermissionRoleModel>,
    private readonly permissionModelFactory: PermissionModelFactory,
    private readonly roleModelFactory: PermissionRoleModelFactory,
  ) {}
  async createPermission(
    createPermissionDto: PermissionInput,
  ): Promise<IPermission> {
    const model = this.permissionModelFactory.create(createPermissionDto);
    return this.permissionRepository.save(model);
  }

  async getPermissionById(id: string): Promise<IPermission> {
    const model = await this.permissionRepository.findOne(id);
    return model;
  }
  async findAllPermission(): Promise<IPermission[]> {
    const models = await this.permissionRepository.find();
    return models;
  }
  async deletePermission(id: string): Promise<IPermission> {
    const model = await this.permissionRepository.findOne(id);
    this.permissionRepository.delete(model);
    return model;
  }
  async updatePermission(id: string, data: IPermission): Promise<IPermission> {
    const updateData = {
      ...data,
      updateDate: new Date(),
    };
    let model = await this.permissionRepository.findOne(id);
    model = Object.assign(model, updateData);
    return this.permissionRepository.save(model);
  }

  async createPermissionRole(
    createPermissionRoleDto: PermissionInput,
  ): Promise<IPermission> {
    const model = this.roleModelFactory.create(createPermissionRoleDto);
    return this.roleRepository.save(model);
  }

  async getPermissionRoleById(id: string): Promise<IPermission> {
    const model = await this.roleRepository.findOne(id);
    return model;
  }
  async findAllPermissionRole(): Promise<IPermission[]> {
    const models = await this.roleRepository.find();
    return models;
  }
  async deletePermissionRole(id: string): Promise<IPermission> {
    const model = await this.roleRepository.findOne(id);
    this.roleRepository.delete(model);
    return model;
  }
  async updatePermissionRole(
    id: string,
    data: IPermission,
  ): Promise<IPermission> {
    const updateData = {
      ...data,
      updateDate: new Date(),
    };
    let model = await this.roleRepository.findOne(id);
    model = Object.assign(model, updateData);
    return this.roleRepository.save(model);
  }
}
