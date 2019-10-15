import { Controller, Get,  Request, UseGuards, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../auth/roles.decoraqtor';
import { RestRolesGuard } from '../auth/rest-roles.guard';
import { RestAuthGuard } from '../auth/rest-auth.guard';
import { UserInput } from './dto/input-user.input';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UseGuards(RestAuthGuard, RestRolesGuard)
  @Roles('root', 'usermanager')
  async getUsers(@Request() req) {
    const users = await this.userService.findAll();
    users.map(user => delete user.passwordHash);
    return users;
  }

  @Get(':id')
  @UseGuards(RestAuthGuard, RestRolesGuard)
  @Roles('root', 'usermanager')
  async findOne(@Param('id') id) {
    const user = await this.userService.findOne(id);
    user.roles = await this.userService.getUserRoleNames(user);
    delete user.passwordHash;
    return user;
  }

  @Get('me')
  @UseGuards(RestAuthGuard, RestRolesGuard)
  @Roles('authenticated')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post()
  @UseGuards(RestAuthGuard, RestRolesGuard)
  @Roles('root', 'usermanager')
  async create(@Body() createUserDto: UserInput) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Post(':id')
  @UseGuards(RestAuthGuard, RestRolesGuard)
  @Roles('root', 'usermanager')
  async update(@Param('id') id, @Body() updateUser: UserInput) {
    const user = await this.userService.update(id, updateUser);
    return user;
  }

  @Delete(':id')
  @UseGuards(RestAuthGuard, RestRolesGuard)
  @Roles('root', 'usermanager')
  async delete(@Param('id') id) {
    const user = await this.userService.delete(id);
    return user;
  }
}
