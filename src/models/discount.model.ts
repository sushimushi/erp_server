import {Entity, model, property, hasMany} from '@loopback/repository';
import {DiscountRule} from './discount-rule.model';
import {DiscountRuleDiscount} from './discount-rule-discount.model';
import {Category} from './category.model';
import {DiscountRuleCategory} from './discount-rule-category.model';

@model()
export class Discount extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  discountId?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @hasMany(() => DiscountRule, {through: {model: () => DiscountRuleDiscount}})
  discountRuleDiscount: DiscountRule[];

  @hasMany(() => Category, {through: {model: () => DiscountRuleCategory}})
  selectedCategories: Category[];

  constructor(data?: Partial<Discount>) {
    super(data);
  }
}

export interface DiscountRelations {
  // describe navigational properties here
}

export type DiscountWithRelations = Discount & DiscountRelations;
