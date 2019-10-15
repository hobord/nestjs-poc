import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getOsEnv } from './lib/env';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  const logger: Logger = app.get('NestWinston');
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  const port = getOsEnv('PORT', '8080');
  logger.log('App binding to port:' + port, 'AppModule');
  await app.listen(port);

}
bootstrap();
