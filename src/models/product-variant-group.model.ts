import {Model, model, property} from '@loopback/repository';

@model()
export class ProductVariantGroup extends Model {
  @property({
    type: 'string',
    id: true,
  })
  productId?: string;

  @property({
    type: 'string',
    required: true,
  })
  variantGroupId: string;


  constructor(data?: Partial<ProductVariantGroup>) {
    super(data);
  }
}

export interface ProductVariantGroupRelations {
  // describe navigational properties here
}

export type ProductVariantGroupWithRelations = ProductVariantGroup & ProductVariantGroupRelations;
