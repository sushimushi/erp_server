import {Model, model, property} from '@loopback/repository';

@model()
export class VariantGroupVariant extends Model {
  @property({
    type: 'string',
    id: true,
  })
  variantGroupId?: string;

  @property({
    type: 'string',
    required: true,
  })
  variantId: string;


  constructor(data?: Partial<VariantGroupVariant>) {
    super(data);
  }
}

export interface VariantGroupVariantRelations {
  // describe navigational properties here
}

export type VariantGroupVariantWithRelations = VariantGroupVariant & VariantGroupVariantRelations;
