import {Model, model, property} from '@loopback/repository';

@model()
export class ProductOrder extends Model {
  @property({
    type: 'string',
    id: true,
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
