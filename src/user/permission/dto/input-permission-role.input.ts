import { InputType, Field } from 'type-graphql';

@InputType()
export class PermissionRoleInput {
  @Field()
  readonly name: string;

  @Field({ nullable: true })
  readonly description: string;
}
