import { Global, Module } from '@nestjs/common';
import { PermissionRuleModel } from './model/permission-rule.entity';
import { PermissionRuleRepository } from './model/permission-rule-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionService } from './permission.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PermissionRuleModel])],
  providers: [
    PermissionRuleRepository,
    PermissionService,
  ],
  exports: [PermissionService],
})
export class PermissionModule {}
