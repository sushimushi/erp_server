import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {DiscountRuleCategory, DiscountRuleCategoryRelations} from '../models';

export class DiscountRuleCategoryRepository extends DefaultCrudRepository<
  DiscountRuleCategory,
  typeof DiscountRuleCategory.prototype.discountRuleCategory,
  DiscountRuleCategoryRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(DiscountRuleCategory, dataSource);
  }
}
