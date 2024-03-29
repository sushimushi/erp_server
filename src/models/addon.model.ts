import {Entity, model, property} from '@loopback/repository';

@model()
export class Addon extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  addonId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
  })
  order?: number;

  @property({
    type: 'string',
  })
  accountId: string;


  constructor(data?: Partial<Addon>) {
    super(data);
  }
}

export interface AddonRelations {
  // describe navigational properties here
}

export type AddonWithRelations = Addon & AddonRelations;
