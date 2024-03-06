import {Entity, hasMany, model, property} from '@loopback/repository';
import {TaxGroupTax} from './tax-group-tax.model';
import {Tax} from './tax.model';

@model({settings: {strict: false}})
export class TaxGroup extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  taxGroupId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isTaxInclusive: boolean;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  taxIds: string[];

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'string',
  })
  accountId: string;

  @hasMany(() => Tax, {through: {model: () => TaxGroupTax}})
  taxes: Tax[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TaxGroup>) {
    super(data);
  }
}

export interface TaxGroupRelations {
  // describe navigational properties here
}

export type TaxGroupWithRelations = TaxGroup & TaxGroupRelations;
