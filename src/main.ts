import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getOsEnv } from './lib/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  app.useLogger(app.get('NestWinston'));
  app.useGlobalPipes(new ValidationPipe());

  const port = getOsEnv('PORT', '8080');
  await app.listen(port);

}
bootstrap();
