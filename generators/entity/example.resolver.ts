import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ExampleService } from './example.service';
import { Example } from './dto/example.dto';
import { ExampleInput } from './dto/input-example.input';

@Resolver()
export class ExampleResolver {
  constructor(
    private readonly exampleService: ExampleService,
  ) {}

  @Query(() => String)
  async exampleHello() {
    return 'hello';
  }

  @Query(() => [Example])
  async examples() {
    return this.exampleService.findAll();
  }

  @Query(() => Example)
  async example(@Args('id') id: string) {
    return this.exampleService.findOne(id);
  }

  @Mutation(() => Example)
  async createExample(@Args('input') input: ExampleInput) {
    return this.exampleService.create(input);
  }

  @Mutation(() => Example)
  async updateExample(@Args('id') id: string, @Args('input') input: ExampleInput) {
    return this.exampleService.update(id, input);
  }

  @Mutation(() => Example)
  async deleteExample(@Args('id') id: string) {
    return this.exampleService.delete(id);
  }
}
