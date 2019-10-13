import { SeederAppModule } from './seeder-app.module';
import { NestFactory } from '@nestjs/core';
import { Migration } from './migration.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(
    SeederAppModule,
  );

  const logger = appContext.get('NestWinston');
  appContext.useLogger(logger);

  const migration = appContext.get(Migration);
  await migration.runMigrations();

  await appContext.close();
  // console.log('hi');
  // process.exit();
  // process.kill(process.pid, 'SIGTERM');
}

bootstrap();
