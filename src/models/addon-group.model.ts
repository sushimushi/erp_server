import {Entity, hasMany, model, property} from '@loopback/repository';
import {AddonGroupAddon} from './addon-group-addon.model';
import {Addon} from './addon.model';

@model()
export class AddonGroup extends Entity {
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

  @property({
    type: 'string',
  })
  accountId: string;

  @hasMany(() => Addon, {through: {model: () => AddonGroupAddon}})
  addonGroupAddon: Addon[];

  constructor(data?: Partial<AddonGroup>) {
    super(data);
  }
}

export interface AddonGroupRelations {
  // describe navigational properties here
}

export type AddonGroupWithRelations = AddonGroup & AddonGroupRelations;
