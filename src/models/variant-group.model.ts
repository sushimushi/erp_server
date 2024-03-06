import {Entity, hasMany, model, property} from '@loopback/repository';
import {VariantGroupVariant} from './variant-group-variant.model';
import {Variant} from './variant.model';

@model()
export class VariantGroup extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  variantGroupId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  variantIds: string[];

  @property({
    type: 'number',
    required: true,
  })
  order: number;

  @property({
    type: 'string',
  })
  accountId: string;

  @hasMany(() => Variant, {through: {model: () => VariantGroupVariant}})
  variants: Variant[];

  constructor(data?: Partial<VariantGroup>) {
    super(data);
  }
}

export interface VariantGroupRelations {
  // describe navigational properties here
}

export type VariantGroupWithRelations = VariantGroup & VariantGroupRelations;
