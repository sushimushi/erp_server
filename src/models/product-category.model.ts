import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Product} from './product.model';
import {Category} from './category.model';

@model()
export class ProductCategory extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true
  })
  id: string;

  @belongsTo(()=> Category)
  categoryId: string;

  @belongsTo(() => Product)
  productId: string;

  constructor(data?: Partial<ProductCategory>) {
    super(data);
  }
}

export interface ProductCategoryRelations {
  // describe navigational properties here
}

export type ProductCategoryWithRelations = ProductCategory & ProductCategoryRelations;
