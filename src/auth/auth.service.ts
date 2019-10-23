import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../user/interfaces/user.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    @Inject('winston') private readonly logger: Logger,
  ) {}

  async validateUser(username: string, pass: string): Promise<IUser> {
    const user = await this.usersService.getByEmail(username);
    if (user) {
      const userPasswordHash = await this.usersService.getUserPasswordHash(user.id);
      if (await this.usersService.compareHash(pass, userPasswordHash)) {
        const { passwordHash, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: IUser) {
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    } as JwtPayload;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
