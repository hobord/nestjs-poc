import { Module, Logger } from '@nestjs/common';
import { DatabaseProviderModule } from './database-provider.module';
import { Seeder } from './seeders/seeder';
import { UserModule } from '../user/user.module';
import { WinstonConfig } from '../config/winston-config';
import { WinstonModule } from 'nest-winston';
import { UserService } from '../user/user.service';
import { RoleService } from '../auth/role.service';
import { UserRoleRepository } from '../user/model/user-role.repository';
import { UserSeederService } from './seeders/user-seeder.service';
import { UserSeederModule } from './seeders/user-seeder.module';

/**
 * Import and provide seeder classes.
 *
 * @module
 */

 /*
@Module({
  imports: [
    WinstonModule.forRoot(WinstonConfig),
    DatabaseProviderModule,
    UserModule,
  ], // , LanguageSeederModule
  providers: [DatabaseProviderModule, UserSeederService, Seeder], // , Logger, Seeder],
  // exports: [Seeder],
})
export class SeederModule {
  constructor() {
    // console.log('hi');
  }
}
*/

@Module({
  imports: [
    WinstonModule.forRoot(WinstonConfig),
    // TypeOrmModule.forRoot(TypeOrmConfig),
    DatabaseProviderModule,
    UserModule,
    UserSeederModule,
  ],
  providers: [UserSeederService, Seeder],
  controllers: [],
})
export class SeederModule {}
