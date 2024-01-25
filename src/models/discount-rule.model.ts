import {Model, model, property} from '@loopback/repository';

@model()
export class DiscountRule extends Model {
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
    type: 'array',
    itemType: 'string',
    required: true,
  })
  registerIds: string[];

  @property({
    type: 'object',
  })
  visibility?: object;

  @property({
    type: 'object',
  })
  configuration?: object;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isAutomaticallyApplied: boolean;


  constructor(data?: Partial<DiscountRule>) {
    super(data);
  }
}

export interface DiscountRuleRelations {
  // describe navigational properties here
}

export type DiscountRuleWithRelations = DiscountRule & DiscountRuleRelations;
