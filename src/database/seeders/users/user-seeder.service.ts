import { Injectable } from '@nestjs/common';
import { IUser } from '../../../user/interfaces/user.interface';
import { User } from '../../../user/dto/user.dto';
import { UserService } from '../../../user/user.service';
import { UserCreateInput } from '../../../user/dto/user-create.input';

@Injectable()
export class UserSeederService {
  constructor(private readonly userService: UserService) {}

  /**
   * Seed all users.
   *
   * @function
   */
  create(users: IUser[]): Array<Promise<User>> {
    return users.map(async (user: IUser) => {
      return await this.userService
        .getByEmail(user.email)
        .then(async dbUser => {
          if (dbUser) {
            return Promise.resolve(null);
          }

          const userInput: UserCreateInput = {
            ...user,
          } as UserCreateInput;

          const createdUser = await this.userService.create(userInput);
          return Promise.resolve(createdUser);
        })
        .catch(error => Promise.reject(error));
    });
  }
}
