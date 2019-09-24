import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {
    const schema = await buildSchema({
        resolvers: [
          // __dirname + 'common/scalars/*.ts',
          // __dirname + '/**/*.resolver.ts',
        ],
        // skipCheck: true,
        // automatically create `schema.gql` file with schema definition in current folder
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
      }).catch((err) => {
        Logger.log(err);
      }) as GraphQLSchema;

    return {
      schema,
      debug: true,
      playground: true,
      context: ({ req }) => ({ req }),
    };
  }
}
