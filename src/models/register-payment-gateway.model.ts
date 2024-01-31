import {Entity, model, property} from '@loopback/repository';

@model()
export class RegisterPaymentGateway extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  registerId?: string;

  @property({
    type: 'string',
    required: true,
  })
  gatewayId: string;


  constructor(data?: Partial<RegisterPaymentGateway>) {
    super(data);
  }
}

export interface RegisterPaymentGatewayRelations {
  // describe navigational properties here
}

export type RegisterPaymentGatewayWithRelations = RegisterPaymentGateway & RegisterPaymentGatewayRelations;
