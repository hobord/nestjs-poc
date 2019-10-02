import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IExampleRepository } from '../interfaces/example-repository.interface';
import { IExample } from '../interfaces/example.interface';
import { ExampleInput } from '../dto/input-example.input';
import { ExampleModel } from './example.entity';
import { ExampleModelFactory } from './example-model.factory';

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

  async findOne(id: string): Promise<IExample> {
    const model = await this.repository.findOne(id);
    return model;
  }
  async findAll(): Promise<IExample[]> {
    const models = await this.repository.find();
    return models;
  }
  async delete(id: string): Promise<IExample> {
    const model = await this.repository.findOne(id);
    this.repository.delete(model);
    return model;
  }
  async update(id: string, example: IExample): Promise<IExample> {
    const updateData = {
      ...example,
      updateDate: new Date(),
    };
    let model = await this.repository.findOne(id);
    model = Object.assign(model, updateData);
    return this.repository.save(model);
  }
}
