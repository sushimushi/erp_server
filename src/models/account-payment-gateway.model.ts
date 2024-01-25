import {Model, model, property} from '@loopback/repository';

@model()
export class AccountPaymentGateway extends Model {
  @property({
    type: 'string',
    id: true,
  })
  accountId?: string;

  @property({
    type: 'string',
    required: true,
  })
  gatewayId: string;


  constructor(data?: Partial<AccountPaymentGateway>) {
    super(data);
  }
}

export interface AccountPaymentGatewayRelations {
  // describe navigational properties here
}

export type AccountPaymentGatewayWithRelations = AccountPaymentGateway & AccountPaymentGatewayRelations;
