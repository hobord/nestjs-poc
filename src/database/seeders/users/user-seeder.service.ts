import { Injectable } from '@nestjs/common';
import { IUser } from '../../../user/interfaces/user.interface';
import { User } from '../../../user/dto/user.dto';
import { UserService } from '../../../user/user.service';
import { UserInput } from '../../../user/dto/input-user.input';

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

          const userInput: UserInput = {
            ...user,
          } as UserInput;

          const createdUser = await this.userService.create(userInput);
          return Promise.resolve(createdUser);
        })
        .catch(error => Promise.reject(error));
    });
  }
}
