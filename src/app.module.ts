import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WinstonModule } from 'nest-winston';
import { GraphqlConfigService } from './config/graphql-config.service';
import { AuthModule } from './auth/auth.module';
import { WinstonConfig } from './config/winston-config';
import { DatabaseProviderModule } from './database/database-provider.module';

@Module({
  imports: [
    WinstonModule.forRoot(WinstonConfig),
    DatabaseProviderModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    GraphQLModule.forRootAsync({
      useClass: GraphqlConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
