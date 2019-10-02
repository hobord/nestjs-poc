import { IExample } from './example.interface';
import { ExampleInput } from '../dto/input-example.input';

export interface IExampleRepository {
  create(createExampleDto: ExampleInput): Promise<IExample>;
  findOne(id: string): Promise<IExample>;
  findAll(): Promise<IExample[]>;
  delete(id: string): Promise<IExample>;
  update(id: string, example: IExample): Promise<IExample>;
}
