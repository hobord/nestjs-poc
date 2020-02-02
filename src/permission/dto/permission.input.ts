import { IsString, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { InputType, Field } from 'type-graphql';

@InputType()
export class PermissionRuleInput {
  @ApiModelProperty({nullable: false, description: 'UUID of entity'})
  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false, description: 'UUID of entity'})
  readonly entityID: string;

  @ApiModelProperty({ nullable: false, description: 'Roles name who getting this permission'})
  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false, description: 'Roles name who getting this permission'})
  readonly roleName: string;

  @ApiModelProperty({ nullable: false, description: 'Assigned permission'})
  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false, description: 'Assigned permission'})
  readonly permission: string;
}
