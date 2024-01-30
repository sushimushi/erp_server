import {Model, model, property, belongsTo} from '@loopback/repository';
import {Product} from './product.model';

@model()
export class ProductVariantGroup extends Model {
  @property({
    type: 'string',
    required: true,
  })
  variantGroupId: string;

  @belongsTo(() => Product)
  productId: string;

  constructor(data?: Partial<ProductVariantGroup>) {
    super(data);
  }
}

export interface ProductVariantGroupRelations {
  // describe navigational properties here
}

export type ProductVariantGroupWithRelations = ProductVariantGroup & ProductVariantGroupRelations;
