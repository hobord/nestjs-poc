import { IPermissionRuleRepository } from '../interfaces/permission-rule-repository.interface';
import { Injectable } from '@nestjs/common';
import { PermissionRuleInput } from '../dto/permission.input';
import { IPermissionRule } from '../interfaces/permission-rule.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionRuleModel } from './permission-rule.entity';

@Injectable()
export class PermissionRuleRepository implements IPermissionRuleRepository {

  constructor(
    @InjectRepository(PermissionRuleModel)
    private readonly repository: Repository<PermissionRuleModel>,
  ) {}

  async createRule(createPermissionRuleDto: PermissionRuleInput): Promise<IPermissionRule> {
    const createData = {
      ...createPermissionRuleDto,
    };
    const model = this.repository.create(createData);
    return this.repository.save(model);
  }
  async getAllRulesByEntityID(entityID: string): Promise<IPermissionRule[]> {
    const rules = this.repository.find({
      entityID,
    });

    return rules;
  }
  async deleteRule(id: string): Promise<IPermissionRule> {
    const model = await this.repository.findOne(id);
    this.repository.delete(model);
    return model;
  }
}
