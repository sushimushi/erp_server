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
    required: true,
  })
  couponCode: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
  })
  level?: string;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  visibility?: boolean;

  // @property({
  //   type: 'object',
  // })
  // configuration?: object;

  // @property({
  //   type: 'string',
  // })
  // status?: string;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  isAutomaticallyApplied: boolean;

  @property({
    type: 'string',
  })
  startDate: string;

  @property({
    type: 'string',
  })
  endDate: string;

  @property({
    type: 'string',
  })
  hhStart: string;

  @property({
    type: 'string',
  })
  hhEnd: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  daysOfWeek: string[];

  @property({
    type: 'number',
  })
  discountAmount: number;

  @property({
    type: 'number',
  })
  minQuantity: number;

  @property({
    type: 'array',
    itemType: 'string',
  })
  selectedProducts: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  selectedCategories: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  registerIds: string[];

  // @hasMany(() => DiscountRule, {through: {model: () => DiscountRuleDiscount}})
  // discountRuleDiscount: DiscountRule[];

  // @hasMany(() => Category, {through: {model: () => DiscountRuleCategory}})
  // categories: Category[];

  constructor(data?: Partial<Discount>) {
    super(data);
  }
}

export interface DiscountRelations {
  // describe navigational properties here
}

export type DiscountWithRelations = Discount & DiscountRelations;
