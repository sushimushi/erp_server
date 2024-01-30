import {Model, model, property, belongsTo} from '@loopback/repository';
import {Order} from './order.model';

@model()
export class Refund extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  refundId?: string;

  @property({
    type: 'string',
    required: true,
  })
  receiptId: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    required: true,
  })
  paymentStatus: string;

  @property({
    type: 'string',
    required: true,
  })
  fulfillmentStatus: string;

  @property({
    type: 'object',
    required: true,
  })
  itemsSold: object;

  @property({
    type: 'object',
  })
  priceSummary?: object;

  @property({
    type: 'object',
    required: true,
  })
  payment: object;

  @property({
    type: 'object',
  })
  additionalDetails?: object;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  tags: string[];

  @property({
    type: 'object',
  })
  delivery?: object;

  @property({
    type: 'date',
    required: true,
  })
  updatedAt: string;

  @property({
    type: 'string',
    required: true,
  })
  updatedBy: string;

  @belongsTo(() => Order)
  orderId: string;

  constructor(data?: Partial<Refund>) {
    super(data);
  }
}

export interface RefundRelations {
  // describe navigational properties here
}

export type RefundWithRelations = Refund & RefundRelations;
