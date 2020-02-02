import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResult } from './dto/auth-result.dto';
import { Role } from './dto/role.dto';
import { RoleService } from './role.service';
import { Roles } from './roles.decoraqtor';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { GqlAuthGuard } from './graphql-auth.guard';
import { GqlRolesGuard } from './graphql-roles.guard';
import { CurrentUser } from '../user/user.decorator';
import { User } from '../user/dto/user.dto';
import { UserChangeMyPasswordInput } from './dto/user-change-my-password.input';
import { UserChangeMyPasswordResponse } from './dto/user-change-my-password.response';

@Resolver(of => AuthResult)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
  ) {}

  @Mutation(() => AuthResult, {description: 'Login into the system'})
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(username,  password);
    return this.authService.getJwtToken(user);
  }

  @Mutation(() => AuthResult, {description: 'Renew the jwt token'})
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles('authenticated')
  async refreshToken(@CurrentUser() user: User) {
    return this.authService.getJwtToken(user);
  }

  @Query(() => [Role], {description: 'Get all roles names what are exists in the system'})
  async authRoles(): Promise<Role[]> {
    return await this.roleService.getRoles();
  }

  @Mutation(() => UserChangeMyPasswordResponse, {description: 'Update the current authenticated user. Access roles:[authenticated]'})
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async updateMyPassword(@CurrentUser() user: User, @Args('input', new ValidationPipe()) input: UserChangeMyPasswordInput) {
    const validUser = await this.authService.validateUser(user.email,  input.currentPassword);
    if (validUser) {
      const success = await this.authService.updatePassword(validUser, input.newPassword);
      if (success) {
        return {
          success: true,
        } as UserChangeMyPasswordResponse;
      }
    }
    return {
      success: false,
    } as UserChangeMyPasswordResponse;
  }
}
