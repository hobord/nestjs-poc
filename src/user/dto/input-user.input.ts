import { InputType, Field } from 'type-graphql';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class UserInput {
  @ApiModelProperty({nullable: true, description: 'UUID of user'})
  @Field({ nullable: true, description: 'UUID of user'})
  readonly id?: string;

  @ApiModelProperty()
  @Field()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiModelProperty({ nullable: true })
  @Field({ nullable: true })
  readonly name?: string;

  @ApiModelProperty({ nullable: true })
  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  passwordHash?: string;

  @ApiModelProperty({ nullable: true, description: 'assigned security roles' })
  @Field(type => [String], { nullable: true, description: 'assigned security roles'})
  roles?: string[];
}
