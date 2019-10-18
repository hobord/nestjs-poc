import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ExampleService } from './example.service';
import { Example } from './dto/example.dto';
import { ExampleInput } from './dto/input-example.input';
import { PaginateInput } from '../common/pagination/paginate.input';
import { OrderByInput } from '../common/order/order-by.input';

@Resolver(of => Example)
export class ExampleResolver {
  constructor(
    private readonly exampleService: ExampleService,
  ) {}

  @Query(() => [Example], {nullable: true})
  async examples(
    @Args({name: 'paginate', type: () => PaginateInput, nullable: true}) paginate?: PaginateInput,
    @Args({name: 'orderby', type: () => [OrderByInput], nullable: true}) orderBy?: OrderByInput[],
  ): Promise<Example[]> {
    return this.exampleService.getAll(paginate, orderBy);
  }

  @Query(() => Example, {nullable: true})
  async example(@Args('id') id: string): Promise<Example> {
    return this.exampleService.getByID(id);
  }

  @Mutation(() => Example)
  async createExample(@Args('input') input: ExampleInput): Promise<Example> {
    return this.exampleService.create(input);
  }

  @Mutation(() => Example)
  async updateExample(@Args('id') id: string, @Args('input') input: ExampleInput): Promise<Example> {
    return this.exampleService.update(id, input);
  }

  @Mutation(() => Example)
  async deleteExample(@Args('id') id: string): Promise<Example> {
    return this.exampleService.delete(id);
  }
}
