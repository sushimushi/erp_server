import {Model, model, property} from '@loopback/repository';

@model()
export class ProductTaxGroup extends Model {
  @property({
    type: 'string',
    id: true,
  })
  productId?: string;

  @property({
    type: 'string',
    required: true,
  })
  taxGroupId: string;


  constructor(data?: Partial<ProductTaxGroup>) {
    super(data);
  }
}

export interface ProductTaxGroupRelations {
  // describe navigational properties here
}

export type ProductTaxGroupWithRelations = ProductTaxGroup & ProductTaxGroupRelations;
