import {Entity, model, property} from '@loopback/repository';

@model()
export class Variant extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  variantId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
  })
  comment?: string;

  @property({
    type: 'number',
  })
  sortOrder?: number;

  @property({
    type: 'string',
  })
  accountId: string;


  constructor(data?: Partial<Variant>) {
    super(data);
  }
}

export interface VariantRelations {
  // describe navigational properties here
}

export type VariantWithRelations = Variant & VariantRelations;
