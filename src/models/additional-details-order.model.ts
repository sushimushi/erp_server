import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class AdditionalDetailsOrder extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  additionalDetailId?: string;

  @property({
    type: 'string',
    required: true,
  })
  orderId?: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  additionalDetailsOrderId?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AdditionalDetailsOrder>) {
    super(data);
  }
}

export interface AdditionalDetailsOrderRelations {
  // describe navigational properties here
}

export type AdditionalDetailsOrderWithRelations = AdditionalDetailsOrder &
  AdditionalDetailsOrderRelations;
