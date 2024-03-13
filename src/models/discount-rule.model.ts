import {Entity, model, property} from '@loopback/repository';

@model()
export class DiscountRule extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  discountRuleId?: string;

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

  @property({
    type: 'object',
  })
  configuration?: object;

  @property({
    type: 'string',
  })
  status?: string;

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

  // @hasMany(() => Discount, {through: {model: () => DiscountRuleDiscount}})
  // discounts: Discount[];

  constructor(data?: Partial<DiscountRule>) {
    super(data);
  }
}

export interface DiscountRuleRelations {
  // describe navigational properties here
}

export type DiscountRuleWithRelations = DiscountRule & DiscountRuleRelations;
