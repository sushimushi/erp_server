import {Model, model, property, belongsTo} from '@loopback/repository';
import {Order} from './order.model';

@model()
export class PushNotification extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  notificationId?: string;
  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true
  })
  type: string;

  @property({
    type: 'string',
    required: true
  })
  message: string;

  @belongsTo(() => Order)
  orderId: string;

  constructor(data?: Partial<PushNotification>) {
    super(data);
  }
}

export interface PushNotificationRelations {
  // describe navigational properties here
}

export type PushNotificationWithRelations = PushNotification & PushNotificationRelations;
