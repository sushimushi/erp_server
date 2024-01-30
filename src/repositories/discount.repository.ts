import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Discount, DiscountRelations, DiscountRule, DiscountRuleDiscount} from '../models';
import {DiscountRuleDiscountRepository} from './discount-rule-discount.repository';
import {DiscountRuleRepository} from './discount-rule.repository';

export class DiscountRepository extends DefaultCrudRepository<
  Discount,
  typeof Discount.prototype.discountId,
  DiscountRelations
> {

  public readonly discountRuleDiscount: HasManyThroughRepositoryFactory<DiscountRule, typeof DiscountRule.prototype.discountRuleId,
          DiscountRuleDiscount,
          typeof Discount.prototype.discountId
        >;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('DiscountRuleDiscountRepository') protected discountRuleDiscountRepositoryGetter: Getter<DiscountRuleDiscountRepository>, @repository.getter('DiscountRuleRepository') protected discountRuleRepositoryGetter: Getter<DiscountRuleRepository>,
  ) {
    super(Discount, dataSource);
    this.discountRuleDiscount = this.createHasManyThroughRepositoryFactoryFor('discountRuleDiscount', discountRuleRepositoryGetter, discountRuleDiscountRepositoryGetter,);
    this.registerInclusionResolver('discountRuleDiscount', this.discountRuleDiscount.inclusionResolver);
  }
}
