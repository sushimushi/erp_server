import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductOrder extends Entity {
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
  productId?: string;

  @property({
    type: 'string',
    required: true,
  })
  orderId: string;

  @property({
    type: 'string',
  })
  orderItemId?: string;

  constructor(data?: Partial<ProductOrder>) {
    super(data);
  }
}

export interface ProductOrderRelations {
  // describe navigational properties here
}

export type ProductOrderWithRelations = ProductOrder & ProductOrderRelations;
