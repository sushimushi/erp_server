import {Entity, model, property} from '@loopback/repository';

@model()
export class TaxGroupTax extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  taxGroupId?: string;

  @property({
    type: 'string',
    required: true,
  })
  taxId: string;


  constructor(data?: Partial<TaxGroupTax>) {
    super(data);
  }
}

export interface TaxGroupTaxRelations {
  // describe navigational properties here
}

export type TaxGroupTaxWithRelations = TaxGroupTax & TaxGroupTaxRelations;
