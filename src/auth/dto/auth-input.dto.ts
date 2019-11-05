import { ObjectType, Field } from 'type-graphql';
import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

@ObjectType({description: 'Authentication input for JWT token'})
export class AuthInput {
  @Field({description: 'username'})
  @ApiModelProperty({description: 'username'})
  @IsString()
  readonly username: string;

  @Field({description: 'password'})
  @ApiModelProperty({description: 'password'})
  @IsString()
  readonly password: string;
}
