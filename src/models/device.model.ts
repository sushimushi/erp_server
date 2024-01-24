import {Model, model, property} from '@loopback/repository';

@model()
export class Device extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  deviceId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  constructor(data?: Partial<Device>) {
    super(data);
  }
}

export interface DeviceRelations {
  // describe navigational properties here
}

export type DeviceWithRelations = Device & DeviceRelations;
