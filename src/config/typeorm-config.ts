import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getOsEnv, toBool } from '../lib/env';

export const TypeOrmConfig = {
  type: getOsEnv('TYPEORM_TYPE', 'mongodb'),
  host: getOsEnv('TYPEORM_HOST', 'mongo'),
  username: getOsEnv('TYPEORM_USERNAME', 'dbuser'),
  password: getOsEnv('TYPEORM_PASSWORD', 'secret'),
  database: getOsEnv('TYPEORM_DATABASE', 'nestjs'),
  port: getOsEnv('TYPEORM_PORT', '27017'),
  sslValidate: toBool(getOsEnv('TYPEORM_SSLVALIDATE', 'false')),
  entities: [join(__dirname, '..', '**/**.entity{.ts,.js}')],
  migrations: [join(__dirname, '..', 'db', 'migration', '**/*.ts')],
  subscribers: [join(__dirname, '..', 'db', 'subscriber', '**/*.ts')],
  synchronize: toBool(getOsEnv('TYPEORM_SYNCHRONIZE', 'true')),
  logging: getOsEnv('TYPEORM_LOGGING', 'false'),
  connectTimeout: 20000,
  extra: { connectionLimit: 50 },
  // logging: 'all',
} as TypeOrmModuleOptions;
