import { ObjectType, Field, ID } from 'type-graphql';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

@ObjectType()
export class User {

  @Field(() => ID, {description: 'UUID'})
  @IsString()
  @ApiModelProperty({nullable: false, description: 'UUID of user'})
  readonly id?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({nullable: false, description: 'Email of user'})
  readonly email?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({nullable: false, description: 'User full name'})
  readonly name?: string;

  @Field(type => [String], { nullable: true, description: 'assigned security roles' })
  @ApiModelProperty({nullable: false, description: 'User security roles'})
  readonly roles?: string[];

  @Field({ nullable: true })
  @ApiModelProperty({nullable: false, description: 'User creation timestamp'})
  readonly createAt?: Date;

  @Field({ nullable: true })
  @ApiModelProperty({nullable: false, description: 'User update timestamp'})
  readonly updateAt?: Date;
}
