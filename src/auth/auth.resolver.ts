import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResult } from './dto/auth-result.dto';
import { Role } from './dto/role.dto';
import { RoleService } from './role.service';
import { Roles } from './roles.decoraqtor';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './graphql-auth.guard';
import { GqlRolesGuard } from './graphql-roles.guard';
import { CurrentUser } from '../user/user.decorator';
import { User } from '../user/dto/user.dto';

@Resolver(of => AuthResult)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
  ) {}

  @Query(() => AuthResult, {description: 'Login into the system'})
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(username,  password);
    return this.authService.login(user);
  }

  @Query(() => AuthResult, {description: 'Renew the jwt token'})
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles('authenticated')
  async refreshToken(@CurrentUser() user: User) {
    return this.authService.login(user);
  }

  @Query(() => [Role], {description: 'Get all roles names what are exists in the system'})
  async authRoles(): Promise<Role[]> {
    return await this.roleService.getRoles();
  }
}
