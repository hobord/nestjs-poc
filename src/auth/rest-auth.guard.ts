import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RestAuthGuard extends AuthGuard('jwt') {

  handleRequest(err, user, info: Error) {
    // don't throw 401 error when unauthenticated
    return user;
  }

}
