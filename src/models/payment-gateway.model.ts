import {Model, model, property} from '@loopback/repository';

@model()
export class PaymentGateway extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  gatewayId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  apiToken: string;

  @property({
    type: 'string',
  })
  additionalDetails?: string;

  @property({
    type: 'string',
    required: true,
  })
  paymentType: string;

  constructor(data?: Partial<PaymentGateway>) {
    super(data);
  }
}

export interface PaymentGatewayRelations {
  // describe navigational properties here
}

export type PaymentGatewayWithRelations = PaymentGateway &
  PaymentGatewayRelations;
