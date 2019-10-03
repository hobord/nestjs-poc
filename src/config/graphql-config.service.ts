import { Injectable, Inject } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { toBool, getOsEnv } from '../lib/env';
import { Logger } from 'winston';

let requestStartTime: Date;
let requestEndTime: Date;
let requestCount = 0;

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  constructor(@Inject('winston') private readonly logger: Logger) { }

  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      playground: true,
      autoSchemaFile: 'schema.gql',
      // context: ({ req }) => ({ req, user: req.user }),
      context: ({res, req}) => {
        if (toBool(getOsEnv('GRAPHQL_DEBUG'))) {
          requestStartTime = new Date();
          this.logger.log('debug', 'Request#: ' + requestCount++);
          this.logger.log('debug', `#${requestCount} OperationName: ${req.body.operationName}`);
          this.logger.log('debug', `#${requestCount} Query: ${req.body.query}`);
          this.logger.log('debug', `#${requestCount} Variables: ` + JSON.stringify(req.body.variables));
        }
        return { req, user: req.user };
      },
      debug: toBool(getOsEnv('GRAPHQL_DEBUG')),
      tracing: toBool(getOsEnv('GRAPHQL_DEBUG')),
      formatResponse: (res, query) => {
        if (toBool(getOsEnv('GRAPHQL_DEBUG'))) {
          requestEndTime = new Date();
          this.logger.log('debug', `#${requestCount} Respond speed:` + (requestEndTime.getTime() - requestStartTime.getTime()));
        }
        return res;
      },
    };
  }
}
