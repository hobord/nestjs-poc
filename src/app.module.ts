import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { ObjectidScalar } from './common/scalars/objectid.scalar';
import { GraphqlConfigService } from './graphql-config.service';
import { ExampleModule } from './example/example.module';
// import { ScalarsModule } from './common/scalars/scalars.module';
// import { DateScalar } from './common/scalars/date.scalar';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'mongo',
      username: 'dbuser',
      password: 'secret',
      database: 'nestjs',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
    }),
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    ExampleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger], // ScalarsModule
})
export class AppModule {}
