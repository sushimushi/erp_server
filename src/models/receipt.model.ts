import {Model, model, property, hasMany} from '@loopback/repository';
import {Refund} from './refund.model';

@model()
export class Receipt extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  receiptId?: string;

  @property({
    type: 'string',
    required: true,
  })
  accountId: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'string',
    required: true,
  })
  localReceiptNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  sequentialReceiptNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  publicReceiptId: string;

  @property({
    type: 'string',
    required: true,
  })
  fullfillmentStatus: string;

  @property({
    type: 'string',
    required: true,
  })
  paymentStatus: string;

  @property({
    type: 'string',
    required: true,
  })
  saleType: string;

  @property({
    type: 'string',
    required: true,
  })
  source: string;

  @property({
    type: 'object',
    required: true,
  })
  itemsSold: object;

  @property({
    type: 'object',
    required: true,
  })
  bookingDetails: object;

  @property({
    type: 'object',
    required: true,
  })
  priceSummary: object;

  @property({
    type: 'object',
    required: true,
  })
  payments: object;

  @property({
    type: 'object',
  })
  cancellationDetails?: object;

  @property({
    type: 'object',
  })
  additionalDetails?: object;

  @property({
    type: 'array',
    itemType: 'string',
  })
  tags?: string[];

  @property({
    type: 'object',
  })
  draftHistory?: object;

  @property({
    type: 'object',
  })
  orderTickets?: object;

  @property({
    type: 'object',
  })
  printHistory?: object;

  @property({
    type: 'object',
  })
  deliveryDetails?: object;

  @property({
    type: 'object',
  })
  RedemptionDetails?: object;

  @property({
    type: 'string',
  })
  updatedBy?: string;

  @hasMany(() => Refund)
  refunds: Refund[];

  constructor(data?: Partial<Receipt>) {
    super(data);
  }
}

export interface ReceiptRelations {
  // describe navigational properties here
}

export type ReceiptWithRelations = Receipt & ReceiptRelations;
