import { InputType, Field } from 'type-graphql';
import { IOrderByInput } from './order-by.input.interface';

@InputType({ description: 'order by column property in lists' })
export class OrderByInput implements IOrderByInput {
  @Field()
  column: string;

  @Field()
  desc: boolean;
}
