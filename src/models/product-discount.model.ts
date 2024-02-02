import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductDiscount extends Entity {
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
  discountId: string;


  constructor(data?: Partial<ProductDiscount>) {
    super(data);
  }
}

export interface ProductDiscountRelations {
  // describe navigational properties here
}

export type ProductDiscountWithRelations = ProductDiscount & ProductDiscountRelations;
