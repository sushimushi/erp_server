import {Entity, model, property, hasMany} from '@loopback/repository';
import {Addon} from './addon.model';
import {AddonGroupAddon} from './addon-group-addon.model';

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
