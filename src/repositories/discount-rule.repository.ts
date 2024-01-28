import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {DiscountRule, DiscountRuleRelations} from '../models';

export class DiscountRuleRepository extends DefaultCrudRepository<
  DiscountRule,
  typeof DiscountRule.prototype.discountRuleId,
  DiscountRuleRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(DiscountRule, dataSource);
  }
}
