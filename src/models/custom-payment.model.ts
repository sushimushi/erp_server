import {Model, model, property, hasMany} from '@loopback/repository';
import {Product} from './product.model';
import {ProductCustomPayment} from './product-custom-payment.model';

@model()
export class CustomPayment extends Model {
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
