import { InputType, Field } from 'type-graphql';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class UserInput {
  @ApiModelProperty({nullable: false, description: 'UUID of user'})
  @Field({ nullable: false, description: 'UUID of user'})
  readonly id: string;

  @ApiModelProperty({ nullable: true, description: 'Users email'})
  @Field({ nullable: true, description: 'Users email'})
  @IsEmail()
  @IsNotEmpty()
  readonly email?: string;

  @ApiModelProperty({ nullable: true })
  @Field({ nullable: true })
  readonly name?: string;

  password?: string;

  passwordHash?: string;

  @ApiModelProperty({ nullable: true, description: 'assigned security roles' })
  @Field(type => [String], { nullable: true, description: 'assigned security roles'})
  roles?: string[];
}
