import {Model, model, property} from '@loopback/repository';

@model()
export class OrderDiscount extends Model {
  @property({
    type: 'string',
    id: true,
  })
  orderId?: string;

  @property({
    type: 'string',
    required: true,
  })
  discountId: string;


  constructor(data?: Partial<OrderDiscount>) {
    super(data);
  }
}

export interface OrderDiscountRelations {
  // describe navigational properties here
}

export type OrderDiscountWithRelations = OrderDiscount & OrderDiscountRelations;
