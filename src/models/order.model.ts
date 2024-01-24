import {Model, model, property} from '@loopback/repository';

@model()
export class Order extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  orderId?: string;

  @property({
    type: 'object',
  })
  details?: object;

  @property({
    type: 'boolean',
    required: true,
  })
  isRunningOrder: boolean;

  @property({
    type: 'string',
    required: true,
  })
  tableNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  LockType: string;

  @property({
    type: 'string',
  })
  notes?: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

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
    type: 'string',
    required: true,
  })
  saleType: string;

  @property({
    type: 'string',
    required: true,
  })
  cancelledBy: string;

  @property({
    type: 'date',
    required: true,
  })
  cancelledAt: string;

  @property({
    type: 'string',
  })
  cancellationReason?: string;


  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
