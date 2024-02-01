import {Entity, belongsTo, model, property} from '@loopback/repository';
import {AddonGroup} from './addon-group.model';
import {Product} from './product.model';

@model()
export class ProductAddonGroup extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @belongsTo(() => AddonGroup)
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

export type ProductAddonGroupWithRelations = ProductAddonGroup &
  ProductAddonGroupRelations;
