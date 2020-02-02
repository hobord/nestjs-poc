import { InputType, Field } from 'type-graphql';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

@InputType()
export class UserUpdateInput {
  @ApiModelProperty({ nullable: false, description: 'UUID of user' })
  @Field({ nullable: false, description: 'UUID of user'})
  readonly id: string;

  @ApiModelProperty({ nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiModelProperty({ nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @ApiModelProperty({ nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  password?: string;

  @ApiModelProperty({ nullable: true, description: 'assigned security roles' })
  @Field(type => [String], { nullable: true, description: 'assigned security roles'})
  @IsOptional()
  roles?: string[];
}
