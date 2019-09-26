import { ObjectType, Field, ID } from 'type-graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@ObjectType()
export class PermissionRole {
  @Field(() => ID)
  @IsString()
  readonly id?: string;

  @Field({ nullable: true })
  @IsString()
  // @IsNotEmpty()
  readonly name?: string;
}
