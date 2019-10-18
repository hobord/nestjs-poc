import { ObjectType, Field } from 'type-graphql';
import { IsString } from 'class-validator';

@ObjectType({description: 'Authentication response with JWT token'})
export class AuthResult {
  @Field({description: 'JWT token'})
  @IsString()
  // tslint:disable-next-line:variable-name
  readonly access_token: string;
}
