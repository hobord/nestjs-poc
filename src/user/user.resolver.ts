import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Root,
} from '@nestjs/graphql';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { User } from './dto/user.dto';
import { UserInput } from './dto/input-user.input';
import { UserService } from './user.service';
import { CurrentUser } from './user.decorator';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { GqlRolesGuard } from '../auth/graphql-roles.guard';
import { Roles } from '../auth/roles.decoraqtor';
import { PaginateInput } from '../common/pagination/paginate.input';
import { OrderByInput } from '../common/order/order-by.input';
import { UserCreateInput } from './dto/user-create.input';
import { UserUpdateInput } from './dto/user-update.input';
import { UserUpdateMeInput } from './dto/user-update-me.input';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @Query(() => String, {description: 'example query'})
  // async userHello() {
  //   return 'hello';
  // }

  @Query(returns => User, {description: 'Get the current authenticated user. Access roles:[authenticated]'})
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.userService.getByID(user.id);
  }

  @Query(() => [User], {description: 'List of users. Access roles:[authenticated]'})
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, GqlRolesGuard) // { nullable: true }, 'paginate'
  async users(
    @Args({name: 'paginate', type: () => PaginateInput, nullable: true}) paginate?: PaginateInput,
    @Args({name: 'orderby', type: () => [OrderByInput], nullable: true}) orderBy?: OrderByInput[],
    ) {
    return this.userService.getAll(paginate, orderBy);
  }

  @Query(() => User, {description: 'Get user by id. Access roles:[authenticated]'})
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async user(@Args('id') id: string) {
    return this.userService.getByID(id);
  }

  @ResolveProperty(() => Roles, {description: 'Get user\'s roles. Access roles:[authenticated]'})
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async roles(
    @Root() user: User,
  ): Promise<string[]> {
    return await this.userService.getUserRoleNames(user);
  }

  @Mutation(() => User, {description: 'Create a user. Access roles:[root, usermanager]'})
  @Roles('root', 'usermanager')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async createUser(@Args('input', new ValidationPipe()) input: UserCreateInput) {
    return this.userService.create(input);
  }

  @Mutation(() => User, {description: 'Update a user. Access roles:[root, usermanager]'})
  @Roles('root', 'usermanager')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async updateUser(@Args('user', new ValidationPipe()) user: UserUpdateInput) {
    return this.userService.update(user);
  }

  @Mutation(() => User, {description: 'Update the current authenticated user. Access roles:[authenticated]'})
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async updateMe(@CurrentUser() user: User, @Args('userData', new ValidationPipe()) userData: UserUpdateMeInput) {
    const updateData = {
      id: user.id,
      ...userData,
    };
    return this.userService.update(updateData);
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
    const user = await this.userService.getByID(userInput.id);
    return this.userService.addUserRole(user, roleName);
  }

  @Mutation(() => User, {description: 'Revoke a permission role into the user. Access roles:[root, usermanager]'})
  @Roles('root', 'usermanager')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async removeRoleFromUser(
    @Args('roleName') roleName: string,
    @Args('user') userInput: UserInput,
  ) {
    const user = await this.userService.getByID(userInput.id);
    return this.userService.removeUserRole(user, roleName);
  }
}
