import { Injectable, Inject } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { createComplexityLimitRule } from 'graphql-validation-complexity';
// import depthLimit from 'graphql-depth-limit';
import { toBool, getOsEnv, toNumber } from '../lib/env';
import { Logger } from 'winston';
// import { DeprecatedDirective, RestDirective, FormattableDateDirective } from '../common/directives';
// import { GraphQLSchema } from 'graphql';
// import { mergeSchemas } from 'graphql-tools';

let requestStartTime: Date;
let requestEndTime: Date;
let requestCount = 0;

// app inti was in blog 103340339
const complexityLimitRule = createComplexityLimitRule(toNumber(getOsEnv('GRAPHQL_COMPLEXITYLIMIT', '200000000')), {
  scalarCost: 1, // Default is 1
  objectCost: 0, // Default is 0.
  listFactor: 10, // Default is 10.
  introspectionListFactor: 2, // Default is 2
  onCost: (cost) => {
    if (toBool(getOsEnv('GRAPHQL_DEBUG'))) {
      this.logger.log('debug', 'query cost:' + cost);
    }
  },
  formatErrorMessage: cost => (
    `query with cost ${cost} exceeds complexity limit`
  ),
});

// const schemaDirectives = {
//   deprecated: DeprecatedDirective,
//   rest: RestDirective,
// };

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  constructor(@Inject('winston') private readonly logger: Logger) { }

  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      playground: true,
      autoSchemaFile: 'schema.gql',
      // directiveResolvers: [
      //   DeprecatedDirective,
      //   RestDirective,
      //   FormattableDateDirective,
      // ],
      // schemaDirectives,
      // transformSchema: async (schema: any) => {
			// 	console.log(schema);
			// 	return schema;
			// },
      // transformSchema: (schema: GraphQLSchema) => {
      //   return mergeSchemas({ schemas: [schema], schemaDirectives });
      // },
      context: ({res, req}) => {
        res.header('Cache-Control', 'no-cache');
        if (toBool(getOsEnv('GRAPHQL_DEBUG'))) {
          requestStartTime = new Date();
          this.logger.log('debug', 'Request#: ' + requestCount++);
          this.logger.log('debug', `#${requestCount} OperationName: ${req.body.operationName}`);
          this.logger.log('debug', `#${requestCount} Query: ${req.body.query}`);
          this.logger.log('debug', `#${requestCount} Variables: ` + JSON.stringify(req.body.variables));
        }
        return { req, user: req.user };
      },
      validationRules: [
        complexityLimitRule,
        // depthLimit(toNumber(getOsEnv('GRAPHQL_DEPTHLIMIT', '10'))),
      ],
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
