import {Model, model, property} from '@loopback/repository';

@model()
export class ProductVariant extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  variantId?: string;

  @property({
    type: 'string',
    required: true,
  })
  productId: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  price?: number;

  @property({
    type: 'string',
    required: true,
  })
  sku: string;


  constructor(data?: Partial<ProductVariant>) {
    super(data);
  }
}

export interface ProductVariantRelations {
  // describe navigational properties here
}

export type ProductVariantWithRelations = ProductVariant & ProductVariantRelations;
