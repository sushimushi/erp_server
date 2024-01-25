import {Model, model, property} from '@loopback/repository';

@model()
export class ProductCategory extends Model {
  @property({
    type: 'string',
    id: true,
  })
  productId?: string;

  @property({
    type: 'string',
    required: true,
  })
  categoryId: string;


  constructor(data?: Partial<ProductCategory>) {
    super(data);
  }
}

export interface ProductCategoryRelations {
  // describe navigational properties here
}

export type ProductCategoryWithRelations = ProductCategory & ProductCategoryRelations;
