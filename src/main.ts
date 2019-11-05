import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getOsEnv } from './lib/env';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  const logger: Logger = app.get('NestWinston');
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  // Swagger start
  const options = new DocumentBuilder()
    .setTitle('Banner tools api')
    .setDescription('Banner tools rest backend')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  // Swagger end

  const port = getOsEnv('PORT', '8080');
  logger.log('App binding to port:' + port, 'AppModule');
  await app.listen(port);

}
bootstrap();
