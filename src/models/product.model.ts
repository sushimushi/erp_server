import {Model, model, property, hasMany} from '@loopback/repository';
import {TaxGroup} from './tax-group.model';
import {ProductTaxGroup} from './product-tax-group.model';
import {Category} from './category.model';
import {ProductCategory} from './product-category.model';

@model()
export class Product extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  productId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  markedPrice: number;

  @property({
    type: 'string',
  })
  unitOfMeasure?: string;

  @property({
    type: 'number',
    required: true,
  })
  costPrice: number;

  @property({
    type: 'string',
    required: true,
  })
  sku: string;

  @property({
    type: 'string',
    required: true,
  })
  notes: string;

  @property({
    type: 'string',
    required: true,
  })
  barcodes: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isCombo: boolean;

  @property({
    type: 'object',
  })
  comboDetails: object;

  @hasMany(() => TaxGroup, {through: {model: () => ProductTaxGroup}})
  taxGroups: TaxGroup[];

  @hasMany(() => Category, {through: {model: () => ProductCategory}})
  categories: Category[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
