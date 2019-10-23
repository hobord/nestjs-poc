import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RestAuthGuard } from './rest-auth.guard';
import { RestRolesGuard } from './rest-roles.guard';
import { Roles } from './roles.decoraqtor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('refresh_token')
  @UseGuards(RestAuthGuard, RestRolesGuard)
  @Roles('authenticated')
  async refreshToken(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('me')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
