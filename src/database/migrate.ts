import { SeederAppModule } from './seeder-app.module';
import { NestFactory } from '@nestjs/core';
import { Migration } from './migration.module';
import { Logger } from 'winston';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(
    SeederAppModule,
  );

  const logger: Logger = appContext.get('NestWinston');
  appContext.useLogger(logger);

  logger.log('Migration app starting', 'Migration');
  const migration = appContext.get(Migration);
  await migration.runMigrations();

  await appContext.close();
}

bootstrap();
