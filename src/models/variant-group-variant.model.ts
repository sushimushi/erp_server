import {Entity, model, property} from '@loopback/repository';

@model()
export class VariantGroupVariant extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  variantGroupId: string;

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
