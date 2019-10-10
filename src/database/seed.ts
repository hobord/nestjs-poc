import { SeederAppModule } from './seeder-app.module';
import { NestFactory } from '@nestjs/core';
import { Seeder } from './seeders/seeder';

async function bootstrap() {

  // , {
  //   logger: false,
  // }

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

/*
  const app = await NestFactory.create(SeederModule, {
    logger: false,
  });
  console.log('hi2');
  const logger = app.get('NestWinston');
  app.useLogger(logger);
  app.init();

  const seeder = app.get(Seeder);
  seeder
    .seed()
    .then(() => {
      logger.log('info', 'Seeding complete!');
    })
  .catch(error => {
    logger.log('error', 'Seeding failed!');
    throw error;
  })
  .finally(() => app.close());
*/

}

bootstrap();
