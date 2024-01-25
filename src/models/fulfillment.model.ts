import {Model, model, property} from '@loopback/repository';

@model()
export class Fulfillment extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  fulfillmentId?: string;

  @property({
    type: 'string',
    required: true,
  })
  receiptId: string;

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


  constructor(data?: Partial<Fulfillment>) {
    super(data);
  }
}

export interface FulfillmentRelations {
  // describe navigational properties here
}

export type FulfillmentWithRelations = Fulfillment & FulfillmentRelations;
