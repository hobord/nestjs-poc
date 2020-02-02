import { InputType, Field } from 'type-graphql';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

@InputType()
export class UserUpdateMeInput {
  @ApiModelProperty({ nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiModelProperty({ nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  name?: string;
}
