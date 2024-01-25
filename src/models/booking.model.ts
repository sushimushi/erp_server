import {Model, model, property} from '@loopback/repository';

@model()
export class Booking extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  bookingId?: string;

  @property({
    type: 'string',
    required: true,
  })
  receiptId: string;

  @property({
    type: 'object',
  })
  deliveryAt?: object;

  @property({
    type: 'boolean',
    required: true,
  })
  isDoorDelivery: boolean;

  @property({
    type: 'string',
  })
  notes?: string;

  @property({
    type: 'date',
    required: true,
  })
  updatedAt: string;

  @property({
    type: 'string',
    required: true,
  })
  updatedById: string;


  constructor(data?: Partial<Booking>) {
    super(data);
  }
}

export interface BookingRelations {
  // describe navigational properties here
}

export type BookingWithRelations = Booking & BookingRelations;
