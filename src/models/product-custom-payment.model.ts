import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductCustomPayment extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  productId: string;

  @property({
    type: 'string',
    required: true,
  })
  customPaymentId: string;


  constructor(data?: Partial<ProductCustomPayment>) {
    super(data);
  }
}

export interface ProductCustomPaymentRelations {
  // describe navigational properties here
}

export type ProductCustomPaymentWithRelations = ProductCustomPayment & ProductCustomPaymentRelations;
