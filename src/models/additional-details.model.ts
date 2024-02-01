import {Entity, model, property, hasMany} from '@loopback/repository';
import {Order} from './order.model';
import {AdditionalDetailsOrder} from './additional-details-order.model';

@model()
export class AdditionalDetails extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  additionalDetailId?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  type?: string[];

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isPrintableOnReceipt: boolean;

  @property({
    type: 'array',
    itemType: 'string',
  })
  fieldType?: string[];

  // @hasMany(() => Order, { through: { model: () => AdditionalDetailsOrder } })
  // additionalDetailsOrder: Order[];

  // @hasMany(() => Order, {through: {model: () => AdditionalDetailsOrder}})
  // orders: Order[];

  // @hasMany(() => Order, {through: {model: () => AdditionalDetailsOrder}})
  // ordersAdditionalDetails: Order[];

  constructor(data?: Partial<AdditionalDetails>) {
    super(data);
  }
}

export interface AdditionalDetailsRelations {
  // describe navigational properties here
}

export type AdditionalDetailsWithRelations = AdditionalDetails & AdditionalDetailsRelations;
