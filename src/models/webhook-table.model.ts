import {Model, model, property} from '@loopback/repository';

@model()
export class WebhookTable extends Model {
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


  constructor(data?: Partial<WebhookTable>) {
    super(data);
  }
}

export interface WebhookTableRelations {
  // describe navigational properties here
}

export type WebhookTableWithRelations = WebhookTable & WebhookTableRelations;
