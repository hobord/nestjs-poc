import { SeederAppModule } from './seeder-app.module';
import { NestFactory } from '@nestjs/core';
import { Seeder } from './seeders/seeder';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederAppModule)
    .then(async appContext => {
      const logger: Logger = appContext.get('NestWinston');
      appContext.useLogger(logger);

      logger.log('Seeder starting', 'SeederAppModule');

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
        .finally(async () => {
          await appContext.close();
          process.exit();
        });
    })
    .catch(error => {
      throw error;
    });
}

bootstrap();
