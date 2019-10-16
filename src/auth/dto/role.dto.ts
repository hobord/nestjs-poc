import { ObjectType, Field, ID } from 'type-graphql';
import { IsString } from 'class-validator';

@ObjectType({description: 'Security role'})
export class Role {
  @Field()
  @IsString()
  readonly name: string;

  @Field()
  @IsString()
  readonly description?: string;
}
