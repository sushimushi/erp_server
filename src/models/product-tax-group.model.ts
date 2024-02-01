import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Product} from './product.model';
import {TaxGroup} from './tax-group.model';

@model()
export class ProductTaxGroup extends Entity {
  
  @property({
    type: 'string',
    id:true,
    generated: true
  })
  id: string;

  @belongsTo(() => TaxGroup)
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
