import { Logger } from 'winston';
import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class Migration {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    private readonly connection: Connection,
  ) {}

  async runMigrations() {
    this.logger.log('info', 'Migrations start');
    try {
      await this.connection.runMigrations({
        transaction: false,
      });
    } catch (error) {
      this.logger.log('error', error, error);
    }
    this.logger.log('info', 'Migrations end');
    this.connection.close();
  }
}
