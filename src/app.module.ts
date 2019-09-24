import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtStrategy } from './auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwksRsaModule } from './jwks-rsa/jwks-rsa.module';
import { ObjectidScalar } from './common/scalars/objectid.scalar';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { join } from 'path';
import { GraphqlConfigService } from './graphql-config.service';
import { ExampleModule } from './example/example.module';
// import { ScalarsModule } from './common/scalars/scalars.module';
// import { DateScalar } from './common/scalars/date.scalar';

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
    AuthModule,
    JwksRsaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      signOptions: {
        expiresIn: 3600,
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger, JwtStrategy], // ScalarsModule
})
export class AppModule {}
