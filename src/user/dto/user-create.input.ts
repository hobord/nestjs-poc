import { InputType, Field } from 'type-graphql';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class UserCreateInput {
  @ApiModelProperty()
  @Field()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiModelProperty({ nullable: true })
  @Field({ nullable: true })
  readonly name?: string;

  @ApiModelProperty({ nullable: false })
  @Field({ nullable: false })
  password: string;

  @ApiModelProperty({ nullable: true, description: 'assigned security roles' })
  @Field(type => [String], { nullable: true, description: 'assigned security roles'})
  roles?: string[];
}
