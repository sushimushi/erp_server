import {Entity, hasMany, model, property} from '@loopback/repository';
import {Order} from './order.model';

@model()
export class WebhookTable extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  webhookId?: string;

  @property({
    type: 'string',
    required: true,
  })
  accountId: string;

  @property({
    type: 'string',
    required: true,
  })
  registerId: string;

  @property({
    type: 'string',
    required: true,
  })
  appId: string;

  @property({
    type: 'string',
    required: true,
  })
  appName: string;

  @property({
    type: 'string',
    required: true,
  })
  appApiToken: string;

  @property({
    type: 'object',
  })
  webhookUrls?: object;

  @property({
    type: 'object',
  })
  appAdditionalDetails?: object;

  @property({
    type: 'string',
  })
  orderId?: string;

  @hasMany(() => Order, {keyTo: 'orderId'})
  orders: Order[];

  constructor(data?: Partial<WebhookTable>) {
    super(data);
  }
}

export interface WebhookTableRelations {
  // describe navigational properties here
}

export type WebhookTableWithRelations = WebhookTable & WebhookTableRelations;
