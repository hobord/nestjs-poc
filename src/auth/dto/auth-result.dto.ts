import { ObjectType, Field } from 'type-graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class AuthResult {
  @Field()
  @IsString()
  // tslint:disable-next-line:variable-name
  readonly access_token: string;
}
