import { IPermission } from './permission.interface';
import { PermissionInput } from '../dto/input-permission.input';
import { IPermissionRole } from './permission-role.interface';
import { PermissionRoleInput } from '../dto/input-permission-role.input';

export interface IPermissionRepository {
  createPermission(createPermissionDto: PermissionInput): Promise<IPermission>;
  getPermissionById(id: string): Promise<IPermission>;
  findAllPermission(): Promise<IPermission[]>;
  deletePermission(id: string): Promise<IPermission>;
  updatePermission(id: string, data: IPermission): Promise<IPermission>;

  createPermissionRole(
    createPermissionRoleDto: PermissionRoleInput,
  ): Promise<IPermissionRole>;
  getPermissionRoleById(id: string): Promise<IPermissionRole>;
  findAllPermissionRole(): Promise<IPermissionRole[]>;
  deletePermissionRole(id: string): Promise<IPermissionRole>;
  updatePermissionRole(
    id: string,
    data: IPermissionRole,
  ): Promise<IPermissionRole>;
}
