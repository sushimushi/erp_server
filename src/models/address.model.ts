import {Entity, hasOne, model, property} from '@loopback/repository';
import {Customer} from './customer.model';

@model()
export class Address extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  addressId?: string;

  @property({
    type: 'string',
    required: true,
  })
  streetAddress: string;

  @property({
    type: 'string',
  })
  landmark?: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

  @property({
    type: 'number',
    required: true,
  })
  zipcode: number;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  @property({
    type: 'string',
    required: true,
  })
  location: string;

  @hasOne(() => Customer, {keyTo: 'shippingAddress'})
  customer: Customer;

  @hasOne(() => Customer, {keyTo: 'billingAddressId'})
  billlingCustomerRelation: Customer;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
