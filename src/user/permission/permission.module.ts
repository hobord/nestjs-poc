import { Module } from '@nestjs/common';
import { PermissionResolver } from './permission.resolver';
import { PermissionService } from './permission.service';
import { PermissionRepository } from './model/permission.repository';
import { PermissionModelFactory } from './model/permission-model.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModel } from './model/permission.entity';
import { PermissionRoleModel } from './model/permission-role.entity';
import { ScalarsModule } from '../../common/scalars/scalars.module';
import { PermissionRoleModelFactory } from './model/permission-role-model.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermissionModel, PermissionRoleModel]),
    ScalarsModule,
  ],
  providers: [
    PermissionModelFactory,
    PermissionRoleModelFactory,
    PermissionRepository,
    PermissionService,
    PermissionResolver,
  ],
  exports: [PermissionService],
})
export class PermissionModule {}
