import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WinstonModule } from 'nest-winston';
import { GraphqlConfigService } from './config/graphql-config.service';
import { ExampleModule } from './example/example.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfig } from './config/typeorm-config';
import { WinstonConfig } from './config/winston-config';

@Module({
  imports: [
    WinstonModule.forRoot(WinstonConfig),
    TypeOrmModule.forRoot(TypeOrmConfig),
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    GraphQLModule.forRootAsync({
      useClass: GraphqlConfigService,
    }),
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
