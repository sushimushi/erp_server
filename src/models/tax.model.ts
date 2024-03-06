import {Entity, model, property} from '@loopback/repository';

@model()
export class Tax extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  taxId?: string;

  @property({
    type: 'number',
  })
  percent?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  accountId: string;


  constructor(data?: Partial<Tax>) {
    super(data);
  }
}

export interface TaxRelations {
  // describe navigational properties here
}

export type TaxWithRelations = Tax & TaxRelations;
