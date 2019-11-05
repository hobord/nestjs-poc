import { ObjectType, Field } from 'type-graphql';
import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

@ObjectType({description: 'Authentication response with JWT token'})
export class AuthResult {
  @Field({description: 'JWT token'})
  @ApiModelProperty({description: 'JWT token'})
  @IsString()
  // tslint:disable-next-line:variable-name
  readonly access_token: string;

  @Field({description: 'JWT refresh token'})
  @ApiModelProperty({description: 'JWT refresh token'})
  @IsString()
  // tslint:disable-next-line:variable-name
  readonly refresh_token: string;
}
