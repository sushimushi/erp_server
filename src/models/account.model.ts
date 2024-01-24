import {Model, model, property} from '@loopback/repository';

@model()
export class Account extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  accountId?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'number',
    required: true,
  })
  mobileNumber: number;

  @property({
    type: 'string',
    required: true,
  })
  businessType: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  userName: string;

  @property({
    type: 'string',
    required: true,
  })
  businessName: string;

  @property({
    type: 'date',
    required: true,
  })
  inceptionDate: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isPaid: boolean;

  @property({
    type: 'object',
  })
  option?: object;

  @property({
    type: 'string',
    required: true,
  })
  businessAddressId: string;


  constructor(data?: Partial<Account>) {
    super(data);
  }
}

export interface AccountRelations {
  // describe navigational properties here
}

export type AccountWithRelations = Account & AccountRelations;
