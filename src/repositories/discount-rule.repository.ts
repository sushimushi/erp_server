import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {DiscountRule, DiscountRuleRelations, Register, DiscountRuleRegister, Discount, DiscountRuleDiscount, Category, DiscountRuleCategory} from '../models';
import {DiscountRuleRegisterRepository} from './discount-rule-register.repository';
import {RegisterRepository} from './register.repository';
import {DiscountRuleDiscountRepository} from './discount-rule-discount.repository';
import {DiscountRepository} from './discount.repository';
import {DiscountRuleCategoryRepository} from './discount-rule-category.repository';
import {CategoryRepository} from './category.repository';

export class DiscountRuleRepository extends DefaultCrudRepository<
  DiscountRule,
  typeof DiscountRule.prototype.discountRuleId,
  DiscountRuleRelations
> {

  // public readonly registers: HasManyThroughRepositoryFactory<Register, typeof Register.prototype.registerId,
  //         DiscountRuleRegister,
  //         typeof DiscountRule.prototype.discountRuleId
  //       >;

  // public readonly discounts: HasManyThroughRepositoryFactory<Discount, typeof Discount.prototype.discountId,
  //         DiscountRuleDiscount,
  //         typeof DiscountRule.prototype.discountRuleId
  //       >;

  // public readonly selectedCategories: HasManyThroughRepositoryFactory<Category, typeof Category.prototype.categoryId,
  //         DiscountRuleCategory,
  //         typeof DiscountRule.prototype.discountRuleId
  //       >;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, //@repository.getter('DiscountRuleRegisterRepository') protected discountRuleRegisterRepositoryGetter: Getter<DiscountRuleRegisterRepository>, @repository.getter('RegisterRepository') protected registerRepositoryGetter: Getter<RegisterRepository>, @repository.getter('DiscountRuleDiscountRepository') protected discountRuleDiscountRepositoryGetter: Getter<DiscountRuleDiscountRepository>, @repository.getter('DiscountRepository') protected discountRepositoryGetter: Getter<DiscountRepository>, @repository.getter('DiscountRuleCategoryRepository') protected discountRuleCategoryRepositoryGetter: Getter<DiscountRuleCategoryRepository>, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(DiscountRule, dataSource);
    // this.selectedCategories = this.createHasManyThroughRepositoryFactoryFor('selectedCategories', categoryRepositoryGetter, discountRuleCategoryRepositoryGetter,);
    // this.registerInclusionResolver('selectedCategories', this.selectedCategories.inclusionResolver);
    // this.discounts = this.createHasManyThroughRepositoryFactoryFor('discounts', discountRepositoryGetter, discountRuleDiscountRepositoryGetter,);
    // this.registerInclusionResolver('discounts', this.discounts.inclusionResolver);
    // this.registers = this.createHasManyThroughRepositoryFactoryFor('registers', registerRepositoryGetter, discountRuleRegisterRepositoryGetter,);
    // this.registerInclusionResolver('registers', this.registers.inclusionResolver);
  }
}
