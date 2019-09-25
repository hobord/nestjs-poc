import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Query(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.login({username,  password});
  }

}
