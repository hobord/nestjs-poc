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

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel, UserRoleModel]),
    ScalarsModule, // TODO: remove ???
  ],
  providers: [UserModelFactory, UserRepository, UserRoleRepository, UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
