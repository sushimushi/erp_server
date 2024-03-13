import {Entity, model, property} from '@loopback/repository';

@model()
export class DiscountRuleCategory extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  discountRuleCategory?: string;

  @property({
    type: 'string',
    required: true,
  })
  discountRuleId: string;

  @property({
    type: 'string',
    required: true,
  })
  categoryId: string;


  constructor(data?: Partial<DiscountRuleCategory>) {
    super(data);
  }
}

export interface DiscountRuleCategoryRelations {
  // describe navigational properties here
}

export type DiscountRuleCategoryWithRelations = DiscountRuleCategory & DiscountRuleCategoryRelations;
