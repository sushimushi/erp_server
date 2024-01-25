import {Model, model, property} from '@loopback/repository';

@model()
export class ComboGroup extends Model {
  @property({
    type: 'string',
    required: true,
  })
  comboGroupId: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  uniqueItemId: string;

  @property({
    type: 'number',
    required: true,
  })
  priceExcludingDiscountTax: number;


  constructor(data?: Partial<ComboGroup>) {
    super(data);
  }
}

export interface ComboGroupRelations {
  // describe navigational properties here
}

export type ComboGroupWithRelations = ComboGroup & ComboGroupRelations;
