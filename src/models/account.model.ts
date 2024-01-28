import {
  Entity,
  belongsTo,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Address} from './address.model';
import {Crm} from './crm.model';
import {Device} from './device.model';
import {Register} from './register.model';
import {User} from './user.model';

@model()
export class Account extends Entity {
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

  @belongsTo(() => Address)
  businessAddressId: string;

  @belongsTo(() => User, {name: 'accountUser'})
  userId: string;

  @belongsTo(() => Register, {name: 'accountRegister'})
  registerId: string;

  @hasMany(() => Device)
  accountDevices: Device[];

  @hasMany(() => Crm, {keyTo: 'crmId'})
  crms: Crm[];

  constructor(data?: Partial<Account>) {
    super(data);
  }
}

export interface AccountRelations {
  // describe navigational properties here
}

export type AccountWithRelations = Account & AccountRelations;
