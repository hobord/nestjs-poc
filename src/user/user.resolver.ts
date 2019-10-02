import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './dto/user.dto';
import { UserInput } from './dto/input-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CurrentUser } from './user.decorator';
import { RolesGuard } from '../auth/graphql-roles.guard';
import { Roles } from '../auth/roles.decoraqtor';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Query(() => String)
  async userHello() {
    return 'hello';
  }

  @Query(returns => User)
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, RolesGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.userService.findOne(user.id);
  }

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id: string, @Args('input') input: UserInput) {
    return this.userService.update(id, input);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string) {
    return this.userService.delete(id);
  }
}
