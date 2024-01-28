import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {RegisterDiscountRule, RegisterDiscountRuleRelations} from '../models';

export class RegisterDiscountRuleRepository extends DefaultCrudRepository<
  RegisterDiscountRule,
  typeof RegisterDiscountRule.prototype.registerId,
  RegisterDiscountRuleRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(RegisterDiscountRule, dataSource);
  }
}
