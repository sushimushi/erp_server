import {Model, model, property} from '@loopback/repository';

@model()
export class Discount extends Model {
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


  constructor(data?: Partial<Discount>) {
    super(data);
  }
}

export interface DiscountRelations {
  // describe navigational properties here
}

export type DiscountWithRelations = Discount & DiscountRelations;
