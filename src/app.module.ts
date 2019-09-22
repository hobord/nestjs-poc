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
import { CatsModule } from './cats/cats.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    JwksRsaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      signOptions: {
        expiresIn: 3600,
      },
    }),
    GraphQLModule.forRoot({
      // include: [CatsModule],
      // debug: false,
      // playground: false,
      // typePaths: ['./**/*.graphql'],
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ObjectidScalar, Logger, JwtStrategy],
})
export class AppModule {}
