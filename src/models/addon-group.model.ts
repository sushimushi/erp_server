import {Model, model, property} from '@loopback/repository';

@model()
export class AddonGroup extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  addonGroupId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  order?: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  addonIds: string[];

  @property({
    type: 'number',
    required: true,
  })
  minSelectable: number;

  @property({
    type: 'number',
  })
  maxSelectable?: number;

  constructor(data?: Partial<AddonGroup>) {
    super(data);
  }
}

export interface AddonGroupIdsRelations {
  // describe navigational properties here
}

export type AddonGroupIdsWithRelations = AddonGroup & AddonGroupIdsRelations;
