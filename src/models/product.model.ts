import {Model, model, property} from '@loopback/repository';

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

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
