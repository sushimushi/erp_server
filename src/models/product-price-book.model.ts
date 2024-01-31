import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Account} from './account.model';

@model()
export class ProductPriceBook extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  priceBookId?: string;
  @property({
    type: 'string',
    required: true,
  })
  registerId: string;

  @property({
    type: 'string',
    required: true,
  })
  orderType: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  tableSectionName: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'date',
    required: true,
  })
  updatedAt: string;

  @property({
    type: 'object',
  })
  product?: object;

  @property({
    type: 'object',
  })
  variant?: object;

  @property({
    type: 'object',
  })
  addons?: object;

  @property({
    type: 'string',
  })
  productId?: string;

  @belongsTo(() => Account)
  accountId: string;

  constructor(data?: Partial<ProductPriceBook>) {
    super(data);
  }
}

export interface ProductPriceBookRelations {
  // describe navigational properties here
}

export type ProductPriceBookWithRelations = ProductPriceBook &
  ProductPriceBookRelations;
