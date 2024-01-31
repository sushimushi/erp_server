import {Entity, model, property} from '@loopback/repository';

@model()
export class DiscountRuleDiscount extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  discountId: string;

  @property({
    type: 'string',
    required: true,
  })
  discountRuleId: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<DiscountRuleDiscount>) {
    super(data);
  }
}

export interface DiscountRuleDiscountRelations {
  // describe navigational properties here
}

export type DiscountRuleDiscountWithRelations = DiscountRuleDiscount & DiscountRuleDiscountRelations;
