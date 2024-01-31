import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductAdditionalDetails extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  productId: string;

  @property({
    type: 'string',
    required: true,
  })
  additionalDetailId: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  additionalDetailsId?: string;

  constructor(data?: Partial<ProductAdditionalDetails>) {
    super(data);
  }
}

export interface ProductAdditionalDetailsRelations {
  // describe navigational properties here
}

export type ProductAdditionalDetailsWithRelations = ProductAdditionalDetails & ProductAdditionalDetailsRelations;
