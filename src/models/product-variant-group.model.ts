import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Product} from './product.model';
import {VariantGroup} from './variant-group.model';

@model()
export class ProductVariantGroup extends Entity {
  
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @belongsTo(() => VariantGroup)
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

export type ProductVariantGroupWithRelations = ProductVariantGroup &
  ProductVariantGroupRelations;
