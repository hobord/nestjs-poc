import { InputType, Field } from 'type-graphql';

@InputType()
export class ExampleInput {
    @Field()
    readonly title: string;
}
