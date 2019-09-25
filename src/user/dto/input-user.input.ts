import { InputType, Field } from 'type-graphql';

@InputType()
export class UserInput {
    @Field()
    readonly email: string;

    @Field()
    password?: string;

    @Field({ nullable: true })
    passwordHash?: string;
}
