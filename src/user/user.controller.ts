import { Controller, Get,  Request, UseGuards, Post, Param, Body, Put, Delete, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../auth/roles.decoraqtor';
import { RestRolesGuard } from '../auth/rest-roles.guard';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiImplicitHeader, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserUpdateInput } from './dto/user-update.input';
import { UserCreateInput } from './dto/user-create.input';

@Controller('users')
@ApiUseTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiBearerAuth()
  @ApiImplicitHeader({ name: 'Authorization', required: true, description: 'JWT Bearer token: Bearer xxxxxxxxx'})
  @ApiOperation({ title: 'Get users', description: 'Get all users'})
  @ApiOkResponse({ description: 'Success.', type: [User] })
  @ApiUnauthorizedResponse({})
  @Roles('root', 'usermanager')
  @UseGuards(AuthGuard('jwt'), RestRolesGuard)
  async getUsers(@Request() req) {
    const users = await this.userService.getAll();
    users.map(user => delete user.passwordHash);
    return users;
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiImplicitHeader({ name: 'Authorization', required: true, description: 'JWT Bearer token: Bearer xxxxxxxxx'})
  @ApiOperation({ title: 'Get user', description: 'Get user by id'})
  @ApiOkResponse({ description: 'Success.', type: User })
  @ApiUnauthorizedResponse({})
  @Roles('root', 'usermanager')
  @UseGuards(AuthGuard('jwt'), RestRolesGuard)
  async getByID(@Param('id') id) {
    const user = await this.userService.getByID(id);
    user.roles = await this.userService.getUserRoleNames(user);
    delete user.passwordHash;
    return user;
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiImplicitHeader({ name: 'Authorization', required: true, description: 'JWT Bearer token: Bearer xxxxxxxxx'})
  @ApiOperation({ title: 'Who am I', description: 'Get current logged in user'})
  @ApiOkResponse({ description: 'Success.', type: User })
  @ApiUnauthorizedResponse({})
  @Roles('authenticated')
  @UseGuards(AuthGuard('jwt'), RestRolesGuard)
  getProfile(@Request() req) {
    return req.user;
  }

  @Post()
  @ApiBearerAuth()
  @ApiImplicitHeader({ name: 'Authorization', required: true, description: 'JWT Bearer token: Bearer xxxxxxxxx'})
  @ApiOperation({ title: 'Create user', description: 'Create a user'})
  @ApiOkResponse({ description: 'Success.', type: User })
  @ApiUnauthorizedResponse({})
  @Roles('root', 'usermanager')
  @UseGuards(AuthGuard('jwt'), RestRolesGuard)
  async create(@Body() createUserDto: UserCreateInput) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Post(':id')
  @ApiBearerAuth()
  @ApiImplicitHeader({ name: 'Authorization', required: true, description: 'JWT Bearer token: Bearer xxxxxxxxx'})
  @ApiOperation({ title: 'Update user', description: 'Update a user'})
  @ApiOkResponse({ description: 'Success.', type: User })
  @Roles('root', 'usermanager')
  @UseGuards(AuthGuard('jwt'), RestRolesGuard)
  async update(@Param('id') id, @Body() updateUser: UserUpdateInput) {
    const user = await this.userService.update(updateUser);
    return user;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiImplicitHeader({ name: 'Authorization', required: true, description: 'JWT Bearer token: Bearer xxxxxxxxx'})
  @ApiOperation({ title: 'Delete user', description: 'Delete a user'})
  @ApiOkResponse({ description: 'Success.', type: User })
  @ApiUnauthorizedResponse({})
  @Roles('root', 'usermanager')
  @UseGuards(AuthGuard('jwt'), RestRolesGuard)
  async delete(@Param('id') id) {
    const user = await this.userService.delete(id);
    return user;
  }
}
