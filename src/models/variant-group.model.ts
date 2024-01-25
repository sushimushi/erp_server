import {Model, model, property} from '@loopback/repository';

@model()
export class VariantGroup extends Model {
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

  constructor(data?: Partial<VariantGroup>) {
    super(data);
  }
}

export interface VariantGroupRelations {
  // describe navigational properties here
}

export type VariantGroupWithRelations = VariantGroup & VariantGroupRelations;
