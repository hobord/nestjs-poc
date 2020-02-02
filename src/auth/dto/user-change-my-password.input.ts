import { Field, InputType } from 'type-graphql';
import { ApiModelProperty } from '@nestjs/swagger';

@InputType()
export class UserChangeMyPasswordInput {
  @ApiModelProperty({ nullable: false, description: 'User current password' })
  @Field({ nullable: false, description: 'User current password' })
  currentPassword: string;

  @ApiModelProperty({ nullable: false, description: 'User new password' })
  @Field({ nullable: false, description: 'User new password' })
  newPassword: string;
}
