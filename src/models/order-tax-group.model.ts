import {Entity, model, property} from '@loopback/repository';

@model()
export class OrderTaxGroup extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  orderId: string;

  @property({
    type: 'string',
    required: true,
  })
  taxGroupId: string;


  constructor(data?: Partial<OrderTaxGroup>) {
    super(data);
  }
}

export interface OrderTaxGroupRelations {
  // describe navigational properties here
}

export type OrderTaxGroupWithRelations = OrderTaxGroup & OrderTaxGroupRelations;
