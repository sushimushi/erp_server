import {Model, model, property} from '@loopback/repository';

@model()
export class AddonGroupAddon extends Model {
  @property({
    type: 'string',
    id: true,
  })
  addonGroupId?: string;

  @property({
    type: 'string',
    required: true,
  })
  addonId: string;


  constructor(data?: Partial<AddonGroupAddon>) {
    super(data);
  }
}

export interface AddonGroupAddonRelations {
  // describe navigational properties here
}

export type AddonGroupAddonWithRelations = AddonGroupAddon & AddonGroupAddonRelations;
