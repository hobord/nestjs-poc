import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './dto/user.dto';
import { UserInput } from './dto/input-user.input';
import { UserService } from './user.service';
import { CurrentUser } from './user.decorator';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { GqlRolesGuard } from '../auth/graphql-roles.guard';
import { Roles } from '../auth/roles.decoraqtor';
import { PaginateInput } from '../common/pagination/paginate.input';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String, {description: 'example query'})
  async userHello() {
    return 'hello';
  }

  @Query(returns => User, {description: 'Get the current authenticated user. Access roles:[authenticated]'})
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.userService.findOne(user.id);
  }

  @Query(() => [User], {description: 'List of users. Access roles:[authenticated]'})
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, GqlRolesGuard) // { nullable: true }, 'paginate'
  async users(@Args({name: 'paginate', type: () => PaginateInput, nullable: true}) paginate?: PaginateInput) {
    return this.userService.findAll(paginate);
  }

  @Query(() => User, {description: 'Get user by id. Access roles:[authenticated]'})
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async user(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @ResolveProperty(() => Roles, {description: 'Get user\'s roles. Access roles:[authenticated]'})
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async roles(@CurrentUser() user: User): Promise<string[]> {
    return await this.userService.getUserRoleNames(user);
  }

  @Mutation(() => User, {description: 'Create a user. Access roles:[root, usermanager]'})
  @Roles('root', 'usermanager')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async createUser(@Args('input') input: UserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => User, {description: 'Update a user. Access roles:[root, usermanager]'})
  @Roles('root', 'usermanager')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async updateUser(@Args('id') id: string, @Args('input') input: UserInput) {
    return this.userService.update(id, input);
  }

  @Mutation(() => User, {description: 'Update the current authenticated user. Access roles:[authenticated]'})
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async updateMe(@CurrentUser() user: User, @Args('input') input: UserInput) {
    return this.userService.update(user.id, input);
  }

  @Mutation(() => User, {description: 'Delete a user. Access roles:[root, usermanager]'})
  @Roles('root', 'usermanager')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async deleteUser(@Args('id') id: string) {
    return this.userService.delete(id);
  }

  @Mutation(() => User, {description: 'Assign a permission role into the user. Access roles:[root, usermanager]'})
  @Roles('root', 'usermanager')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async addRoleToUser(
    @Args('roleName') roleName: string,
    @Args('user') userInput: UserInput,
  ) {
    const user = await this.userService.findOne(userInput.email);
    return this.userService.addUserRole(user, roleName);
  }

  @Mutation(() => User, {description: 'Revoke a permission role into the user. Access roles:[root, usermanager]'})
  @Roles('root', 'usermanager')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async removeRoleFromUser(
    @Args('roleName') roleName: string,
    @Args('user') userInput: UserInput,
  ) {
    const user = await this.userService.findOne(userInput.email);
    return this.userService.removeUserRole(user, roleName);
  }
}
