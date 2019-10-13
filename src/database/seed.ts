import { SeederAppModule } from './seeder-app.module';
import { NestFactory } from '@nestjs/core';
import { Seeder } from './seeders/seeder';
import { Migration } from './migration.module';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederAppModule)
    .then(async appContext => {
      const logger = appContext.get('NestWinston');
      appContext.useLogger(logger);

      const migration = appContext.get(Migration);
      await migration.runMigrations();

      const seeder = appContext.get(Seeder);
      seeder
        .seed()
        .then(() => {
          logger.debug('Seeding complete!');
        })
        .catch(error => {
          logger.error('Seeding failed!');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch(error => {
      throw error;
    });
}

bootstrap();
