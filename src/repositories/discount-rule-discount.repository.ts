import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {DiscountRuleDiscount, DiscountRuleDiscountRelations} from '../models';

export class DiscountRuleDiscountRepository extends DefaultCrudRepository<
  DiscountRuleDiscount,
  typeof DiscountRuleDiscount.prototype.id,
  DiscountRuleDiscountRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(DiscountRuleDiscount, dataSource);
  }
}
