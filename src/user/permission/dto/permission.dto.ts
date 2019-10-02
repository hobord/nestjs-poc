import { ObjectType, Field, ID } from 'type-graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@ObjectType()
export class Permission {
  @Field(() => ID)
  @IsString()
  readonly id?: string;

  @Field({ nullable: true })
  @IsString()
  // @IsNotEmpty()
  readonly name?: string;

  @Field({ nullable: true })
  @IsString()
  readonly description?: string;

  @Field({ nullable: true })
  creationDate?: Date;

  @Field({ nullable: true })
  updateDate?: Date;
}
