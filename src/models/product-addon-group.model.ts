import {Model, model, property} from '@loopback/repository';

@model()
export class ProductAddonGroup extends Model {
  @property({
    type: 'string',
    id: true,
  })
  productId?: string;

  @property({
    type: 'string',
    required: true,
  })
  addonGroupId: string;


  constructor(data?: Partial<ProductAddonGroup>) {
    super(data);
  }
}

export interface ProductAddonGroupRelations {
  // describe navigational properties here
}

export type ProductAddonGroupWithRelations = ProductAddonGroup & ProductAddonGroupRelations;
