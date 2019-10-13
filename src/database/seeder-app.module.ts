import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from './database-provider.module';
import { Seeder } from './seeders/seeder';
import { UserModule } from '../user/user.module';
import { WinstonConfig } from '../config/winston-config';
import { WinstonModule } from 'nest-winston';
import { UserSeederService } from './seeders/users/user-seeder.service';

/**
 * Import and provide seeder classes.
 *
 * @module
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
