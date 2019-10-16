import { InputType, Field } from 'type-graphql';
import { IPaginate } from './paginate.interface';

@InputType({ description: 'pagination of the list' })
export class PaginateInput implements IPaginate {
  @Field()
  readonly limit: number;

  @Field({ nullable: true })
  offset?: number;
}
