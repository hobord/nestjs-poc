import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { Permission } from './dto/permission.dto';
import { PermissionInput } from './dto/input-permission.input';

@Resolver()
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query(() => String)
  async permissionHello() {
    return 'hello';
  }

  @Query(() => [Permission])
  async permissions() {
    return this.permissionService.findAllPermission();
  }

  @Query(() => Permission)
  async permission(@Args('id') id: string) {
    return this.permissionService.getPermissionById(id);
  }

  @Mutation(() => Permission)
  async createPermission(@Args('input') input: PermissionInput) {
    return this.permissionService.createPermission(input);
  }

  @Mutation(() => Permission)
  async updatePermission(
    @Args('id') id: string,
    @Args('input') input: PermissionInput,
  ) {
    return this.permissionService.updatePermission(id, input);
  }

  @Mutation(() => Permission)
  async deletePermission(@Args('id') id: string) {
    return this.permissionService.deletePermission(id);
  }
}
