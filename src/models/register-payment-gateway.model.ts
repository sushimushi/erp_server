import {Entity, model, property} from '@loopback/repository';

@model()
export class RegisterPaymentGateway extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  registerId: string;

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
