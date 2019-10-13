import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from './database-provider.module';
import { Seeder } from './seeders/seeder';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { WinstonConfig } from '../config/winston-config';
import { WinstonModule } from 'nest-winston';
import { UserSeederService } from './seeders/user-seeder.service';

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
    DatabaseProviderModule,
    UserModule,
  ],
  providers: [UserSeederService, Seeder],
  controllers: [],
})
export class SeederAppModule {}
