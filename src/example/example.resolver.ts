import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ExampleService } from './example.service';
import { Example } from './dto/example.dto';
import { ExampleInput } from './dto/input-example.input';

@Resolver(of => Example)
export class ExampleResolver {
  constructor(
    private readonly exampleService: ExampleService,
  ) {}

  @Query(() => [Example], {nullable: true})
  async examples(): Promise<Example[]> {
    return this.exampleService.findAll();
  }

  @Query(() => Example, {nullable: true})
  async example(@Args('id') id: string): Promise<Example> {
    return this.exampleService.findOne(id);
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
