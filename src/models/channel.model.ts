import {Model, model, property} from '@loopback/repository';

@model()
export class Channel extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  channelId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  brandName: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  externalOrderId: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

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
  appOrderId: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isCancellationReasonRequired: boolean;

  @property({
    type: 'object',
  })
  cancellationReasons?: object;


  constructor(data?: Partial<Channel>) {
    super(data);
  }
}

export interface ChannelRelations {
  // describe navigational properties here
}

export type ChannelWithRelations = Channel & ChannelRelations;
