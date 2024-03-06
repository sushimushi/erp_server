import {Model, model, property} from '@loopback/repository';

@model()
export class AdditionalChargeDetails extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  additionalChargeDetailsId?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
  })
  value?: string;

  @property({
    type: 'string',
  })
  taxGroup?: string;

  @property({
    type: 'string',
  })
  orderType?: string;

  @property({
    type: 'boolean',
  })
  isAutomaticallyAdded?: boolean;


  constructor(data?: Partial<AdditionalChargeDetails>) {
    super(data);
  }
}

export interface AdditionalChargeDetailsRelations {
  // describe navigational properties here
}

export type AdditionalChargeDetailsWithRelations = AdditionalChargeDetails & AdditionalChargeDetailsRelations;
