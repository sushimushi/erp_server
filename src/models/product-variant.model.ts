import {
  Entity,
  belongsTo,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Product} from './product.model';
import {Variant} from './variant.model';

@model()
export class ProductVariant extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  productVariantId: string;

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

  @hasMany(() => Variant, {keyTo: 'variantId'})
  variants: Variant[];

  @belongsTo(() => Product)
  productId: string;

  @belongsTo(() => Variant)
  variantId: string;

  constructor(data?: Partial<ProductVariant>) {
    super(data);
  }
}

export interface ProductVariantRelations {
  // describe navigational properties here
}

export type ProductVariantWithRelations = ProductVariant &
  ProductVariantRelations;
