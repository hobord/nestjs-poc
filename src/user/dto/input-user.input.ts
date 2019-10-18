import { InputType, Field } from 'type-graphql';

@InputType()
export class UserInput {
  @Field({ nullable: true, description: 'UUID of user'})
  readonly id?: string;

  @Field()
  readonly email: string;

  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  passwordHash?: string;

  @Field(type => [String], { nullable: true, description: 'assigned security roles'})
  roles?: string[];
}
