import { ObjectType, Field, ID } from 'type-graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => ID)
  @IsString()
  readonly id?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly email?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name?: string;

  @Field(type => [String], { nullable: true })
  readonly roles?: string[];

  @Field({ nullable: true })
  readonly createAt?: Date;

  @Field({ nullable: true })
  readonly updateAt?: Date;
}
