import {Model, model, property} from '@loopback/repository';

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
  orderId: string;

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


  constructor(data?: Partial<PushNotification>) {
    super(data);
  }
}

export interface PushNotificationRelations {
  // describe navigational properties here
}

export type PushNotificationWithRelations = PushNotification & PushNotificationRelations;
