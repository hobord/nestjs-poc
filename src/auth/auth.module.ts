import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { RoleService } from './role.service';

@Global()
@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: 3600, // 1hr
      },
    }),
  ],
  providers: [AuthService, RoleService, JwtStrategy, LocalStrategy, AuthResolver],
  exports: [AuthService, RoleService],
})
export class AuthModule {
  constructor(private roleSerice: RoleService) {
    this.registerRoles();
  }

  registerRoles() {
    this.roleSerice.addRole({name: 'authenticated', description: 'All authenticated users'});
    this.roleSerice.addRole({name: 'root', description: 'Root level user'});
    this.roleSerice.addRole({
      name: 'usermanager',
      description: 'User manager Role',
    });
  }
}
