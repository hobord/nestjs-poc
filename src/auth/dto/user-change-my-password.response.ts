import { Field,  ObjectType } from 'type-graphql';

@ObjectType()
export class UserChangeMyPasswordResponse {
  @Field({ nullable: false, description: 'User current password change was successfull' })
  success: boolean;
}
