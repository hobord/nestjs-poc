import { SeederAppModule } from './seeder-app.module';
import { NestFactory } from '@nestjs/core';
import { Seeder } from './seeders/seeder';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederAppModule)
    .then(appContext => {
      const logger = appContext.get('NestWinston');
      appContext.useLogger(logger);

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
