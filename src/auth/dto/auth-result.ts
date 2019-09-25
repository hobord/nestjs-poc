import { ObjectType, Field, ID } from 'type-graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@ObjectType()
export class AuthResult {
  @Field()
  @IsString()
  // tslint:disable-next-line:variable-name
  readonly access_token: string;

}
