import {Model, model, property} from '@loopback/repository';

@model()
export class Plan extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  planId?: string;

  @property({
    type: 'string',
    required: true,
  })
  accountId: string;

  @property({
    type: 'boolean',
    required: true,
  })
  logging: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isWaiterAllowed: boolean;


  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
