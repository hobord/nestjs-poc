import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResult } from './dto/auth-result.dto';

@Resolver(of => AuthResult)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Query(() => AuthResult)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(username,  password);
    return this.authService.login(user);
  }

}
