import { Module } from '@nestjs/common';
import { TypeOrmConfig } from '../config/typeorm-config';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Import and provide base typeorm related classes.
 *
 * @module
 */
@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
  ],
})
export class DatabaseProviderModule {}
