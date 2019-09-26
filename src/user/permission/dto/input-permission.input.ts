import { InputType, Field } from 'type-graphql';

@InputType()
export class PermissionInput {
  @Field()
  readonly name: string;

  @Field({ nullable: true })
  readonly description: string;
}
