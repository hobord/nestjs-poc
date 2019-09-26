import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserRepository } from './model/user.repository';
import { UserModelFactory } from './model/user-model.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './model/user.entity';
import { ScalarsModule } from '../common/scalars/scalars.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    ScalarsModule,
    PermissionModule,
  ],
  providers: [UserModelFactory, UserRepository, UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
