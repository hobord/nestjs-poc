import { IExample } from './example.interface';
import { ExampleInput } from '../dto/input-example.input';
import { IPaginate } from '../../common/pagination/paginate.interface';
import { IOrderByInput } from '../../common/order/order-by.input.interface';

export interface IExampleRepository {
  create(createExampleDto: ExampleInput): Promise<IExample>;
  getByID(id: string): Promise<IExample>;
  getAll(paginate?: IPaginate, orderBy?: IOrderByInput[]): Promise<IExample[]>;
  delete(id: string): Promise<IExample>;
  update(id: string, example: IExample): Promise<IExample>;
}
