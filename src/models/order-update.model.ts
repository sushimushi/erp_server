import {Model, model, property} from '@loopback/repository';

@model()
export class OrderUpdate extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  updateReferenceId?: string;

  @property({
    type: 'string',
    required: true,
  })
  orderId: string;

  @property({
    type: 'string',
  })
  notes?: string;

  @property({
    type: 'string',
    required: true,
  })
  paymentStatus: string;

  @property({
    type: 'string',
    required: true,
  })
  fullfillmentStatus: string;

  @property({
    type: 'object',
  })
  itemsSold?: object;

  @property({
    type: 'object',
  })
  priceSummary?: object;

  @property({
    type: 'object',
  })
  payments?: object;

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


  constructor(data?: Partial<OrderUpdate>) {
    super(data);
  }
}

export interface OrderUpdateRelations {
  // describe navigational properties here
}

export type OrderUpdateWithRelations = OrderUpdate & OrderUpdateRelations;
