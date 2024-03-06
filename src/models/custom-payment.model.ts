import {Entity, hasMany, model, property} from '@loopback/repository';
import {ProductCustomPayment} from './product-custom-payment.model';
import {Product} from './product.model';

@model()
export class CustomPayment extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  customPaymentId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
  })
  accountId: string;

  @hasMany(() => Product, {through: {model: () => ProductCustomPayment}})
  products: Product[];

  constructor(data?: Partial<CustomPayment>) {
    super(data);
  }
}

export interface CustomPaymentRelations {
  // describe navigational properties here
}

export type CustomPaymentWithRelations = CustomPayment & CustomPaymentRelations;
