import { Module } from '@nestjs/common';
import { ExampleResolver } from './example.resolver';
import { ExampleService } from './example.service';
import { ExampleRepository } from './model/example.repository';
import { ExampleModelFactory } from './model/example-model.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleModel } from './model/example.entity';
import { ScalarsModule } from '../common/scalars/scalars.module';
import { RoleService } from '../auth/role.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ExampleModel]),
        AuthModule,
        ScalarsModule,
    ],
    providers: [ExampleModelFactory, ExampleRepository, ExampleResolver, ExampleService],
})
export class ExampleModule {
    constructor(private roleService: RoleService) {
        this.roleService.addRole({name: 'example', description: 'Example Role'});
    }
}
