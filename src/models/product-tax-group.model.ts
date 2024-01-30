import {Model, model, property, belongsTo} from '@loopback/repository';
import {Product} from './product.model';

@model()
export class ProductTaxGroup extends Model {
  @property({
    type: 'string',
    required: true,
  })
  taxGroupId: string;

  @belongsTo(() => Product)
  productId: string;

  constructor(data?: Partial<ProductTaxGroup>) {
    super(data);
  }
}

export interface ProductTaxGroupRelations {
  // describe navigational properties here
}

export type ProductTaxGroupWithRelations = ProductTaxGroup & ProductTaxGroupRelations;
