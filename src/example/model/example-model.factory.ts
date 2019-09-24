import { ExampleModel } from './example.entity';
import { Injectable } from '@nestjs/common';
import { IExample } from '../interfaces/example.interface';

@Injectable()
export class ExampleModelFactory {
  create(data?: Partial<IExample>): IExample {
    const now =  new Date();
    const createData = {
      ...data,
      creationDate: now,
      updateDate: now,
    };
    const model = new ExampleModel();
    return Object.assign(model, createData);
  }
}
