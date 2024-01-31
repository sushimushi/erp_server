import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Product} from './product.model';

@model()
export class ProductAddonGroup extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  addonGroupId: string;

  @belongsTo(() => Product)
  productId: string;

  constructor(data?: Partial<ProductAddonGroup>) {
    super(data);
  }
}

export interface ProductAddonGroupRelations {
  // describe navigational properties here
}

export type ProductAddonGroupWithRelations = ProductAddonGroup & ProductAddonGroupRelations;
