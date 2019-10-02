import { InputType, Field } from 'type-graphql';
import { IPaginate } from './paginate.interface';

@InputType()
export class PaginateInput implements IPaginate {
  @Field()
  readonly limit: number;

  @Field({ nullable: true })
  offset?: number;
}
