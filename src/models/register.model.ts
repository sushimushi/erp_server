import {Entity, model, property} from '@loopback/repository';

@model()
export class Register extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  registerId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  receiptNumberPrefix: string;

  @property({
    type: 'boolean',
  })
  isPrintReceipt: boolean;


  @property({
    type: 'object',
  })
  options?: object;

  @property({
    type: 'string',
  })
  lastLocalReceiptNumber?: string;

  @property({
    type: 'string',
    required: true,
  })
  activeDeviceId: string;

  @property({
    type: 'string',
    required: true,
  })
  crmId: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  paymentGatewayIds: string[];

  constructor(data?: Partial<Register>) {
    super(data);
  }
}

export interface RegisterRelations {
  // describe navigational properties here
}

export type RegisterWithRelations = Register & RegisterRelations;
