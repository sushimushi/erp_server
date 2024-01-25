import {Model, model, property} from '@loopback/repository';

@model()
export class AdditionalDetails extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  additionalDetailId?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  type?: string[];

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isPrintableOnReceipt: boolean;

  @property({
    type: 'array',
    itemType: 'string',
  })
  fieldType?: string[];


  constructor(data?: Partial<AdditionalDetails>) {
    super(data);
  }
}

export interface AdditionalDetailsRelations {
  // describe navigational properties here
}

export type AdditionalDetailsWithRelations = AdditionalDetails & AdditionalDetailsRelations;
