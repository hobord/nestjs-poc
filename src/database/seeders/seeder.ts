import { Logger } from 'winston';
import { Injectable, Inject } from '@nestjs/common';
import { UserSeederService } from './user-seeder.service';
import { users as usersSeedData } from './data';
import { IUser } from '../../user/interfaces/user.interface';

@Injectable()
export class Seeder {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    private readonly userSeederSerice: UserSeederService,
  ) {}
  async seed() {
    await this.users(usersSeedData)
      .then(completed => {
        this.logger.log('info', 'Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
  }
  async users(users: IUser[]) {
    return await Promise.all(this.userSeederSerice.create(users))
      .then(createdUsers => {
        // Can also use this.logger.verbose('...');
        this.logger.log(
          'info',
          'No. of Users created : ' +
            // Remove all null values and return only created users.
            createdUsers.filter(
              nullValueOrCreatedUser => nullValueOrCreatedUser,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }
}
