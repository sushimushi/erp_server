import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Discount, DiscountRelations, DiscountRule, DiscountRuleDiscount, Category, DiscountRuleCategory} from '../models';
import {DiscountRuleDiscountRepository} from './discount-rule-discount.repository';
import {DiscountRuleRepository} from './discount-rule.repository';
import {DiscountRuleCategoryRepository} from './discount-rule-category.repository';
import {CategoryRepository} from './category.repository';

export class DiscountRepository extends DefaultCrudRepository<
  Discount,
  typeof Discount.prototype.discountId,
  DiscountRelations
> {

  public readonly discountRuleDiscount: HasManyThroughRepositoryFactory<DiscountRule, typeof DiscountRule.prototype.discountRuleId,
          DiscountRuleDiscount,
          typeof Discount.prototype.discountId
        >;

  public readonly selectedCategories: HasManyThroughRepositoryFactory<Category, typeof Category.prototype.categoryId,
          DiscountRuleCategory,
          typeof Discount.prototype.discountId
        >;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('DiscountRuleDiscountRepository') protected discountRuleDiscountRepositoryGetter: Getter<DiscountRuleDiscountRepository>, @repository.getter('DiscountRuleRepository') protected discountRuleRepositoryGetter: Getter<DiscountRuleRepository>, @repository.getter('DiscountRuleCategoryRepository') protected discountRuleCategoryRepositoryGetter: Getter<DiscountRuleCategoryRepository>, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Discount, dataSource);
    this.selectedCategories = this.createHasManyThroughRepositoryFactoryFor('selectedCategories', categoryRepositoryGetter, discountRuleCategoryRepositoryGetter,);
    this.registerInclusionResolver('selectedCategories', this.selectedCategories.inclusionResolver);
    this.discountRuleDiscount = this.createHasManyThroughRepositoryFactoryFor('discountRuleDiscount', discountRuleRepositoryGetter, discountRuleDiscountRepositoryGetter,);
    this.registerInclusionResolver('discountRuleDiscount', this.discountRuleDiscount.inclusionResolver);
  }
}
