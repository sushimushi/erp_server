import {Entity, model, property} from '@loopback/repository';

@model()
export class RegisterDiscountRule extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  registerId?: string;

  @property({
    type: 'string',
    required: true,
  })
  discountRuleId: string;


  constructor(data?: Partial<RegisterDiscountRule>) {
    super(data);
  }
}

export interface RegisterDiscountRuleRelations {
  // describe navigational properties here
}

export type RegisterDiscountRuleWithRelations = RegisterDiscountRule & RegisterDiscountRuleRelations;
