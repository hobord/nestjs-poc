import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IExample } from '../interfaces/example.interface';

@Entity({ name: 'example' })
export class ExampleModel implements IExample {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  readonly title: string;

  @Column()
  readonly createAt: Date;

  @Column()
  readonly updateAt: Date;
}
