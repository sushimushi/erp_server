import {Entity, hasMany, model, property} from '@loopback/repository';
import {OrderUpdate} from './order-update.model';
import {Order} from './order.model';
import {Receipt} from './receipt.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  userId?: string;

  @property({
    type: 'string',
    required: true,
  })
  userName: string;

  @property({
    type: 'string',
    required: true,
  })
  pin: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'string',
    required: true,
  })
  registerId: string;

  @property({
    type: 'string',
  })
  accountId: string;

  @hasMany(() => Order, {keyTo: 'cancelledBy'})
  orders: Order[];

  @hasMany(() => Order, {keyTo: 'cancelledBy'})
  cancelledBy: Order[];

  @hasMany(() => OrderUpdate, {keyTo: 'updatedBy'})
  orderUpdates: OrderUpdate[];

  @hasMany(() => Receipt, {keyTo: 'updatedBy'})
  userReceipt: Receipt[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
