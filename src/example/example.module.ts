import { Module } from '@nestjs/common';
import { ExampleResolver } from './example.resolver';
import { ExampleService } from './example.service';
import { ExampleRepository } from './model/example.repository';
import { ExampleModelFactory } from './model/example-model.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleModel } from './model/example.entity';
import { ScalarsModule } from '../common/scalars/scalars.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ExampleModel]),
        ScalarsModule,
    ],
    providers: [ExampleModelFactory, ExampleRepository, ExampleResolver, ExampleService],
})
export class ExampleModule {}
