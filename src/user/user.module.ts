import { Module, Global } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserRepository } from './model/user.repository';
import { UserModelFactory } from './model/user-model.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './model/user.entity';
import { ScalarsModule } from '../common/scalars/scalars.module';
import { UserRoleRepository } from './model/user-role.repository';
import { UserRoleModel } from './model/user-role.entity';
import { RoleService } from '../auth/role.service';
import { UserController } from './user.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserModel, UserRoleModel])],
  providers: [
    UserModelFactory,
    UserRepository,
    UserRoleRepository,
    UserResolver,
    UserService,
    RoleService,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
