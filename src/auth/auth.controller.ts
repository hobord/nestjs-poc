import { Controller, Request, Post, UseGuards, Get, Body, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Roles } from './roles.decoraqtor';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiImplicitHeader, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthResult } from './dto/auth-result.dto';
import { AuthInput } from './dto/auth-input.dto';
import { IUser } from 'src/user/interfaces/user.interface';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ title: 'Login users', description: 'Login user'})
  @ApiOkResponse({ description: 'Login success.', type: AuthResult })
  @ApiUnauthorizedResponse({})
  async login(@Body() authInput: AuthInput, @Request() req): Promise<AuthResult> {
    return this.authService.getJwtToken(req.user as IUser);
  }

  @Get('refresh_token')
  @ApiOperation({ title: 'Refresh token', description: 'Refresh user token, header must contains the Bearer token'})
  @ApiImplicitHeader({ name: 'Authorization', required: true, description: 'JWT Bearer refresh token: Bearer xxxxxxxxx'})
  @ApiOkResponse({ description: 'Success.', type: AuthResult })
  @ApiUnauthorizedResponse({})
  @Roles('authenticated')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async refreshToken(@Request() req): Promise<AuthResult> {
    return this.authService.getJwtToken(req.user);
  }
}
