import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Receipt} from './receipt.model';

@model()
export class Fulfillment extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  fulfillmentId?: string;
  @property({
    type: 'date',
    required: true,
  })
  fulfilledAt: string;

  @property({
    type: 'string',
    required: true,
  })
  fulfilledById: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isPaymentReceived: boolean;

  @belongsTo(() => Receipt)
  receiptId: string;

  constructor(data?: Partial<Fulfillment>) {
    super(data);
  }
}

export interface FulfillmentRelations {
  // describe navigational properties here
}

export type FulfillmentWithRelations = Fulfillment & FulfillmentRelations;
