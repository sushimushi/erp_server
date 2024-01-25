import {Model, model, property} from '@loopback/repository';

@model()
export class CustomPayment extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  customPaymentId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;


  constructor(data?: Partial<CustomPayment>) {
    super(data);
  }
}

export interface CustomPaymentRelations {
  // describe navigational properties here
}

export type CustomPaymentWithRelations = CustomPayment & CustomPaymentRelations;
