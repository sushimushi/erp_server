import {Model, model, property, belongsTo} from '@loopback/repository';
import {Account} from './account.model';

@model()
export class Plan extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  planId?: string;
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

  @belongsTo(() => Account)
  accountId: string;

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
