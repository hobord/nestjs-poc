import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IExampleRepository } from '../interfaces/example-repository.interface';
import { IExample } from '../interfaces/example.interface';
import { ExampleInput } from '../dto/input-example.input';
import { ExampleModel } from './example.entity';
import { ExampleModelFactory } from './example-model.factory';
import { IPaginate } from '../../common/pagination/paginate.interface';
import { IOrderByInput } from '../../common/order/order-by.input.interface';

@Injectable()
export class ExampleRepository implements IExampleRepository {
  constructor(
    @InjectRepository(ExampleModel)
    private readonly repository: Repository<ExampleModel>,
    private readonly modelFactory: ExampleModelFactory,
  ) {}
  async create(createExampleDto: ExampleInput): Promise<IExample> {
    const model = this.modelFactory.create(createExampleDto);
    return this.repository.save(model);
  }

  async getByID(id: string): Promise<IExample> {
    const model = await this.repository.findOne(id);
    return model;
  }
  async getAll(paginate?: IPaginate, orderBy?: IOrderByInput[]): Promise<IExample[]> {
    const pager = {
      take: paginate && paginate.limit ? paginate.limit : 30,
      skip: paginate && paginate.offset ? paginate.offset : 0,
    };

    let order = { order: {}};
    if (orderBy) {
      order.order = {};
      for (const orderItem of orderBy) {
        order.order[orderItem.column] = orderItem.desc ? 'DESC' : 'ASC';
      }
    } else {
      order = {
        order: { name: 'ASC' },
      };
    }
    const models = await this.repository.find({
      where: {
        ...order,
      },
      ...pager,
    });
    return models;
  }
  async delete(id: string): Promise<IExample> {
    const model = await this.repository.findOne(id);
    this.repository.delete(model);
    return model;
  }
  async update(exampleId: string, exampleData: IExample): Promise<IExample> {
    const { id, ...data } = exampleData;
    const updateData = {
      ...data,
      updateAt: new Date(),
    };
    let model = await this.repository.findOne(exampleId);
    model = Object.assign(model, updateData);
    return this.repository.save(model);
  }
}
