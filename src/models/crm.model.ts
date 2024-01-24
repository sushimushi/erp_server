import {Model, model, property} from '@loopback/repository';

@model()
export class Crm extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  crmId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  apiToken: string;

  @property({
    type: 'object',
  })
  webhookUrls: object;

  @property({
    type: 'string',
  })
  addtionalDetails: string;

  constructor(data?: Partial<Crm>) {
    super(data);
  }
}

export interface CrmRelations {
  // describe navigational properties here
}

export type CrmWithRelations = Crm & CrmRelations;
