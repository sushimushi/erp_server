import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Staff extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  staffId?: string;

  @property({
    type: 'string',
    required: true,
  })
  accountId: string;

  @property({
    type: 'string',
  })
  registerId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'string',
    required: true,
  })
  pin: string;

  @property({
    type: 'boolean',
    default: false,
  })
  managerPermission?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Staff>) {
    super(data);
  }
}

export interface StaffRelations {
  // describe navigational properties here
}

export type StaffWithRelations = Staff & StaffRelations;
