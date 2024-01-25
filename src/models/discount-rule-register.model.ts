import {Model, model, property} from '@loopback/repository';

@model()
export class DiscountRuleRegister extends Model {
  @property({
    type: 'string',
    id: true,
  })
  discountRuleId?: string;

  @property({
    type: 'string',
    required: true,
  })
  registerId: string;


  constructor(data?: Partial<DiscountRuleRegister>) {
    super(data);
  }
}

export interface DiscountRuleRegisterRelations {
  // describe navigational properties here
}

export type DiscountRuleRegisterWithRelations = DiscountRuleRegister & DiscountRuleRegisterRelations;
