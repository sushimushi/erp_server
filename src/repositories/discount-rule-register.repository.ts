import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {DiscountRuleRegister, DiscountRuleRegisterRelations} from '../models';

export class DiscountRuleRegisterRepository extends DefaultCrudRepository<
  DiscountRuleRegister,
  typeof DiscountRuleRegister.prototype.discountRuleId,
  DiscountRuleRegisterRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(DiscountRuleRegister, dataSource);
  }
}
